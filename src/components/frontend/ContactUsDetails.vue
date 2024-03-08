<template>
  <!-- 聯絡我們 -->
  <BasicCollapse :uniqueId="'ContactUsDetails'" :open="true">
    <template v-slot:header> 聯絡我們 </template>
    <template v-slot:body>
      <!-- 聯絡信箱 -->
      <div class="d-flex justify-content-between">
        <p>聯絡信箱</p>
        <p>
          <a class="text-deep-gray" href="mailto:glow.2023@gmail.com"> glow.2023@gmail.com </a>
        </p>
      </div>
      <!-- 聯絡電話 -->
      <div class="d-flex justify-content-between">
        <p>聯絡電話</p>
        <p>
          <a class="text-deep-gray" href="tel:0988000999">0988000999</a>
        </p>
      </div>
      <!-- 營業時間 -->
      <div class="d-flex justify-content-between mb-3">
        <p>營業時間</p>
        <p>週一至週五 09:00~17:00</p>
      </div>
      <!-- 購物保證 -->
      <div class="row mb-3">
        <div class="col d-flex flex-column align-items-center">
          <span class="material-icons-outlined fs-1 mb-3"> local_shipping </span>
          <span>免費標準配送</span>
        </div>
        <div class="col d-flex flex-column align-items-center">
          <span class="material-icons-outlined fs-1 mb-3"> redeem </span>
          <span>七日內免費退貨</span>
        </div>
        <div class="col d-flex flex-column align-items-center">
          <span class="material-icons-outlined fs-1 mb-3"> enhanced_encryption </span>
          <span>安全購物</span>
        </div>
      </div>
    </template>
  </BasicCollapse>
</template>
<script>
import BasicCollapse from './BasicCollapse.vue';

export default {
  components: {
    BasicCollapse,
  },
};
</script>
