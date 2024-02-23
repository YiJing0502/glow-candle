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
        <vee-form @submit="putOrder" v-slot="{ errors }">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              {{ updatedShowData.num }}｜訂單編號：{{ updatedShowData.id }}
            </h1>
            <div class="">
              <button v-if="!inEditOrderMode" type="button" class="btn" @click="editOrder">
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
            <TwoTabs :tabs="tabs">
              <template v-slot:0>
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
                      <label for="user_name" class="form-label"
                        >收件人名稱
                        <span class="text-main-spec fw-bold">*</span>
                      </label>
                      <vee-field
                        type="text"
                        name="收件人"
                        class="form-control"
                        :class="{ 'is-invalid': errors['收件人'] }"
                        rules="required|max:15"
                        id="user_name"
                        placeholder="請輸入收件人名稱"
                        v-model="updatedShowData.user.name"
                      />
                      <vee-error-message class="invalid-feedback" name="收件人"></vee-error-message>
                    </div>
                    <div class="mb-3">
                      <label for="user_email" class="form-label"
                        >電子信箱
                        <span class="text-main-spec fw-bold">*</span>
                      </label>
                      <vee-field
                        type="email"
                        class="form-control"
                        :class="{ 'is-invalid': errors['電子信箱'] }"
                        id="user_email"
                        rules="email|required"
                        name="電子信箱"
                        placeholder="請輸入電子信箱"
                        v-model="updatedShowData.user.email"
                      />
                      <vee-error-message
                        class="invalid-feedback"
                        name="電子信箱"
                      ></vee-error-message>
                    </div>
                    <div class="mb-3">
                      <label for="user_tel" class="form-label"
                        >行動電話號碼
                        <span class="text-main-spec fw-bold">*</span>
                      </label>
                      <vee-field
                        type="tel"
                        name="行動電話"
                        :rules="isPhone"
                        class="form-control"
                        :class="{ 'is-invalid': errors['行動電話'] }"
                        id="user_tel"
                        placeholder="請輸入行動電話號碼"
                        v-model="updatedShowData.user.tel"
                      />
                      <vee-error-message
                        class="invalid-feedback"
                        name="行動電話"
                      ></vee-error-message>
                    </div>
                    <div class="mb-3">
                      <label for="user_address" class="form-label"
                        >收件地址
                        <span class="text-main-spec fw-bold">*</span>
                      </label>
                      <vee-field
                        type="text"
                        name="收件地址"
                        class="form-control"
                        :class="{ 'is-invalid': errors['收件地址'] }"
                        rules="required|max:100"
                        id="user_address"
                        placeholder="請輸入收件地址"
                        v-model="updatedShowData.user.address"
                      />
                      <vee-error-message
                        class="invalid-feedback"
                        name="收件地址"
                      ></vee-error-message>
                    </div>
                    <div class="mb-3">
                      <label for="message" class="form-label">訂單備註</label>
                      <vee-field
                        as="textarea"
                        name="訂單備註"
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors['訂單備註'] }"
                        id="message"
                        placeholder="請輸入訂單備註"
                        rules="max:800"
                        v-model="updatedShowData.message"
                      />
                      <vee-error-message
                        class="invalid-feedback"
                        name="訂單備註"
                      ></vee-error-message>
                    </div>
                  </div>
                  <div class="col-4">
                    <template v-if="!inEditOrderMode">
                      <ul>
                        <li>
                          <p>{{ showCreateAt }} 創立</p>
                        </li>
                        <li>
                          <span v-if="updatedShowData.is_paid" class="text-main-spec fw-bold"
                            >{{ showPaidDate }} 已付款</span
                          >
                          <span v-else class="text-deep-gray">未付款</span>
                        </li>
                      </ul>
                    </template>
                    <template v-else>
                      <ul>
                        <li>
                          <p>{{ showCreateAt }} 創立</p>
                        </li>
                        <li>
                          <div class="form-check">
                            <input
                              type="checkbox"
                              class="form-check-input"
                              id="is_paid"
                              v-model="updatedShowData.is_paid"
                            />
                            <label for="is_paid" class="form-check-label">
                              <span v-if="updatedShowData.is_paid" class="text-main-spec fw-bold"
                                >{{ showPaidDate }} 已付款</span
                              >
                              <span v-else class="text-deep-gray">未付款</span>
                            </label>
                          </div>
                        </li>
                      </ul>
                    </template>
                  </div>
                </div>
              </template>
              <template v-slot:1>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">圖片</th>
                      <th scope="col">類別</th>
                      <th scope="col">名稱</th>
                      <th scope="col">數量</th>
                      <th scope="col">價格</th>
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
                        <td>
                          <strong>{{ item?.qty }}</strong>
                        </td>
                        <td>{{ item.product?.price }}</td>
                        <td>{{ item.total }}</td>
                        <td>
                          <strong>{{ item?.final_total }}</strong>
                        </td>
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
                        <td>
                          <vee-field
                            :name="item.product?.title + '產品數量'"
                            class="form-control"
                            :class="{ 'is-invalid': errors[item.product?.title + '產品數量'] }"
                            rules="required|numeric|integer|min_value:1"
                            type="text"
                            v-model.number="item.qty"
                          />
                          <vee-error-message
                            class="invalid-feedback"
                            :name="item.product?.title + '產品數量'"
                          >
                          </vee-error-message>
                        </td>
                        <td>{{ item.product?.price }}</td>
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
              </template>
            </TwoTabs>
          </div>
          <div class="modal-footer">
            <button
              v-if="inEditOrderMode"
              type="button"
              class="btn btn-normal-dpgray"
              @click="cancelChangeOrder"
            >
              取消
            </button>
            <button v-if="inEditOrderMode" type="submit" class="btn btn-solid-spec">更新</button>
            <button
              type="button"
              class="btn btn-solid-spec"
              @click="hideModal"
              v-if="!inEditOrderMode"
            >
              關閉
            </button>
          </div>
        </vee-form>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from 'bootstrap';
