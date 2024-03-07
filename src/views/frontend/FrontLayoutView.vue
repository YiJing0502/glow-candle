<template>
  <FrontNavbar></FrontNavbar>
  <RouterView v-slot="{ Component }">
    <transition name="page-opacity" mode="out-in">
      <PageLoading v-if="isLoading"></PageLoading>
      <div v-else>
        <component :is="Component" :key="$route.fullPath"> </component>
        <FrontFooter></FrontFooter>
      </div>
    </transition>
  </RouterView>
  <ToastMessages></ToastMessages>
  <StickyFooter></StickyFooter>
</template>
<script>
import FrontNavbar from '../../components/frontend/FrontNavbar.vue';
import ToastMessages from '../../components/ToastMessages.vue';
import FrontFooter from '../../components/frontend/FrontFooter.vue';
import StickyFooter from '../../components/frontend/StickyFooter.vue';

export default {
  data() {
    return {
      isLoading: false,
      path: '/',
    };
  },
  components: {
    FrontNavbar,
    ToastMessages,
    FrontFooter,
    StickyFooter,
  },
  watch: {
    $route() {
      this.isLoading = true; // 啟動 loading 動畫
      this.path = this.$route.path;
      this.$nextTick(() => {
        this.isLoading = false;
      });
    },
  },
};
</script>
<style>
.page-opacity-enter-active,
.page-opacity-leave-active {
  transition: 500ms ease all;
}
.page-opacity-enter-from,
.page-opacity-leave-to {
  opacity: 0;
}
</style>
