<template>
  <PageLoading v-if="!loginSuccess"></PageLoading>
  <div v-else class="d-flex">
    <AdminNavbar></AdminNavbar>
    <RouterView></RouterView>
  </div>
</template>
<script>
// pinia
import { mapState, mapActions } from 'pinia';
import adminStore from '../../stores/adminStore';
import toastsStore from '../../stores/toastsStore';
import alertStore from '../../stores/alertStore';
// components
import AdminNavbar from '../../components/backend/AdminNavbar.vue';

export default {
  data() {
    return {};
  },
  components: {
    AdminNavbar,
  },
  computed: {
    ...mapState(adminStore, ['loginSuccess']),
  },
  methods: {
    ...mapActions(toastsStore, ['pushToast']),
    ...mapActions(adminStore, ['initializeAdmin', 'postApiUserCheck']),
    ...mapActions(alertStore, ['showAlertMessage']),
  },
  mounted() {
    // 取得先前儲存在 cookie 中 adminAccount 的值
    this.initializeAdmin();
    // 觸發確認是否登入的方法
    this.postApiUserCheck()
      .then(() => {
        if (this.loginSuccess) {
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
          this.showAlertMessage(false, err.response.data.message);
        }
      });
  },
};
</script>
