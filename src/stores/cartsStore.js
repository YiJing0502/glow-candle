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
    // store狀態通知
    storeMessage: {
      message: '',
      success: true,
    },
  }),
  getters: {

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
        axios.get(url)
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
            resolve(); // 完成 Promise
          })
          .catch((err) => {
            if (isInitialLoad) {
              // 關閉整頁的Loading
              this.isLoading = false;
            }
            // 儲存伺服器訊息
            this.updateStoreMessage(err.response.data.message, err.response.data.success);
            reject(err); // 拒絕 Promise，傳遞錯誤
          });
      });
    },
    // ajax, 加入購物車商品方法
    async postCart(productId, qty) {
      this.isSmLoading = productId;
      try {
        const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/cart`;
        const data = {
          data: {
            product_id: productId,
            qty,
          },
        };
        const res = await axios.post(url, data);
        this.isSmLoading = '';
        // 儲存伺服器訊息
        this.updateStoreMessage(res.data.message, res.data.success);
        // 更新畫面顯示目前購物車狀態
        await this.getCart(false);
      } catch (err) {
        // 儲存伺服器訊息
        this.updateStoreMessage(err.response.data.message, err.response.data.success);
        this.isSmLoading = '';
      }
    },
    // ajax, 修改購物車商品數量方法
    async putCart(productCartId, productId, qty) {
      this.isSmLoading = productId;
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/cart/${productCartId}`;
      const data = {
        data: {
          product_id: productId,
          qty,
        },
      };
      try {
        const res = await axios.put(url, data);
        // 儲存伺服器訊息
        this.updateStoreMessage(res.data.message, res.data.success);
        this.isSmLoading = '';
      } catch (err) {
        // 儲存伺服器訊息
        this.updateStoreMessage(err.response.data.message, err.response.data.success);
        this.isSmLoading = '';
      }
    },
    // ajax, 刪除購物車商品方法
    async deleteCart(productCartId) {
      this.isSmLoading = productCartId;
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/cart/${productCartId}`;
      try {
        const res = await axios.delete(url);
        // 儲存伺服器訊息
        this.updateStoreMessage(res.data.message, res.data.success);
        this.isSmLoading = '';
      } catch (err) {
        // 儲存伺服器訊息
        this.updateStoreMessage(err.response.data.message, err.response.data.success);
        this.isSmLoading = '';
      }
    },
    // ajax, 刪除全部購物車方法
    async deleteCarts() {
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/carts`;
      try {
        const res = await axios.delete(url);
        // 儲存伺服器訊息
        this.updateStoreMessage(res.data.message, res.data.success);
      } catch (err) {
        // 儲存伺服器訊息
        this.updateStoreMessage(err.response.data.message, err.response.data.success);
      }
    },
    // ajax, 使用優惠券方法
    async postCoupon(code) {
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/coupon`;
      const data = {
        data: {
          code,
        },
      };
      try {
        const res = await axios.post(url, data);
        // 儲存伺服器訊息
        this.updateStoreMessage(res.data.message, res.data.success);
      } catch (err) {
        // 儲存伺服器訊息
        this.updateStoreMessage(err.response.data.message, err.response.data.success);
      }
    },
    // fn, 更新storeMessage
    updateStoreMessage(message = '', success = true) {
      this.storeMessage.message = message;
      this.storeMessage.success = success;
    },
  },
});
