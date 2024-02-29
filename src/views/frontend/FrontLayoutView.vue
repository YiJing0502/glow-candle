<template>
  <FrontNavbar></FrontNavbar>
  <RouterView :key="$route.fullPath"></RouterView>
  <ToastMessages></ToastMessages>
  <FrontFooter></FrontFooter>
</template>
<script>
import FrontNavbar from '../../components/frontend/FrontNavbar.vue';
import ToastMessages from '../../components/ToastMessages.vue';
import FrontFooter from '../../components/frontend/FrontFooter.vue';

export default {
  data() {
    return {
      path: '/',
    };
  },
  components: {
    FrontNavbar,
    ToastMessages,
    FrontFooter,
  },
  watch: {
    $route() {
      this.path = this.$route.path;
    },
  },
};
</script>
