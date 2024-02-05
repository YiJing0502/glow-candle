<template>
  <div class="container position-relative">
    <VueLoading 
    v-if="!getRemoteData" 
    :active="!getRemoteData"
    :background-color="'#FBFAF4'"
    :color="'#52504B'"
    :is-full-page="false"/>
    <div v-else>
      <div class="row mt-4">
        <div class="col-8 d-flex">
          <div class="btn-group me-3">
            <button v-if="productsData" class="btn btn-normal-dpgray dropdown-toggle" type="button"
              data-bs-toggle="dropdown" aria-expanded="false" @click="getCategory">
              篩選類別
            </button>
            <ul class="dropdown-menu">
              <li v-for="(item, index) in productsCategory" :key="index">
                <button class="dropdown-item" href="#" @click="filterCategory(item)">
                  {{ item }}
                </button>
              </li>
            </ul>
          </div>
          <input class="form-control form-control-sm" id="exampleDataList" placeholder="輸入產品名稱搜尋"
            v-model.trim="searchInputValue" @keyup.enter="searchProduct">
          <button class="btn btn-normal-dpgray" @click="searchProduct">搜</button>
        </div>
        <div class="col-4 d-flex justify-content-end">
          <button type="button" @click="scrollToBottom" class="btn">前往底部</button>
          <button class="btn btn-solid-spec" @click="getAdminAddProductModal">
            建立新的產品
          </button>
        </div>
      </div>
      <status-message v-if="productsData.length === 0">{{'建立新的產品'}}</status-message>
      <table class="table mt-4 align-middle" v-else>
        <thead>
          <tr>
            <th scope="col">圖片</th>
            <th scope="col">分類</th>
            <th scope="col">產品名稱</th>
            <th scope="col">原價</th>
            <th scope="col">售價</th>
            <th scope="col">是否啟用</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in infoData" :key="index">
            <th scope="row"><img :src="item.imageUrl" :alt="item.title" class="img-fluid" width="50"></th>
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.origin_price}}</td>
            <td>{{ item.price }}</td>
            <td>
              <span v-if="item.is_enabled === 1" class="text-main-spec fw-bold">啟用</span>
              <span v-else class="text-deep-gray">未啟用</span>
            </td>
            <td>
              <div class="d-flex justify-content-start align-items-center">
                <button class="btn btn-sm btn-normal-medium block w-50" type="button"
                  @click="getAdminDelProductModal(item.id)">
                  刪除
                </button>
                <button class="btn btn-sm btn-normal-medium block w-50" type="button"
                  @click="getAdminProductModal(item.id)">
                  編輯
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-center mt-4" ref="scrollContainer">
          <nav aria-label="Page navigation example">
            <ul class="pagination" id="pageid">
              <PageBtn 
              :prev-is-enabled="pageData.hasPrevPage"
              @change-prev-page="pagination(pageData.currentPage - 1)"
              :totalPage="pageData.totalPage"
              :current-page="pageData.currentPage"
              @change-page="pagination"
              :next-is-enabled="pageData.hasNextPage"
              @change-next-page="pagination(pageData.currentPage + 1)"
              ></PageBtn>
            </ul>
          </nav>
      </div>
    </div>
  </div>
  <!-- 產品Modal -->
  <ProductModal  ref="productModal" :show-data="showData" :in-edit-product-mode="inEditProductMode" @delete-image="deleteImage"
      @upload-images="uploadImages" @add-image="addImage" @put-admin-product="putAdminProduct"
      @post-admin-product="postAdminProduct"></ProductModal>
  <!-- 刪除產品Modal -->
  <DeleteModal ref="deleteModal" :show-data="showData" @delete-function="deleteAdminProduct"></DeleteModal>
  <!-- 結果modal -->
  <ResultModal ref="resultModal" :server-message="serverMessage"></ResultModal>
