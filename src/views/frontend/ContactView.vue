<template>
  <div>
    <div class="container-fluid bg-main-medium py-5 text-center">
      <h5 class="">訂單相關問題，請交由官方 LINE@ 詢問</h5>
      <h6 class="mb-3">客服時間： 週一至週五 09:00~17:00</h6>
      <button class="btn btn-solid-dpgray" type="button">LINE@ 官方客服</button>
    </div>
    <div v-if="!isSent" class="container message py-5">
      <vee-form id="myForm" ref="form" @submit="goToPostMessage" v-slot="{ errors }">
        <h2 class="mb-3">聯繫我們</h2>
        <p>謝謝您的主動聯絡，請留下要諮詢的問題，我們會用以下資訊進行回覆。</p>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">電子信箱</label>
          <vee-field
            name="電子信箱"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['電子信箱'] }"
            v-model="userEmail"
            rules="required|email"
            id="exampleFormControlInput1"
            placeholder="輸入您的電子信箱"
          />
          <vee-error-message class="invalid-feedback" name="電子信箱"></vee-error-message>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">留言</label>
          <vee-field
            as="textarea"
            name="留言"
            :class="{ 'is-invalid': errors['留言'] }"
            rules="max:800|required"
            v-model="userMessage"
            placeholder="輸入您的訊息。若是詢問店內特定商品，請留下商品名稱，也歡迎您留下電子信箱以外的聯絡方式，謝謝！"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="10"
          ></vee-field>
          <vee-error-message class="invalid-feedback" name="留言"></vee-error-message>
        </div>
        <button class="w-100 btn btn-solid-spec btn-lg" type="submit">送出</button>
      </vee-form>
    </div>
    <div
      v-if="isSent"
      class="container message py-5 my-5 text-center bg-main-spec container-rounded text-main-light wow animate__animated animate__fadeIn"
    >
      <span class="material-icons-outlined front-icon-xl">mark_email_read</span>
      <h2 class="mb-3">已傳送您的留言</h2>
      <h5 class="mb-3">我們將儘速回覆您</h5>
      <RouterLink
        :to="{ name: 'home' }"
        class="btn btn-solid-main btn-lg"
        :class="{ active: nowPage === '首頁' }"
        @click="changeNowPage('首頁')"
        aria-current="page"
      >
        返回首頁
      </RouterLink>
    </div>
    <div class="container message">
      <h4 class="mb-3">更多我們的詳細資訊</h4>
      <p>公司名稱： 光輝時刻有限公司</p>
      <p>統一編號：08765445</p>
      <p>
        聯絡信箱：
        <a class="text-deep-gray" href="mailto:glow.candle.tw@gmail.com">
          glow.candle.tw@gmail.com
        </a>
      </p>
      <p>
        聯絡電話：
        <a class="text-deep-gray" href="tel:0988000999">0988000999</a>
      </p>
      <p>營業時間：週一至週五 09:00~17:00</p>
    </div>
  </div>
</template>
<script>
import emailjs from '@emailjs/browser';
import { mapActions, mapState } from 'pinia';
import pageStore from '../../stores/pageStore';
import alertStore from '../../stores/alertStore';

const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID_CONTACT_US, VITE_EMAILJS_PUBLIC_KEY } =
  import.meta.env;

export default {
  data() {
    return {
      userEmail: '',
      userMessage: '',
      isSent: false,
    };
  },
  computed: {
    ...mapState(pageStore, ['nowPage']),
  },
  methods: {
    goToPostMessage() {
      const publicKey = `${VITE_EMAILJS_PUBLIC_KEY}`;
      const serviceId = `${VITE_EMAILJS_SERVICE_ID}`;
      const templateId = `${VITE_EMAILJS_TEMPLATE_ID_CONTACT_US}`;
      // send email
      emailjs
        .sendForm(serviceId, templateId, '#myForm', {
          publicKey,
        })
        .then(
          () => {
            this.isSent = true;
            // 使用 ref 來獲取表單引用並重置表單
            this.$refs.form.resetForm();
          },
          (err) => {
            this.showAlertMessage(false, err);
          },
        );
    },
    ...mapActions(pageStore, ['changeNowPage']),
    ...mapActions(alertStore, ['showAlertMessage']),
  },
};
</script>
<style scoped>
.message {
  max-width: 600px;
}
</style>
