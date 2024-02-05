<template>
  <div class="modal fade" ref="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">{{inEditProductMode ? '編輯產品' : '新增產品'}}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button class="nav-link active w-50" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home"
                type="button" role="tab" aria-controls="nav-home" aria-selected="true">商品內容</button>
              <button class="nav-link w-50" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile"
                type="button" role="tab" aria-controls="nav-profile" aria-selected="false">商品圖片</button>
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"
              tabindex="0">
              <div class="row mt-3">
                <div class="row">
                  <div class="col-10">
                    <div class="mb-3">
                      <label for="title" class="form-label">標題</label>
                      <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="updateShowData.title">
                    </div>
                  </div>
                  <div class="col-2 d-flex align-items-center">
                    <div class="form-check mt-3">
                      <input type="checkbox" class="form-check-input" id="is_enabled" :true-value="1" :false-value="0" v-model="updateShowData.is_enabled">
                      <label for="is_enabled" class="form-check-label">
                        <span v-if="updateShowData.is_enabled === 1" class="text-main-spec fw-bold">啟用</span>
                        <span v-else class="text-deep-gray">未啟用</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col">
                    <label for="category" class="form-label">分類</label>
                    <input type="text" class="form-control" id="category" placeholder="請輸入分類"
                      v-model="updateShowData.category">
                  </div>
                  <div class="mb-3 col">
                    <label for="unit" class="form-label">單位</label>
                    <input type="text" class="form-control" id="unit" placeholder="請輸入單位" v-model="updateShowData.unit">
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col">
                    <label for="original_price" class="form-label">原價</label>
                    <input type="number" class="form-control" id="original_price" placeholder="請輸入原價"
                      v-model.number="updateShowData.origin_price">
                  </div>
                  <div class="mb-3 col">
                    <label for="price" class="form-label">售價</label>
                    <input type="number" class="form-control" id="price" placeholder="請輸入售價"
                      v-model.number="updateShowData.price">
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col">
                    <label for="cost_price" class="form-label">成本價</label>
                    <input type="number" class="form-control" id="cost_price" placeholder="請輸入成本價"
                      v-model.number="updateShowData.cost_price">
                  </div>
                  <div class="mb-3 col">
                    <label for="inventory" class="form-label">庫存量</label>
                    <input type="number" class="form-control" id="inventory" placeholder="請輸入庫存量"
                      v-model.number="updateShowData.inventory">
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label for="description" class="form-label">產品描述</label>
                      <textarea class="form-control" id="description" rows="3"
                        v-model="updateShowData.description"></textarea>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label for="content" class="form-label">說明內容</label>
                      <textarea class="form-control" id="content" rows="3" v-model="updateShowData.content"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"
              tabindex="0">
              <div class="row row-cols-4 mt-3">
                <div class="col mb-3">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">輸入主要圖片網址</label>
                    <input type="text" class="form-control" placeholder="請輸入主要圖片連結" v-model="updateShowData.imageUrl">
                  </div>
                  <img :src="updateShowData.imageUrl" :alt="updateShowData.title" class="img-fluid">
                </div>
                <div class="col mb-3" v-for="(item,index) in updateShowData.imagesUrl" :key="index">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">輸入其他圖片網址</label>
                    <button type="button" class="btn-close float-end" aria-label="Close" @click="deleteImage(index)">
                    </button>
                    <input type="text" class="form-control" placeholder="請輸入其他圖片連結"
                      v-model="updateShowData.imagesUrl[index]">
                  </div>
                  <img v-if="updateShowData.imagesUrl[index]" :src="updateShowData.imagesUrl[index]" :alt="updateShowData.title+index"
                    class="img-fluid">
                </div>
                <div class="col mb-3">
                  <div class="card">
                    <div class="card-body">
                      <label for="formFile" class="form-label">上傳圖片檔案</label>
                      <input class="form-control" type="file" name="fileInput" @change="uploadImages"
                      accept="image/jpeg, image/jpg, image/png" multiple>
                      <hr>
                      <button class="btn btn-solid-dpgray w-100" @click="addImage">手動新增圖片</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-normal-dpgray" data-bs-dismiss="modal">關閉</button>
          <button type="button" class="btn btn-solid-spec"
            @click="inEditProductMode ? putAdminProduct(showData.id) : postAdminProduct()">{{inEditProductMode ? '更新'
            : '新增'}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as bootstrap from 'bootstrap'
  export default {
    data(){
      return {
        modal: '',
        updateShowData: {},
      }
    },
    mounted(){
      // 獲取 bsResultModal DOM
      // 建立 bootstrap modal 實體
      this.modal = new bootstrap.Modal(this.$refs.modal);
      this.updateShowData = JSON.parse(JSON.stringify(this.showData));
    },
    methods: {
    openModal() {
    this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    }, 
    uploadImages(){
      this.$emit('upload-images', event);
    },
    addImage(){
      this.$emit('add-image');
    },
    deleteImage(index){
      this.$emit('delete-image', index)
    },
    putAdminProduct(id){
      this.$emit('put-admin-product', id);
    },
    postAdminProduct(){
      this.$emit('post-admin-product');
    }
    },
    props: ['showData', 'inEditProductMode'],
    emits: ['upload-images','delete-image', 'add-image', 'put-admin-product', 'post-admin-product'],
  }
</script>