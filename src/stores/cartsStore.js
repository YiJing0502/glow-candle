import axios from 'axios';
import { defineStore } from 'pinia';

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
export default defineStore('cartsStore', {
  state: () => ({
    // 購物車產品資料
    cartsData: [],
    // 總購物車資料
    allCartsData: [],
    // 是否為載入中（全頁）
    isLoading: false,
    // 是否為載入中(加入購物車的狀態, productDetail)
    isSmLoading: '',
  }),
  getters: {
    cartProductQuantity: ({ cartsData }) => {
      let totalQty = 0;
      if (cartsData.length !== 0) {
        cartsData.forEach((cartProduct) => {
          totalQty += cartProduct.qty;
        });
      }
      if (totalQty > 9) {
        totalQty = '9+';
      }
      return totalQty;
    },
  },
  actions: {
    // ajax, 取得所有購物車資訊
    getCart(isInitialLoad = true) {
      return new Promise((resolve, reject) => {
        if (isInitialLoad) {
          // 顯示整頁的Loading
          this.isLoading = true;
        }
        const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/cart`;
        axios
          .get(url)
          .then((res) => {
            // 購物車資料
            this.cartsData = [...res.data.data.carts];
            this.allCartsData = { ...res.data.data };
            if (this.allCartsData.total !== this.allCartsData.final_total) {
              this.allCartsData.useCoupon = true;
            } else {
              this.allCartsData.useCoupon = false;
            }
            if (isInitialLoad) {
              // 關閉整頁的Loading
              this.isLoading = false;
            }
            resolve(res); // 完成 Promise
          })
          .catch((err) => {
            if (isInitialLoad) {
              // 關閉整頁的Loading
              this.isLoading = false;
            }
            reject(err); // 拒絕 Promise，傳遞錯誤
          });
      });
    },
    // ajax, 加入購物車產品方法
    postCart(productId, qty) {
      return new Promise((resolve, reject) => {
        this.isSmLoading = productId;
        const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/cart`;
        const data = {
          data: {
            product_id: productId,
            qty,
          },
        };
        axios
          .post(url, data)
          .then((res) => {
            resolve(res);
            this.isSmLoading = '';
          })
          .catch((err) => {
            reject(err);
            this.isSmLoading = '';
          });
      });
    },
    // ajax, 修改購物車產品數量方法
    putCart(productCartId, productId, qty) {
      return new Promise((resolve, reject) => {
        this.isSmLoading = productId;
        const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/cart/${productCartId}`;
        const data = {
          data: {
            product_id: productId,
            qty,
          },
        };
        axios
          .put(url, data)
          .then((res) => {
            resolve(res);
            this.isSmLoading = '';
          })
          .catch((err) => {
            reject(err);
            this.isSmLoading = '';
          });
      });
    },
    // ajax, 刪除購物車產品方法
    deleteCart(productCartId) {
      return new Promise((resolve, reject) => {
        this.isSmLoading = productCartId;
        const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/cart/${productCartId}`;
        axios
          .delete(url)
          .then((res) => {
            resolve(res);
            this.isSmLoading = '';
          })
          .catch((err) => {
            reject(err);
            this.isSmLoading = '';
          });
      });
    },
    // ajax, 刪除全部購物車方法
    deleteCarts() {
      return new Promise((resolve, reject) => {
        const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/carts`;
        axios
          .delete(url)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // ajax, 使用優惠券方法
    postCoupon(code) {
      return new Promise((resolve, reject) => {
        const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/coupon`;
        const data = {
          data: {
            code,
          },
        };
        axios
          .post(url, data)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
