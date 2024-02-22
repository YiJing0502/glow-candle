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
      <h2 class="text-center border-secondary pb-2 fw-bold">全部產品</h2>
    </div>
    <!-- dropDown/sort -->
    <div class="d-flex justify-content-between">
      <div class="">
        <!-- 類別 -->
        <div class="btn-group">
          <button
            type="button"
            class="btn dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            類別
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">全部</a></li>
            <li><a class="dropdown-item" href="#">香氛蠟燭</a></li>
            <li><a class="dropdown-item" href="#">香氛蠟燭</a></li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li><a class="dropdown-item" href="#">香氛蠟燭</a></li>
          </ul>
        </div>
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
            <li><a class="dropdown-item" href="#">全部</a></li>
            <li><a class="dropdown-item" href="#">花香調</a></li>
            <li><a class="dropdown-item" href="#">花香調</a></li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li><a class="dropdown-item" href="#">花香調</a></li>
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
            <li><a class="dropdown-item" href="#">全部</a></li>
            <li><a class="dropdown-item" href="#">花香調</a></li>
            <li><a class="dropdown-item" href="#">花香調</a></li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li><a class="dropdown-item" href="#">花香調</a></li>
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
            <li><a class="dropdown-item" href="#">全部</a></li>
            <li><a class="dropdown-item" href="#">花香調</a></li>
            <li><a class="dropdown-item" href="#">花香調</a></li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li><a class="dropdown-item" href="#">花香調</a></li>
          </ul>
        </div>
      </div>
      <div class="">
        <button type="button" class="btn">價格由低到高</button>
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
            :prev-is-enabled="productPagesData.pagination.hasPrevPage"
            :next-is-enabled="productPagesData.pagination.hasNextPage"
            :totalPage="productPagesData.pagination.totalPage"
            :current-page="productPagesData.pagination.currentPage"
            @change-prev-page="goToChangePage(productPagesData.pagination.currentPage - 1)"
            @change-next-page="goToChangePage(productPagesData.pagination.currentPage + 1)"
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
    goToChangePage(page) {
      this.pagination(page);
    },
    ...mapActions(productsStore, ['getProductsAll', 'getProduct', 'pagination']),
  },
  computed: {
    ...mapState(productsStore, ['isLoading', 'productPagesData']),
  },
  mounted() {
    this.goToGetProductsAll();
  },
};
</script>
<style></style>
