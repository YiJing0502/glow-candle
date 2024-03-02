<template>
  <!-- Modal -->
  <div
    ref="modal"
    class="modal fade"
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
          @submit="inEditArticleMode ? putAdminArticle() : postAdminArticle()"
          v-slot="{ errors }"
        >
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              {{ inEditArticleMode ? '編輯文章' : '新增文章' }}
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
                <!-- 標題、公開 -->
                <div class="row mb-3">
                  <div class="col-10">
                    <label for="author" class="form-label"
                      >標題
                      <span class="text-main-spec fw-bold">*</span>
                    </label>
                    <vee-field
                      type="text"
                      name="標題"
                      class="form-control"
                      :class="{ 'is-invalid': errors['標題'] }"
                      rules="required|max:100"
                      id="author"
                      placeholder="請輸入標題"
                      v-model="updatedShowData.title"
                    />
                    <vee-error-message class="invalid-feedback" name="標題"></vee-error-message>
                  </div>
                  <div class="col-2 d-flex align-items-center">
                    <div class="form-check mt-4">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="isPublic"
                        v-model="updatedShowData.isPublic"
                      />
                      <label for="isPublic" class="form-check-label">
                        <span v-if="updatedShowData.isPublic" class="text-main-spec fw-bold"
                          >公開</span
                        >
                        <span v-else class="text-deep-gray">不公開</span>
                      </label>
                    </div>
                  </div>
                </div>
                <!-- 標籤 -->
                <div class="">
                  <div class="row row-cols-4">
                    <div class="col" v-for="(item, index) in updatedShowData.tag" :key="index">
                      <label for="tag" class="form-label"
                        >標籤{{ index }}
                        <span class="text-main-spec fw-bold">*</span>
                      </label>
                      <div class="col mb-3">
                        <div class="input-group input-group-sm">
                          <vee-field
                            type="text"
                            :name="'標籤' + index"
                            class="form-control"
                            :class="{ 'is-invalid': errors['標籤' + index] }"
                            rules="required|max:100"
                            id="tag"
                            v-model="updatedShowData.tag[index]"
                            placeholder="標籤名稱"
                          />
                          <button
                            type="button"
                            class="btn btn-normal-spec"
                            @click="updatedShowData.tag.splice(inex, 1)"
                            v-if="index !== 0"
                          >
                            x
                          </button>
                          <vee-error-message
                            class="invalid-feedback"
                            :name="'標籤' + index"
                          ></vee-error-message>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <button
                      type="button"
                      class="btn btn-outline-mdgray"
                      @click="updatedShowData.tag.push('')"
                    >
                      新增標籤
                    </button>
                  </div>
                </div>
                <!-- 作者名稱、創立日期 -->
                <div class="row mb-3">
                  <div class="col">
                    <label for="author" class="form-label"
                      >作者名稱
                      <span class="text-main-spec fw-bold">*</span>
                    </label>
                    <vee-field
                      type="text"
                      name="作者名稱"
                      class="form-control"
                      :class="{ 'is-invalid': errors['作者名稱'] }"
                      rules="required|max:100"
                      id="author"
                      placeholder="請輸入作者名稱"
                      v-model="updatedShowData.author"
                    />
                    <vee-error-message class="invalid-feedback" name="作者名稱"></vee-error-message>
                  </div>
                  <div class="col">
                    <label for="create_at" class="form-label"
                      >創立日期
                      <span class="text-main-spec fw-bold">*</span>
                    </label>
                    <vee-field
                      type="date"
                      name="創立日期"
                      class="form-control"
                      :class="{ 'is-invalid': errors['創立日期'] }"
                      rules="required"
                      id="create_at"
                      placeholder="請輸入創立日期"
                      v-model="updatedShowData.create_at"
                      :min="currentDate"
                    />
                    <vee-error-message class="invalid-feedback" name="創立日期"></vee-error-message>
                  </div>
                </div>
                <!-- 描述、圖片 -->
                <div class="row mb-3">
                  <div class="col">
                    <label for="description" class="form-label"
                      >描述
                      <span class="text-main-spec fw-bold">*</span>
                    </label>
                    <vee-field
                      as="textarea"
                      name="描述"
                      class="form-control"
                      :class="{ 'is-invalid': errors['描述'] }"
                      rules="max:800|required"
                      id="description"
                      rows="3"
                      v-model="updatedShowData.description"
                    ></vee-field>
                    <vee-error-message class="invalid-feedback" name="描述"></vee-error-message>
                  </div>
                  <div class="col-4">
                    <label for="imageUrl" class="form-label"
                      >輸入主要圖片網址
                      <span class="text-main-spec fw-bold">*</span>
                    </label>
                    <vee-field
                      type="text"
                      name="主要圖片網址"
                      class="form-control"
                      :class="{ 'is-invalid': errors['主要圖片網址'] }"
                      rules="url|required"
                      placeholder="請輸入主要圖片連結"
                      v-model="updatedShowData.imageUrl"
                    />
                    <vee-error-message
                      class="invalid-feedback"
                      name="主要圖片網址"
                    ></vee-error-message>
                    <img
                      :src="updatedShowData.imageUrl"
                      :alt="updatedShowData.title"
                      class="img-fluid"
                    />
                  </div>
                  <!-- 上傳單圖 -->
                  <div class="col-4">
                    <label for="formFile" class="form-label">上傳主要圖片檔案</label>
                    <vee-field
                      class="form-control"
                      :class="{ 'is-invalid': errors['圖片上傳'] }"
                      type="file"
                      name="圖片上傳"
                      rules="size:3072|ext:jpeg,jpg,png"
                      @change="goToUploadImage"
                      ref="uploadInput"
                      accept="image/jpeg, image/jpg, image/png"
                    />
                    <vee-error-message class="invalid-feedback" name="圖片上傳"></vee-error-message>
                    <ul>
                      <li>限jpg、jpeg、png類型的檔案</li>
                      <li>小於3MB</li>
                      <li>單圖上傳</li>
                    </ul>
                  </div>
                </div>
              </template>
              <template v-slot:1>
                <ckeditor
                  :editor="editor"
                  v-model="updatedShowData.content"
                  :config="editorConfig"
                ></ckeditor>
              </template>
            </TwoTabs>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-normal-dpgray" data-bs-dismiss="modal">
              關閉
            </button>
            <button type="submit" class="btn btn-solid-spec">
              {{ inEditArticleMode ? '更新' : '新增' }}
            </button>
          </div>
        </vee-form>
      </div>
    </div>
  </div>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Modal } from 'bootstrap';
