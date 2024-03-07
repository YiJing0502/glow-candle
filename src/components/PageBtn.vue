<template>
  <!-- 上一頁 -->
  <li class="page-item">
    <button
      type="button"
      class="page-link d-flex align-items-center"
      :class="{ disabled: !prevIsEnabled }"
      @click="$emit('change-prev-page')"
    >
      <span class="material-icons">chevron_left</span>
    </button>
  </li>
  <!-- 頁數 -->
  <li v-for="page in totalPage" :key="page" class="page-item">
    <button
      type="button"
      class="page-link"
      :class="{ active: currentPage == page }"
      :data-page="page"
      @click="$emit('change-page', page)"
    >
      {{ page }}
    </button>
  </li>
  <!-- 下一頁 -->
  <li class="page-item">
    <button
      type="button"
      class="page-link d-flex align-items-center"
      :class="{ disabled: !nextIsEnabled }"
      @click="$emit('change-next-page')"
    >
      <span class="material-icons">chevron_right</span>
    </button>
  </li>
</template>

<script>
export default {
  props: ['totalPage', 'currentPage', 'nextIsEnabled', 'prevIsEnabled'],
  emits: ['change-page', 'change-prev-page', 'change-next-page'],
};
</script>
