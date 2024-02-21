<template>
  <VueLoading
    v-if="!getRemoteData"
    :active="!getRemoteData"
    :background-color="'#FBFAF4'"
    :color="'#52504B'"
  />
  <div v-else class="container">
    <div class="row mt-4">
      <div class="col d-flex justify-content-end">
        <button type="button" class="btn btn-solid-spec" @click="getAdminAddArticleModal">
          建立新的文章
        </button>
      </div>
    </div>
    <status-message v-if="articlesData.length === 0">{{
      '請點擊「建立新的文章」新增資料'
    }}</status-message>
    <table class="table mt-4 align-middle" v-else>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">圖片</th>
          <th scope="col">標題</th>
          <th scope="col">標籤</th>
          <th scope="col">創立日期</th>
          <th scope="col">作者</th>
          <th scope="col">描述</th>
          <th scope="col">狀態</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in articlesData" :key="item.id">
          <th>{{ item.num }}</th>
          <th>
            <img :src="item.imageUrl" :alt="item.title" class="img-fluid" width="50" />
          </th>
          <td>{{ item.title }}</td>
          <td>
            <span
              class="badge bg-medium-gray text-deep-gray me-1"
              v-for="(tag, index) in item.tag"
              :key="index"
              >{{ tag }}</span
            >
          </td>
          <td>{{ timestamp10CodeToDay(item.create_at) }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.description }}</td>
          <td>
            <span v-if="item.isPublic" class="text-main-spec fw-bold">公開</span>
            <span v-else class="text-deep-gray">非公開</span>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-sm btn-normal-medium block w-50"
              @click="getAdminDeleArticleModal(item.id)"
            >
              刪除
            </button>
            <button
              type="button"
              class="btn btn-sm btn-normal-medium block w-50"
              @click="getAdminArticle(item.id)"
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
            @change-prev-page="goToChangePage(pagination.current_page - 1)"
            @change-next-page="goToChangePage(pagination.current_page + 1)"
            @change-page="goToChangePage"
          ></PageBtn>
        </ul>
      </nav>
    </div>
  </div>
  <ArticleModal
    ref="articleModal"
    :in-edit-article-mode="inEditArticleMode"
    :show-data="showData"
    @post-admin-article="postAdminArticle"
    @put-admin-article="putAdminArticle"
  ></ArticleModal>
  <!-- 刪除產品Modal -->
  <DeleteModal
    ref="deleteModal"
    :show-data="showData"
    @delete-function="deleteAdminArticle(showData.id)"
  ></DeleteModal>
  <!-- 結果modal -->
  <ResultModal ref="resultModal" :server-message="serverMessage"></ResultModal>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import PageBtn from '../../components/PageBtn.vue';
import StatusMessage from '../../components/backend/StatusMessage.vue';
import DeleteModal from '../../components/backend/DeleteModal.vue';
import ArticleModal from '../../components/backend/ArticleModal.vue';
import timeStore from '../../stores/timeStore';
import toastsStore from '../../stores/toastsStore';

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
export default {
  data() {
    return {
      getRemoteData: false,
      articlesData: [],
      pagination: {},
      showData: {},
      inEditArticleMode: true,
      serverMessage: {
        message: '',
        success: true,
      },
    };
  },
  components: {
    PageBtn,
    StatusMessage,
    DeleteModal,
    ArticleModal,
  },
  computed: {
    ...mapState(timeStore, ['currentDate']),
  },
  methods: {
    // modal, 打開新增文章modal
    getAdminAddArticleModal() {
      this.inEditArticleMode = false;
      this.showData = {
        tag: [''],
        content: '<p>輸入文章內容...</p>',
        create_at: this.currentDate,
        isPublic: false,
      };
      this.$refs.articleModal.openModal();
    },
    // modal, 打開刪除文章modal
    getAdminDeleArticleModal(id) {
      const data = this.articlesData.find((article) => article.id === id);
      this.showData = data;
      this.$refs.deleteModal.openModal();
    },
    // fn, 切換頁數
    goToChangePage(page) {
      this.getAdminArticles(page);
    },
    // ajax, 取得 articles
    getAdminArticles(page = 1) {
      this.getRemoteData = false;
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/articles`;
      this.$http
        .get(url, { params: { page } })
        .then((res) => {
          this.articlesData = res.data.articles;
          this.pagination = res.data.pagination;
          this.getRemoteData = true;
        })
        .catch((err) => {
          this.handleServerResponse(false, err.response.data.message);
        });
    },
    // ajax, 取得 article（編輯文章）
    getAdminArticle(id) {
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/article/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.showData = res.data.article;
          this.showData.create_at = this.timestamp10CodeToDay(this.showData.create_at);
          this.inEditArticleMode = true;
          this.$refs.articleModal.openModal();
        })
        .catch((err) => {
          this.handleServerResponse(false, err.response.data.message);
        });
    },
    // ajax, 新增 articles
    postAdminArticle(updatedData) {
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/article`;
      const data = { data: updatedData };
      data.data.create_at = this.dayToTimestamp10Code(updatedData.create_at);
      this.$http
        .post(url, data)
        .then((res) => {
          this.getAdminArticles();
          this.$refs.articleModal.hideModal();
          this.pushToast({
            title: res.data.message,
            style: 'bg-deep-gray',
          });
        })
        .catch((err) => {
          this.handleServerResponse(false, err.response.data.message);
        });
    },
    // ajax, 修改 articles
    putAdminArticle(updatedData) {
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/article/${updatedData.id}`;
      const data = { data: updatedData };
      data.data.create_at = this.dayToTimestamp10Code(data.data.create_at);
      this.$http
        .put(url, data)
        .then((res) => {
          this.getAdminArticles();
          this.$refs.articleModal.hideModal();
          this.pushToast({
            title: res.data.message,
            style: 'bg-deep-gray',
          });
        })
        .catch((err) => {
          this.handleServerResponse(false, err.response.data.message);
        });
    },
    // ajax, 刪除 articles
    deleteAdminArticle(id) {
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/article/${id}`;
      this.$http
        .delete(url)
        .then((res) => {
          this.getAdminArticles();
          this.$refs.deleteModal.hideModal();
          this.pushToast({
            title: res.data.message,
            style: 'bg-deep-gray',
          });
        })
        .catch((err) => {
          this.handleServerResponse(false, err.response.data.message);
        });
    },
    // 處理 伺服器 訊息
    handleServerResponse(success, message) {
      this.serverMessage.message = message;
      this.serverMessage.success = success;
      this.$refs.resultModal.openModal();
    },
    ...mapActions(timeStore, ['dayToTimestamp10Code', 'timestamp10CodeToDay']),
    ...mapActions(toastsStore, ['pushToast']),
  },
  mounted() {
    this.getAdminArticles();
  },
};
</script>
