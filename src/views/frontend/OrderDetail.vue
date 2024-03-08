<template>
  <div>
    <PageLoading v-if="isLoading"></PageLoading>
    <div
      v-else
      class="container bg-main-medium container-rounded my-5 py-7r px-lg-5 px-md-4 px-sm-3"
    >
      <!-- 大標題 -->
      <div class="d-flex align-items-center justify-content-center mb-3">
        <h2 class="text-center border-secondary pb-2 fw-bold">訂單詳情</h2>
      </div>
      <!-- 詳細內容 -->
      <div class="row row-cols-1 row-cols-lg-2">
        <!-- 詳細內容左 -->
        <div class="col">
          <div class="accordion">
            <!-- 購物車 -->
            <BasicCollapse :uniqueId="'ShoppingCartSection'" :open="true">
              <template v-slot:header> 購物車 </template>
              <template v-slot:body>
                <div class="row mb-3" v-for="item in productData" :key="item.id">
                  <div class="col col-sm-2 col-lg-3 d-flex align-items-center">
                    <img
                      role="button"
                      @click="changeToProductPage(item.product.id, item.product.category)"
                      :src="item.product.imageUrl"
                      :alt="item.product.title"
                      class="img-fluid"
                    />
                  </div>
                  <div class="col col-sm-10 col-lg-9">
                    <div class="d-flex">
                      <h6
                        class="text-link-deep-gray"
                        role="button"
                        @click="changeToProductPage(item.product.id, item.product.category)"
                      >
                        {{ item.product.title }}
                      </h6>
                    </div>
                    <p>
                      單價NT$ {{ parseInt(item.product.price) }} / 小計NT$
                      {{ parseInt(item.total) }}
                      <span v-if="item.final_total !== item.total">
                        / 優惠價NT$ {{ parseInt(item.final_total) }}
                      </span>
                    </p>
                    <p>
                      數量：
                      <span class="fw-bold">{{ item.qty }}</span>
                    </p>
                  </div>
                </div>
              </template>
            </BasicCollapse>
            <!-- 訂單確認 -->
            <BasicCollapse :uniqueId="'OrderConfirmationSection'" :open="true">
              <template v-slot:header> 訂單確認 </template>
              <template v-slot:body>
                <!-- 訂單編號 -->
                <div class="d-flex justify-content-between">
                  <p>訂單編號</p>
                  <p>{{ showData.id }}</p>
                </div>
                <!-- 訂單建立日 -->
                <div class="d-flex justify-content-between">
                  <p>訂單建立日</p>
                  <p>{{ showData.create_at }}</p>
                </div>
                <!-- 訂單付款日期 -->
                <div class="d-flex justify-content-between">
                  <p>訂單付款日期</p>
                  <p>{{ showData.paid_date }}</p>
                </div>
                <!-- 運費 -->
                <div class="d-flex justify-content-between">
                  <p>運費</p>
                  <p>免運費</p>
                </div>
                <!-- 使用優惠代碼3 -->
                <div v-if="couponData" class="d-flex justify-content-between">
                  <p>使用優惠券</p>
                  <p>
                    已使用
                    <span class="fw-bold">{{ couponData.title }}</span>
                    優惠券
                  </p>
                </div>
                <hr />
                <!-- 總付款金額 -->
                <div class="d-flex justify-content-between mb-3">
                  <p>總付款金額</p>
                  <h4 class="text-end">NT$ {{ parseInt(showData.total) }}</h4>
                </div>
                <!-- 點我付款按鈕 -->
                <div v-if="!showData.is_paid" class="d-flex mb-3">
                  <button
                    type="button"
                    class="btn btn-solid-spec w-100 btn-lg"
                    @click="postPayOrder(showData.id)"
                  >
                    點我付款
                  </button>
                </div>
                <div v-else class="d-flex mb-3">
                  <button type="button" class="btn btn-solid-dpgray w-100 btn-lg border" disabled>
                    已完成付款
                  </button>
                </div>
              </template>
            </BasicCollapse>
          </div>
        </div>
        <!-- 詳細內容右 -->
        <div class="col">
          <div class="accordion">
            <!-- 收件資料 -->
            <BasicCollapse :uniqueId="'RecipientInformationSection'" :open="true">
              <template v-slot:header> 收件資料 </template>
              <template v-slot:body>
                <!-- 收件人名稱 -->
                <div>
                  <p>收件人名稱</p>
                  <p>{{ userData.name }}</p>
                </div>
                <hr />
                <!-- 電子信箱 -->
                <div>
                  <p>電子信箱</p>
                  <p>{{ userData.email }}</p>
                </div>
                <hr />
                <!-- 行動電話號碼 -->
                <div>
                  <p>行動電話號碼</p>
                  <p>{{ userData.tel }}</p>
                </div>
                <hr />
                <!-- 收件地址 -->
                <div>
                  <p>收件地址</p>
                  <p>{{ userData.address }}</p>
                </div>
                <hr />
                <!-- 訂單備註 -->
                <div class="mb-3">
                  <p>訂單備註</p>
                  <p>
                    <span v-if="showData.message === undefined">無</span>
                    <span v-for="(item, index) in showData.message" :key="index"
                      >{{ item }}<br />
                    </span>
                  </p>
                </div>
              </template>
            </BasicCollapse>
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
import pageStore from '../../stores/pageStore';

import BasicCollapse from '../../components/frontend/BasicCollapse.vue';

export default {
  data() {
    return {
      // 用來控制使用優惠券與否的切換
      useCoupon: false,
      // 優惠券代碼
      couponCode: '',
      // 是否觀看送出訂單前的事項
      checkOrderInfo: false,
      // 送出訂單資料
      orderData: {
        data: {
          user: {
            name: null,
            email: null,
            tel: null,
            address: null,
          },
          message: null,
        },
      },
    };
  },
  components: {
    BasicCollapse,
  },
  methods: {
    // 跳轉至產品詳細頁面
    changeToProductPage(id, category) {
      this.changeNowPage(category);
      this.$router.push({
        name: 'product',
        params: { id },
      });
    },
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
    ...mapActions(ordersStore, ['getOrder', 'postPayOrder']),
    ...mapActions(alertStore, ['showAlertMessage']),
    ...mapActions(pageStore, ['changeNowPage']),
  },
  computed: {
    ...mapState(ordersStore, ['isLoading', 'showData', 'userData', 'productData', 'couponData']),
  },
  mounted() {
    this.goToGetOrder();
  },
};
</script>
