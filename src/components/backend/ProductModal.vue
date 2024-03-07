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
        <vee-form
          ref="form"
          @submit="inEditProductMode ? putAdminProduct() : postAdminProduct()"
          v-slot="{ errors }"
        >
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
            <TwoTabs :tabs="tabs">
              <template v-slot:0>
                <div class="row mt-3">
                  <div class="row">
                    <div class="col-10">
                      <div class="mb-3">
                        <label for="title" class="form-label"
                          >標題
                          <span class="text-main-spec fw-bold">*</span>
                        </label>
                        <vee-field
                          type="text"
                          name="標題"
                          :class="{ 'is-invalid': errors['標題'] }"
                          rules="required|max:100"
                          class="form-control"
                          id="title"
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
                          <span
                            v-if="updatedShowData.is_enabled === 1"
                            class="text-main-spec fw-bold"
                            >啟用</span
                          >
                          <span v-else class="text-deep-gray">未啟用</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3 col">
                      <label for="category" class="form-label"
                        >分類
                        <span class="text-main-spec fw-bold">*</span>
                      </label>
                      <vee-field
                        type="text"
                        name="分類"
                        class="form-control"
                        :class="{ 'is-invalid': errors['分類'] }"
                        rules="required|max:100"
                        id="category"
                        placeholder="請輸入分類"
                        v-model="updatedShowData.category"
                      />
                      <vee-error-message class="invalid-feedback" name="分類"></vee-error-message>
                    </div>
                    <div class="mb-3 col">
                      <label for="unit" class="form-label"
                        >單位
                        <span class="text-main-spec fw-bold">*</span>
                      </label>
                      <vee-field
                        type="text"
                        name="單位"
                        class="form-control"
                        :class="{ 'is-invalid': errors['單位'] }"
                        rules="required|max:100"
                        id="unit"
                        placeholder="請輸入單位"
                        v-model="updatedShowData.unit"
                      />
                      <vee-error-message class="invalid-feedback" name="單位"></vee-error-message>
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3 col">
                      <label for="original_price" class="form-label"
                        >原價
                        <span class="text-main-spec fw-bold">*</span>
                      </label>
                      <vee-field
                        type="number"
                        name="原價"
                        class="form-control"
                        :class="{ 'is-invalid': errors['原價'] }"
                        rules="required|numeric|integer|min_value:1"
                        id="original_price"
                        placeholder="請輸入原價"
                        v-model.number="updatedShowData.origin_price"
                      />
                      <vee-error-message class="invalid-feedback" name="原價"></vee-error-message>
                    </div>
                    <div class="mb-3 col">
                      <label for="price" class="form-label"
                        >售價
                        <span class="text-main-spec fw-bold">*</span>
                      </label>
                      <vee-field
                        type="number"
                        name="售價"
                        class="form-control"
                        :class="{ 'is-invalid': errors['售價'] }"
                        rules="required|numeric|integer|min_value:1"
                        id="price"
                        placeholder="請輸入售價"
                        v-model.number="updatedShowData.price"
                      />
                      <vee-error-message class="invalid-feedback" name="售價"></vee-error-message>
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3 col">
                      <label for="cost_price" class="form-label">成本價</label>
                      <vee-field
                        type="number"
                        name="成本價"
                        class="form-control"
                        :class="{ 'is-invalid': errors['成本價'] }"
                        rules="numeric|integer|min_value:1"
                        id="cost_price"
                        placeholder="請輸入成本價"
                        v-model.number="updatedShowData.cost_price"
                      />
                      <vee-error-message class="invalid-feedback" name="成本價"></vee-error-message>
                    </div>
                    <div class="mb-3 col">
                      <label for="inventory" class="form-label">庫存量</label>
                      <vee-field
                        type="number"
                        name="庫存量"
                        class="form-control"
                        :class="{ 'is-invalid': errors['庫存量'] }"
                        rules="numeric|integer|min_value:1"
                        id="inventory"
                        placeholder="請輸入庫存量"
                        v-model.number="updatedShowData.inventory"
                      />
                      <vee-error-message class="invalid-feedback" name="庫存量"></vee-error-message>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label for="description" class="form-label">產品描述</label>
                        <vee-field
                          as="textarea"
                          name="產品描述"
                          class="form-control"
                          :class="{ 'is-invalid': errors['產品描述'] }"
                          rules="max:800"
                          id="description"
                          rows="3"
                          v-model="updatedShowData.description"
                        ></vee-field>
                        <vee-error-message
                          class="invalid-feedback"
                          name="產品描述"
                        ></vee-error-message>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label for="content" class="form-label">說明內容</label>
                        <vee-field
                          as="textarea"
                          name="說明內容"
                          class="form-control"
                          :class="{ 'is-invalid': errors['說明內容'] }"
                          rules="max:800"
                          id="content"
                          rows="3"
                          v-model="updatedShowData.content"
                        ></vee-field>
                        <vee-error-message
                          class="invalid-feedback"
                          name="說明內容"
                        ></vee-error-message>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-slot:1>
                <div class="row row-cols-4 mt-3">
                  <div class="col mb-3">
                    <div class="mb-3">
                      <label for="imageUrl" class="form-label">輸入主要圖片網址</label>
                      <vee-field
                        type="text"
                        name="主要圖片網址"
                        class="form-control"
                        :class="{ 'is-invalid': errors['主要圖片網址'] }"
                        rules="url"
                        placeholder="請輸入主要圖片連結"
                        v-model="updatedShowData.imageUrl"
                      />
                      <vee-error-message
                        class="invalid-feedback"
                        name="主要圖片網址"
                      ></vee-error-message>
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
                      <label for="imageUrl" class="form-label">輸入其他圖片網址{{ index }}</label>
                      <button
                        type="button"
                        class="btn-close float-end"
                        aria-label="Close"
                        @click="deleteImage(index)"
                      ></button>
                      <vee-field
                        type="text"
                        :name="'其他圖片連結' + index"
                        class="form-control"
                        :class="{ 'is-invalid': errors['其他圖片連結' + index] }"
                        rules="url"
                        placeholder="請輸入其他圖片連結"
                        v-model="updatedShowData.imagesUrl[index]"
                      />
                      <vee-error-message
                        class="invalid-feedback"
                        :name="'其他圖片連結' + index"
                      ></vee-error-message>
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
                        <vee-field
                          class="form-control"
                          :class="{ 'is-invalid': errors['多圖片上傳'] }"
                          type="file"
                          name="多圖片上傳"
                          rules="size:3072|ext:jpeg,jpg,png"
                          @change="goToUploadImages"
                          ref="uploadInput"
                          accept="image/jpeg, image/jpg, image/png"
                          multiple
                        />
                        <vee-error-message
                          class="invalid-feedback"
                          name="多圖片上傳"
                        ></vee-error-message>
                        <ul>
                          <li>限jpg、jpeg、png類型的檔案</li>
                          <li>小於3MB</li>
                        </ul>
                        <hr />
                        <button
                          type="button"
                          class="btn btn-solid-dpgray w-100"
                          @click.prevent="addImage"
                        >
                          手動新增圖片
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </TwoTabs>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-normal-dpgray" data-bs-dismiss="modal">
              關閉
            </button>
            <button type="submit" class="btn btn-solid-spec">
              {{ inEditProductMode ? '更新' : '新增' }}
            </button>
          </div>
        </vee-form>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from 'bootstrap';
