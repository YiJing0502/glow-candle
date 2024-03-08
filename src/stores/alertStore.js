import { defineStore } from 'pinia';

export default defineStore('alertStore', {
  state: () => ({
    // alert model
    alertMessage: {
      message: '',
      success: true,
    },
  }),
  getters: {},
  actions: {
    showAlertMessage(success, message) {
      this.alertMessage = {
        message,
        success,
      };
    },
  },
});
