<template>
  <VueLoading
    v-if="isLoading"
    :active="isLoading"
    :background-color="'#EBEAE4'"
    :is-full-page="true"
    :color="'#52504B'"
  />
  <div v-else class="container bg-main-medium container-rounded my-5 py-7r px-lg-5 px-md-4 px-sm-3">
    <div class="d-flex align-items-center justify-content-center mb-3">
      <h2 class="text-center border-secondary pb-2 fw-bold">{{ productsPageStatus }}</h2>
    </div>
    <!-- dropDown/sort -->
    <div class="d-flex justify-content-between">
      <div v-if="productsPageStatus === '香氛蠟燭'" class="">
        <!-- 系列 -->
        <div class="btn-group">
          <button
            type="button"
            class="btn dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            系列
          </button>
          <ul class="dropdown-menu">
            <li v-for="(item, index) in uniqueSeriesArray" :key="index">
              <button @click="filterCandles(2, item)" class="dropdown-item">
                {{ item }}
              </button>
            </li>
          </ul>
        </div>
        <!-- 調性 -->
        <div class="btn-group">
          <button
            type="button"
            class="btn dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            調性
          </button>
          <ul class="dropdown-menu">
            <li v-for="(item, index) in uniqueTonesArray" :key="index">
              <button @click="filterCandles(1, item)" class="dropdown-item">
                {{ item }}
              </button>
            </li>
          </ul>
        </div>
        <!-- 容量 -->
        <div class="btn-group">
          <button
            type="button"
            class="btn dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            容量
          </button>
          <ul class="dropdown-menu">
            <li v-for="(item, index) in uniqueCapacitiesArray" :key="index">
              <button @click="filterCandles(3, item)" class="dropdown-item">
                {{ item }}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="">
        <button type="button" class="btn" @click="sortPrice('a-b', productPagesData)">
          價格由低到高
        </button>
      </div>
    </div>
    <!-- product card -->
    <div class="row row-cols-lg-4 row-cols-md-4 row-cols-sm-2 row-cols-2 mt-3 mb-3" role="button">
      <div class="col mb-3" v-for="item in productPagesData.products" :key="item.id">
        <div class="card" @click="changeToProductPage(item.id)">
          <img :src="item.imageUrl" class="card-img-top" alt="..." />
          <div class="card-body">
            <p class="card-text">{{ item.unit }}</p>
            <h6 class="card-title">{{ item.title }}</h6>
            <p class="card-text">NT${{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- pageBtn -->
    <div
      v-if="
        productPagesData && productPagesData.pagination && productPagesData.products?.length !== 0
      "
      class="d-flex justify-content-end mt-4"
    >
      <nav aria-label="Page navigation example">
        <ul class="pagination" id="pageid">
          <PageBtn
            :prev-is-enabled="productPagesData.pagination.has_pre"
            :next-is-enabled="productPagesData.pagination.has_next"
            :totalPage="productPagesData.pagination.total_pages"
            :current-page="productPagesData.pagination.current_page"
            @change-prev-page="goToChangePage(productPagesData.pagination.current_page - 1)"
            @change-next-page="goToChangePage(productPagesData.pagination.current_page + 1)"
            @change-page="goToChangePage"
          ></PageBtn>
        </ul>
      </nav>
    </div>
  </div>
  <ResultModal ref="resultModal" :server-message="serverMessage"></ResultModal>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import productsStore from '../../stores/productsStore';

import PageBtn from '../../components/PageBtn.vue';

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
    PageBtn,
  },
  methods: {
    // 跳轉至產品頁面
    changeToProductPage(id) {
      this.$router.push({
        name: 'product',
        params: { id },
      });
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
    async goToGetProducts(category, page = 1) {
      try {
        await this.getProducts(category, page);
      } catch (err) {
        this.serverMessage.message = err.response.data.message;
        this.serverMessage.success = err.response.data.success;
        this.$refs.resultModal.openModal();
      }
    },
    goToChangePage(page) {
      if (this.productPagesData.pagination.category) {
        this.goToGetProducts(this.$route.params.category, page);
        return;
      }
      this.pagination(page);
    },
    initializePage() {
      if (this.$route.params.category === '全部產品') {
        this.goToGetProductsAll();
      } else if (this.$route.query.key && this.$route.query.content) {
        this.filterCandles(this.$route.query.key, this.$route.query.content);
      } else {
        const categoryIndex = this.productsCategory.findIndex(
          (category) => category === this.$route.params.category,
        );
        if (categoryIndex !== -1) {
          this.goToGetProducts(this.$route.params.category);
        }
      }
    },
    ...mapActions(productsStore, [
      'getProductsAll',
      'getProduct',
      'pagination',
      'getProducts',
      'sortPrice',
      'filterCandles',
    ]),
  },
  computed: {
    ...mapState(productsStore, [
      'isLoading',
      'productPagesData',
      'productsPageStatus',
      'productsCategory',
      'uniqueSeriesArray',
      'uniqueTonesArray',
      'uniqueCapacitiesArray',
    ]),
  },
  watch: {},
  mounted() {
    this.initializePage();
  },
};
</script>
<style></style>
