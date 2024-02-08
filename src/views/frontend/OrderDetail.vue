<template>
  <VueLoading v-if="isLoading"
              :active="isLoading"
              :background-color="'#EBEAE4'"
              :is-full-page="true"
              :color="'#52504B'" />
  <div v-else class="container bg-main-medium rounded-10em mt-5 mb-5 px-5r py-7r">
    <!-- 大標題 -->
    <div class="d-flex align-items-center justify-content-center mb-3">
      <h2 class="text-center border-bottom border-secondary pb-2 w-50">訂單編號：{{ showData.id }}</h2>
    </div>
    <!-- 詳細內容 -->
    <div class="row">
      <!-- 詳細內容左 -->
      <div class="col">
        <div class="accordion" id="accordionPanelsStayOpenExample">
          <!-- 購物車 -->
          <div class="accordion-item">
            <!-- ShoppingCartSection -->
            <h2 class="accordion-header" id="ShoppingCartSection">
              <button class="accordion-button fs-5 fw-semibold" type="button"
               data-bs-toggle="collapse"
                data-bs-target="#ShoppingCartDetails" aria-expanded="true"
                 aria-controls="ShoppingCartDetails">
                購物車
              </button>
            </h2>
            <!-- ShoppingCartDetails -->
            <div id="ShoppingCartDetails" class="accordion-collapse collapse show"
              aria-labelledby="ShoppingCartSection">
              <div class="accordion-body">
                <div class="row mb-3" v-for="item in productData" :key="item.id">
                  <div class="col-3 d-flex align-items-center">
                    <img :src="item.product.imageUrl" :alt="item.product.title" class="img-fluid">
                  </div>
                  <div class="col-9">
                    <div class="d-flex">
                      <h6>{{item.product.title}}</h6>
                    </div>
                    <p>單價NT$ {{ parseInt(item.product.price) }}
                      / 小計NT$ {{ parseInt(item.total) }}
                      <span
                        v-if="item.final_total !== item.total">
                        / 優惠價NT$ {{ parseInt(item.final_total) }} </span></p>
                    <p>數量：{{ item.qty }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 訂單確認 -->
          <div class="accordion-item">
            <!-- OrderConfirmationSection -->
            <h2 class="accordion-header" id="OrderConfirmationSection">
              <button class="accordion-button fs-5 fw-semibold collapsed"
               type="button" data-bs-toggle="collapse"
                data-bs-target="#OrderConfirmationDetails" aria-expanded="false"
                aria-controls="OrderConfirmationDetails">
                訂單確認
              </button>
            </h2>
            <!-- OrderConfirmationDetails -->
            <div id="OrderConfirmationDetails" class="accordion-collapse collapse show"
              aria-labelledby="OrderConfirmationSection">
              <div class="accordion-body">
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
                  <p>已使用{{ couponData.title }}優惠券</p>
                </div>
                <hr>
                <!-- 總付款金額 -->
                <div class="d-flex justify-content-between mb-3">
                  <p>總付款金額</p>
                  <h4 class="text-end">NT$ {{ parseInt(showData.total) }}</h4>
                </div>
                <!-- 點我付款按鈕 -->
                <div v-if="!showData.is_paid" class="d-flex mb-3">
                  <button type="button" class="btn btn-solid-spec w-100 btn-lg"
                    @click="postPayOrder(showData.id)">點我付款</button>
                </div>
                <div v-else class="d-flex mb-3">
                  <button type="button" class="btn btn-solid-dpgray w-100 btn-lg"
                   disabled>
                   已完成付款
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 詳細內容右 -->
      <div class="col">
        <div class="accordion" id="accordionPanelsStayOpenExample">
          <!-- 收件資料 -->
          <div class="accordion-item">
            <!-- RecipientInformationSection -->
            <h2 class="accordion-header" id="RecipientInformationSection">
              <button class="accordion-button fs-5 fw-semibold" type="button"
               data-bs-toggle="collapse"
                data-bs-target="#RecipientInformationDetails" aria-expanded="true"
                aria-controls="RecipientInformationDetails">
                收件資料
              </button>
            </h2>
            <!-- RecipientInformationDetails -->
            <div id="RecipientInformationDetails" class="accordion-collapse collapse show"
              aria-labelledby="RecipientInformationSection">
              <div class="accordion-body">
                <!-- 收件人名稱 -->
                <div>
                  <p>收件人名稱</p>
                  <p>{{userData.name}}</p>
                </div>
                <hr>
                <!-- 電子信箱 -->
                <div>
                  <p>電子信箱</p>
                  <p>{{userData.email}}</p>
                </div>
                <hr>
                <!-- 行動電話號碼 -->
                <div>
                  <p>行動電話號碼</p>
                  <p>{{userData.tel}}</p>
                </div>
                <hr>
                <!-- 收件地址 -->
                <div>
                  <p>收件地址</p>
                  <p>{{userData.address}}</p>
                </div>
                <hr>
                <!-- 訂單備註 -->
                <div class="mb-3">
                  <p>訂單備註</p>
                  <p>
                    <span v-for="(item, index) in showData.message" :key="index">{{ item }}<br>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import ordersStore from '../../stores/ordersStore';

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
  methods: {
    async goToGetOrder() {
      try {
        const res = await this.getOrder(this.$route.params.id);
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
    ...mapActions(ordersStore, ['getOrder', 'postPayOrder']),
  },
  computed: {
    ...mapState(ordersStore, ['isLoading', 'showData', 'userData', 'productData', 'couponData']),
  },
  mounted() {
    this.goToGetOrder();
  },
};
</script>
