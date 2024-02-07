import axios from 'axios';
import { defineStore } from 'pinia';
import stringStore from './stringStore';
import timeStore from './timeStore';
import cartsStore from './cartsStore';

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
export default defineStore('ordersStore', {
  state: () => ({
    // 是否為載入中
    isLoading: false,
    // 訂單相關的總資料
    showData: {},
    userData: {},
    productData: [],
    couponData: {},
    // store狀態通知
    storeMessage: {
      message: '',
      success: true,
    },
  }),
  getters: {

  },
  actions: {
    // ajax, 送出訂單方法
    postOrder(data) {
      return new Promise((resolve, reject) => {
        const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/order`;
        axios.post(url, data)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // fn, 跳轉至某個帶有id的頁面
    changeToIdPage(id, html) {
      // encodeURIComponent:將特殊字符轉換成安全的URL編碼形式
      const url = `${html}?id=${encodeURIComponent(id)}`;
      window.location.href = url;
    },
    // ajax, 取得特定訂單
    async getOrder() {
      // 獲取當前 URL 對象
      const currentUrl = new URL(window.location.href);
      // 從 URL 查詢參數中獲取商品 ID
      const orderId = currentUrl.searchParams.get('id');
      this.isLoading = true;
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/order/${orderId}`;
      try {
        const res = await axios.get(url);
        const {
          create_at, id, is_paid, message, paid_date, products, total, user,
        } = res.data.order;
        this.showData = {
          create_at,
          id,
          is_paid,
          paid_date,
          total,
          message,
        };
        const { timestamp10CodeToDay } = timeStore();
        this.showData.create_at = timestamp10CodeToDay(create_at);
        this.showData.paid_date = timestamp10CodeToDay(paid_date);
        // 重新整理訂單備註
        if (this.showData.message !== undefined) {
          const { splitStringByNewline } = stringStore();
          this.showData.message = splitStringByNewline(this.showData.message);
        }
        // 拆分使用者資料
        this.userData = JSON.parse(JSON.stringify(user));
        // 重新整理產品格式為陣列
        // 添加检查，确保 products 不是 undefined 或 null
        if (products && typeof products === 'object') {
          Object.keys(products).forEach((item) => {
            const {
              final_total, id, product, product_id, qty, total,
            } = products[item];
            const newProductData = {
              final_total,
              id,
              product,
              product_id,
              qty,
              total,
            };
            this.productData.push(newProductData);
            // 確認是否使用優惠券
            if (products[item].coupon !== undefined) {
              this.couponData = products[item].coupon;
            }
          });
        }
        // 如果都沒有使用優惠券
        if (this.couponData === null || this.couponData === undefined) {
          this.couponData = null;
        } else if (Object.keys(this.couponData).length === 0) {
          this.couponData = null;
        }
        this.isLoading = false;
      } catch (err) {
        alert('很抱歉，查無資訊');
        const url = 'productList.html';
        window.location.href = url;
      }
    },
    // ajax, 付款特定訂單
    async postPayOrder(orderId) {
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/pay/${orderId}`;
      this.isLoading = true;
      try {
        await axios.post(url);
        await this.getOrder();
        this.isLoading = false;
        alert('您已付款成功');
      } catch {
        alert('很抱歉，付款失敗，請稍後再試');
      }
    },
    // fn, 更新storeMessage
    updateStoreMessage(message = '', success = true) {
      this.storeMessage.message = message;
      this.storeMessage.success = success;
    },
  },
});
