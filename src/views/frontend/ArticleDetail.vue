<template>
  <div>
    <PageLoading v-if="isLoading"></PageLoading>
    <div v-else class="container py-5 bg-main-medium container-rounded">
      <div class="d-flex align-items-center justify-content-center flex-column">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <RouterLink
                :to="{ name: 'articles' }"
                class="nav-link p-0"
                @click="changeNowPage('動態消息')"
                aria-current="page"
              >
                動態消息
              </RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">消息內容</li>
          </ol>
        </nav>
        <h2>{{ articleData.title }}</h2>
        <p>{{ timestamp10CodeToDay(articleData.create_at) }} 由 {{ articleData.author }} 發布</p>
        <div class="row d-flex align-items-center justify-content-center">
          <div class="col-6">
            <img :src="articleData.imageUrl" alt="" class="img-fluid mb-5" />
          </div>
        </div>
        <div class="row d-flex align-items-center justify-content-center">
          <div class="col-6">
            <div v-html="articleData.content"></div>
            <RouterLink
              :to="{ name: 'articles' }"
              class="nav-link p-0 d-flex align-items-center"
              @click="changeNowPage('動態消息')"
              aria-current="page"
            >
              <span class="material-icons-round">arrow_back_ios</span>
              返回動態消息
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'pinia';
import timeStore from '../../stores/timeStore';
import pageStore from '../../stores/pageStore';
import alertStore from '../../stores/alertStore';

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      articleData: {},
      isLoading: false,
    };
  },
  methods: {
    // 取得特定文章
    getArticle() {
      const { id } = this.$route.params;
      this.isLoading = true;
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/article/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.articleData = res.data.article;
          this.isLoading = false;
        })
        .catch((err) => {
          this.$router.push({
            name: 'front404',
            params: { pathMatch: this.$route.path.split('/').slice(1) },
            query: this.$router.query,
            hash: this.$router.hash,
          });
          this.showAlertMessage(false, err.response.data.message);
        });
    },
    ...mapActions(timeStore, ['timestamp10CodeToDay']),
    ...mapActions(pageStore, ['changeNowPage']),
    ...mapActions(alertStore, ['showAlertMessage']),
  },
  mounted() {
    this.getArticle();
  },
};
</script>
<style scoped>
.article-img {
  height: 80vh;
}
</style>
