<template>
  <VueLoading v-if="isLoading"
              :active="isLoading"
              :background-color="'#EBEAE4'"
              :is-full-page="true"
              :color="'#52504B'" />
  <div v-else class="container bg-main-medium rounded-10em mt-5 mb-5 px-5r py-7r">
    <!-- 大標題 -->
    <div class="d-flex align-items-center justify-content-center mb-3">
      <h2 class="text-center border-bottom border-secondary pb-2 w-25">結帳</h2>
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
              <button class="accordion-button fs-5 fw-semibold text-deep-gray" type="button"
              data-bs-toggle="collapse"
              data-bs-target="#ShoppingCartDetails"
              aria-expanded="true" aria-controls="ShoppingCartDetails">
                購物車
              </button>
            </h2>
            <!-- ShoppingCartDetails -->
            <div id="ShoppingCartDetails" class="accordion-collapse collapse show"
              aria-labelledby="ShoppingCartSection">
              <div class="accordion-body">
                <div class="" v-if="cartsData.length === 0">
                  <p>目前購物車內沒有商品 😄</p>
                  <router-link :to="{name: 'products'}" class="btn btn-solid-spec w-100 btn-lg">
                    繼續購物
                  </router-link>
                </div>
                <div v-else class="">
                  <div class="row mb-3 position-relative" v-for="item in cartsData" :key="item.id">
                    <VueLoading :active="item.product.id === isSmLoading || item.id === isSmLoading"
                    :is-full-page="false" :color="'#52504B'">
                    </VueLoading>
                    <div class="col-3 d-flex align-items-center">
                      <img :src="item.product.imageUrl" :alt="item.product.title" class="img-fluid">
                    </div>
                    <div class="col-9">
                      <div class="d-flex">
                        <h6>{{item.product.title}}</h6>
                        <button type="button" class="btn-close" aria-label="Close"
                          @click="goToDeleteCart(item.id)"></button>
                      </div>
                      <p>
                        單價NT$ {{ parseInt(item.product.price) }}
                        / 小計NT$ {{ parseInt(item.total) }}
                        <span
                          v-if="item.final_total !== item.total">
                          /優惠價NT$ {{ parseInt(item.final_total) }}
                        </span>
                      </p>

                      <QuantityControlButtons
                      :inventory="item.product.inventory"
                      :id="item.product_id"
                      :qty="item.qty"
                      :product-cart-id="item.id"
                      @put-num="goToPutCart">
                      </QuantityControlButtons>
                    </div>
                  </div>
                  <!-- 清空購物車按鈕 -->
                  <div class="d-flex mb-3" v-if="cartsData.length > 1">
                    <button type="button"
                    class="btn btn-outline-mdgray w-100" @click="goToDeleteCarts">清空購物車</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 訂單確認 -->
          <div class="accordion-item" v-if="cartsData.length !== 0">
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
                <!-- 商品總金額 -->
                <div class="d-flex justify-content-between">
                  <p>商品總金額</p>
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
                    <button type="button" class="btn btn-outline-dpgray"
                    @click="useCoupon = true">使用優惠代碼</button>
                  </div>
                  <!-- 使用優惠代碼2 -->
                  <div class="mb-3" v-else-if="useCoupon">
                    <p class="w-25">優惠代碼</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <input type="text" class="form-control" id="category" placeholder="請填入優惠代碼"
                        v-model="couponCode">
                      <button type="button" class="w-25 btn btn-outline-dpgray ms-3"
                        @click="goToPostCoupon">使用</button>
                      <button type="button" class="w-25 btn btn-outline-dpgray ms-3"
                        @click="useCoupon = false">取消</button>
                    </div>
                  </div>
                </div>
                <!-- 使用優惠代碼3 -->
                <div class="d-flex justify-content-between" v-if="allCartsData.useCoupon">
                  <p>使用優惠券</p>
                  <p>優惠 NT$
                    {{ parseInt(allCartsData.total, 10) - parseInt(allCartsData.final_total, 10) }}
                  </p>
                </div>
                <hr>
                <!-- 總付款金額 -->
                <div class="d-flex justify-content-between" v-if="!allCartsData.useCoupon">
                  <p>總付款金額</p>
                  <h4 class="text-end">NT$ {{ parseInt(allCartsData.total) }}</h4>
                </div>
                <!-- 總付款金額2 -->
                <div class="" v-else-if="allCartsData.useCoupon">
                  <div class="d-flex justify-content-between">
                    <p>總付款金額</p>
                    <h5 class="text-decoration-line-through">
                      NT$ {{ parseInt(allCartsData.total) }}
                    </h5>
                  </div>
                  <h4 class="text-end">NT$ {{ parseInt(allCartsData.final_total) }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 詳細內容右 -->
      <div class="col">
        <div class="accordion" id="accordionPanelsStayOpenExample">
          <!-- 聯絡我們 -->
          <div class="accordion-item" v-if="cartsData.length === 0">
            <!-- ContactUsSection -->
            <h2 class="accordion-header" id="ContactUsSection">
              <button class="accordion-button collapsed fs-5 fw-semibold"
              type="button" data-bs-toggle="collapse"
              data-bs-target="#ContactUsDetails" aria-expanded="false"
              aria-controls="ContactUsDetails">
                聯絡我們
              </button>
            </h2>
            <!-- ContactUsDetails -->
            <div id="ContactUsDetails" class="accordion-collapse collapse show"
            aria-labelledby="ContactUsSection">
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
                    <span class="material-icons-outlined fs-1 mb-3">
                      local_shipping
                    </span>
                    <span>免費標準配送</span>
                  </div>
                  <div class="col d-flex flex-column align-items-center">
                    <span class="material-icons-outlined fs-1 mb-3">
                      redeem
                    </span>
                    <span>七日內免費退貨</span>
                  </div>
                  <div class="col d-flex flex-column align-items-center">
                    <span class="material-icons-outlined fs-1 mb-3">
                      enhanced_encryption
                    </span>
                    <span>安全購物</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 收件資料 -->
          <div class="accordion-item" v-if="cartsData.length !== 0">
            <!-- RecipientInformationSection -->
            <h2 class="accordion-header" id="RecipientInformationSection">
              <button class="accordion-button fs-5 fw-semibold"
              type="button" data-bs-toggle="collapse"
                data-bs-target="#RecipientInformationDetails" aria-expanded="true"
                aria-controls="RecipientInformationDetails">
                收件資料
              </button>
            </h2>
            <!-- RecipientInformationDetails -->
            <div id="RecipientInformationDetails" class="accordion-collapse collapse show"
              aria-labelledby="RecipientInformationSection">
              <div class="accordion-body">
                <vee-form @submit="goToPostOrder" v-slot="{ errors }">
                  <!-- 收件人名稱 -->
                  <div class="mb-3">
                    <label for="category" class="form-label">收件人名稱</label>
                    <vee-field type="text" name="收件人" class="form-control"
                    :class="{ 'is-invalid': errors['收件人'] }"
                      rules="required|max:15" id="category" placeholder="請填入收件人真實姓名，以確保順利收件"
                      v-model="orderData.data.user.name"></vee-field>
                    <vee-error-message class="invalid-feedback" name="收件人"></vee-error-message>
                  </div>
                  <!-- 電子信箱 -->
                  <div class="mb-3">
                    <label for="email" class="form-label">電子信箱</label>
                    <vee-field type="email" class="form-control"
                    :class="{ 'is-invalid': errors['電子信箱'] }" id="email"
                      rules="email|required" name="電子信箱"
                      placeholder="請填入訂單通知Email (訂單資訊將以此E-mail通知您)"
                      v-model="orderData.data.user.email"></vee-field>
                    <vee-error-message class="invalid-feedback" name="電子信箱"></vee-error-message>
                  </div>
                  <!-- 行動電話號碼 -->
                  <div class="mb-3">
                    <label for="phone" class="form-label">行動電話號碼</label>
                    <vee-field type="text" name="行動電話" :rules="isPhone" class="form-control"
                      :class="{ 'is-invalid': errors['行動電話'] }"
                      id="phone" placeholder="請填入收件人行動電話號碼 (供配送人員聯絡)"
                      v-model="orderData.data.user.tel"></vee-field>
                    <vee-error-message class="invalid-feedback" name="行動電話"></vee-error-message>
                  </div>
                  <!-- 收件地址 -->
                  <div class="mb-3">
                    <label for="address" class="form-label">收件地址</label>
                    <vee-field type="text" name="收件地址"
                     class="form-control" :class="{ 'is-invalid': errors['收件地址'] }"
                      id="address" rules="required|max:50" placeholder="送貨地點目前僅提供：台灣、台灣外島宅配"
                      v-model="orderData.data.user.address"></vee-field>
                    <vee-error-message class="invalid-feedback" name="收件地址"></vee-error-message>
                  </div>
                  <!-- 訂單備註 -->
                  <div class="mb-3">
                    <p>訂單備註</p>
                    <vee-field as="textarea" name="訂單備註" class="w-100 form-control"
                      :class="{ 'is-invalid': errors['訂單備註'] }" id="orderMessage" rows="5"
                      placeholder="管理室代收/電話聯絡時間..."
                      rules="max:800" v-model="orderData.data.message"></vee-field>
                    <vee-error-message class="invalid-feedback" name="訂單備註"></vee-error-message>
                  </div>
                  <!-- 注意事項 -->
                  <div class="form-check mb-3">
                    <input type="checkbox" class="form-check-input"
                    id="is_enabled" v-model="checkOrderInfo">
                    <label for="is_enabled" class="form-check-label">
                      <span class="text-main-spec fw-bold">我已確認以下內容：</span>
                      <span><br>提醒您，送出訂單後，將無法修改訂單內容，並前往付款流程，請您確定無誤後再送出😄</span>
                    </label>
                  </div>
                  <!-- 小提醒 -->
                  <div class="bg-medium-gray text-deep-gray px-3 py-2 mb-3">
                    <h6>免運服務</h6>
                    <span>我們的商品付款採用「線上信用卡」付款後出貨，運送採用「宅配到府」免運服務，讓您輕鬆購買、安心收貨。</span>
                  </div>
                  <!-- 結帳按鈕 -->
                  <div class="d-flex mb-3">
                    <button type="submit" class="btn btn-solid-spec w-100 btn-lg"
                      :disabled="!checkOrderInfo">結帳</button>
                  </div>
                </vee-form>
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
import cartsStore from '../../stores/cartsStore';
// component
import QuantityControlButtons from '../../components/QuantityControlButtons.vue';

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
      // result model
      serverMessage: {
        message: '',
        success: true,
      },
    };
  },
  components: {
    QuantityControlButtons,
  },
  methods: {
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '請輸入正確的行動電話號碼';
    },
    async goToPutCart(productCartId, productId, qty) {
      try {
        await this.putCart(productCartId, productId, qty);
        await this.goToGetCart(false);
        this.showStoreMessage();
      } catch {
        this.showStoreMessage();
      }
    },
    async goToGetCart(boolean = true) {
      try {
        await this.getCart(boolean);
      } catch {
        this.showStoreMessage();
      }
    },
    async goToDeleteCart(productCartId) {
      try {
        await this.deleteCart(productCartId);
        await this.goToGetCart(false);
        this.showStoreMessage();
      } catch {
        this.showStoreMessage();
      }
    },
    async goToDeleteCarts() {
      try {
        await this.deleteCarts();
        await this.goToGetCart();
        this.showStoreMessage();
      } catch {
        this.showStoreMessage();
      }
    },
    async goToPostCoupon() {
      try {
        await this.postCoupon(this.couponCode);
        await this.goToGetCart(false);
        this.showStoreMessage();
      } catch {
        this.showStoreMessage();
      }
    },
    async goToPostOrder() {
      try {
        const res = await this.postOrder(this.orderData);
        // 送出訂單時重新取得最新購物車狀態
        await this.goToGetCart(false);
        this.$router.push({
          name: 'payment',
          params: { id: res.data.orderId },
        });
      } catch (err) {
        this.serverMessage.message = err.response.data.message;
        this.serverMessage.success = err.response.data.success;
        this.$refs.resultModal.openModal();
      }
    },
    showStoreMessage() {
      this.serverMessage = this.storeMessage;
      this.$refs.resultModal.openModal();
    },
    ...mapActions(cartsStore, ['getCart', 'putCart', 'deleteCart', 'deleteCarts', 'postCoupon']),
    ...mapActions(ordersStore, ['postOrder']),
  },
  computed: {
    ...mapState(cartsStore, ['isLoading', 'isSmLoading', 'cartsData', 'allCartsData', 'storeMessage']),
  },
  mounted() {
    this.goToGetCart();
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
  input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
</style>
