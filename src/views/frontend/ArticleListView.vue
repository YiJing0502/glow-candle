<template>
  <div>
    <div class="container-fluid bg-main-medium py-5">
      <section class="container">
        <!-- 專欄文章 -->
        <div>
          <h2 class="mb-5">動態消息</h2>
          <div role="button" class="row row-cols-md-3 row-cols-1">
            <div v-for="item in articlesData.articles" :key="item.id" class="col">
              <ArticleCard :article="item">
                <!-- 選擇性內容 -->
                <h6 class="mb-3">由 {{ item.author }} 發布</h6>
                <div class="mb-3">
                  <span
                    class="badge bg-main-light text-deep-gray me-1"
                    v-for="(tag, index) in item.tag"
                    :key="index"
                    >{{ tag }}
                  </span>
                </div>
                <p class="card-text">
                  {{ item.description }}
                </p>
                <!-- 選擇性內容 -->
              </ArticleCard>
            </div>
          </div>
          <div class="row"></div>
        </div>
        <!-- pageBtn -->
        <div
          v-if="
            articlesData &&
            articlesData.pagination &&
            articlesData.pagination?.articles?.length !== 0
          "
          class="d-flex justify-content-end mt-4"
        >
          <nav aria-label="Page navigation example">
            <ul class="pagination" id="pageid">
              <PageBtn
                :prev-is-enabled="articlesData.pagination.has_pre"
                :next-is-enabled="articlesData.pagination.has_next"
                :totalPage="articlesData.pagination.total_pages"
                :current-page="articlesData.pagination.current_page"
                @change-prev-page="goToChangePage(articlesData.pagination.current_page - 1)"
                @change-next-page="goToChangePage(articlesData.pagination.current_page + 1)"
                @change-page="goToChangePage"
              ></PageBtn>
            </ul>
          </nav>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import articlesStore from '../../stores/articlesStore';
import timeStore from '../../stores/timeStore';
import PageBtn from '../../components/PageBtn.vue';
import ArticleCard from '../../components/frontend/ArticleCard.vue';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(articlesStore, ['articlesData']),
  },
  components: {
    PageBtn,
    ArticleCard,
  },
  methods: {
    async goToGetArticles() {
      await this.getArticles();
    },
    async goToChangePage(page) {
      await this.getArticles(page);
    },
    ...mapActions(articlesStore, ['getArticles']),
    ...mapActions(timeStore, ['timestamp10CodeToDay']),
  },
  mounted() {
    this.goToGetArticles();
  },
};
</script>
<style scoped>
.myImage {
  width: 100%;
  overflow: hidden;
}
.myImage img {
  transform: scale(1, 1);
  transition: all 1s ease-out;
  display: block;
}
.myImage img:hover {
  transform: scale(1.2, 1.2);
}
</style>
