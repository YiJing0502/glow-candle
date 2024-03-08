<template>
  <div>
    <PageLoading v-if="isLoading"></PageLoading>
    <div
      v-else
      class="container bg-main-medium container-rounded my-5 py-7r px-lg-5 px-md-4 px-sm-3"
    >
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
              <BasicCollapse :uniqueId="'OrderInformationSection'" :open="true">
                <template v-slot:header> 訂單資訊 </template>
                <template v-slot:body>
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
                  <div v-if="!showData.is_paid" class="bg-light-gray text-deep-gray px-3 py-2 mb-3">
                    <h6>修改訂單問題？</h6>
                    <span
                      >若您於已下單後想修改您的訂單，請您先不要付款，請先聯絡客服人員修改您的訂單後，再搜尋您的訂單前往付款😄</span
                    >
                  </div>
                  <div v-else class="bg-light-gray text-deep-gray px-3 py-2 mb-3">
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
                </template>
              </BasicCollapse>
            </div>
          </div>
        </div>
        <!-- 詳細內容右 -->
        <div class="col">
          <div class="accordion">
            <!-- 聯絡我們 -->
            <ContactUsDetails></ContactUsDetails>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import ordersStore from '../../stores/ordersStore';
import alertStore from '../../stores/alertStore';

import BasicCollapse from '../../components/frontend/BasicCollapse.vue';
import ContactUsDetails from '../../components/frontend/ContactUsDetails.vue';

export default {
  data() {
    return {};
  },
  components: {
    BasicCollapse,
    ContactUsDetails,
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
          this.showAlertMessage(false, '找不到此筆訂單');
        }
        if (!res.data.order.is_paid) {
          this.showAlertMessage(true, '訂單已建立，請點擊付款按鈕付款');
        }
      } catch (err) {
        this.showAlertMessage(false, err.response.data.message);
      }
    },
    async goToPostPayOrder(orderId) {
      try {
        const res = await this.postPayOrder(orderId);
        await this.goToGetOrder();
        this.showAlertMessage(true, res.data.message);
      } catch (err) {
        this.showAlertMessage(false, err.response.data.message);
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
    ...mapActions(alertStore, ['showAlertMessage']),
  },
  computed: {
    ...mapState(ordersStore, ['isLoading', 'showData']),
  },
  mounted() {
    this.goToGetOrder();
  },
};
</script>
