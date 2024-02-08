/* eslint-disable camelcase */
import axios from 'axios';
import { defineStore } from 'pinia';
import stringStore from './stringStore';
import timeStore from './timeStore';

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
    // ajax, 取得特定訂單
    getOrder(orderId) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/order/${orderId}`;
        axios.get(url)
          .then((res) => {
            if (res.data.order !== null) {
              this.processOrderData(res.data.order);
              this.isLoading = false;
            }
            resolve(res);
          })
          .catch((err) => {
            reject(err);
            this.isLoading = false;
          });
      });
    },
    // ajax, 付款特定訂單
    postPayOrder(orderId) {
      return new Promise((resolve, reject) => {
        const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/pay/${orderId}`;
        this.isLoading = true;
        axios.post(url)
          .then((res) => {
            resolve(res);
            this.isLoading = false;
          })
          .catch((err) => {
            reject(err);
            this.isLoading = false;
          });
      });
    },
    // fn, 處理訂單
    processOrderData(orderData) {
      const {
        create_at, id, is_paid, message, paid_date, products, total, user,
      } = orderData;

      this.showData = {
        create_at,
        id,
        is_paid,
        paid_date,
        total,
        message,
      };

      // 將數字時間轉譯日期
      const { timestamp10CodeToDay } = timeStore();
      this.showData.create_at = timestamp10CodeToDay(create_at);
      this.showData.paid_date = timestamp10CodeToDay(paid_date);
      // 重新整理訂單備註
      if (this.showData.message !== undefined) {
        const { splitStringByNewline } = stringStore();
        this.showData.message = splitStringByNewline(this.showData.message);
      }
      // 處理使用者資料
      this.processUserData(user);
      // 處理產品資料
      this.processProductData(products);
    },
    // fn, 處理使用者資料
    processUserData(userData) {
      // 拆分使用者資料
      this.userData = JSON.parse(JSON.stringify(userData));
    },
    // fn, 處理訂單資料
    processProductData(products) {
      // 重新整理產品格式為陣列
      // 添加检查，确保 products 不是 undefined 或 null
      if (products && typeof products === 'object') {
        Object.keys(products).forEach((item) => {
          const {
            final_total,
            id,
            product,
            product_id,
            qty,
            total,
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
    },
  },
});
