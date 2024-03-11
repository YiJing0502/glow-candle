<template>
  <div class="container py-5">
    <h2>歡迎回來</h2>
  </div>
</template>
<script>
import { mapActions } from 'pinia';
import pageStore from '../../stores/pageStore';

export default {
  methods: {
    ...mapActions(pageStore, ['changeNowPage']),
  },
  mounted() {
    this.changeNowPage('後台管理');
  },
};
</script>
