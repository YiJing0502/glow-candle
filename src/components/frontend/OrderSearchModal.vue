<template>
  <!-- Modal -->
  <div
    ref="modal"
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">搜尋訂單</h1>
          <button
            @click="defaultSearchForm"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <vee-form ref="form" @submit="searchOrder(keyword)" v-slot="{ errors }">
              <div class="d-flex align-items-center mb-3">
                <div class="w-100">
                  <label for="orderList" class="form-label">請在此輸入「訂單編號」</label>
                  <vee-field
                    @keyup.enter="searchOrder(keyword)"
                    v-model="keyword"
                    id="orderList"
                    rules="required"
                    name="訂單編號"
                    class="form-control"
                    :class="{ 'is-invalid': errors['訂單編號'] }"
                    placeholder="輸入訂單編號"
                  />
                  <vee-error-message class="invalid-feedback" name="訂單編號"></vee-error-message>
                </div>
              </div>
              <div v-if="isLoading">
                <DotLoading></DotLoading>
              </div>
              <button
                v-else
                type="submit"
                class="btn btn-solid-spec rounded-3 d-flex align-items-center justify-content-center w-100"
              >
                查詢
                <span class="material-icons-outlined fs-3">search</span>
              </button>
            </vee-form>
          </div>
          <div
            class="d-flex flex-column align-items-center justify-content-center"
            v-if="notFoundOrder"
          >
            <span class="material-icons-round fs-1">announcement</span>
            <p class="text-center">
              找不到與「{{ keyword }}」相符的結果。<br />
              請檢查拼字並再次搜尋。
            </p>
          </div>
          <div v-if="order !== null">
            <span>已查詢到您的訂單：點擊訂單可查看更多資訊</span>
            <button @click="goToPage(order?.id)" type="button" class="btn btn-outline-mdgray">
              {{ order?.user?.name }} / {{ timestamp10CodeToDay(order?.create_at) }} 成立 / 總金額
              {{ order?.total }} / {{ order?.is_paid ? '已付款' : '尚未付款' }}
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button
            @click="defaultSearchForm"
            type="button"
            class="btn btn btn-normal-dpgray"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from 'bootstrap';
import { mapActions } from 'pinia';
import pageStore from '../../stores/pageStore';
import timeStore from '../../stores/timeStore';

import DotLoading from '../DotLoading.vue';

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      keyword: '',
      order: null,
      totalPages: 0,
      notFoundOrder: false,
      isLoading: false,
    };
  },
  components: {
    DotLoading,
  },
  computed: {},
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    async searchOrder(keyword) {
      this.notFoundOrder = false;
      this.order = null;
      this.isLoading = true;
      let page = 1;
      const firstRes = await this.getOrders(page);
      const findData = async () => {
        const data = this.orders.find((order) => order.id === keyword);
        if (data === undefined && page < this.totalPages) {
          page += 1;
          const res = await this.getOrders(page);
          if (res) {
            findData(); // 遞歸調用查找方法
          }
        } else if (data === undefined && page === this.totalPages) {
          // no data
          this.notFoundOrder = true;
          this.isLoading = false;
        } else {
          this.order = data;
          this.keyword = '';
          this.resetSearchForm();
          this.notFoundOrder = false;
          this.isLoading = false;
        }
      };
      if (firstRes) {
        findData();
      }
    },
    getOrders(page) {
      return new Promise((resolve, reject) => {
        const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/orders`;
        this.$http
          .get(url, { params: { page } })
          .then((res) => {
            this.orders = res.data.orders;
            this.totalPages = res.data.pagination.total_pages;
            resolve(true);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    goToPage(id) {
      this.changeNowPage('order');
      this.$router.push({
        name: 'order',
        params: { id },
      });
      this.hideModal();
      this.defaultSearchForm();
    },
    defaultSearchForm() {
      this.notFoundOrder = false;
      this.keyword = '';
      this.order = null;
      this.resetSearchForm();
    },
    resetSearchForm() {
      // 使用 VeeValidate 提供的 resetForm 方法來重設表單的驗證狀態
      this.$refs.form.resetForm();
    },
    ...mapActions(pageStore, ['changeNowPage']),
    ...mapActions(timeStore, ['timestamp10CodeToDay']),
  },
  mounted() {
    // 獲取  DOM
    // 建立 bootstrap modal 實體
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>
