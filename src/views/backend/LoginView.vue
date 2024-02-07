<template>
  <div class="container d-flex  justify-content-center align-items-center vh-100 back">
      <div class="col-8">
        <div class="d-flex justify-content-center  mb-2">
          <img
            src="/glow-logo.png"
            alt="" class="img-fluid" width="100">
        </div>

        <h3 class="mb-3 text-center myTextColor">
          請先登入
        </h3>
        <form id="form" class="form-signin" @submit.prevent="postAdminSignin">
          <div class="form-floating mb-3">
            <input v-model="email" type="email" class="form-control myTextColor" id="username"
              placeholder="name@example.com" required autofocus>
            <label for="username" class="myTextColor">
              輸入您的電子郵件
            </label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="password" type="password" class="form-control myTextColor" id="password"
              placeholder="password" required>
            <label for="password" class="myTextColor">
              輸入您的密碼
            </label>
          </div>
          <div class="d-flex">
            <button type="button" class="btn  btn-lg btn-solid-dpgray w-100 mt-3 resetBorderRadius">
              回首頁
            </button>
            <button class="btn btn-lg w-100 mt-3 resetBorderRadius btn-solid-spec" type="submit">
              登入
            </button>

          </div>

        </form>
      </div>
  </div>
  <ResultModal ref="resultModal" :server-message="serverMessage"></ResultModal>
</template>
<script>
import ResultModal from '../../components/ResultModal.vue';

const { VITE_BASE_URL } = import.meta.env;
export default {
  data() {
    return {
      email: '',
      password: '',
      serverMessage: {
        message: '',
        success: true,
      },
    };
  },
  components: {
    ResultModal,
  },
  methods: {
    postAdminSignin() {
      if (this.email === '' && this.password === '') {
        this.serverMessage.message = '信箱與密碼是必須的';
        this.serverMessage.success = false;
        this.$refs.resultModal.openModal();
        return;
      }
      const obj = {
        username: this.email,
        password: this.password,
      };
      this.$http.post(`${VITE_BASE_URL}/v2/admin/signin`, obj)
        .then((res) => {
          this.serverMessage.message = res.data.message;
          this.serverMessage.success = res.data.success;
          this.$refs.resultModal.openModal();
          if (res.data.success) {
            const { expired, token } = res.data;
            // 寫入 cookie 的 記錄 token
            // 使用expired 設定 token 有效時間
            document.cookie = `adminAccount=${token}; expires=${new Date(expired)}`;
            // 清空輸入框
            this.email = '';
            this.password = '';
            window.location = 'product.html';
          }
        })
        .catch((err) => {
          this.serverMessage.message = err.response.data.message;
          this.serverMessage.success = err.response.data.success;
          this.$refs.resultModal.openModal();
        });
    },
  },
  mounted() {

  },
};
</script>
