<template>
  <VueLoading v-if="isLoading" 
              :active="isLoading" 
              :background-color="'#EBEAE4'" 
              :is-full-page="true" 
              :color="'#52504B'" />
  <div v-else class="container bg-main-medium rounded-10em mt-5 mb-5 px-5r py-7r">
    <div class="row position-relative">
      <div class="col me-5">
        <img :src="showData.imageUrl" alt="" class="img-fluid">
        <img v-for="(item, index) in showData.imagesUrl" :key="index" :src="item" alt="" class="img-fluid">
      </div>
      <div class="col">
        <!-- 商品分類與單位 -->
        <div class="d-flex justify-content-between">
          <p>{{ showData.category}}</p>
          <p>{{ showData.unit}}</p>
        </div>
        <!-- 商品標題 -->
        <h4>{{ showData.title }}</h4>
        <hr>
        <!-- 商品描述 -->
        <p>{{ showData.description}}</p>
        <!-- 商品價格 -->
        <h4 class="mt-3 mb-3">NT$ {{ showData.price}}</h4>
        <!-- 購物車增減按鈕與庫存 -->
        <div class="d-flex">
          <div class="bg-white d-flex w-50 mb-3 gap-3 border">
            <button :disabled="currentNum===1" type="button" class="btn btn-lg" @click="minusNum">-</button>
            <input type="number" class="form-control border-white shadow-none text-center" v-model.number="currentNum"
              @blur="blurNum">
            <button :disabled="currentNum===showData.inventory" type="button" class="btn btn-lg"
              @click="plusNum">+</button>
          </div>
          <p class="d-flex align-items-end ms-3">目前庫存：{{ showData.inventory }}</p>
        </div>
        <!-- 加入購物車 -->
        <div v-if="isSmLoading" class="d-flex mb-3 position-relative">
          <VueLoading :active="isSmLoading" :is-full-page="false" :color="'#52504B'" :width="30" :height="30">
          </VueLoading>
          <button type="button" class="btn btn-solid-spec w-100 btn-lg">正在加入購物車</button>
        </div>
        <div v-else class="d-flex mb-3">
          <button type="button" class="btn btn-solid-spec w-100 btn-lg"
            @click="goToPostCart(showData.id, currentNum, showData.inventory)">加入購物車</button>
        </div>
        <hr>
        <!-- 手風琴組 -->
        <div class="accordion">
          <!-- 商品內容 -->
          <div class="accordion-item">
            <!-- ProductContentSection -->
            <h2 class="accordion-header" id="ProductContentSection">
              <button class="accordion-button collapsed fs-5 fw-semibold" type="button" data-bs-toggle="collapse"
                data-bs-target="#ProductContentDetails" aria-expanded="false" aria-controls="ProductContentDetails">
                內容
              </button>
            </h2>
            <!-- ProductContentDetails -->
            <div id="ProductContentDetails" class="accordion-collapse collapse show"
              aria-labelledby="ProductContentSection">
              <div class="accordion-body">
                <p>
                  <span v-for="(item, index) in showData.content" :key="index">{{item}}<br></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
  import { mapActions, mapState } from 'pinia';
  import cartsStore from '@/stores/cartsStore';
  import stringStore from '@/stores/stringStore';
  export default {
    data() {
      return {
        currentNum: 1,
        isLoading: false,
        // 單筆產品詳細資料
        showData: {},
      }
    },
    computed: {
      ...mapState(cartsStore, ['cartsData','isSmLoading']),
    },
    methods: {
      // 增加數量
      plusNum(){
        this.currentNum = parseInt(this.currentNum);
        if(this.currentNum >= 1 && this.currentNum<this.showData.inventory){
          this.currentNum += 1;
          return;
        };
        if(this.currentNum >= this.showData.inventory){
          alert('很抱歉，不能超出此庫存量');
          return;
        }
      },
      // 減少數量
      minusNum(){
        this.currentNum = parseInt(this.currentNum);
        if(this.currentNum > 1){
          this.currentNum -= 1;
          return;
        };
        if(this.currentNum <= 1){
          alert('很抱歉，最低數量為1');
          return;
        };
      },
      // 輸入, 自訂數量
      blurNum(e){
        this.currentNum = parseInt(e.target.value);
        if(this.currentNum > this.showData.inventory){
          this.currentNum = this.showData.inventory;
          alert('很抱歉，不能超出此庫存量');
          return;
        }else if(this.currentNum <= 0){
          this.currentNum = 1;
          alert('很抱歉，最低數量為1');
          return;
        }else if(isNaN(this.currentNum)){
          alert('請輸入有效的數字');
          this.currentNum = 1;
          return;
        }
      },
      validateQuantity(currentNum, inventory) {
        if (parseInt(currentNum) > inventory) {
          alert(`無法將所選的數量加入到購物車，因為已經超過庫存的${inventory}件商品`);
          return false;
        } else if (parseInt(currentNum) < 0) {
          alert(`無法將所選的數量加入到購物車，因為商品數量不得低於1`);
          return false;
        }
        return true;
      },
      validateCartQuantity(productId, currentNum, inventory) {
        for (let index = 0; index < this.cartsData.length; index++) {
          const element = this.cartsData[index];
          if (element.product.id === productId) {
            if (element.qty >= inventory) {
              alert(`無法將所選的數量加入到購物車，因為購物車已經有${element.qty}件商品，請至購物車頁面查看`);
              return false;
            } else if (element.qty + parseInt(currentNum) >= inventory + 1) {
              alert(`無法將所選的數量加入到購物車，因為購物車已經有${element.qty}件商品，加入所選的數量會超過庫存，請重新選擇後再送出`);
              return false;
            }
          }
        }
        return true;
      },
      async goToPostCart(productId,currentNum,inventory){
        try {
          await this.getCart(false);
          if(this.validateQuantity(currentNum, inventory) && this.validateCartQuantity(productId, currentNum, inventory)){
            this.postCart(productId, parseInt(currentNum));
          };
        }
        catch (err){
          alert('取得購物車資訊失敗，請稍後再試');
        }
      },
      // 取得特定產品
      getProduct() {
        const { id } = this.$route.params;
        this.isLoading = true;
        const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/product/${id}`;
        this.$http.get(url)
          .then(res=>{
            this.showData = {...res.data.product};
            const { splitStringByNewline } = stringStore();
            this.showData.content = splitStringByNewline(this.showData.content);
            this.isLoading = false;
          })
          .catch((err)=>{
            alert('很抱歉，查無此產品，請稍後再試');
            console.log(err.response.data);
            this.$router.push({
              name: 'front404',
              params: { pathMatch: this.$route.path.split('/').slice(1) },
              query: this.$route.query,
              hash: this.$route.hash,
            });
          });
      },
      ...mapActions(cartsStore, ['getCart','postCart'])
    },
    watch: {
      $route(to, ) {
          this.$router.push(to.path)
      }
    },
    mounted() {
      this.getProduct();
      this.getCart(false);
    },
  };
</script>