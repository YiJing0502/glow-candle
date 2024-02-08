<template>
  <VueLoading
  v-if="!loginSuccess"
  :active="!loginSuccess"
  :background-color="'#FBFAF4'"
  :color="'#52504B'"/>
  <div v-else class="d-flex">
    <AdminNavbar></AdminNavbar>
    <router-view></router-view>
  </div>
  <ResultModal ref="resultModal" :server-message="serverMessage"></ResultModal>
</template>
<script>
// pinia
import { mapState, mapActions } from 'pinia';
import adminStore from '../../stores/adminStore';
// components
import AdminNavbar from '../../components/backend/AdminNavbar.vue';

export default {
  data() {
    return {
      serverMessage: {
        message: '',
        success: true,
      },
    };
  },
  components: {
    AdminNavbar,
  },
  computed: {
    ...mapState(adminStore, ['loginSuccess']),
  },
  methods: {
    ...mapActions(adminStore, ['initializeAdmin', 'postApiUserCheck']),
  },
  mounted() {
    // 取得先前儲存在 cookie 中 adminAccount 的值
    this.initializeAdmin();
    // 觸發確認是否登入的方法
    this.postApiUserCheck()
      .then(() => {
        if (this.loginSuccess) {
          this.serverMessage.message = '登入成功';
          this.serverMessage.success = this.loginSuccess;
          this.$refs.resultModal.openModal();
        }
      })
      .catch((err) => {
        this.serverMessage.message = err.response.data.message;
        this.serverMessage.success = err.response.data.success;
        this.$refs.resultModal.openModal();
        if (!this.loginSuccess) {
          // 只有在使用者未登入時才重新導向
          this.$router.push({ name: 'login' });
        }
      });
  },
};
</script>
