<template>
  <nav class="navbar fixed-bottom p-0 d-lg-none">
    <div class="container-fluid justify-content-center bg-main-light">
      <ul
        class="d-flex align-items-center container justify-content-between list-style-none w-100 m-0"
      >
        <li class="nav-item px-1">
          <RouterLink
            :to="{ name: 'home' }"
            class="nav-link d-flex flex-column align-items-center text-decoration-none"
            :class="{ active: nowPage === '首頁' }"
            @click="changeNowPage('首頁')"
            aria-current="page"
          >
            <span class="material-icons-round fs-1 mt-1">home</span>
            <span>首頁</span>
          </RouterLink>
        </li>
        <li class="nav-item px-1">
          <RouterLink
            :to="{ name: 'contact' }"
            @click="changeNowPage('聯絡我們')"
            :class="{ active: nowPage === '聯絡我們' }"
            class="nav-link d-flex flex-column align-items-center text-decoration-none"
            aria-current="page"
          >
            <span class="material-icons fs-2 mt-1">forum</span>
            <span>聯絡我們</span>
          </RouterLink>
        </li>
        <li class="nav-item px-1">
          <a
            @click="goToSearchProduct"
            class="nav-link d-flex flex-column align-items-center text-decoration-none"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span class="material-icons-outlined fs-1 mt-1">search</span>
            <span>產品搜尋</span>
          </a>
        </li>
        <li class="nav-item">
          <RouterLink
            :to="{ name: 'checkout' }"
            class="nav-link d-flex flex-column align-items-center position-relative text-decoration-none"
            :class="{ active: nowPage === 'checkout' }"
            @click="changeNowPage('checkout')"
            aria-current="page"
          >
            <span v-if="cartProductQuantity === 0" class="material-icons-outlined fs-1 mt-1"
              >shopping_bag</span
            >
            <span v-else class="material-icons-round fs-1 mt-1">shopping_bag</span>
            <span
              v-if="cartProductQuantity !== 0"
              class="badge rounded-pill bg-main-spec position-absolute top-30 start-50 fw-bold"
            >
              {{ cartProductQuantity }}
            </span>
            <span>購物車</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
  <ResultModal ref="resultModal" :server-message="serverMessage"></ResultModal>
  <SearchModal ref="searchModal"></SearchModal>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import cartsStore from '../../stores/cartsStore';
import pageStore from '../../stores/pageStore';

import SearchModal from './SearchModal.vue';

export default {
  data() {
    return {
      // result model
      serverMessage: {
        message: '',
        success: true,
      },
    };
  },
  components: {
    SearchModal,
  },
  computed: {
    ...mapState(pageStore, ['nowPage']),
    ...mapState(cartsStore, ['cartProductQuantity']),
  },
  methods: {
    goToSearchProduct() {
      this.$refs.searchModal.openModal();
    },
    async goToGetCart(boolean = true) {
      try {
        await this.getCart(boolean);
      } catch (err) {
        this.serverMessage.message = err.response.data.message;
        this.serverMessage.success = err.response.data.success;
        this.$refs.resultModal.openModal();
      }
    },
    ...mapActions(pageStore, ['changeNowPage']),
    ...mapActions(cartsStore, ['getCart']),
  },
  mounted() {
    this.goToGetCart(false);
  },
};
</script>
