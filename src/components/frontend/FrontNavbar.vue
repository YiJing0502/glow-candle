<template>
  <div>
    <div>
      <p
        class="bg-main-spec text-main-light py-1 fw-bolder text-center font-monospace letter-spacing-1 d-lg-none"
      >
        ✦ 光輝環繞｜歡慶開幕 ✦
        <br />結帳輸入「Hi,glow」，即享9折優惠！
      </p>
      <p
        class="bg-main-spec text-main-light py-1 fw-bolder text-center font-monospace letter-spacing-1 d-none d-lg-block"
      >
        ✦ 光輝環繞｜歡慶開幕，結帳輸入「Hi,glow」，即享9折優惠！ ✦
      </p>
    </div>
    <nav
      ref="nav"
      :class="{ 'navbar-hidden': isHidden }"
      class="navbar navbar-expand-lg bg-main-light p-0 navbar-animation sticky-top"
    >
      <div class="container">
        <RouterLink
          :to="{ name: 'home' }"
          class="navbar-brand d-flex"
          :class="{ active: nowPage === '首頁' }"
          @click="changeNowPage('首頁')"
        >
          <img class="p-1" src="/glow-logo.png" alt="glow-logo" width="50" />
        </RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          :class="{ collapse: !isNavExpanded }"
          class="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul class="navbar-nav align-items-lg-center">
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'home' }"
                class="nav-link"
                :class="{ active: nowPage === '首頁' }"
                @click="goToChangeNowPage('首頁')"
                aria-current="page"
              >
                首頁
              </RouterLink>
            </li>
            <!-- 全部產品 -->
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'products', query: { category: '全部產品', page: 1 } }"
                class="nav-link"
                @click="goToChangeNowPage('全部產品')"
                :class="{ active: nowPage === '全部產品' }"
                aria-current="page"
                >全部產品
              </RouterLink>
            </li>
            <!-- 類別區 -->
            <li class="nav-item" v-for="(item, key) in productsCategory" :key="key">
              <button
                type="button"
                class="nav-link"
                :class="{ active: nowPage === item }"
                aria-current="page"
                @click="goToProductsCategoryPage(item)"
              >
                {{ item }}
              </button>
            </li>
            <!-- 從系列選擇 -->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                從系列選擇
              </a>
              <ul class="dropdown-menu">
                <li v-for="(item, index) in uniqueSeriesArray" :key="index">
                  <button @click="goToFilterCandles(2, item)" class="dropdown-item">
                    {{ item }}
                  </button>
                </li>
              </ul>
            </li>
            <!-- 從調性選擇 -->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                從調性選擇
              </a>
              <ul class="dropdown-menu">
                <li v-for="(item, index) in uniqueTonesArray" :key="index">
                  <button @click="goToFilterCandles(1, item)" class="dropdown-item">
                    {{ item }}
                  </button>
                </li>
              </ul>
            </li>
            <!-- 關於我們 -->
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'about' }"
                class="nav-link"
                @click="goToChangeNowPage('關於我們')"
                :class="{ active: nowPage === '關於我們' }"
                aria-current="page"
              >
                關於我們
              </RouterLink>
            </li>
            <!-- 聯絡我們 -->
            <li class="nav-item d-none d-lg-block">
              <RouterLink
                :to="{ name: 'contact' }"
                @click="changeNowPage('聯絡我們')"
                :class="{ active: nowPage === '聯絡我們' }"
                class="nav-link d-flex justify-content-center text-decoration-none"
                aria-current="page"
              >
                <span class="material-icons fs-4">forum</span>
              </RouterLink>
            </li>
            <!-- 訂單搜尋 -->
            <li class="nav-item d-none d-lg-block">
              <a
                @click="goToSearchOrder"
                class="nav-link d-flex justify-content-center text-decoration-none"
                role="button"
                :class="{ active: nowPage === 'order' }"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="material-icons-outlined fs-3">text_snippet</span>
              </a>
            </li>
            <!-- 產產品搜尋 -->
            <li class="nav-item d-none d-lg-block">
              <a
                @click="goToSearchProduct"
                class="nav-link d-flex justify-content-center text-decoration-none"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="material-icons-outlined fs-3">search</span>
              </a>
            </li>
            <!-- 購物車 -->
            <li class="nav-item d-none d-lg-block">
              <RouterLink
                :to="{ name: 'checkout' }"
                class="nav-link position-relative d-flex justify-content-center text-decoration-none"
                :class="{ active: nowPage === 'checkout' }"
                @click="changeNowPage('checkout')"
                aria-current="page"
              >
                <span v-if="cartProductQuantity === 0" class="material-icons-outlined fs-3"
                  >shopping_bag</span
                >
                <span v-else class="material-icons-round fs-3">shopping_bag</span>
                <span
                  v-if="cartProductQuantity !== 0"
                  class="badge rounded-pill bg-main-spec position-absolute top-50 start-50 fw-bold"
                >
                  {{ cartProductQuantity }}
                </span>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <SearchModal ref="searchModal"></SearchModal>
    <OrderSearchModal ref="orderSearchModal"></OrderSearchModal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import cartsStore from '../../stores/cartsStore';
