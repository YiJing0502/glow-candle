import axios from 'axios';
import { defineStore } from 'pinia';

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
export default defineStore('articlesStore', {
  state: () => ({
    isLoading: false,
    articlesData: {},
  }),
  getters: {},
  actions: {
    getArticles(page = 1) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/articles`;
        axios.get(url, { params: { page } })
          .then((res) => {
            this.articlesData = res.data;
            console.log(this.articlesData);
            resolve(res);
            this.isLoading = false;
          })
          .catch((err) => reject(err));
      });
    },
  },
});
