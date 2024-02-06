<template>
  <VueLoading v-if="isLoading" 
              :active="isLoading" 
              :background-color="'#EBEAE4'" 
              :is-full-page="true" 
              :color="'#52504B'" />
  <div v-else class="container bg-main-medium rounded-10em mt-5 mb-5 px-5r py-7r">
      <div class="row">
        <!-- sort title -->
        <div class="col-8">
          <h1 class="mb-3">所有商品</h1>
        </div>
        <div class="col-4">
          <!-- search product -->
          <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="搜尋產品...">
        </div>
      </div>
      <!-- dropDown/sort -->
      <div class="d-flex justify-content-between">
        <div class="border-start border-dark border-2">
          <!-- 類別 -->
          <div class="btn-group ms-3">
            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              類別
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">全部</a></li>
              <li><a class="dropdown-item" href="#">香氛蠟燭</a></li>
              <li><a class="dropdown-item" href="#">香氛蠟燭</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="#">香氛蠟燭</a></li>
            </ul>
          </div>
          <!-- 系列 -->
          <div class="btn-group">
            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              系列
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">全部</a></li>
              <li><a class="dropdown-item" href="#">花香調</a></li>
              <li><a class="dropdown-item" href="#">花香調</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="#">花香調</a></li>
            </ul>
          </div>
          <!-- 調性 -->
          <div class="btn-group">
            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              調性
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">全部</a></li>
              <li><a class="dropdown-item" href="#">花香調</a></li>
              <li><a class="dropdown-item" href="#">花香調</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="#">花香調</a></li>
            </ul>
          </div>
          <!-- 容量 -->
          <div class="btn-group">
            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              容量
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">全部</a></li>
              <li><a class="dropdown-item" href="#">花香調</a></li>
              <li><a class="dropdown-item" href="#">花香調</a></li>
              <li>
                <hr class="dropdown-divider">
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
      <div class="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 mt-3 mb-3">
        <div class="col mb-3" v-for="item in productsData" :key="item.id">
          <div class="card" @click="changeToProductPage(item.id)">
            <img :src="item.imageUrl" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-text">{{item.unit}}</p>
              <h6 class="card-title">{{item.title}}</h6>
              <p class="card-text">NT${{item.price}}</p>
            </div>
          </div>
        </div>

      </div>

  </div>
</template>
<script>
  import { mapState, mapActions } from 'pinia';
  import productsStore from '../../stores/productsStore.js';
  export default {
    data() {
      return {

      }
    },
    methods: {
      ...mapActions(productsStore, ['getProductsAll', 'getProduct', 'changeToProductPage']),
    },
    computed: {
      ...mapState(productsStore, ['isLoading','productsData']),
    },
    mounted() {
      this.getProductsAll();
    },
  };
</script>
<style>
</style>