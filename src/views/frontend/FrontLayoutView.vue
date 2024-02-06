<template>
  <FrontNavbar></FrontNavbar>
  <router-view :key="$route.fullPath"></router-view>
</template>
<script>
  import FrontNavbar from '@/components/frontend/FrontNavbar.vue';
  export default {
    data(){
      return {
        path: '/',
      }
    },
    components: {
      FrontNavbar,
    },
    watch: {
      $route() {
        this.path = this.$route.path;
      }
    }
  }
</script>