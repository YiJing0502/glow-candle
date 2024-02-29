<template>
  <div
  class="container message my-5 bg-main-spec container-rounded text-main-light">
    <img width="100" :src="globe" alt="" class="mb-3">
    <h2 class="mb-3">企業採購 / 異業合作</h2>
    <p class="mb-3">
      謝謝您的喜歡與支持，若您對 光輝時刻有限公司相關產品 有企業採購 / 異業合作之相關需求，誠摯邀請各界品牌、廠商、實體門市合作，
      歡迎來信至 <a class="text-main-light" href="mailto:glow.2023@gmail.com">glow.2023@gmail.com</a>
      ，或前往「聯絡我們」填寫表單，我們將會有專門窗口與您聯繫。
    </p>
    <RouterLink
    :to="{ name: 'contact' }"
    class="btn btn-solid-main btn-lg"
    :class="{ 'active':nowPage === '聯絡我們' }"
    @click="changeNowPage('聯絡我們')"
    aria-current="page"
    >
    前往聯絡我們
    </RouterLink>
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import pageStore from '../../stores/pageStore';
import globe from '../../assets/svg/globe-asia-australia.svg';

export default {
  data() {
    return {
      globe,
    };
  },
  computed: {
    ...mapState(pageStore, ['nowPage']),
  },
  methods: {
    ...mapActions(pageStore, ['changeNowPage']),
  },
};
</script>
<style scoped>
.message {
  padding: 5rem;
  max-width: 600px;
}
</style>
