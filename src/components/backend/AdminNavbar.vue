<template>
  <div class="col-2 bg-main-medium side-bar-height px-3">
    <div class="d-flex justify-content-center my-3">
      <router-link :to="{ name: 'front' }">
        <img src="/glow-logo.png" alt="" width="70" />
      </router-link>
    </div>
    <ul class="list-group">
      <li class="list-group-item">
        <router-link class="list-group-item" :to="{ name: 'adminOrders' }">訂單管理</router-link>
      </li>
      <li class="list-group-item">
        <router-link class="list-group-item" :to="{ name: 'adminProducts' }">產品管理</router-link>
      </li>
      <li class="list-group-item">
        <router-link class="list-group-item" :to="{ name: 'adminCoupons' }">優惠券管理</router-link>
      </li>
      <li class="list-group-item">
        <router-link class="list-group-item" :to="{ name: 'adminArticles' }">文章管理</router-link>
      </li>
    </ul>
    <div class="m-3 d-flex justify-content-center align-items-center">
      <button
        type="button"
        class="btn btn-outline-spec d-flex justify-content-center align-items-center"
        @click="adminLogout"
      >
        <span class="material-icons">logout</span>
        <span>登出</span>
      </button>
    </div>
  </div>
  <!-- 結果modal -->
  <ResultModal ref="resultModal" :server-message="serverMessage"></ResultModal>
</template>
<script>
const { VITE_BASE_URL } = import.meta.env;
export default {
  data() {
    return {
      serverMessage: {
        message: '',
        success: true,
      },
    };
  },
  methods: {
    adminLogout() {
      const url = `${VITE_BASE_URL}/v2/logout`;
      this.$http
        .post(url)
        .then((res) => {
          this.$router.push({ name: 'login' });
          this.serverMessage.message = res.data.message;
          this.serverMessage.success = res.data.success;
          this.$refs.resultModal.openModal();
        })
        .catch((err) => {
          this.serverMessage.message = err.response.data.message;
          this.serverMessage.success = err.response.data.success;
          this.$refs.resultModal.openModal();
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.side-bar-height {
  min-height: 100vh;
}
</style>
