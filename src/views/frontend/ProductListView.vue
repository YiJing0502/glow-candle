<template>
  <VueLoading
    v-if="isLoading"
    :active="isLoading"
    :background-color="'#EBEAE4'"
    :is-full-page="true"
    :color="'#52504B'"
  />
  <div v-else class="container bg-main-medium container-rounded my-5 py-7r px-lg-5 px-md-4 px-sm-3">
    <div
    class="d-flex align-items-center justify-content-center flex-column"
    v-if="productPagesData.products?.length === 0">
      <div>
        <span class="material-icons-round fs-1">announcement</span>
      </div>
      <h2>很抱歉，沒有相符的產品資料</h2>
      <button class="btn btn-outline-dpgray fs-5 mt-3" @click="this.$router.go(-1)">
      返回上一頁
    </button>
    </div>
    <div v-else>
      <div class="d-flex align-items-center justify-content-center flex-column mb-3">
        <h2 class="text-center border-secondary pb-2 fw-bold">{{ productsPageStatus }}</h2>
        <h4 class="text-deep-gray">{{ this.$route.query.content }}</h4>
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
                <button @click="goToFilterCandles(2, item)" class="dropdown-item">
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
                <button @click="goToFilterCandles(1, item)" class="dropdown-item">
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
                <button @click="goToFilterCandles(3, item)" class="dropdown-item">
                  {{ item }}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="">
          <button
              type="button"
              class="btn dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              價格篩選
            </button>
            <ul class="dropdown-menu">
              <li>
                <button
                @click="goToPriceSort('asc')"
                class="dropdown-item">
                  價格由低到高
                </button>
              </li>
              <li>
                <button
                @click="goToPriceSort('desc')"
                class="dropdown-item">
                  價格由高到低
                </button>
              </li>
            </ul>
        </div> -->
      </div>
      <!-- product card -->
      <div
      class="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 mt-3 mb-3"
      role="button">
        <div class="col mb-3" v-for="item in productPagesData.products" :key="item.id">
          <ProductCard :product="item"></ProductCard>
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
  </div>
  <ResultModal ref="resultModal" :server-message="serverMessage"></ResultModal>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import productsStore from '../../stores/productsStore';

import PageBtn from '../../components/PageBtn.vue';
import ProductCard from '../../components/frontend/ProductCard.vue';

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
    ProductCard,
  },
  methods: {
    goToChangePage(page) {
      const { query } = this.$route;
      const updatedQuery = { ...query, page };
      this.$router.push({
        name: 'products',
        query: updatedQuery,
      });
    },
    goToPriceSort(sort) {
      this.$router.push({
        name: 'products',
        query: {
          category: this.$route.query.category,
          page: this.$route.query.page,
          price: sort,
        },
      });
    },
    goToFilterCandles(key, content) {
      this.$router.push({
        name: 'products',
        query: {
          category: '香氛蠟燭', key, content, page: 1,
        },
      });
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
      'initializePage',
    ]),
  },
  watch: {
  },
  mounted() {
    this.initializePage(this.$route.query);
  },
};
</script>
<style scoped>
</style>
