import axios from 'axios';
import { defineStore } from 'pinia';

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
export default defineStore('productsStore', {
  state: () => ({
    // 所有產品資料
    productsData: [],
    // 是否正在載入
    isLoading: false,
    productPagesData: {},
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
            this.pagination(1);
            resolve(res);
            this.isLoading = false;
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 分頁
    pagination(nowPage) {
      const data = this.productsData;
      // 取得全部資料長度
      const dataLength = Object.keys(data).length;
      // 設定每頁資料量
      const perPage = 8;
      // 取得總頁數，使用無條件進位
      const totalPage = Math.ceil(dataLength / perPage);
      // 設定當前頁數，變數
      let currentPage = nowPage;
      // 防呆：避免當前頁數比總頁數大
      if (currentPage > totalPage) {
        currentPage = totalPage;
      }
      // 計算當前分頁顯示的資料範圍的最小值
      const minPerPageData = currentPage * perPage - perPage + 1;
      // 計算當前分頁顯示的資料範圍的最大值
      const maxPerPageData = currentPage * perPage;
      // 建立新陣列，存放我們每頁的資料
      const newData = [];
      Object.keys(data).forEach((item, index) => {
        // 因為所有的索引都會被加一，所以其實不影響運作，只是方便我們計算，所以用num，帶替原本的 index
        const num = index + 1;
        if (num >= minPerPageData && num <= maxPerPageData) {
          newData.push(data[item]);
        }
      });
      // 用物件方式來傳遞資料
      const page = {
        totalPage,
        currentPage,
        // 是否有上一頁
        hasPrevPage: currentPage > 1,
        // 是否有下一頁
        hasNextPage: currentPage < totalPage,
      };
      this.productPagesData = {
        products: newData,
        pagination: page,
      };
    },
  },
});
