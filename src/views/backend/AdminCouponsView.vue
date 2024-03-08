<template>
  <PageLoading v-if="!getRemoteData"></PageLoading>
  <div v-else class="container">
    <div class="row mt-4">
      <div class="col d-flex justify-content-end">
        <button type="button" class="btn btn-solid-spec" @click="getAdminAddCouponModal">
          建立新的優惠券
        </button>
      </div>
    </div>
    <status-message v-if="couponsData.length === 0">{{
      '請點擊「建立新的優惠券」新增資料'
    }}</status-message>
    <table class="table mt-4 align-middle" v-else>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">優惠券名稱</th>
          <th scope="col">折扣</th>
          <th scope="col">到期日</th>
          <th scope="col">代碼</th>
          <th scope="col">是否啟用</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in couponsData" :key="item.id">
          <th>{{ item.num }}</th>
          <th>{{ item.title }}</th>
          <td>{{ item.percent }}</td>
          <td>{{ couponsDueDateMessage(item.due_date) }}</td>
          <td>{{ item.code }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-main-spec fw-bold">啟用</span>
            <span v-else class="text-deep-gray">未啟用</span>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-sm btn-normal-medium block w-50"
              @click="getAdminDeleCouponModal(index)"
            >
              刪除
            </button>
            <button
              type="button"
              class="btn btn-sm btn-normal-medium block w-50"
              @click="getAdminCouponModal(index)"
            >
              編輯
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="pagination && pagination.current_page" class="d-flex justify-content-center mt-4">
      <nav aria-label="Page navigation example">
        <ul class="pagination" id="pageid">
          <PageBtn
            :prev-is-enabled="pagination.has_pre"
            :next-is-enabled="pagination.has_next"
            :totalPage="pagination.total_pages"
            :current-page="pagination.current_page"
            @change-prev-page="getAdminCoupons(pagination.current_page - 1)"
            @change-next-page="getAdminCoupons(pagination.current_page + 1)"
            @change-page="goToChangePage"
          ></PageBtn>
        </ul>
      </nav>
    </div>
  </div>
  <!-- 優惠券modal -->
  <CouponModal
    ref="couponModal"
    :in-edit-coupon-mode="inEditCouponMode"
    :show-data="showData"
    @post-admin-coupon="postAdminCoupon"
    @put-admin-coupon="putAdminCoupon"
  ></CouponModal>
  <!-- 刪除產品Modal -->
  <DeleteModal
    ref="deleteModal"
    :show-data="showData"
    @delete-function="deleteAdminCoupon"
  ></DeleteModal>
</template>
<script>
// pinia
import { mapState, mapActions } from 'pinia';
import timeStore from '../../stores/timeStore';
import alertStore from '../../stores/alertStore';
// components
import StatusMessage from '../../components/backend/StatusMessage.vue';
import DeleteModal from '../../components/backend/DeleteModal.vue';
import CouponModal from '../../components/backend/CouponModal.vue';
import PageBtn from '../../components/PageBtn.vue';
import toastsStore from '../../stores/toastsStore';

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      getRemoteData: false,
      couponsData: [],
      pagination: {},
      showData: {},
      inEditCouponMode: true,
    };
  },
  components: {
    StatusMessage,
    DeleteModal,
    CouponModal,
    PageBtn,
  },
  methods: {
    // modal, 打開新增優惠券modal
    getAdminAddCouponModal() {
      this.inEditCouponMode = false;
      this.showData = {};
      this.$refs.couponModal.resetAddForm();
      this.$refs.couponModal.openModal();
    },
    // modal, 打開編輯優惠券modal
    getAdminCouponModal(index) {
      this.inEditCouponMode = true;
      this.showData = JSON.parse(JSON.stringify(this.couponsData[index]));
      this.showData.due_date = this.timestamp10CodeToDay(this.showData.due_date);
      this.$refs.couponModal.openModal();
    },
    // modal, 打開刪除優惠券modal
    getAdminDeleCouponModal(index) {
      this.showData = JSON.parse(JSON.stringify(this.couponsData[index]));
      this.$refs.deleteModal.openModal();
    },
    // fn, 切換頁數
    goToChangePage(page) {
      this.getAdminCoupons(page);
    },
    // ajax, 取得coupons
    getAdminCoupons(page = 1) {
      const strPage = page.toString();
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/coupons`;
      this.$http
        .get(url, { params: { page: strPage } })
        .then((res) => {
          this.getRemoteData = res.data.success;
          this.couponsData = res.data.coupons;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          this.showAlertMessage(false, err.response.data.message);
        });
    },
    // ajax, 新增coupon
    postAdminCoupon(updatedData) {
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/coupon`;
      const data = {
        data: updatedData,
      };
      data.data.due_date = this.dayToTimestamp10Code(updatedData.due_date);
      if (data.data.is_enabled === undefined) {
        data.data.is_enabled = 2;
      }
      this.$http
        .post(url, data)
        .then((res) => {
          this.getAdminCoupons();
          this.$refs.couponModal.hideModal();
          this.pushToast({
            title: res.data.message,
            style: 'bg-deep-gray',
          });
        })
        .catch((err) => {
          this.showAlertMessage(false, err.response.data.message);
        });
    },
    // ajax, 修改coupon
    putAdminCoupon(updatedData) {
      const { id } = updatedData;
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/coupon/${id}`;
      const data = {
        data: updatedData,
      };
      data.data.due_date = this.dayToTimestamp10Code(updatedData.due_date);
      this.$http
        .put(url, data)
        .then((res) => {
          this.getAdminCoupons();
          this.$refs.couponModal.hideModal();
          this.pushToast({
            title: res.data.message,
            style: 'bg-deep-gray',
          });
        })
        .catch((err) => {
          this.showAlertMessage(false, err.response.data.message);
        });
    },
    // ajax, 刪除coupon
    deleteAdminCoupon() {
      const { id } = this.showData;
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/coupon/${id}`;
      this.$http
        .delete(url)
        .then((res) => {
          this.getAdminCoupons();
          this.$refs.deleteModal.hideModal();
          this.pushToast({
            title: res.data.message,
            style: 'bg-deep-gray',
          });
        })
        .catch((err) => {
          this.showAlertMessage(false, err.response.data.message);
        });
    },
    // fn, 處理coupon到期日的顯示狀態
    couponsDueDateMessage(dueDate) {
      const timestampCurrentDate = this.dayToTimestamp10Code(this.currentDate);
      const dueDateDay = this.timestamp10CodeToDay(dueDate);
      if (dueDate < timestampCurrentDate) {
        return `${dueDateDay} (已過期)`;
      }
      if (dueDate > timestampCurrentDate) {
        return `${dueDateDay}`;
      }
      return `${dueDateDay} (今天過期)`;
    },
    ...mapActions(timeStore, ['dayToTimestamp10Code', 'timestamp10CodeToDay']),
    ...mapActions(toastsStore, ['pushToast']),
    ...mapActions(alertStore, ['showAlertMessage']),
  },
  computed: {
    ...mapState(timeStore, ['currentDate']),
  },
  mounted() {
    this.getAdminCoupons();
  },
};
</script>
