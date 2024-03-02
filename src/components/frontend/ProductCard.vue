<template>
  <div class="card" @click="changeToProductPage(item.id)">
    <div class="myImage">
      <img
        v-if="item.imagesUrl === undefined"
        :src="item.imageUrl"
        class="card-img-top"
        :alt="item.title"
      />
      <img
        v-else
        :ref="`productImage${item.id}`"
        @mouseover="changeImage(`productImage${item.id}`, item.imagesUrl[0])"
        @mouseout="changeImage(`productImage${item.id}`, item.imageUrl)"
        :src="item.imageUrl"
        class="card-img-top"
        :alt="item.title"
      />
    </div>
    <div class="card-body">
      <p class="card-text">{{ item.unit }}</p>
      <p class="card-title fw-medium">{{ item.title }}</p>
      <h5 v-if="item.price === item.origin_price" class="card-text fw-bolder">
        NT${{ item.price }}
      </h5>
      <div class="d-flex align-items-end" v-else>
        <h6 class="me-3 text-decoration-line-through text-deep-gray">NT${{ item.origin_price }}</h6>
        <h5 class="text-main-spec fw-bolder">NT${{ item.price }}</h5>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      item: {},
    };
  },
  props: ['product'],
  emits: [],
  methods: {
    changeImage(ref, imageUrl) {
      this.$refs[ref].src = imageUrl;
    },
    // 跳轉至產品頁面
    changeToProductPage(id) {
      this.$router.push({
        name: 'product',
        params: { id },
      });
    },
  },
  watch: {
    product() {
      this.item = JSON.parse(JSON.stringify(this.product));
    },
  },
  mounted() {
    this.item = JSON.parse(JSON.stringify(this.product));
  },
};
</script>
<style scoped>
.myImage {
  width: 100%;
  overflow: hidden;
}
.myImage img {
  transform: scale(1, 1);
  transition: all 1s ease-out;
  display: block;
}
.myImage img:hover {
  transform: scale(1.2, 1.2);
}
</style>
