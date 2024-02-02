<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{  data }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {},
    };
  },
  mounted() {
    this.$http.get('https://randomuser.me/api/').then((res) => {
      [this.data] = res.data.results;
    });
  },
};
</script>