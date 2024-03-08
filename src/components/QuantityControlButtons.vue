<template>
  <div class="">
    <div class="bg-white d-flex mb-3 border btns-max-width">
      <button :disabled="currentNum === 1" type="button" class="btn" @click="minusNum">-</button>
      <input
        type="number"
        class="form-control border-white shadow-none text-center fw-bold"
        v-model.number="currentNum"
        @blur="blurNum"
      />
      <button :disabled="currentNum === inventory" type="button" class="btn" @click="plusNum">
        +
      </button>
    </div>
    <p class="d-flex align-items-end">目前庫存：{{ inventory }}</p>
  </div>
</template>
<script>
import { mapActions } from 'pinia';
import alertStore from '../stores/alertStore';

export default {
  data() {
    return {
      currentNum: 1,
      currentQty: 1,
    };
  },
  props: ['inventory', 'id', 'qty', 'productCartId'],
  emits: ['putNum'],
  methods: {
    // 按鈕, 增加數量
    plusNum() {
      this.currentNum = parseInt(this.currentNum, 10);
      if (this.currentNum >= 1 && this.currentNum < this.inventory) {
        this.currentNum += 1;
        this.$emit('putNum', this.productCartId, this.id, this.currentNum);
        return;
      }
      if (this.currentNum >= this.inventory) {
        this.showAlertMessage(false, '很抱歉，不能超出此庫存量');
      }
    },
    // 按鈕, 減少數量
    minusNum() {
      this.currentNum = parseInt(this.currentNum, 10);
      if (this.currentNum > 1) {
        this.currentNum -= 1;
        this.$emit('putNum', this.productCartId, this.id, this.currentNum);
        return;
      }
      if (this.currentNum <= 1) {
        this.showAlertMessage(false, '很抱歉，最低數量為1');
      }
    },
    // 輸入, 自訂數量
    blurNum(e) {
      this.currentNum = parseInt(e.target.value, 10);
      if (this.currentNum > this.inventory) {
        this.currentNum = this.inventory;
        this.$emit('putNum', this.productCartId, this.id, this.currentNum);
        this.showAlertMessage(false, '很抱歉，不能超出此庫存量');
        return;
      }
      if (this.currentNum <= 0) {
        this.currentNum = 1;
        this.$emit('putNum', this.productCartId, this.id, this.currentNum);
        this.showAlertMessage(false, '很抱歉，最低數量為1');
        return;
      }
      if (this.currentNum === this.currentQty) {
        return;
      }
      if (Number.isNaN(this.currentNum)) {
        this.showAlertMessage(false, '請輸入有效的數字');
        this.currentNum = this.currentQty;
        return;
      }
      this.$emit('putNum', this.productCartId, this.id, this.currentNum);
    },
    ...mapActions(alertStore, ['showAlertMessage']),
  },
  watch: {
    qty(newQty) {
      this.currentNum = newQty;
      this.currentQty = newQty;
    },
  },
  mounted() {
    if (this.qty > this.inventory) {
      this.$emit('putNum', this.productCartId, this.id, this.inventory);
    }
    this.currentNum = this.qty;
    this.currentQty = this.qty;
  },
};
</script>
<style scoped>
.btns-max-width {
  max-width: 250px;
}
</style>
