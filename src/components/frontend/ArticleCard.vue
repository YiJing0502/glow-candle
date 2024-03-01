<template>
  <div class="card">
    <div class="myImage rounded">
      <img :src="item.imageUrl" class="card-img-top" :alt="item.title">
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ item.title }}</h5>
      <h6>{{ timestamp10CodeToDay(item.create_at) }}</h6>
      <!-- 選擇性內容 -->
      <slot></slot>
      <!-- 選擇性內容 -->
    </div>
  </div>
</template>
<script>
import { mapActions } from 'pinia';
import timeStore from '../../stores/timeStore';

export default {
  data() {
    return {
      item: {},
    };
  },
  props: ['article'],
  watch: {
    article() {
      this.item = JSON.parse(JSON.stringify(this.article));
    },
  },
  methods: {
    ...mapActions(timeStore, ['timestamp10CodeToDay']),
  },
  mounted() {
    this.item = JSON.parse(JSON.stringify(this.article));
  },
};
</script>
<style scoped>
.myImage{width:100%;overflow:hidden;}
.myImage img{transform:scale(1,1);transition: all 1s ease-out;display: block;}
.myImage img:hover{transform:scale(1.2,1.2);}
</style>
