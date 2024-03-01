<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
       class="accordion-button collapsed fs-5 fw-bolder"
        type="button"
        data-bs-toggle="collapse" :data-bs-target="`#${uniqueId}`"
        @click="show = !show"
        :aria-expanded="show" :aria-controls="uniqueId"
         >
        <slot name="header"></slot>
      </button>
    </h2>
    <div
      :id="uniqueId"
      class="accordion-collapse collapse"
      >
      <div class="accordion-body">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  props: ['uniqueId'],
};
</script>
