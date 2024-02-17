<template>
  <div
    class="modal fade"
    ref="modal"
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
            {{ inEditProductMode ? '編輯產品' : '新增產品' }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
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
                商品內容
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
                商品圖片
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
                <div class="row">
                  <div class="col-10">
                    <div class="mb-3">
                      <label for="title" class="form-label">標題
                        <span class="text-main-spec fw-bold">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="title"
                        placeholder="請輸入標題"
                        v-model="updatedShowData.title"
                      />
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
                  <div class="mb-3 col">
                    <label for="category" class="form-label">分類
                      <span class="text-main-spec fw-bold">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="updatedShowData.category"
                    />
                  </div>
                  <div class="mb-3 col">
                    <label for="unit" class="form-label">單位
                      <span class="text-main-spec fw-bold">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="updatedShowData.unit"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col">
                    <label for="original_price" class="form-label">原價
                      <span class="text-main-spec fw-bold">*</span>
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="original_price"
                      placeholder="請輸入原價"
                      v-model.number="updatedShowData.origin_price"
                    />
                  </div>
                  <div class="mb-3 col">
                    <label for="price" class="form-label">售價
                      <span class="text-main-spec fw-bold">*</span>
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model.number="updatedShowData.price"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col">
                    <label for="cost_price" class="form-label">成本價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="cost_price"
                      placeholder="請輸入成本價"
                      v-model.number="updatedShowData.cost_price"
                    />
                  </div>
                  <div class="mb-3 col">
                    <label for="inventory" class="form-label">庫存量</label>
                    <input
                      type="number"
                      class="form-control"
                      id="inventory"
                      placeholder="請輸入庫存量"
                      v-model.number="updatedShowData.inventory"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label for="description" class="form-label">產品描述</label>
                      <textarea
                        class="form-control"
                        id="description"
                        rows="3"
                        v-model="updatedShowData.description"
                      ></textarea>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label for="content" class="form-label">說明內容</label>
                      <textarea
                        class="form-control"
                        id="content"
                        rows="3"
                        v-model="updatedShowData.content"
                      ></textarea>
                    </div>
                  </div>
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
              <div class="row row-cols-4 mt-3">
                <div class="col mb-3">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">輸入主要圖片網址</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入主要圖片連結"
                      v-model="updatedShowData.imageUrl"
                    />
                  </div>
                  <img
                    :src="updatedShowData.imageUrl"
                    :alt="updatedShowData.title"
                    class="img-fluid"
                  />
                </div>
                <div
                  class="col mb-3"
                  v-for="(item, index) in updatedShowData.imagesUrl"
                  :key="index"
                >
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">輸入其他圖片網址</label>
                    <button
                      type="button"
                      class="btn-close float-end"
                      aria-label="Close"
                      @click="deleteImage(index)"
                    ></button>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入其他圖片連結"
                      v-model="updatedShowData.imagesUrl[index]"
                    />
                  </div>
                  <img
                    v-if="updatedShowData.imagesUrl[index]"
                    :src="updatedShowData.imagesUrl[index]"
                    :alt="updatedShowData.title + index"
                    class="img-fluid"
                  />
                </div>
                <div class="col mb-3">
                  <div class="card">
                    <div class="card-body">
                      <label for="formFile" class="form-label">上傳圖片檔案</label>
                      <input
                        class="form-control"
                        type="file"
                        name="fileInput"
                        @change="uploadImages"
                        ref="uploadInput"
                        accept="image/jpeg, image/jpg, image/png"
                        multiple
                      />
                      <hr />
                      <button class="btn btn-solid-dpgray w-100" @click="addImage">
                        手動新增圖片
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-normal-dpgray" data-bs-dismiss="modal">關閉</button>
          <button
            type="button"
            class="btn btn-solid-spec"
            @click="inEditProductMode ? putAdminProduct() : postAdminProduct()"
          >
            {{ inEditProductMode ? '更新' : '新增' }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <ResultModal ref="resultModal" :server-message="serverMessage"></ResultModal>
</template>
<script>
import { Modal } from 'bootstrap';
import ResultModal from '../ResultModal.vue';

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
export default {
  data() {
    return {
      modal: '',
      updatedShowData: {},
      serverMessage: {
        message: '',
        success: true,
      },
    };
  },
  components: {
    ResultModal,
  },
  mounted() {
    // 獲取 bsResultModal DOM
    // 建立 bootstrap modal 實體
    this.modal = new Modal(this.$refs.modal);
    this.updatedShowData = JSON.parse(JSON.stringify(this.showData));
  },
  watch: {
    showData() {
      this.updatedShowData = JSON.parse(JSON.stringify(this.showData));
    },
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    putAdminProduct() {
      this.$emit('put-admin-product', this.updatedShowData);
    },
    postAdminProduct() {
      this.$emit('post-admin-product', this.updatedShowData);
    },
    // fn, 刪除特定圖片
    deleteImage(myIndex) {
      // 複製一份imagesUrl陣列，以免修改原陣列
      let imagesUrlArray = [...this.updatedShowData.imagesUrl];
      // 過濾掉符合條件的元素
      imagesUrlArray = imagesUrlArray.filter((item, index) => index !== myIndex);
      // 重新賦值給this.updatedShowData.imagesUrl
      this.updatedShowData.imagesUrl = imagesUrlArray;
    },
    // fn, 新增特定圖片
    addImage() {
      if (this.updatedShowData.imagesUrl === undefined) {
        this.updatedShowData.imagesUrl = [''];
      } else {
        this.updatedShowData.imagesUrl.push('');
      }
    },
    validateImages(multipleFilesArray) {
      // 驗證檔案大小、檔案類型
      for (let index = 0; index < multipleFilesArray.length; index += 1) {
        const element = multipleFilesArray[index];
        const fileSizeInBytes = element.size;
        const limitedFileSize = 3 * 1024 * 1024;
        if (fileSizeInBytes > limitedFileSize) {
          this.serverMessage.message = '圖片檔案不可超過3MB';
          this.serverMessage.success = false;
          this.$refs.resultModal.openModal();
          return false;
        }
        if (
          element.type !== 'image/jpeg'
          && element.type !== 'image/jpg'
          && element.type !== 'image/png'
        ) {
          this.serverMessage.message = '只接收「jpg」、「jpeg」、「png」類型的圖片檔案';
          this.serverMessage.success = false;
          this.$refs.resultModal.openModal();
          return false;
        }
      }
      return true;
    },
    // fn, 上傳多張圖片
    uploadImages(event) {
      const multipleFilesArray = [...event.target.files];
      if (this.validateImages(multipleFilesArray)) {
        // 上傳檔案
        multipleFilesArray.forEach((item) => {
          // 產生一個新的上傳表單格式
          const formData = new FormData();
          // 夾帶欄位與要上傳的檔案
          formData.append('file-to-upload', item);
          // 上傳檔案
          this.$http
            .post(`${VITE_BASE_URL}/api/${VITE_API_PATH}/admin/upload`, formData)
            .then((res) => {
              if (res.data.success) {
                if (this.updatedShowData.imagesUrl === undefined) {
                  this.updatedShowData.imagesUrl = [];
                  this.updatedShowData.imagesUrl.push(res.data.imageUrl);
                } else {
                  this.updatedShowData.imagesUrl.push(res.data.imageUrl);
                }
                this.serverMessage.message = res.data.success;
                this.serverMessage.success = '上傳成功';
                this.$refs.resultModal.openModal();
              } else {
                this.serverMessage.success = res.data.success;
                this.serverMessage.message = '上傳成功';
                this.$refs.resultModal.openModal();
              }
              this.$refs.uploadInput.value = '';
            })
            .catch((err) => {
              this.serverMessage.message = err.response.data.message;
              this.serverMessage.success = err.response.data.success;
              this.$refs.resultModal.openModal();
              this.$refs.uploadInput.value = '';
            });
        });
      }
    },
  },
  props: ['showData', 'inEditProductMode'],
  emits: ['upload-images', 'delete-image', 'add-image', 'put-admin-product', 'post-admin-product'],
};
</script>
