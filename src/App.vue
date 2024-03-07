<template>
  <RouterView />
</template>
<script>
import WOW from 'wow.js';

export default {
  mounted() {
    new WOW().init();
  },
};
</script>
<style lang="scss">
@import './assets/all.scss';
</style>
