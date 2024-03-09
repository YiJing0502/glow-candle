<template>
  <VueLoading
    :active="true"
    :background-color="'#fbfaf4'"
    :is-full-page="true"
    :color="'#52504B'"
    :opacity="1"
  >
    <img class="p-1" src="/glow-logo.png" alt="glow-logo" width="50" />
    <DotLoading></DotLoading>
  </VueLoading>
</template>
<script>
import DotLoading from './DotLoading.vue';

export default {
  components: {
    DotLoading,
  },
};
</script>
