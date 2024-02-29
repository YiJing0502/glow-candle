import { defineStore } from 'pinia';

export default defineStore('pageStore', {
  state: () => ({
    // 初始化時從 localStorage 中獲取當前頁面信息
    nowPage: localStorage.getItem('currentPage') || '',
  }),
  actions: {
    changeNowPage(name) {
      this.nowPage = name;
      // 每次頁面更改時，同時更新狀態並將值存儲在 localStorage 中
      localStorage.setItem('currentPage', name);
    },
  },
});
