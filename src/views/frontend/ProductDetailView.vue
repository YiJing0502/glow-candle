<template>
  <VueLoading
    v-if="isLoading"
    :active="isLoading"
    :background-color="'#EBEAE4'"
    :is-full-page="true"
    :color="'#52504B'"
  />
  <div v-else class="container bg-main-medium container-rounded my-5 py-7r px-lg-5 px-md-4 px-sm-3">
    <div class="row row-cols-1 row-cols-lg-2">
      <div class="col">
        <swiper
          v-if="!isBootstrapLarge"
          :navigation="true"
          :pagination="true"
          :modules="modules"
          class="mySwiper d-lg-none mb-3"
        >
          <swiper-slide>
            <img :src="showData.imageUrl" alt="" class="img-fluid" />
          </swiper-slide>
          <swiper-slide v-for="(item, index) in showData.imagesUrl" :key="index">
            <img :src="item" alt="" class="img-fluid" />
          </swiper-slide>
        </swiper>
        <div v-if="isBootstrapLarge" class="d-none d-lg-block">
          <img :src="showData.imageUrl" alt="" class="img-fluid" />
          <img
            v-for="(item, index) in showData.imagesUrl"
            :key="index"
            :src="item"
            alt=""
            class="img-fluid"
          />
        </div>
      </div>
      <div class="col">
        <!-- 產品分類與單位 -->
        <div class="d-flex justify-content-between">
          <p>{{ showData.category }}</p>
          <p>{{ showData.unit }}</p>
        </div>
        <!-- 產品標題 -->
        <h4>{{ showData.title }}</h4>
        <hr />
        <!-- 產品描述 -->
        <p>{{ showData.description }}</p>
        <!-- 產品價格 -->
        <h4 v-if="showData.price === showData.origin_price" class="mt-3 mb-3">
          NT$ {{ showData.price }}
        </h4>
        <div v-else class="d-flex align-items-end">
          <h4 class="me-3 text-decoration-line-through text-deep-gray">
            NT${{ showData.origin_price }}
          </h4>
          <h2 class="text-main-spec fw-bolder">NT${{ showData.price }}</h2>
        </div>
        <!-- 購物車增減按鈕與庫存 -->
        <div class="d-flex">
          <div class="bg-white d-flex w-50 mb-3 border">
            <button :disabled="currentNum === 1" type="button" class="btn btn-lg" @click="minusNum">
              -
            </button>
            <input
              type="number"
              class="form-control border-white shadow-none text-center fw-bold"
              v-model.number="currentNum"
              @blur="blurNum"
            />
            <button
              :disabled="currentNum === showData.inventory"
              type="button"
              class="btn btn-lg"
              @click="plusNum"
            >
              +
            </button>
          </div>
          <p class="d-flex align-items-end ms-3">目前庫存：{{ showData.inventory }}</p>
        </div>
        <!-- 加入購物車 -->
        <div v-if="isSmLoading === showData.id" class="d-flex mb-3 position-relative">
          <VueLoading
            :active="isSmLoading === showData.id"
            :is-full-page="false"
            :color="'#52504B'"
            :width="30"
            :height="30"
          >
          </VueLoading>
          <button type="button" class="btn btn-solid-spec w-100 btn-lg">正在加入購物車</button>
        </div>
        <div v-else class="d-flex mb-3">
          <button
            type="button"
            class="btn btn-solid-spec w-100 btn-lg"
            @click="goToPostCart(showData.id, currentNum, showData.inventory)"
          >
            加入購物車
          </button>
        </div>
        <hr />
        <!-- 手風琴組 -->
        <div class="accordion">
          <!-- 產品內容 -->
          <div class="accordion-item">
            <!-- ProductContentSection -->
            <h2 class="accordion-header" id="ProductContentSection">
              <button
                class="accordion-button collapsed fs-5 fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#ProductContentDetails"
                aria-expanded="false"
                aria-controls="ProductContentDetails"
              >
                內容
              </button>
            </h2>
            <!-- ProductContentDetails -->
            <div
              id="ProductContentDetails"
              class="accordion-collapse collapse show"
              aria-labelledby="ProductContentSection"
            >
              <div class="accordion-body">
                <p>
                  <span v-for="(item, index) in showData.content" :key="index"
                    >{{ item }}<br
                  /></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <h4>或許你會喜歡</h4>
    <div class="row row-cols-lg-4 row-cols-2" role="button">
      <div class="col" v-for="item in recommendationsData" :key="item.id">
        <ProductCard :product="item"></ProductCard>
      </div>
    </div>
  </div>
  <ResultModal ref="resultModal" :server-message="serverMessage"></ResultModal>
</template>
<script>
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/vue';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { mapActions, mapState } from 'pinia';
import cartsStore from '../../stores/cartsStore';
import stringStore from '../../stores/stringStore';
import toastsStore from '../../stores/toastsStore';
import productsStore from '../../stores/productsStore';

