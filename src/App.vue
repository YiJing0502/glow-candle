<template>
  <RouterView />
  <AlertModal></AlertModal>
  <ToastMessages></ToastMessages>
</template>
<script>
import WOW from 'wow.js';
import AlertModal from './components/AlertModal.vue';
import ToastMessages from './components/ToastMessages.vue';

export default {
  components: {
    AlertModal,
    ToastMessages,
  },
  mounted() {
    new WOW().init();
  },
};
</script>
<style lang="scss">
@import './assets/all.scss';
</style>
