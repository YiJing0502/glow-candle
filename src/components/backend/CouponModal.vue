<template>
  <!-- 優惠券modal -->
  <div class="modal fade" ref="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
      data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{inEditCouponMode ? '編輯優惠券' : '新增優惠券'}}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-10">
              <div class="mb-3">
                <label for="coupon_title" class="form-label">標題</label>
                <input type="text" class="form-control" id="coupon_title" placeholder="請輸入標題"
                  v-model="updatedShowData.title">
              </div>
            </div>
            <div class="col-2 d-flex align-items-center">
              <div class="form-check mt-3">
                <input type="checkbox" class="form-check-input" id="is_enabled" :true-value="1" :false-value="0"
                  v-model="updatedShowData.is_enabled">
                <label for="is_enabled" class="form-check-label">
                  <span v-if="updatedShowData.is_enabled === 1" class="text-main-spec fw-bold">啟用</span>
                  <span v-else class="text-deep-gray">未啟用</span>
                </label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col mb-3">
              <label for="coupon_due_date" class="form-label">到期日</label>
              <input type="date" class="form-control" id="coupon_due_date" placeholder="請輸入到期日"
                v-model="updatedShowData.due_date" :min="currentDate">
            </div>
            <div class="col mb-3">
              <label for="coupon_percent" class="form-label">折扣</label>
              <input type="number" class="form-control" id="coupon_percent" placeholder="請輸入折扣"
                v-model="updatedShowData.percent">
            </div>
            <div class="col mb-3">
              <label for="coupon_code" class="form-label">折扣代碼</label>
              <input type="text" class="form-control" id="coupon_code" placeholder="請輸入折扣代碼" v-model="updatedShowData.code">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-normal-dpgray" data-bs-dismiss="modal">關閉</button>
          <button type="button" class="btn btn-solid-spec"
            @click="inEditCouponMode ? putAdminCoupon() : postAdminCoupon()">{{inEditCouponMode ? '更新' :
            '新增'}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// pinia
import { mapState } from 'pinia';
import { Modal } from 'bootstrap';
import timeStore from '@/stores/timeStore';
// modal

export default {
  data() {
    return {
      modal: '',
      updatedShowData: {},
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    putAdminCoupon() {
      this.$emit('put-admin-coupon', this.updatedShowData);
    },
    postAdminCoupon() {
      this.$emit('post-admin-coupon', this.updatedShowData);
    },
  },
  computed: {
    ...mapState(timeStore, ['currentDate']),
  },
  watch: {
    showData() {
      this.updatedShowData = JSON.parse(JSON.stringify(this.showData));
    },
  },
  props: ['inEditCouponMode', 'showData'],
  emits: ['put-admin-coupon', 'post-admin-coupon'],
  mounted() {
    // 獲取 bsResultModal DOM
    // 建立 bootstrap modal 實體
    this.modal = new Modal(this.$refs.modal);
    this.updatedShowData = JSON.parse(JSON.stringify(this.showData));
  },
};
</script>
