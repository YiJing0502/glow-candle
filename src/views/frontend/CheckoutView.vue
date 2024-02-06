<template>
  <div>
    <h2>checkout</h2>
  </div>
</template>
<script>
  import { mapActions, mapState } from 'pinia';
  import ordersStore from '@/stores/ordersStore';
  import cartsStore from '@/stores/cartsStore';
  // component
  import QuantityControlButtons from '@/components/QuantityControlButtons.vue';
  
  export default {
    
  };
</script>
<style>
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
</style>