import { mapActions } from 'pinia';
import uploadImagesStore from '../../stores/uploadImagesStore';
import toastsStore from '../../stores/toastsStore';

import TwoTabs from './TwoTabs.vue';

export default {
  data() {
    return {
      modal: '',
      updatedShowData: {},
      tabs: [{ label: '產品內容' }, { label: '產品圖片' }],
    };
  },
  props: ['showData', 'inEditProductMode'],
  emits: ['put-admin-product', 'post-admin-product'],
  components: {
    TwoTabs,
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
    // fn, 前往store上傳多張圖片
    async goToUploadImages(event) {
      try {
        const res = await this.uploadImages(event);
        this.handleImagesResult(res);
        // clear the file input value
        const inputElement = event.target;
        inputElement.value = null;
        this.handleServerResponse(true, '圖片已成功上傳');
      } catch (err) {
        this.handleServerResponse(false, err.response.data.message);
      }
    },
    handleImagesResult(imagesResultObject) {
      this.updatedShowData.imagesUrl = this.updatedShowData.imagesUrl || [];
      if (imagesResultObject.successfulUploads.length > 0) {
        // eslint-disable-next-line max-len
        imagesResultObject.successfulUploads.map((element) =>
          this.updatedShowData.imagesUrl.push(element.value.imageUrl),
        );
      }
      if (imagesResultObject.failedUploads.length > 0) {
        // eslint-disable-next-line max-len
        imagesResultObject.failedUploads.map((element) =>
          this.handleServerResponse(false, element.value.error),
        );
      }
    },
    handleServerResponse(success, message) {
      const style = success ? 'bg-deep-gray' : 'bg-main-spec';
      this.pushToast({
        title: message,
        style,
      });
    },
    ...mapActions(uploadImagesStore, ['uploadImages']),
    ...mapActions(toastsStore, ['pushToast']),
  },
};
</script>
