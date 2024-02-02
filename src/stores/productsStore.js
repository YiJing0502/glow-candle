import axios from 'axios';
import { defineStore } from 'pinia';
import stringStore from './stringStore.js';
const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
export default defineStore('productsStore', {
  state: ()=>({
    // 所有產品資料
    productsData: [],
    // 單筆產品詳細資料
    showData: '123',
    // 是否正在載入
    isLoading: false,
  }),
  getters: {

  },
  actions: {
    // 取得所有產品
    getProductsAll() {
      this.isLoading = true;
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/products/all`;
      return axios.get(url)
        .then(res => {
          this.productsData = res.data.products;
          this.isLoading = false;
        })
        .catch(() => {
          alert('很抱歉，載入所有商品失敗，請稍後再試');
        });
    },
    // 跳轉至產品頁面
    changeToProductPage(id) {
      const productId = id;
      // encodeURIComponent:將特殊字符轉換成安全的URL編碼形式
      const url = `productDetail.html?id=${encodeURIComponent(productId)}`
      window.location.href = url;
    },
    // 取得特定產品
    getProduct() {
      // 獲取當前 URL 對象
      const currentUrl = new URL(window.location.href);
      // 從 URL 查詢參數中獲取商品 ID
      const productId = currentUrl.searchParams.get('id');
      this.isLoading = true;
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/product/${productId}`;
      axios.get(url)
        .then(res=>{
          this.showData = {...res.data.product};
          const { splitStringByNewline } = stringStore();
          this.showData.content = splitStringByNewline(this.showData.content);
          this.isLoading = false;
        })
        .catch(()=>{
          alert('很抱歉，查無此產品，請稍後再試');
          const url = `productList.html`;
          window.location.href = url;
        })
    },
  },
});