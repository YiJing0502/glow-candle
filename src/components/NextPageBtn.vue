<template>
  <li class="page-item"><button type="button" class="page-link" :class="{disabled: !isEnabled,}" @click="$emit('change-page')">Next</button></li>
</template>

<script>
export default {
  props: ['isEnabled',],
  emits: ['change-page',],
}
</script>