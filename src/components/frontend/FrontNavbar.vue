<template>
  <nav class="navbar sticky-top navbar-expand-lg bg-main-light p-0">
    <div class="container">
      <router-link :to="{ name: 'front' }" class="navbar-brand">
        <img class="p-1" src="/glow-logo.png" alt="glow-logo" width="50" />
      </router-link>
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
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
        <ul class="navbar-nav align-items-lg-center">
          <li class="nav-item">
            <router-link :to="{ name: 'front' }" class="nav-link" aria-current="page"
              >首頁</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'products', params: { category: '全部產品' } }"
              class="nav-link"
              aria-current="page"
              >全部產品
            </router-link>
          </li>
          <li class="nav-item" v-for="(item, key) in productsCategory" :key="key">
            <button
              type="button"
              class="nav-link"
              aria-current="page"
              @click="goToProductsCategoryPage(item)"
            >
              {{ item }}
            </button>
          </li>
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
          <li class="nav-item">
            <router-link :to="{ name: 'about' }" class="nav-link" aria-current="page"
              >關於GLOW</router-link
            >
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="material-icons-outlined fs-3 mt-1">search</span>
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'about' }" class="nav-link" aria-current="page">
              <span class="material-icons fs-4 mt-1">forum</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'checkout' }"
              class="nav-link position-relative"
              aria-current="page"
            >
              <span class="material-icons-outlined fs-3 mt-1">shopping_bag</span>
              <span
                v-if="cartProductQuantity !== 0"
                class="badge rounded-pill bg-main-spec position-absolute top-50 start-50 fw-bold"
              >
                {{ cartProductQuantity }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <ResultModal ref="resultModal" :server-message="serverMessage"></ResultModal>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import cartsStore from '../../stores/cartsStore';
import productsStore from '../../stores/productsStore';

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
  computed: {
    ...mapState(cartsStore, ['cartProductQuantity']),
    ...mapState(productsStore, [
      'isLoading',
      'productPagesData',
      'productsCategory',
      'uniqueSeriesArray',
      'uniqueTonesArray',
    ]),
  },
  methods: {
    async goToGetCart(boolean = true) {
      try {
        await this.getCart(boolean);
      } catch (err) {
        this.serverMessage.message = err.response.data.message;
        this.serverMessage.success = err.response.data.success;
        this.$refs.resultModal.openModal();
      }
    },
    async goToGetProductsAll() {
      try {
        await this.getProductsAll();
      } catch (err) {
        this.serverMessage.message = err.response.data.message;
        this.serverMessage.success = err.response.data.success;
        this.$refs.resultModal.openModal();
      }
    },
    goToFilterCandles(key, content) {
      this.$router.push({
        name: 'products',
        params: { category: '香氛蠟燭' },
        query: { key, content },
      });
    },
    goToProductsCategoryPage(category) {
      this.$router.push({ name: 'products', params: { category } });
    },
    ...mapActions(cartsStore, ['getCart']),
    ...mapActions(productsStore, ['getProducts', 'getProductsAll', 'filterCandles']),
  },
  mounted() {
    this.goToGetCart(false);
    this.goToGetProductsAll();
  },
};
</script>
