<template>
  <!-- 優惠券modal -->
  <div
    class="modal fade"
    ref="modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <vee-form
          ref="form"
          @submit="inEditCouponMode ? putAdminCoupon() : postAdminCoupon()"
          v-slot="{ errors }"
        >
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              {{ inEditCouponMode ? '編輯優惠券' : '新增優惠券' }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-10">
                <div class="mb-3">
                  <label for="coupon_title" class="form-label"
                    >標題
                    <span class="text-main-spec fw-bold">*</span>
                  </label>
                  <vee-field
                    type="text"
                    name="標題"
                    class="form-control"
                    :class="{ 'is-invalid': errors['標題'] }"
                    rules="required|max:100"
                    id="coupon_title"
                    placeholder="請輸入標題"
                    v-model="updatedShowData.title"
                  />
                  <vee-error-message class="invalid-feedback" name="標題"></vee-error-message>
                </div>
              </div>
              <div class="col-2 d-flex align-items-center">
                <div class="form-check mt-3">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="is_enabled"
                    :true-value="1"
                    :false-value="0"
                    v-model="updatedShowData.is_enabled"
                  />
                  <label for="is_enabled" class="form-check-label">
                    <span v-if="updatedShowData.is_enabled === 1" class="text-main-spec fw-bold"
                      >啟用</span
                    >
                    <span v-else class="text-deep-gray">未啟用</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col mb-3">
                <label for="coupon_due_date" class="form-label"
                  >到期日
                  <span class="text-main-spec fw-bold">*</span>
                </label>
                <vee-field
                  type="date"
                  name="到期日"
                  class="form-control"
                  :class="{ 'is-invalid': errors['到期日'] }"
                  rules="required"
                  id="coupon_due_date"
                  placeholder="請輸入到期日"
                  v-model="updatedShowData.due_date"
                  :min="currentDate"
                />
                <vee-error-message class="invalid-feedback" name="到期日"></vee-error-message>
              </div>
              <div class="col mb-3">
                <label for="coupon_percent" class="form-label"
                  >折扣
                  <span class="text-main-spec fw-bold">*</span>
                </label>
                <vee-field
                  type="number"
                  name="折扣"
                  class="form-control"
                  :class="{ 'is-invalid': errors['折扣'] }"
                  rules="required|numeric|integer|min_value:1|max_value:100"
                  id="coupon_percent"
                  placeholder="請輸入折扣"
                  v-model="updatedShowData.percent"
                />
                <vee-error-message class="invalid-feedback" name="折扣"></vee-error-message>
              </div>
              <div class="col mb-3">
                <label for="coupon_code" class="form-label"
                  >折扣代碼
                  <span class="text-main-spec fw-bold">*</span>
                </label>
                <vee-field
                  type="text"
                  name="折扣代碼"
                  class="form-control"
                  :class="{ 'is-invalid': errors['折扣代碼'] }"
                  rules="required|max:100"
                  id="coupon_code"
                  placeholder="請輸入折扣代碼"
                  v-model="updatedShowData.code"
                />
                <vee-error-message class="invalid-feedback" name="折扣代碼"></vee-error-message>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-normal-dpgray" data-bs-dismiss="modal">
              關閉
            </button>
            <button type="submit" class="btn btn-solid-spec">
              {{ inEditCouponMode ? '更新' : '新增' }}
            </button>
          </div>
        </vee-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'pinia';
import { Modal } from 'bootstrap';
import timeStore from '../../stores/timeStore';

export default {
  data() {
    return {
      modal: '',
      updatedShowData: {},
    };
  },
  methods: {
    resetAddForm() {
      // 使用 VeeValidate 提供的 resetForm 方法來重設表單的驗證狀態
      this.$refs.form.resetForm();
    },
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
