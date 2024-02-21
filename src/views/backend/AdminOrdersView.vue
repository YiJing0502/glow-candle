<template>
  <VueLoading
    v-if="isLoading"
    :active="isLoading"
    :background-color="'#FBFAF4'"
    :color="'#52504B'"
  />
  <div v-else class="container">
    <StatusMessage class="mt-4" v-if="adminOrdersData.orders?.length === 0">{{
      '需等待訂單進入。'
    }}</StatusMessage>
    <div
      class="row mt-4"
      v-if="adminOrdersData.orders?.length * adminOrdersData.pagination?.total_pages > 1"
    >
      <div class="col d-flex justify-content-end">
        <button type="button" class="btn btn-solid-spec" @click="getAdminDelOrdersModal">
          刪除所有訂單
        </button>
      </div>
    </div>
    <table v-if="adminOrdersData.orders?.length !== 0" class="table mt-4">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">創立日期</th>
          <th scope="col">付款狀態</th>
          <th scope="col">收件人名稱</th>
          <th scope="col">電子信箱</th>
          <th scope="col">行動電話號碼</th>
          <th scope="col">收件地址</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in adminOrdersData.orders" :key="item.id">
          <th scope="row">{{ item.num }}</th>
          <td>{{ timestamp10CodeToDay(item.create_at) }}</td>
          <td>
            <span v-if="item.is_paid" class="text-main-spec fw-bold">已付款</span>
            <span v-else class="text-deep-gray">未付款</span>
          </td>
          <td>{{ item.user.name }}</td>
          <td>{{ item.user.email }}</td>
          <td>{{ item.user.tel }}</td>
          <td>{{ item.user.address }}</td>
          <td>
            <div class="d-flex justify-content-start align-items-center">
              <button
                class="btn btn-sm btn-normal-medium block w-50"
                type="button"
                @click="getAdminDelOrderModal(item.id)"
              >
                刪除
              </button>
              <button
                class="btn btn-sm btn-normal-medium block w-50"
                type="button"
                @click="getAdminOrderModal(item.id)"
              >
                查看
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="adminOrdersData && adminOrdersData.pagination && adminOrdersData.orders?.length !== 0"
      class="d-flex justify-content-center mt-4"
    >
      <nav aria-label="Page navigation example">
        <ul class="pagination" id="pageid">
          <PageBtn
            :prev-is-enabled="adminOrdersData.pagination.has_pre"
            :next-is-enabled="adminOrdersData.pagination.has_next"
            :totalPage="adminOrdersData.pagination.total_pages"
            :current-page="adminOrdersData.pagination.current_page"
            @change-prev-page="getAdminOrders(adminOrdersData.pagination.current_page - 1)"
            @change-next-page="getAdminOrders(adminOrdersData.pagination.current_page + 1)"
            @change-page="goToChangePage"
          ></PageBtn>
        </ul>
      </nav>
    </div>
  </div>
  <!-- 訂單modal -->
  <OrderModal ref="orderModal" :show-data="showData" @order-updated="getAdminOrders"></OrderModal>
  <!-- 刪除「單筆」訂單Modal -->
  <DeleteModal
    ref="deleteOrderModal"
    :show-data="showData"
    @delete-function="deleteAdminOrder"
  ></DeleteModal>
  <!-- 刪除「所有」訂單Modal -->
  <DeleteModal ref="deleteOrdersModal" :show-data="showData" @delete-function="deleteAdminOrders">
  </DeleteModal>
  <!-- 結果modal -->
  <ResultModal ref="resultModal" :server-message="serverMessage"></ResultModal>
</template>

<script>
import { mapActions } from 'pinia';
import timeStore from '../../stores/timeStore';
import toastsStore from '../../stores/toastsStore';

import PageBtn from '../../components/PageBtn.vue';
import OrderModal from '../../components/backend/OrderModal.vue';
import DeleteModal from '../../components/backend/DeleteModal.vue';
import StatusMessage from '../../components/backend/StatusMessage.vue';

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      // 是否為載入中
      isLoading: false,
      // 所有訂單資料
      adminOrdersData: [],
      // 提示訊息
      serverMessage: {
        message: '',
        success: true,
      },
      showData: {},
    };
  },
  components: {
    PageBtn,
    OrderModal,
    DeleteModal,
    StatusMessage,
  },
  computed: {},
  methods: {
    // fn, 尋找特定一筆訂單
    getOrderData(id) {
      const orderData = this.adminOrdersData.orders.find((item) => item.id === id);
      this.showData = orderData;
    },
    // fn, 打開查看訂單的Modal
    getAdminOrderModal(id) {
      this.getOrderData(id);
      this.$refs.orderModal.openModal();
    },
    // fn, 切換頁數
    goToChangePage(page) {
      this.getAdminOrders(page);
    },
    // fn, 打開刪除「所有」訂單的Modal
    getAdminDelOrdersModal() {
      this.showData = { title: '所有訂單' };
      this.$refs.deleteOrdersModal.openModal();
    },
    // ajax, 刪除所有訂單
    deleteAdminOrders() {
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/orders/all`;
      this.$http
        .delete(url)
        .then((res) => {
          this.getAdminOrders();
          this.$refs.deleteOrdersModal.hideModal();
          this.pushToast({
            title: res.data.message,
            style: 'bg-deep-gray',
          });
        })
        .catch((err) => {
          this.handleServerResponse(false, err.response.data.message);
        });
    },
    // fn, 打開刪除「單一筆」訂單的Modal
    getAdminDelOrderModal(id) {
      this.getOrderData(id);
      this.$refs.deleteOrderModal.openModal();
    },
    // ajax, 刪除單一筆訂單
    deleteAdminOrder() {
      const { id } = this.showData;
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/order/${id}`;
      this.$http
        .delete(url)
        .then((res) => {
          this.getAdminOrders();
          this.$refs.deleteOrderModal.hideModal();
          this.pushToast({
            title: res.data.message,
            style: 'bg-deep-gray',
          });
        })
        .catch((err) => {
          this.handleServerResponse(false, err.response.data.message);
        });
    },
    // ajax, 取得訂單
    getAdminOrders(page = 1) {
      const strPage = page.toString();
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/orders`;
      this.$http
        .get(url, {
          params: {
            page: strPage,
          },
        })
        .then((res) => {
          this.adminOrdersData = res.data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.handleServerResponse(false, err.response.data.message);
        });
    },
    // 處理 伺服器 訊息
    handleServerResponse(success, message) {
      this.serverMessage.success = success;
      this.serverMessage.message = message;
      this.$refs.resultModal.openModal();
    },
    ...mapActions(timeStore, ['dayToTimestamp10Code', 'timestamp10CodeToDay']),
    ...mapActions(toastsStore, ['pushToast']),
  },
  mounted() {
    this.isLoading = true;
    this.getAdminOrders();
  },
};
</script>
