<template>
  <div>
    <h1>This is an about page</h1>
    {{ data }}
    <VueLoading :active="isLoading" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {},
      isLoading: true,
    };
  },
  components: {},
  mounted() {
    this.$http.get('https://randomuser.me/api/').then((res) => {
      [this.data] = res.data.results;
    });
  },
};
</script>
