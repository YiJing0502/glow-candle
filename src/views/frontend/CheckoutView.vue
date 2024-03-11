<template>
  <div>
    <PageLoading v-if="isLoading"></PageLoading>
    <div
      v-else
      class="container bg-main-medium container-rounded my-5 py-7r px-lg-5 px-md-4 px-sm-3"
    >
      <!-- 大標題 -->
      <div class="d-flex align-items-center justify-content-center mb-3">
        <h2 class="text-center border-secondary pb-2 fw-bold">結帳</h2>
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
                <div class="" v-if="cartsData.length === 0">
                  <p>目前購物車內沒有產品 😄</p>
                  <RouterLink
                    :to="{ name: 'products', query: { category: '全部產品' } }"
                    class="btn btn-solid-spec w-100 btn-lg"
                  >
                    繼續購物
                  </RouterLink>
                </div>
                <div v-else class="">
                  <div class="row mb-3 position-relative" v-for="item in cartsData" :key="item.id">
                    <VueLoading
                      :active="item.product.id === isSmLoading || item.id === isSmLoading"
                      :is-full-page="false"
                      :color="'#52504B'"
                    >
                    </VueLoading>
                    <div
                      class="col col-sm-2 col-lg-3 d-flex align-items-center justify-content-center"
                    >
                      <img
                        role="button"
                        @click="changeToProductPage(item.product.id, item.product.category)"
                        :src="item.product.imageUrl"
                        :alt="item.product.title"
                        class="img-fluid"
                        width="150"
                      />
                    </div>
                    <div class="col col-sm-10 col-lg-9">
                      <div class="d-flex justify-content-between">
                        <h6
                          class="text-link-deep-gray"
                          role="button"
                          @click="changeToProductPage(item.product.id, item.product.category)"
                        >
                          {{ item.product.title }}
                        </h6>
                        <button
                          type="button"
                          class="btn-close"
                          aria-label="Close"
                          @click="goToDeleteCart(item.id)"
                        ></button>
                      </div>
                      <p>
                        單價NT$ {{ parseInt(item.product.price) }} / 小計NT$
                        {{ parseInt(item.total) }}
                        <span v-if="item.final_total !== item.total">
                          /優惠價NT$ {{ parseInt(item.final_total) }}
                        </span>
                      </p>

                      <QuantityControlButtons
                        :inventory="item.product.inventory"
                        :id="item.product_id"
                        :qty="item.qty"
                        :product-cart-id="item.id"
                        @put-num="goToPutCart"
                      >
                      </QuantityControlButtons>
                    </div>
                  </div>
                  <!-- 清空購物車按鈕 -->
                  <div class="d-flex mb-3" v-if="cartsData.length > 1">
                    <button
                      type="button"
                      class="btn btn-outline-mdgray w-100"
                      @click="goToDeleteCarts"
                    >
                      清空購物車
                    </button>
                  </div>
                </div>
              </template>
            </BasicCollapse>
            <!-- 訂單確認 -->
            <BasicCollapse
              v-if="cartsData.length !== 0"
              :uniqueId="'OrderConfirmationSection'"
              :open="true"
            >
              <template v-slot:header> 訂單確認 </template>
              <template v-slot:body>
                <!-- 產品總金額 -->
                <div class="d-flex justify-content-between">
                  <p>產品總金額</p>
                  <p>NT$ {{ parseInt(allCartsData.total) }}</p>
                </div>
                <!-- 運費 -->
                <div class="d-flex justify-content-between">
                  <p>運費</p>
                  <p>免運費</p>
                </div>
                <div v-if="!allCartsData.useCoupon">
                  <!-- 使用優惠代碼1 -->
                  <div class="d-flex justify-content-between" v-if="!useCoupon">
                    <p>優惠代碼</p>
                    <button type="button" class="btn btn-outline-dpgray" @click="useCoupon = true">
                      使用優惠代碼
                    </button>
                  </div>
                  <!-- 使用優惠代碼2 -->
                  <div class="mb-3" v-else-if="useCoupon">
                    <p class="w-25">優惠代碼</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <input
                        type="text"
                        class="form-control"
                        id="category"
                        placeholder="請填入優惠代碼"
                        v-model="couponCode"
                      />
                      <button
                        type="button"
                        class="w-25 btn btn-outline-dpgray ms-3"
                        @click="goToPostCoupon"
                      >
                        使用
                      </button>
                      <button
                        type="button"
                        class="w-25 btn btn-outline-dpgray ms-3"
                        @click="useCoupon = false"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                </div>
                <!-- 使用優惠代碼3 -->
                <div class="d-flex justify-content-between" v-if="allCartsData.useCoupon">
                  <p>使用優惠券</p>
                  <p>
                    優惠 NT$
                    {{ parseInt(allCartsData.total, 10) - parseInt(allCartsData.final_total, 10) }}
                  </p>
                </div>
                <hr />
                <!-- 總付款金額 -->
                <div class="d-flex justify-content-between" v-if="!allCartsData.useCoupon">
                  <p>總付款金額</p>
                  <h4 class="text-end text-main-spec">
                    NT$
                    <strong class="fs-3">{{ parseInt(allCartsData.total) }}</strong>
                  </h4>
                </div>
                <!-- 總付款金額2 -->
                <div class="" v-else-if="allCartsData.useCoupon">
                  <div class="d-flex justify-content-between">
                    <p>總付款金額</p>
                    <h5 class="text-decoration-line-through">
                      NT$ {{ parseInt(allCartsData.total) }}
                    </h5>
                  </div>
                  <h4 class="text-end text-main-spec">
                    NT$
                    <strong class="fs-3">{{ parseInt(allCartsData.final_total) }}</strong>
                  </h4>
                </div>
              </template>
            </BasicCollapse>
          </div>
        </div>
        <!-- 詳細內容右 -->
        <div class="col">
          <div class="accordion">
            <!-- 聯絡我們 -->
            <ContactUsDetails v-if="cartsData.length === 0"></ContactUsDetails>
            <!-- 收件資料 -->
            <BasicCollapse
              v-if="cartsData.length !== 0"
              :uniqueId="'RecipientInformationSection'"
              :open="true"
            >
              <template v-slot:header> 收件資料 </template>
              <template v-slot:body>
                <vee-form ref="form" @submit="goToPostOrder" v-slot="{ errors }">
                  <!-- 收件人名稱 -->
                  <div class="mb-3">
                    <label for="user" class="form-label"
                      >收件人名稱
                      <span class="text-main-spec fw-bold">*</span>
                    </label>
                    <vee-field
                      type="text"
                      name="收件人"
                      class="form-control"
                      :class="{ 'is-invalid': errors['收件人'] }"
                      rules="required|max:15"
                      id="user"
                      placeholder="請填入收件人真實姓名，以確保順利收件"
                      v-model="orderData.data.user.name"
                    ></vee-field>
                    <vee-error-message class="invalid-feedback" name="收件人"></vee-error-message>
                  </div>
                  <!-- 電子信箱 -->
                  <div class="mb-3">
                    <label for="email" class="form-label"
                      >電子信箱
                      <span class="text-main-spec fw-bold">*</span>
                    </label>
                    <vee-field
                      type="email"
                      class="form-control"
                      :class="{ 'is-invalid': errors['電子信箱'] }"
                      id="email"
                      rules="email|required"
                      name="電子信箱"
                      placeholder="請填入訂單通知Email (訂單資訊將以此E-mail通知您)"
                      v-model="orderData.data.user.email"
                    ></vee-field>
                    <vee-error-message class="invalid-feedback" name="電子信箱"></vee-error-message>
                  </div>
                  <!-- 行動電話號碼 -->
                  <div class="mb-3">
                    <label for="phone" class="form-label"
                      >行動電話號碼
                      <span class="text-main-spec fw-bold">*</span>
                    </label>
                    <vee-field
                      type="tel"
                      name="行動電話"
                      :rules="isPhone"
                      class="form-control"
                      :class="{ 'is-invalid': errors['行動電話'] }"
                      id="phone"
                      placeholder="請填入收件人行動電話號碼 (供配送人員聯絡)"
                      v-model="orderData.data.user.tel"
                    ></vee-field>
                    <vee-error-message class="invalid-feedback" name="行動電話"></vee-error-message>
                  </div>
                  <!-- 收件地址 -->
                  <div class="mb-3">
                    <label for="address" class="form-label"
                      >收件地址
                      <span class="text-main-spec fw-bold">*</span>
                    </label>
                    <vee-field
                      type="text"
                      name="收件地址"
                      class="form-control"
                      :class="{ 'is-invalid': errors['收件地址'] }"
                      id="address"
                      rules="required|max:100"
                      placeholder="送貨地點目前僅提供：台灣、台灣外島宅配"
                      v-model="orderData.data.user.address"
                    ></vee-field>
                    <vee-error-message class="invalid-feedback" name="收件地址"></vee-error-message>
                  </div>
                  <!-- 訂單備註 -->
                  <div class="mb-3">
                    <label for="orderMessage" class="form-label">訂單備註</label>
                    <vee-field
                      as="textarea"
                      name="訂單備註"
                      class="w-100 form-control"
                      :class="{ 'is-invalid': errors['訂單備註'] }"
                      id="orderMessage"
                      rows="5"
                      placeholder="管理室代收/電話聯絡時間..."
                      rules="max:800"
                      v-model="orderData.data.message"
                    ></vee-field>
                    <vee-error-message class="invalid-feedback" name="訂單備註"></vee-error-message>
                  </div>
                  <!-- 注意事項 -->
                  <div class="form-check mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="is_enabled"
                      v-model="checkOrderInfo"
                    />
                    <label for="is_enabled" class="form-check-label">
                      <span class="text-main-spec fw-bold">我已確認以下內容：</span>
                      <span
                        ><br />提醒您，送出訂單後，將無法修改訂單內容，並前往付款流程，請您確定無誤後再送出😄</span
                      >
                    </label>
                  </div>
                  <!-- 小提醒 -->
                  <div class="bg-light-gray text-deep-gray px-3 py-2 mb-3">
                    <h6>免運服務</h6>
                    <span
                      >我們的產品付款採用「線上信用卡」付款後出貨，運送採用「宅配到府」免運服務，讓您輕鬆購買、安心收貨。</span
                    >
                  </div>
                  <!-- 結帳按鈕 -->
                  <div class="d-flex mb-3">
                    <button
                      type="submit"
                      class="border btn btn-solid-spec w-100 btn-lg"
                      :disabled="!checkOrderInfo"
                    >
                      結帳
                    </button>
                  </div>
                </vee-form>
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
import cartsStore from '../../stores/cartsStore';
import toastsStore from '../../stores/toastsStore';
import pageStore from '../../stores/pageStore';
import alertStore from '../../stores/alertStore';
// component
import QuantityControlButtons from '../../components/QuantityControlButtons.vue';
import ContactUsDetails from '../../components/frontend/ContactUsDetails.vue';
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
      // 是否送出訂單 用來控制 sessionStorage
      doesPostCart: false,
    };
  },
  components: {
    QuantityControlButtons,
    ContactUsDetails,
    BasicCollapse,
  },
  methods: {
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '請輸入正確的行動電話號碼';
    },
    // 跳轉至產品詳細頁面
    changeToProductPage(id, category) {
      this.changeNowPage(category);
      this.$router.push({
        name: 'product',
        params: { id },
      });
    },
    async goToGetCart(boolean = true) {
      try {
        await this.getCart(boolean);
      } catch (err) {
        this.showAlertMessage(false, err.response.data.message);
      }
    },
    async goToPutCart(productCartId, productId, qty) {
      try {
        const res = await this.putCart(productCartId, productId, qty);
        await this.goToGetCart(false);
        this.pushToast({
          title: res.data.message,
          style: 'bg-deep-gray',
        });
      } catch (err) {
        this.showAlertMessage(false, err.response.data.message);
      }
    },
    async goToDeleteCart(productCartId) {
      try {
        const res = await this.deleteCart(productCartId);
        await this.goToGetCart(false);
        this.pushToast({
          title: res.data.message,
          style: 'bg-deep-gray',
        });
      } catch (err) {
        this.showAlertMessage(false, err.response.data.message);
      }
    },
    async goToDeleteCarts() {
      try {
        const res = await this.deleteCarts();
        await this.goToGetCart();
        this.pushToast({
          title: res.data.message,
          style: 'bg-deep-gray',
        });
      } catch (err) {
        this.showAlertMessage(false, err.response.data.message);
      }
    },
    async goToPostCoupon() {
      if (this.couponCode === '') {
        this.showAlertMessage(false, '請填寫優惠券代碼');
        return;
      }
      try {
        const res = await this.postCoupon(this.couponCode);
        await this.goToGetCart(false);
        this.pushToast({
          title: res.data.message,
          style: 'bg-deep-gray',
        });
      } catch (err) {
        this.showAlertMessage(false, err.response.data.message);
      }
    },
    async goToPostOrder() {
      // 用來控制 sessionStorage
      this.doesPostCart = true;
      try {
        const res = await this.postOrder(this.orderData);
        this.$router.push({
          name: 'payment',
          params: { id: res.data.orderId },
        });
        // 確保你的邏輯在下一次 DOM 更新之後執行，避免潛在的並發問題
        // 我的這些邏輯有關於 dom的更新 所以需要確保 我的操作要在DOM更新之後執行
        this.$nextTick(() => {
          // 送出訂單時重新取得最新購物車狀態
          this.goToGetCart(false);
          // 重置表單
          this.$refs.form.resetForm();
        });
      } catch (err) {
        this.showAlertMessage(false, err.response.data.message);
      }
    },
    ...mapActions(cartsStore, ['getCart', 'putCart', 'deleteCart', 'deleteCarts', 'postCoupon']),
    ...mapActions(ordersStore, ['postOrder']),
    ...mapActions(toastsStore, ['pushToast']),
    ...mapActions(pageStore, ['changeNowPage']),
    ...mapActions(alertStore, ['showAlertMessage']),
  },
  computed: {
    ...mapState(cartsStore, ['isLoading', 'isSmLoading', 'cartsData', 'allCartsData']),
  },
  mounted() {
    this.goToGetCart();
    if (window.sessionStorage.getItem('orderData')) {
      const orderData = window.sessionStorage.getItem('orderData');
      this.orderData = JSON.parse(orderData);
    }
  },
  beforeUnmount() {
    if (this.doesPostCart) {
      window.sessionStorage.removeItem('orderData');
    } else {
      const orderData = JSON.stringify(this.orderData);
      window.sessionStorage.setItem('orderData', orderData);
    }
  },
};
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
