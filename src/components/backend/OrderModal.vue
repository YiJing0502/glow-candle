<template>
  <!-- Modal -->
  <div
    ref="modal"
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            訂單編號｜{{ updatedShowData.id }}
          </h1>
          <div class="">
            <button
              v-if="!inEditOrderMode"
              type="button"
              class="btn"
              @click="inEditOrderMode = true"
            >
              編輯訂單
            </button>
            <button v-if="inEditOrderMode" disabled type="button" class="btn">編輯訂單中</button>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
        </div>
        <div class="modal-body" v-if="updatedShowData.user">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                class="nav-link active w-50"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                訂單資訊
              </button>
              <button
                class="nav-link w-50"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                訂購資訊
              </button>
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
              tabindex="0"
            >
              <div class="row mt-3">
                <div v-if="!inEditOrderMode" class="col-8">
                  <div>
                    <h6><strong>收件人名稱</strong></h6>
                    <p>{{ updatedShowData.user.name }}</p>
                  </div>
                  <div>
                    <h6><strong>電子信箱</strong></h6>
                    <p>{{ updatedShowData.user.email }}</p>
                  </div>
                  <div>
                    <h6><strong>行動電話號碼</strong></h6>
                    <p>{{ updatedShowData.user.tel }}</p>
                  </div>
                  <div>
                    <h6><strong>收件地址</strong></h6>
                    <p>{{ updatedShowData.user.address }}</p>
                  </div>
                  <div>
                    <h6><strong>訂單備註</strong></h6>
                    <div v-if="this.updatedShowData.message">
                      <p v-for="(item, index) in showOrderMessage" :key="index">
                        {{ item }}
                      </p>
                    </div>
                    <p v-else>無訂單備註</p>
                  </div>
                </div>
                <div v-else class="col-8">
                  <div class="mb-3">
                    <label for="user_name" class="form-label">收件人名稱</label>
                    <input
                      type="text"
                      class="form-control"
                      id="user_name"
                      placeholder="請輸入收件人名稱"
                      v-model="updatedShowData.user.name"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="user_email" class="form-label">電子信箱</label>
                    <input
                      type="email"
                      class="form-control"
                      id="user_email"
                      placeholder="請輸入電子信箱"
                      v-model="updatedShowData.user.email"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="user_tel" class="form-label">行動電話號碼</label>
                    <input
                      type="text"
                      class="form-control"
                      id="user_tel"
                      placeholder="請輸入行動電話號碼"
                      v-model="updatedShowData.user.tel"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="user_address" class="form-label">收件地址</label>
                    <input
                      type="text"
                      class="form-control"
                      id="user_address"
                      placeholder="請輸入收件地址"
                      v-model="updatedShowData.user.address"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="user_address" class="form-label">訂單備註</label>
                    <textarea
                      type="text"
                      class="form-control"
                      id="user_address"
                      placeholder="請輸入訂單備註"
                      v-model="updatedShowData.message"
                    />
                  </div>
                </div>
                <div class="col-4">
                  <ul>
                    <li>
                      <p>{{ showCreateAt }} 創立</p>
                    </li>
                    <li>
                      <span v-if="updatedShowData.is_paid" class="text-main-spec fw-bold"
                        >已於 {{ showPaidDate }} 付款</span
                      >
                      <span v-else class="text-deep-gray">未付款</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
              tabindex="0"
            >
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">圖片</th>
                    <th scope="col">類別</th>
                    <th scope="col">名稱</th>
                    <th scope="col">價格</th>
                    <th scope="col">數量</th>
                    <th scope="col">小計</th>
                    <th scope="col">總額</th>
                    <th scope="col">備註</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="!inEditOrderMode && updatedShowData.products">
                    <tr v-for="item in showProductsArray" :key="item.id">
                      <td>
                        <img :src="item.product?.imageUrl" alt="" width="50" />
                      </td>
                      <td>{{ item.product?.category }}</td>
                      <td>{{ item.product?.title }}</td>
                      <td>{{ item.product?.price }}</td>
                      <td>
                        <strong>{{ item?.qty }}</strong>
                      </td>
                      <td>{{ item.total }}</td>
                      <td>{{ item?.final_total }}</td>
                      <td>
                        <div v-if="item.coupon">
                          <p>
                            使用
                            <strong>{{ item.coupon?.title }}</strong>
                            優惠券
                          </p>
                          <p>
                            折扣<strong>-{{ item.total - item.final_total }}</strong
                            >元
                          </p>
                        </div>
                        <span v-else>無</span>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr v-for="item in showProductsArray" :key="item.id">
                      <td>
                        <img :src="item.product?.imageUrl" alt="" width="50" />
                      </td>
                      <td>{{ item.product?.category }}</td>
                      <td>{{ item.product?.title }}</td>
                      <td>{{ item.product?.price }}</td>
                      <td><input class="form-control" type="text" v-model.number="item.qty" /></td>
                      <td>...</td>
                      <td>...</td>
                      <td>...</td>
                    </tr>
                  </template>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="8">
                      <p class="float-end">
                        訂單總金額：NT$
                        <strong v-if="!inEditOrderMode" class="fs-3">
                          {{ updatedShowData.total }}
                        </strong>
                        <strong v-else class="fs-2"> ... </strong>
                      </p>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            v-if="inEditOrderMode"
            type="button"
            class="btn btn-normal-dpgray"
            @click="inEditOrderMode = false"
          >
            取消
          </button>
          <button
            type="button"
            class="btn"
            @click="inEditOrderMode ? putOrder() : hideModal()"
            :class="[inEditOrderMode ? 'btn-solid-spec' : 'btn-normal-dpgray']"
          >
            {{ inEditOrderMode ? '更新' : '關閉' }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- 結果modal -->
  <ResultModal ref="resultModal" :server-message="serverMessage"></ResultModal>
</template>
<script>
import { Modal } from 'bootstrap';
import { mapActions, mapState } from 'pinia';
import timeStore from '../../stores/timeStore';
import stringStore from '../../stores/stringStore';

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      inEditOrderMode: false,
      updatedShowData: {},
      showCreateAt: '',
      showPaidDate: '',
      showProductsArray: [],
      showOrderMessage: [],
      // 提示訊息
      serverMessage: {
        message: '',
        success: true,
      },
    };
  },
  props: ['showData'],
  emits: ['order-updated'],
  methods: {
    // ajax, 更新訂單
    putOrder() {
      const data = JSON.parse(JSON.stringify(this.updatedShowData));
      const productsKeysArray = Object.keys(data.products);
      let total = 0;
      productsKeysArray.forEach((productKey) => {
        const element = data.products[productKey];
        // eslint-disable-next-line camelcase
        const final_total = element.product.price * element.qty;
        const obj = {
          id: element.id,
          product_id: element.product_id,
          total: element.product.price * element.qty,
          // eslint-disable-next-line camelcase
          final_total,
          qty: element.qty,
          product: element.product,
        };
        if (element.coupon) {
          // eslint-disable-next-line camelcase
          obj.final_total = Number.parseInt((final_total * element.coupon.percent) / 100, 10);
          obj.coupon = element.coupon;
        }
        // eslint-disable-next-line camelcase
        total += obj.final_total;
        data.products[productKey] = obj;
      });
      data.total = total;
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/order/${data.id}`;
      this.$http
        .put(url, { data })
        .then((res) => {
          this.hideModal();
          this.$emit('order-updated');
          this.inEditOrderMode = false;
          this.serverMessage.message = res.data.message;
          this.serverMessage.success = res.data.success;
          this.$refs.resultModal.openModal();
        })
        .catch((err) => {
          this.serverMessage.message = err.response.data.message;
          this.serverMessage.success = err.response.data.success;
          this.$refs.resultModal.openModal();
        });
    },
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    ...mapActions(timeStore, ['dayToTimestamp10Code', 'timestamp10CodeToDay']),
    ...mapActions(stringStore, ['splitStringByNewline']),
  },
  watch: {
    showData() {
      // 更新一份可被更改的data
      this.updatedShowData = JSON.parse(JSON.stringify(this.showData));
      this.showCreateAt = this.timestamp10CodeToDay(this.updatedShowData.create_at);
      if (this.updatedShowData.is_paid) {
        this.showPaidDate = this.timestamp10CodeToDay(this.updatedShowData.paid_date);
      }
      if (this.updatedShowData.products) {
        const newAry = [];
        const keys = Object.keys(this.updatedShowData.products);
        keys.forEach((key) => {
          newAry.push(this.updatedShowData.products[key]);
        });
        this.showProductsArray = newAry;
      }
      if (this.updatedShowData.message) {
        this.showOrderMessage = this.splitStringByNewline(this.updatedShowData.message);
      }
      this.inEditOrderMode = false;
    },
  },
  computed: {
    ...mapState(timeStore, ['currentDate']),
  },
  mounted() {
    // 獲取 bsResultModal DOM
    // 建立 bootstrap modal 實體
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>