</template>
<script>
  import { mapState } from 'pinia';
  import adminStore from '@/stores/adminStore';
  // components
  import DeleteModal from '@/components/backend/DeleteModal.vue';
  import ResultModal from '@/components/ResultModal.vue';
  import ProductModal from '@/components/backend/ProductModal.vue';
  import StatusMessage from '@/components/backend/StatusMessage.vue';
  import PageBtn from '@/components/PageBtn.vue';
  // 
  const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;

  export default {
    data() {
      return {
        getRemoteData: false,
        productsData: [],
        paginationData: [],
        pageData: {},
        infoData: [],
        showData: {},
        inEditProductMode: true,
        serverMessage: {
          message: '',
          success: true,
        },
        productsCategory: [],
        searchInputValue: '',
      };
    },
    components: {
      DeleteModal,
      ResultModal,
      ProductModal,
      StatusMessage,
      PageBtn,
    },
    computed: {
      ...mapState(adminStore, ['loginSuccess'])
    },
    methods: {
      // modal, 打開編輯產品modal
      getAdminProductModal(id) {
        this.inEditProductMode = true;
        this.showData = JSON.parse(JSON.stringify(this.productsData[id]));
        this.$refs.productModal.openModal();
        
      },
      // modal, 打開新增產品 modal
      getAdminAddProductModal(){
        this.inEditProductMode = false;
        this.showData = {
          imagesUrl: [''],
        };
        this.$refs.productModal.openModal();
      },
      // modal, 打開刪除產品modal
      getAdminDelProductModal(id) {
        this.showData = JSON.parse(JSON.stringify(this.productsData[id]));
        this.$refs.deleteModal.openModal();
        
      },
      // fn, 刪除特定圖片
      deleteImage(myIndex){
        // 複製一份imagesUrl陣列，以免修改原陣列
        let imagesUrlArray = [...this.showData.imagesUrl];
        // 過濾掉符合條件的元素
        imagesUrlArray = imagesUrlArray.filter((item, index) => index !== myIndex);
        // 重新賦值給this.showData.imagesUrl
        this.showData.imagesUrl = imagesUrlArray;
      },
      // fn, 新增特定圖片
      addImage(){
        if(this.showData.imagesUrl === undefined) {
          this.showData.imagesUrl = ['',];
        }else{
          this.showData.imagesUrl.push('');
        };
      },
      // fn, 上傳多張圖片
      uploadImages(event){
        const uploadServerMessage = {
          message: '',
          success: true,
        };
        // const fileInput = this.$refs.myImgUploadInput;
        const multipleFilesArray = [...event.target.files];
        // 驗證檔案大小、檔案類型
        for (let index = 0; index < multipleFilesArray.length; index++) {
          const element = multipleFilesArray[index];
          const fileSizeInBytes = element.size;
          const limitedFileSize = 3 * 1024 * 1024;
          if(fileSizeInBytes > limitedFileSize) {
            this.serverMessage.message = '圖片檔案不可超過3MB';
            this.serverMessage.success = false;
            this.$refs.resultModal.openModal();
            return;
          };
          if(element.type !== 'image/jpeg' && element.type !== 'image/jpg' && element.type !== 'image/png') {
            this.serverMessage.message = '只接收「jpg」、「jpeg」、「png」類型的圖片檔案';
            this.serverMessage.success = false;
            this.$refs.resultModal.openModal();
            return;
          };
        };
        // 上傳檔案
        multipleFilesArray.forEach((item)=>{
          // 產生一個新的上傳表單格式
          const formData = new FormData();
          // 夾帶欄位與要上傳的檔案
          formData.append('file-to-upload', item);
          // 上傳檔案
          this.$http.post(`${VITE_BASE_URL}/api/${VITE_API_PATH}/admin/upload`, formData)
            .then(res=>{
              if(res.data.success){
                uploadServerMessage.success = res.data.success;
                uploadServerMessage.message = '上傳成功';
                if(this.showData.imagesUrl === undefined) {
                  this.showData.imagesUrl = [];
                  this.showData.imagesUrl.push(res.data.imageUrl);
                }else{
                  this.showData.imagesUrl.push(res.data.imageUrl);
                };
                this.serverMessage.message = uploadServerMessage.message;
                this.serverMessage.success = uploadServerMessage.success;
                this.$refs.resultModal.openModal();
              }else{
                this.serverMessage.success = res.data.success;
                this.serverMessage.message = res.data.message;
                this.$refs.resultModal.openModal();
              }
            })
            .catch(err=>{
              this.serverMessage.message = err.response.data.message;
              this.serverMessage.success = err.response.data.success;
              this.$refs.resultModal.openModal();
            })
        });
      },
      // ajax, 取得所有產品資料
      getAdminProductsAll() {
        const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/products/all`;
        this.$http.get(url)
          .then((res)=>{
            if(res.data.success){
              this.getRemoteData = res.data.success;
              this.productsData = res.data.products;
              this.paginationData = res.data.products;
              this.pagination(1);
            }
          })
          .catch((err)=>{
            this.serverMessage.message = err.response.data.message;
            this.serverMessage.success = err.response.data.success;
            this.$refs.resultModal.openModal();
          })
      },
      // // ajax, 新增特定產品資料
      postAdminProduct() {
        const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/product`;
        const data = {
          data: this.showData,
        };
        this.$http.post(url, data)
          .then(res=>{
            this.getAdminProductsAll();
            this.serverMessage.message = res.data.message;
            this.serverMessage.success = res.data.success;
            this.$refs.productModal.hideModal();
            this.$refs.resultModal.openModal();
          })
          .catch(err=>{
            this.serverMessage.message = err.response.data.message;
            this.serverMessage.success = err.response.data.success;
            this.$refs.resultModal.openModal();
          });
      },
      // // ajax, 更新特定產品資料
      putAdminProduct(id){
        const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/product/${id}`;
        const data = {
          data: this.showData
        };
        this.$http.put(url, data)
          .then(res=>{
            if(res.data.success){
              this.getAdminProductsAll();
              this.serverMessage.message = res.data.message;
              this.serverMessage.success = res.data.success;
              this.$refs.productModal.hideModal();
              this.$refs.resultModal.openModal();
            };
          })
          .catch(err=>{
            this.serverMessage.message = err.response.data.message;
            this.serverMessage.success = err.response.data.success;
            this.$refs.resultModal.openModal();
          });
      },
      // ajax, 刪除特定產品資料
      deleteAdminProduct(){
        const id = this.showData.id;
        const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/product/${id}`;
        this.$http.delete(url)
          .then(res=>{
            if(res.data.success){
              this.$refs.deleteModal.hideModal();
              this.getAdminProductsAll();
              this.serverMessage.message = res.data.message;
              this.serverMessage.success = res.data.success;
              this.$refs.resultModal.openModal();
            }
          })
          .catch(err=>{
            this.$refs.deleteModal.hideModal();
            this.serverMessage.message = err.response.data.message;
            this.serverMessage.success = err.response.data.success;
            this.$refs.resultModal.openModal();
          })
      },
      // fn, 分頁
      pagination(nowPage){
        const data = this.paginationData;
        // 取得全部資料長度
        const dataLength = Object.keys(data).length;
        // 設定每頁資料量
        const perPage = 10;
        // 取得總頁數，使用無條件進位
        const totalPage = Math.ceil(dataLength/perPage);
        // 設定當前頁數，變數
        let currentPage = nowPage;
        // 防呆：避免當前頁數比總頁數大
        if(currentPage > totalPage){
          currentPage = totalPage;
        };
        // 計算當前分頁顯示的資料範圍的最小值
        const minPerPageData = ((currentPage * perPage) - perPage) + 1;
        // 計算當前分頁顯示的資料範圍的最大值
        const maxPerPageData = (currentPage * perPage);
        // 建立新陣列，存放我們每頁的資料
        const newData = [];
        Object.keys(data).forEach((item,index)=>{
          // 因為所有的索引都會被加一，所以其實不影響運作，只是方便我們計算，所以用num，帶替原本的 index
          let num = index + 1;
          if(num >= minPerPageData && num <= maxPerPageData){
            newData.push(data[item]);
          };
        });
        this.infoData = newData;
        // 用物件方式來傳遞資料
        const page = {
          totalPage,
          currentPage,
          // 是否有上一頁
          hasPrevPage: currentPage > 1,
          // 是否有下一頁
          hasNextPage: currentPage < totalPage,
        };
        this.pageData = page;
      },
      // fn, 至底部
      scrollToBottom() {
        // 獲取滾動元素的引用
        const scrollContainer = this.$refs.scrollContainer;

        // 使用scrollIntoView方法使元素滾動到可視區域的底部
        scrollContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
      },
      // fn,取得最新 category
      getCategory(){
        // 使用 Set 來確保類別的唯一性
        const uniqueCategories = new Set();
        Object.keys(this.productsData).forEach((element)=>{
          const category = this.productsData[element].category;
          uniqueCategories.add(category);
        });
        // 轉換 Set 為陣列，然後將它設置到 data 中的 productsCategory
        this.productsCategory = Array.from(uniqueCategories);
      },
      // fn,篩選 category
      filterCategory(category){
        this.paginationData = [];
        Object.keys(this.productsData).forEach((element)=>{
          const item = this.productsData[element];
          if(item.category === category){
            this.paginationData.push(item)
          };
        });
        this.pagination(1);
      },
      //fn, 搜尋
      searchProduct(){
        const newData = [];
        const lowerCaseData = this.searchInputValue.toLowerCase();
        Object.keys(this.productsData).forEach(element => {
          if(this.productsData[element].title.toLowerCase().match(lowerCaseData)){
            newData.push(this.productsData[element]);
          };
        });
        if(newData.length === 0){
          this.serverMessage.message = '很抱歉，沒有符合搜尋條件的產品';
          this.serverMessage.success = false;
          this.$refs.resultModal.openModal();
        }
        this.paginationData = newData;
        this.pagination(1);
      },
    },
    mounted(){
      if( this.loginSuccess ){
        this.getAdminProductsAll();
      };
    },
  };
</script>