<template>
  <router-view :key="$route.fullPath"></router-view>
</template>
<script>
  export default {
    data(){
      return {
        path: '/',
      }
    },
    watch: {
      $route() {
        this.path = this.$route.path;
      }
    }
  }
</script>