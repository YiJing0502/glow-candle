<template>
  <VueLoading
    v-if="!loginSuccess"
    :active="!loginSuccess"
    :background-color="'#FBFAF4'"
    :color="'#52504B'"
  />
  <div v-else class="d-flex">
    <ToastMessages></ToastMessages>
    <AdminNavbar></AdminNavbar>
    <router-view></router-view>
  </div>
  <ResultModal ref="resultModal" :server-message="serverMessage"></ResultModal>
</template>
<script>
// pinia
import { mapState, mapActions } from 'pinia';
import adminStore from '../../stores/adminStore';
import toastsStore from '../../stores/toastsStore';
// components
import AdminNavbar from '../../components/backend/AdminNavbar.vue';
import ToastMessages from '../../components/ToastMessages.vue';

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
    ToastMessages,
  },
  computed: {
    ...mapState(adminStore, ['loginSuccess']),
  },
  methods: {
    ...mapActions(toastsStore, ['pushToast']),
    ...mapActions(adminStore, ['initializeAdmin', 'postApiUserCheck']),
  },
  mounted() {
    // 取得先前儲存在 cookie 中 adminAccount 的值
    this.initializeAdmin();
    // 觸發確認是否登入的方法
    this.postApiUserCheck()
      .then(() => {
        if (this.loginSuccess) {
          this.$router.push({ name: 'adminOrders' });
          this.pushToast({
            title: '登入成功',
            style: 'bg-deep-gray',
          });
        }
      })
      .catch((err) => {
        if (!this.loginSuccess) {
          // 只有在使用者未登入時才重新導向
          this.$router.push({ name: 'login' });
          this.serverMessage.message = err.response.data.message;
          this.serverMessage.success = err.response.data.success;
          this.$refs.resultModal.openModal();
        }
      });
  },
};
</script>
