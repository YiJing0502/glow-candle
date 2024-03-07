<template>
  <div class="col-2 bg-main-medium side-bar-height px-3">
    <div class="d-flex justify-content-center my-3">
      <RouterLink
        :class="{ active: nowPage === '首頁' }"
        @click="changeNowPage('首頁')"
        :to="{ name: 'home' }"
      >
        <img src="/glow-logo.png" alt="" width="70" />
      </RouterLink>
    </div>
    <ul class="list-group">
      <li class="list-group-item">
        <RouterLink
          class="list-group-item"
          :class="{ active: nowPage === '訂單管理' }"
          @click="changeNowPage('訂單管理')"
          :to="{ name: 'adminOrders' }"
          >訂單管理</RouterLink
        >
      </li>
      <li class="list-group-item">
        <RouterLink
          class="list-group-item"
          :class="{ active: nowPage === '產品管理' }"
          @click="changeNowPage('產品管理')"
          :to="{ name: 'adminProducts' }"
          >產品管理</RouterLink
        >
      </li>
      <li class="list-group-item">
        <RouterLink
          class="list-group-item"
          :class="{ active: nowPage === '優惠券管理' }"
          @click="changeNowPage('優惠券管理')"
          :to="{ name: 'adminCoupons' }"
          >優惠券管理</RouterLink
        >
      </li>
      <li class="list-group-item">
        <RouterLink
          class="list-group-item"
          :class="{ active: nowPage === '文章管理' }"
          @click="changeNowPage('文章管理')"
          :to="{ name: 'adminArticles' }"
          >文章管理</RouterLink
        >
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
import { mapActions, mapState } from 'pinia';
import pageStore from '../../stores/pageStore';

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
  computed: {
    ...mapState(pageStore, ['nowPage']),
  },
  methods: {
    adminLogout() {
      const url = `${VITE_BASE_URL}/v2/logout`;
      this.$http
        .post(url)
        .then((res) => {
          // 刪除cookie
          // 取得當前時間
          const now = new Date();
          // 將 cookie 的過期時間設為過去的時間 (1秒前)
          now.setSeconds(now.getSeconds() - 1);
          // 設定cookie，使瀏覽器將其刪除
          // 清除 cookie時，不需要提供 token 來作為身份驗證
          // 將當前 Date 物件轉換為 UTC 時間的字串 (瀏覽器通常期望這個時間是以 UTC 時間格式提供)
          document.cookie = `adminAccount=; expires=${now.toUTCString()}`;
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
    ...mapActions(pageStore, ['changeNowPage']),
  },
};
</script>
<style lang="scss" scoped>
.side-bar-height {
  min-height: 100vh;
}
</style>
