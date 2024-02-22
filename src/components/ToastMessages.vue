<template>
  <div class="toast-container end-0 p-3 fixed" style="z-index: 1500">
    <!-- Then put toasts within -->
    <div
      v-for="(msg, index) in toastMessages"
      :key="`toast${index}`"
      class="toast show"
      :class="`toast${index}`"
      role="alert"
    >
      <div class="toast-header">
        <span :class="`${msg.style}`" class="p-2 rounded me-2"></span>
        <strong class="me-auto">{{ msg.title }}</strong>
        <small class="text-body-secondary">剛剛</small>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="clearToast(index)"
        ></button>
      </div>
      <div v-if="msg.content" class="toast-body">{{ msg.content }}</div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import toastsStore from '../stores/toastsStore';

export default {
  computed: {
    ...mapState(toastsStore, ['toastMessages']),
  },
  methods: {
    ...mapActions(toastsStore, ['clearToast']),
  },
};
</script>
<style scoped>
.fixed {
  position: fixed;
  top: 67px;
}
</style>