import productsStore from '../../stores/productsStore';
import pageStore from '../../stores/pageStore';
import alertStore from '../../stores/alertStore';

import SearchModal from './SearchModal.vue';
import OrderSearchModal from './OrderSearchModal.vue';

export default {
  data() {
    return {
      isSticky: true,
      lastScrollPosition: 0,
      isNavExpanded: false,
      isHidden: false, // 用來判斷 Navbar 是否隱藏
    };
  },
  components: {
    SearchModal,
    OrderSearchModal,
  },
  computed: {
    ...mapState(pageStore, ['nowPage']),
    ...mapState(cartsStore, ['cartProductQuantity']),
    ...mapState(productsStore, [
      'isLoading',
      'productPagesData',
      'productsCategory',
      'uniqueSeriesArray',
      'uniqueTonesArray',
      'productsPageStatus',
    ]),
  },
  methods: {
    goToSearchProduct() {
      this.$refs.searchModal.openModal();
    },
    goToSearchOrder() {
      this.$refs.orderSearchModal.openModal();
    },
    async goToGetCart(boolean = true) {
      try {
        await this.getCart(boolean);
      } catch (err) {
        this.showAlertMessage(false, err.response.data.message);
      }
    },
    async goToGetProductsAll(boolean) {
      try {
        await this.getProductsAll(boolean);
        if (this.$route.name === 'products') {
          await this.initializePage(this.$route.query);
        }
      } catch (err) {
        this.showAlertMessage(false, err.response.data.message);
      }
    },
    goToFilterCandles(key, content) {
      this.changeNowPage('香氛蠟燭');
      this.$router.push({
        name: 'products',
        query: {
          category: '香氛蠟燭',
          key,
          content,
          page: 1,
        },
      });
      this.isNavExpanded = !this.isNavExpanded;
    },
    goToProductsCategoryPage(category) {
      this.changeNowPage(category);
      this.$router.push({ name: 'products', query: { category, page: 1 } });
      this.isNavExpanded = !this.isNavExpanded;
    },
    goToChangeNowPage(name) {
      this.changeNowPage(name);
      this.isNavExpanded = !this.isNavExpanded;
    },
    handleScroll() {
      const currentScrollPosition = window.scrollY;
      // 往下滑 true，往上滑 false
      this.isHidden = currentScrollPosition > this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
    ...mapActions(alertStore, ['showAlertMessage']),
    ...mapActions(pageStore, ['changeNowPage']),
    ...mapActions(cartsStore, ['getCart']),
    ...mapActions(productsStore, [
      'getProducts',
      'getProductsAll',
      'filterCandles',
      'initializePage',
    ]),
  },
  mounted() {
    this.goToGetCart(false);
    this.goToGetProductsAll(true);
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>
<style scoped>
.navbar-hidden {
  transform: translateY(-100%);
}
.navbar-animation {
  transition: transform 0.4s;
}
</style>