import { mapState, mapActions } from 'pinia';
import toastsStore from '../../stores/toastsStore';
import timeStore from '../../stores/timeStore';
import uploadImagesStore from '../../stores/uploadImagesStore';

import TwoTabs from './TwoTabs.vue';

export default {
  data() {
    return {
      updatedShowData: {},
      tabs: [{ label: '文章資料' }, { label: '文章內容' }],
      // editor
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [
          'undo',
          'redo',
          '|',
          'heading',
          '|',
          'bold',
          'italic',
          'blockQuote',
          '|',
          'numberedList',
          'bulletedList',
          'insertTable',
        ],
        // The configuration of the editor.
      },
    };
  },
  props: ['inEditArticleMode', 'showData'],
  emits: ['post-admin-article', 'put-admin-article'],
  watch: {
    showData() {
      this.updatedShowData = JSON.parse(JSON.stringify(this.showData));
    },
  },
  computed: {
    ...mapState(timeStore, ['currentDate']),
  },
  components: {
    TwoTabs,
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
    putAdminArticle() {
      this.$emit('put-admin-article', this.updatedShowData);
    },
    postAdminArticle() {
      this.$emit('post-admin-article', this.updatedShowData);
    },
    async goToUploadImage(event) {
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
      // uploaded successfully
      if (imagesResultObject.successfulUploads[0]) {
        this.updatedShowData.imageUrl = imagesResultObject.successfulUploads[0].value.imageUrl;
      }
      // failed to upload
      if (imagesResultObject.failedUploads[0]) {
        this.handleServerResponse(false, imagesResultObject.failedUploads[0].value.error);
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
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>
