<template>
  <!-- 上一頁 -->
  <li class="page-item"><button type="button" class="page-link" :class="{disabled: !prevIsEnabled,}" @click="$emit('change-page')">Previous</button></li>
  <!-- 頁數 -->
  <li class="page-item"><button type="button" class="page-link" :class="{active: currentPage == page}" :data-page="page"  @click="$emit('change-page', page)">{{page}}</button></li>
  <!-- 下一頁 -->
  <li class="page-item"><button type="button" class="page-link" :class="{disabled: !nextIsEnabled,}" @click="$emit('change-page')">Next</button></li>
</template>

<script>
export default {
  props: ['page', 'currentPage', 'nextIsEnabled', 'prevIsEnabled'],
  emits: ['change-page'],
}
</script>