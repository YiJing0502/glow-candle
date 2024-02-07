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
    isSmLoading: false,
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
            // 為每一個個別產品加上關閉的loading屬性
            this.cartsData.forEach((item) => {
              item.isSmLoading = false;
            });
            resolve(); // 完成 Promise
          })
          .catch((err) => {
            if (isInitialLoad) {
              // 關閉整頁的Loading
              this.isLoading = false;
            }
            // 個別產品loading 調整為關閉
            this.cartsData.forEach((item) => {
              item.isSmLoading = false;
            });
            alert('取得購物車資訊失敗，請稍後再試');
            reject(err); // 拒絕 Promise，傳遞錯誤
          });
      });
    },
    // ajax, 加入購物車商品方法
    async postCart(productId, qty) {
      this.isSmLoading = true;
      try {
        const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/cart`;
        const data = {
          data: {
            product_id: productId,
            qty,
          },
        };
        await axios.post(url, data);
        this.isSmLoading = false;
        alert('加入購物車成功');
        // 更新畫面顯示目前購物車狀態
        await this.getCart(false);
      } catch {
        this.isSmLoading = false;
        alert('加入購物車失敗，請稍後再試');
      }
    },
    // ajax, 修改購物車商品數量方法
    async putCart(productCartId, productId, qty) {
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/cart/${productCartId}`;
      const data = {
        data: {
          product_id: productId,
          qty,
        },
      };
      // 將購物車中要修改數量的產品，loading狀態改為true;
      const cartsPutProduct = this.cartsData.find((item) => item.id === productCartId);
      cartsPutProduct.isSmLoading = true;
      try {
        await axios.put(url, data);
        await this.getCart(false);
        alert('修改購物車商品數量成功');
      } catch {
        alert('修改購物車商品數量失敗，請稍後再試');
      }
    },
    // ajax, 刪除購物車商品方法
    async deleteCart(productCartId) {
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/cart/${productCartId}`;
      try {
        await axios.delete(url);
        await this.getCart(false);
        alert('刪除購物車商品成功');
      } catch {
        alert('刪除購物車商品失敗，請稍後再試');
      }
    },
    // ajax, 刪除全部購物車方法
    async deleteCarts() {
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/carts`;
      try {
        await axios.delete(url);
        await this.getCart(false);
        alert('刪除所有購物車商品成功');
      } catch {
        alert('刪除所有購物車商品失敗，請稍後再試');
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
        await axios.post(url, data);
        await this.getCart(false);
        alert('使用優惠券成功');
      } catch {
        alert('使用優惠券失敗，請稍後再試');
      }
    },
  },
});