import { mapActions, mapState } from 'pinia';
import toastsStore from '../../stores/toastsStore';
import timeStore from '../../stores/timeStore';
import stringStore from '../../stores/stringStore';
import TwoTabs from './TwoTabs.vue';

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
      originalShowData: {},
      tabs: [{ label: '訂單資訊' }, { label: '訂購資訊' }],
    };
  },
  props: ['showData'],
  emits: ['order-updated'],
  components: {
    TwoTabs,
  },
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
      if (data.paid_date === undefined && data.is_paid === true) {
        data.paid_date = this.dayToTimestamp10Code(this.currentDate);
      }
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/order/${data.id}`;
      this.$http
        .put(url, { data })
        .then((res) => {
          this.hideModal();
          this.$emit('order-updated');
          this.inEditOrderMode = false;
          this.handleServerResponse(true, res.data.message);
        })
        .catch((err) => {
          this.handleServerResponse(false, err.response.data.message);
        });
    },
    // fn, 編輯訂單
    editOrder() {
      this.originalShowData = JSON.parse(JSON.stringify(this.updatedShowData));
      this.inEditOrderMode = true;
    },
    // fn, 取消編輯訂單
    cancelChangeOrder() {
      this.updatedShowData = this.originalShowData;
      this.inEditOrderMode = false;
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '請輸入正確的行動電話號碼';
    },
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    handleServerResponse(success, message) {
      const style = success ? 'bg-deep-gray' : 'bg-main-spec';
      this.pushToast({
        title: message,
        style,
      });
    },
    ...mapActions(timeStore, ['dayToTimestamp10Code', 'timestamp10CodeToDay']),
    ...mapActions(stringStore, ['splitStringByNewline']),
    ...mapActions(toastsStore, ['pushToast']),
  },
  watch: {
    showData() {
      // 更新一份可被更改的data
      this.updatedShowData = JSON.parse(JSON.stringify(this.showData));
      this.showCreateAt = this.timestamp10CodeToDay(this.updatedShowData.create_at);
      this.showPaidDate = this.updatedShowData.is_paid
        ? this.timestamp10CodeToDay(this.updatedShowData.paid_date)
        : '';
      this.showOrderMessage = this.updatedShowData.message
        ? this.splitStringByNewline(this.updatedShowData.message)
        : [];
      this.showProductsArray = this.updatedShowData.products
        ? Object.values(this.updatedShowData.products)
        : [];
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