import ProductCard from '../../components/frontend/ProductCard.vue';

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
export default {
  data() {
    return {
      currentNum: 1,
      isLoading: false,
      // 單筆產品詳細資料
      showData: {},
      // result model
      serverMessage: {
        message: '',
        success: true,
      },
      modules: [Pagination, Navigation],
      viewportWidth: window.innerWidth,
      isBootstrapLarge: false,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    ProductCard,
  },
  computed: {
    ...mapState(cartsStore, ['cartsData', 'isSmLoading', 'storeMessage']),
    ...mapState(productsStore, ['recommendationsData']),
  },
  methods: {
    // 增加數量
    plusNum() {
      this.currentNum = parseInt(this.currentNum, 10);
      if (this.currentNum >= 1 && this.currentNum < this.showData.inventory) {
        this.currentNum += 1;
        return;
      }
      if (this.currentNum >= this.showData.inventory) {
        this.handleServerResponse(false, '很抱歉，不能超出此庫存量');
      }
    },
    // 減少數量
    minusNum() {
      this.currentNum = parseInt(this.currentNum, 10);
      if (this.currentNum > 1) {
        this.currentNum -= 1;
        return;
      }
      if (this.currentNum <= 1) {
        this.handleServerResponse(false, '很抱歉，最低數量為1');
      }
    },
    // 輸入, 自訂數量
    blurNum(e) {
      this.currentNum = parseInt(e.target.value, 10);
      if (this.currentNum > this.showData.inventory) {
        this.currentNum = this.showData.inventory;
        this.handleServerResponse(false, '很抱歉，不能超出此庫存量');
      } else if (this.currentNum <= 0) {
        this.currentNum = 1;
        this.handleServerResponse(false, '很抱歉，最低數量為1');
      } else if (Number.isNaN(this.currentNum)) {
        this.currentNum = 1;
        this.handleServerResponse(false, '請輸入有效的數字');
      }
    },
    validateQuantity(currentNum, inventory) {
      const parsedNum = parseInt(currentNum, 10);
      if (parsedNum > inventory) {
        this.handleServerResponse(
          false,
          `無法將所選的數量加入到購物車，因為已經超過庫存的${inventory}件產品`,
        );
        return false;
      }
      if (parsedNum < 0) {
        this.handleServerResponse(false, '無法將所選的數量加入到購物車，因為產品數量不得低於1');
        return false;
      }
      return true;
    },
    validateCartQuantity(productId, currentNum, inventory) {
      for (let index = 0; index < this.cartsData.length; index += 1) {
        const element = this.cartsData[index];
        if (element.product.id === productId) {
          if (element.qty >= inventory) {
            this.handleServerResponse(
              false,
              `無法將所選的數量加入到購物車，因為購物車已經有${element.qty}件產品，請至購物車頁面查看`,
            );
            return false;
          }
          if (element.qty + parseInt(currentNum, 10) >= inventory + 1) {
            this.handleServerResponse(
              false,
              `無法將所選的數量加入到購物車，因為購物車已經有${element.qty}件產品，加入所選的數量會超過庫存，請重新選擇後再送出`,
            );
            return false;
          }
        }
      }
      return true;
    },
    async goToPostCart(productId, currentNum, inventory) {
      try {
        // 取得最新購物車結果，最新數量
        await this.goToGetCart(false);
        if (
          this.validateQuantity(currentNum, inventory)
          && this.validateCartQuantity(productId, currentNum, inventory)
        ) {
          const res = await this.postCart(productId, parseInt(currentNum, 10));
          // 顯示成功的加入結果
          this.pushToast({
            title: res.data.message,
            style: 'bg-deep-gray',
          });
          // 更新畫面顯示目前購物車狀態
          await this.goToGetCart(false);
        }
      } catch (err) {
        this.handleServerResponse(false, err.response.data.message);
      }
    },
    // 取得特定產品
    getProduct() {
      const { id } = this.$route.params;
      this.isLoading = true;
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.showData = { ...res.data.product };
          const { splitStringByNewline } = stringStore();
          this.showData.content = splitStringByNewline(this.showData.content);
          this.isLoading = false;
        })
        .catch((err) => {
          this.$router.push({
            name: 'front404',
            params: { pathMatch: this.$route.path.split('/').slice(1) },
            query: this.$route.query,
            hash: this.$route.hash,
          });
          this.handleServerResponse(false, err.response.data.message);
        });
    },
    async goToGetCart(boolean = true) {
      try {
        await this.getCart(boolean);
      } catch (err) {
        this.handleServerResponse(false, err.response.data.message);
      }
    },
    // 處理 伺服器 訊息
    handleServerResponse(success, message) {
      this.serverMessage.success = success;
      this.serverMessage.message = message;
      this.$refs.resultModal.openModal();
    },
    handleResize() {
      this.viewportWidth = window.innerWidth;
      this.isBootstrapLarge = this.viewportWidth > 992;
    },
    ...mapActions(cartsStore, ['getCart', 'postCart']),
    ...mapActions(toastsStore, ['pushToast']),
    ...mapActions(productsStore, ['recommendations']),
  },
  watch: {
    $route(to) {
      this.$router.push(to.path);
    },
  },
  mounted() {
    this.getProduct();
    this.getCart(false);
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.recommendations(this.$route.params.id);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
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
