<template>
  <FrontNavbar></FrontNavbar>
  <RouterView :key="$route.fullPath"></RouterView>
  <ToastMessages></ToastMessages>
  <FrontFooter></FrontFooter>
  <StickyFooter></StickyFooter>
</template>
<script>
import FrontNavbar from '../../components/frontend/FrontNavbar.vue';
import ToastMessages from '../../components/ToastMessages.vue';
import FrontFooter from '../../components/frontend/FrontFooter.vue';
import StickyFooter from '../../components/frontend/StickyFooter.vue';

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
    StickyFooter,
  },
  watch: {
    $route() {
      this.path = this.$route.path;
    },
  },
};
</script>
<style></style>
