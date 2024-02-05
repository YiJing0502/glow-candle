<template>
  <div class="d-flex">
    <AdminNavbar></AdminNavbar>
    <router-view></router-view>
  </div>
  <ResultModal ref="resultModal" :server-message="serverMessage"></ResultModal>
</template>
<script>
// components
import AdminNavbar from '@/components/backend/AdminNavbar.vue';
import ResultModal from '@/components/ResultModal.vue';
const { VITE_BASE_URL } = import.meta.env;

export default {
  data(){
    return {
      loginSuccess: null,
      serverMessage: {
        message: '',
        success: true,
      },
    }
  },
  components: {
    AdminNavbar,
    ResultModal,
  },
  methods: {
    initializeAdmin() {
      // 取得先前儲存在 cookie 中 adminAccount 的值
      // eslint-disable-next-line no-useless-escape
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)adminAccount\s*\=\s*([^;]*).*$)|^.*$/,"$1",);
      // 將token夾帶在HTTP的Header中的Authorization
      // 將驗證信息夾帶在每一個請求中，以確保後端能夠識別用戶
      // 只要加入一次就之後會自動將驗證的token夾帶在後續所有由前端發送到後端的請求，就不必在每一個請求中都單獨處理身份驗證的相關邏輯
      this.$http.defaults.headers.common['Authorization'] = token;
    },
    postApiUserCheck() {
      const url = `${VITE_BASE_URL}/v2/api/user/check`;
      return this.$http.post(url)
        .then((res)=>{
          this.loginSuccess = res.data.success;
          if(this.loginSuccess){
          this.serverMessage.message = '登入成功';
          this.serverMessage.success = this.loginSuccess;
          this.$refs.resultModal.openModal();
        }
        })
        .catch((err)=>{
          this.loginSuccess = err.response.data.success;
          this.serverMessage.message = err.response.data.message;
          this.serverMessage.success = err.response.data.success;
          this.$refs.resultModal.openModal();
          if(!this.loginSuccess){
            // 只有在使用者未登入時才重新導向
            // window.location = 'login.html';
            alert('要push到登入頁～')
          }
        });
    },
  },
  mounted(){
    // 取得先前儲存在 cookie 中 adminAccount 的值
    this.initializeAdmin();
    // 觸發確認是否登入的方法
    this.postApiUserCheck();
  },
}
</script>