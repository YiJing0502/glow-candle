import { defineStore } from 'pinia';

export default defineStore('toastsStore', {
  state: () => ({
    toastMessages: [],
  }),
  actions: {
    showToast() {
      setTimeout(() => {
        this.toastMessages.shift();
      }, 6000);
    },
    clearToast(index) {
      this.toastMessages.splice(index, 1);
    },
    pushToast(message) {
      const { style = 'success', title, content } = message;
      this.toastMessages.push({ style, title, content });
      this.showToast();
    },
  },
});
