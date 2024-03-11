<template>
  <RouterView />
  <AlertModal></AlertModal>
  <ToastMessages></ToastMessages>
</template>
<script>
import WOW from 'wow.js';

import { mapActions } from 'pinia';
import alertStore from './stores/alertStore';

import AlertModal from './components/AlertModal.vue';
import ToastMessages from './components/ToastMessages.vue';

export default {
  components: {
    AlertModal,
    ToastMessages,
  },
  methods: {
    handleOffline() {
      this.showAlertMessage(false, '網路已斷線，請檢查您的網路連接。');
    },
    ...mapActions(alertStore, ['showAlertMessage']),
  },
  mounted() {
    new WOW().init();
    // 監聽網路狀態變化
    window.addEventListener('offline', this.handleOffline);
  },
  beforeUnmount() {
    window.removeEventListener('offline', this.handleOffline);
  },
};
</script>
<style lang="scss">
@import './assets/all.scss';
</style>
