<template>
  <FrontNavbar></FrontNavbar>
  <router-view :key="$route.fullPath"></router-view>
  <ToastMessages></ToastMessages>
</template>
<script>
import FrontNavbar from '../../components/frontend/FrontNavbar.vue';
import ToastMessages from '../../components/ToastMessages.vue';

export default {
  data() {
    return {
      path: '/',
    };
  },
  components: {
    FrontNavbar,
    ToastMessages,
  },
  watch: {
    $route() {
      this.path = this.$route.path;
    },
  },
};
</script>
