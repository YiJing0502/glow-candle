import axios from 'axios';
import { defineStore } from 'pinia';

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
export default defineStore('productsStore', {
  state: () => ({
    // 所有產品資料
    productsData: [],
    // 是否正在載入
    isLoading: false,
  }),
  getters: {},
  actions: {
    // 取得所有產品
    getProductsAll() {
      this.isLoading = true;
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/products/all`;
      return new Promise((resolve, reject) => {
        axios
          .get(url)
          .then((res) => {
            this.productsData = res.data.products;
            resolve(res);
            this.isLoading = false;
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
