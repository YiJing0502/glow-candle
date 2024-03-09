<template>
  <div class="container d-flex justify-content-center align-items-center vh-100 back">
    <div class="col-8">
      <div class="d-flex justify-content-center mb-2">
        <img src="/glow-logo.png" alt="" class="img-fluid" width="100" />
      </div>
      <h3 class="mb-3 text-center text-deep-gray">請先登入</h3>
      <form id="form" class="form-signin" @submit.prevent="postAdminSignin">
        <div class="form-floating mb-3">
          <input
            v-model="email"
            type="email"
            class="form-control text-deep-gray"
            id="username"
            placeholder="name@example.com"
            required
            autofocus
          />
          <label for="username" class="text-deep-gray"> 輸入您的電子郵件 </label>
        </div>
        <div class="form-floating mb-3">
          <input
            v-model="password"
            type="password"
            class="form-control text-deep-gray"
            id="password"
            placeholder="password"
            required
          />
          <label for="password" class="text-deep-gray"> 輸入您的密碼 </label>
        </div>
        <div class="d-flex">
          <RouterLink
            :to="{ name: 'home' }"
            class="btn btn-lg btn-solid-dpgray w-100 mt-3"
            :class="{ active: nowPage === '首頁' }"
            @click="changeNowPage('首頁')"
          >
            回首頁
          </RouterLink>
          <button class="btn btn-lg w-100 mt-3 btn-solid-spec" type="submit">登入</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'pinia';
import alertStore from '../../stores/alertStore';
import pageStore from '../../stores/pageStore';

const { VITE_BASE_URL } = import.meta.env;
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    postAdminSignin() {
      if (this.email === '' && this.password === '') {
        this.showAlertMessage(false, '信箱與密碼為必填');
        return;
      }
      const obj = {
        username: this.email,
        password: this.password,
      };
      this.$http
        .post(`${VITE_BASE_URL}/v2/admin/signin`, obj)
        .then((res) => {
          if (res.data.success) {
            const { expired, token } = res.data;
            // 寫入 cookie 的 記錄 token
            // 使用expired 設定 token 有效時間
            document.cookie = `adminAccount=${token}; expires=${new Date(expired)}`;
            // 清空輸入框
            this.email = '';
            this.password = '';
            this.$router.push({ name: 'adminOrders' });
          }
        })
        .catch((err) => {
          this.showAlertMessage(false, err.response.data.message);
        });
    },
    ...mapActions(alertStore, ['showAlertMessage']),
    ...mapActions(pageStore, ['changeNowPage']),
  },
  mounted() {},
};
</script>
