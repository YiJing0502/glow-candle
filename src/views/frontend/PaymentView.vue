<template>
  <VueLoading
    v-if="isLoading"
    :active="isLoading"
    :background-color="'#EBEAE4'"
    :is-full-page="true"
    :color="'#52504B'"
  />
  <div v-else class="container bg-main-medium container-rounded my-5 py-7r px-lg-5 px-md-4 px-sm-3">
    <!-- 大標題 -->
    <div class="d-flex align-items-center justify-content-center mb-3">
      <h2 v-if="!showData.is_paid" class="text-center border-secondary pb-2 fw-bold">
        訂單已建立！
      </h2>
      <h2 v-else class="text-center border-secondary pb-2 fw-bold">訂購完成！</h2>
    </div>
    <!-- 詳細內容 -->
    <div class="row row-cols-1 row-cols-lg-2">
      <!-- 詳細內容左 -->
      <div class="col">
        <div class="accordion">
          <!-- 訂單資訊 -->
          <div class="accordion-item">
            <!-- OrderInformationSection -->
            <h2 class="accordion-header" id="OrderInformationSection">
              <button
                class="accordion-button collapsed fs-5 fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#OrderInformationDetails"
                aria-expanded="false"
                aria-controls="OrderInformationDetails"
              >
                訂單資訊
              </button>
            </h2>
            <!-- OrderInformationDetails -->
            <div
              id="OrderInformationDetails"
              class="accordion-collapse collapse show"
              aria-labelledby="OrderInformationSection"
            >
              <div class="accordion-body">
                <!-- 訂單編號 -->
                <div class="d-flex justify-content-between">
                  <p>訂單編號</p>
                  <p>{{ showData.id }}</p>
                </div>
                <!-- 建立時間 -->
                <div class="d-flex justify-content-between">
                  <p>建立時間</p>
                  <p>{{ showData.create_at }}</p>
                </div>
                <!-- 總金額 -->
                <div class="d-flex justify-content-between">
                  <p>總金額</p>
                  <p>NT$ {{ parseInt(showData.total) }}</p>
                </div>
                <div v-if="!showData.is_paid" class="bg-medium-gray text-deep-gray px-3 py-2 mb-3">
                  <h6>修改訂單問題？</h6>
                  <span
                    >若您於已下單後想修改您的訂單，請您先不要付款，請先聯絡客服人員修改您的訂單後，再搜尋您的訂單前往付款😄</span
                  >
                </div>
                <div v-else class="bg-medium-gray text-deep-gray px-3 py-2 mb-3">
                  <h6>到貨時間？</h6>
                  <span
                    >在確認收到您訂單和款項之後我們約有1~2天備貨期，您最多可以指定3天後作為預期收到貨的日期。
                    實際依照網站出貨及物流業者的配送時間為準。</span
                  >
                </div>
                <!-- 點我付款按鈕 -->
                <div v-if="!showData.is_paid" class="d-flex mb-3">
                  <button
                    type="button"
                    class="btn btn-solid-spec w-100 btn-lg"
                    @click="goToPostPayOrder(showData.id)"
                  >
                    點我付款
                  </button>
                </div>
                <div v-else class="d-flex mb-3">
                  <button
                    type="button"
                    class="btn btn-solid-dpgray w-100 btn-lg"
                    @click="goToOrderDetailPage(showData.id)"
                  >
                    點擊查看此筆訂單
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 詳細內容右 -->
      <div class="col">
        <div class="accordion">
          <!-- 聯絡我們 -->
          <div class="accordion-item">
            <!-- ContactUsSection -->
            <h2 class="accordion-header" id="ContactUsSection">
              <button
                class="accordion-button collapsed fs-5 fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#ContactUsDetails"
                aria-expanded="false"
                aria-controls="ContactUsDetails"
              >
                聯絡我們
              </button>
            </h2>
            <!-- ContactUsDetails -->
            <div
              id="ContactUsDetails"
              class="accordion-collapse collapse show"
              aria-labelledby="ContactUsSection"
            >
              <div class="accordion-body">
                <!-- 聯絡信箱 -->
                <div class="d-flex justify-content-between">
                  <p>聯絡信箱</p>
                  <p>glow.2023@gmail.com</p>
                </div>
                <!-- 聯絡電話 -->
                <div class="d-flex justify-content-between">
                  <p>聯絡電話</p>
                  <p>0988000999</p>
                </div>
                <!-- 營業時間 -->
                <div class="d-flex justify-content-between mb-3">
                  <p>營業時間</p>
                  <p>週一至週五 09:00~17:00</p>
                </div>
                <!-- 購物保證 -->
                <div class="row mb-3">
                  <div class="col d-flex flex-column align-items-center">
                    <span class="material-icons-outlined fs-1 mb-3"> local_shipping </span>
                    <span>免費標準配送</span>
                  </div>
                  <div class="col d-flex flex-column align-items-center">
                    <span class="material-icons-outlined fs-1 mb-3"> redeem </span>
                    <span>七日內免費退貨</span>
                  </div>
                  <div class="col d-flex flex-column align-items-center">
                    <span class="material-icons-outlined fs-1 mb-3"> enhanced_encryption </span>
                    <span>安全購物</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ResultModal ref="resultModal" :server-message="serverMessage"></ResultModal>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import ordersStore from '../../stores/ordersStore';

export default {
  data() {
    return {
      // result model
      serverMessage: {
        message: '',
        success: true,
      },
    };
  },
  methods: {
    async goToGetOrder() {
      try {
        const res = await this.getOrder(this.$route.params.id);
        if (res.data.order === null) {
          this.$router.push({
            name: 'front404',
            params: { pathMatch: this.$route.path.split('/').slice(1) },
            query: this.$route.query,
            hash: this.$route.hash,
          });
        }
        if (!res.data.order.is_paid) {
          this.serverMessage.message = '訂單已建立，請點擊付款按鈕付款';
          this.serverMessage.success = res.data.success;
          this.$refs.resultModal.openModal();
        }
      } catch (err) {
        this.serverMessage.message = err.response.data.message;
        this.serverMessage.success = err.response.data.success;
        this.$refs.resultModal.openModal();
      }
    },
    async goToPostPayOrder(orderId) {
      try {
        const res = await this.postPayOrder(orderId);
        await this.goToGetOrder();
        this.serverMessage = res.data;
        this.$refs.resultModal.openModal();
      } catch (err) {
        this.serverMessage.message = err.response.data.message;
        this.serverMessage.success = err.response.data.success;
        this.$refs.resultModal.openModal();
      }
    },
    goToOrderDetailPage(orderId) {
      this.$router.push({
        name: 'order',
        params: {
          id: orderId,
        },
      });
    },
    ...mapActions(ordersStore, ['getOrder', 'postPayOrder', 'changeToIdPage']),
  },
  computed: {
    ...mapState(ordersStore, ['isLoading', 'showData']),
  },
  mounted() {
    this.goToGetOrder();
  },
};
</script>
