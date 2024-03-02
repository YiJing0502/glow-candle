<template>
  <!-- 大圖branner -->
  <div class="container">
    <section class="mb-5">
      <div class="container d-flex flex-column main-img container-rounded">
        <div class="row justify-content-center my-auto">
          <div class="col-md-4 text-center d-flex flex-column align-items-center">
            <h2 class="text-main-light">
              愜意花園系列 <br />
              x <br />
              甜點香氛
            </h2>
            <h6 class="mb-3 text-main-light">
              焦糖蘋果塔、南瓜派、雲朵蛋糕，在家也能享受宛如待在咖啡館的下午茶時光
            </h6>
            <RouterLink
              to="/products?category=香氛蠟燭&key=2&content=愜意花園系列&page=1"
              type="button"
              class="btn btn-lg btn-solid-main d-flex align-items-center"
              >立即購買
              <span class="material-icons">chevron_right</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- 暢銷單品 -->
  <div class="container-fluid bg-main-medium py-5">
    <section class="container">
      <h2 class="text-center text-main-spec">✦ 暢銷單品 ✦</h2>
      <p class="text-center">不知道該選哪種香氛蠟燭？以下是我們的回購率最高的商品：）</p>
      <div class="row row-cols-lg-4 row-cols-sm-2 row-cols-1" role="button">
        <div class="col" v-for="item in bestsellersData" :key="item.id">
          <ProductCard :product="item"></ProductCard>
        </div>
      </div>
    </section>
  </div>
  <!-- 經典系列 -->
  <div class="container py-5">
    <section class="">
      <h2 class="text-center text-main-spec">✦ 我們的經典 ✦</h2>
      <p class="text-center">
        「平日中的靜謐時刻，溫暖的光輝將您包裹，帶來安詳的平靜。在平靜日系列裡，您可以找到簡單而美好的生活瞬間」
      </p>
      <!-- 平靜日卡片 -->
      <div class="row row-cols-lg-4 row-cols-sm-2 row-cols-1 mb-5" role="button">
        <div class="col" v-for="item in calmSeriesData" :key="item.id">
          <ProductCard :product="item"></ProductCard>
        </div>
      </div>
      <!-- 收藏套組 -->
      <div class="row row-cols-sm-2 row-cols-1">
        <div class="col px-0">
          <div class="overflow-hidden w-100">
            <img
              src="https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1708418706132.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Tu33qbf%2FVBJxXSudzGvKGsnMgL5%2FnenSjGrDErVDdjRm0q4KXAKOZrwSx01TLcOnkuK1EACMDfTeQa0QHDxrYMZlZSa%2B4ik%2BQHB4%2FuWSrazLFzP2FhqdoZkqSw585cxt8FOifbaX2yGJ%2BEPtRi5RhVUqPLS02sS7m2KQtd%2FT0CIKe6LsF4hTTqU6A1kKeSCTxPyIr1S6jEuaTrmrMGiWbpC9G7kA6IK8t9jb1Ax3pavPXyYVq2GDkOa5C84OU2aunQSJc365GGknAPap0Zl9JUv7NXLhaFVMc%2BrmbziebTYGlhaTnVqgtw4rtS9hC%2FsfN%2FnE2klqZQloxiDa3LOn1w%3D%3D"
              alt="平靜日系列210g四入香氛蠟燭收藏套組"
              class="img-fluid bundle-image"
            />
          </div>
        </div>
        <div
          class="col bg-main-spec d-flex flex-column justify-content-center align-items-center p-5"
        >
          <h2 class="text-center text-main-light">最佳的送禮選擇</h2>
          <h4 class="text-center text-main-light">平靜日系列210g四入香氛蠟燭收藏套組</h4>
          <h6 class="text-center text-main-light">現正特價中</h6>
          <RouterLink
            to="/product/-NoLX8ZL10JiBTlwGN6T"
            type="button"
            class="btn btn-lg btn-solid-main d-flex align-items-center"
            >立即購買
            <span class="material-icons">chevron_right</span>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
  <!-- 品牌介紹 -->
  <div class="container-fluid bg-main-medium">
    <section class="container">
      <!-- 品牌介紹 -->
      <div class="py-3 mb-5">
        <div class="row row-cols-md-2 row-cols-1 mb-4 py-4">
          <div
            class="col d-flex flex-column px-0
             justify-content-center align-items-center align-items-md-start"
          >
            <h2 class="">光輝時刻</h2>
            <h2 class="mb-4">台灣原創香氛品牌</h2>
            <p class="w-75">
              「自創立以來，光輝的使命一直是在日常生活中營造一種平靜、舒適、和諧的氛圍，為您的生活注入光輝，讓每個時刻都充滿愉悅與寧靜。」
            </p>
            <RouterLink :to="{ name: 'about' }" class="btn btn-solid-dpgray btn-lg w-75 mb-3"
              >關於我們</RouterLink
            >
          </div>
          <div class="col px-0">
            <img
              src="https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1708763924054.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=jjqlD5PtlNlYnPpvuKreWbuOskRxwCqy5ygyw55ZkHnnNa8YM6Ru%2FgCdaQc95qtswI0KUXzuRzLWWCFj3OYlM3NX%2FQZmpQilKJotulVRVyvy3%2FXqi3bNThvDu4Xv2BGKLEJ77tlQ3hkB4%2Brde%2FKE%2FZbc5HP1klG95Ihj4AIT%2FBVHA4LkbHzSsIQf7OuqiJNVYHcjkvhi5RviTtWG5hKwP%2FwpMinTvGyhzRpUSpKyu4wMKpNxg4NuNuV1MD6DAeuusgY5x1yYHZ1k7NcMzxn0Wumpo0geyW2yeqm831Q%2BRN5KVWG%2Fo468dQZ0FDXo6DsOja%2FCAXHDj6NuIiZMgAr9Tw%3D%3D"
              class="img-fluid d-flex justify-content-start align-items-center"
              alt=""
            />
          </div>
        </div>
        <p class="text-center">
          我們自豪地使用100%大豆蠟製成香氛蠟燭，每一款都經過精心的手工製作，並以限量方式販售。
        </p>
      </div>
    </section>
  </div>
  <!-- 服務保障 -->
  <div class="container">
    <section class="">
      <div class="border-bottom border-1 border-main-color mb-5 pb-3">
        <div class="row row-cols-md-4 row-cols-2">
          <div class="col">
            <span class="material-icons-round fs-1 mb-3"> local_shipping </span>
            <p class="fs-2">交貨快速</p>
            <p>
              在商品庫存充足下，我們允諾下單三天內會出貨，如您所訂購的商品庫存不足，我們將盡快以E-mail通知您。
            </p>
          </div>
          <div class="col">
            <span class="material-icons-round fs-1 mb-3"> verified_user </span>
            <p class="fs-2">售後服務</p>
            <p>
              依照消費者保護法規定，消費者享有商品到貨七天鑑賞期之權益，但若商品如經拆封、使用，恕無法退貨。
            </p>
          </div>
          <div class="col">
            <span class="material-icons-round fs-1 mb-3"> phone </span>
            <p class="fs-2">客服服務</p>
            <p>
              如購買過程及收到商品有任何問題，歡迎 來電、E-mail 聯繫我們的客服， 我們會盡快回覆您。
            </p>
          </div>
          <div class="col">
            <span class="material-icons-round fs-1 mb-3"> enhanced_encryption </span>
            <p class="fs-2">免運服務</p>
            <p>
              我們的商品付款採用「線上信用卡」付款後出貨，運送採用「宅配到府」免運服務，讓您輕鬆購買、安心收貨。
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- 動態消息 -->
  <div class="container-fluid bg-main-medium py-5">
    <section class="container">
      <!-- 動態消息 -->
      <div class="">
        <h2 class="mb-5">動態消息</h2>
        <div class="row row-cols-md-3 row-cols-1" role="button">
          <div v-for="item in homeArticles" :key="item.id" class="col">
            <ArticleCard :article="item"></ArticleCard>
          </div>
        </div>
        <div class="row"></div>
        <div class="row justify-content-center my-auto">
          <div class="col-md-4 text-center d-flex flex-column align-items-center">
            <RouterLink
              :to="{ name: 'articles' }"
              type="button"
              class="btn btn-lg btn-solid-dpgray d-flex align-items-center"
              >查看更多
              <span class="material-icons">chevron_right</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
    <ResultModal ref="resultModal" :server-message="serverMessage"></ResultModal>
  </div>
</template>
<script>
import { RouterLink } from 'vue-router';
import { mapState, mapActions } from 'pinia';
import productsStore from '../../stores/productsStore';
import articlesStore from '../../stores/articlesStore';
import ProductCard from '../../components/frontend/ProductCard.vue';
import ArticleCard from '../../components/frontend/ArticleCard.vue';

export default {
  data() {
    return {
      spaceBetween: 10,
      // 放置首頁的文章
      homeArticles: [],
      // result model
      serverMessage: {
        message: '',
        success: true,
      },
    };
  },
  computed: {
    ...mapState(productsStore, ['bestsellersData', 'calmSeriesData', 'calmSeriesBundle']),
  },
  components: {
    ProductCard,
    RouterLink,
    ArticleCard,
  },
  methods: {
    async goToGetHomeArticles() {
      try {
        const res = await this.getArticles();
        for (let index = 0; index < 3; index += 1) {
          const element = res.data.articles[index];
          this.homeArticles.push(element);
        }
      } catch (err) {
        this.serverMessage.message = err.response.data.message;
        this.serverMessage.success = err.response.data.success;
        this.$refs.resultModal.openModal();
      }
    },
    ...mapActions(articlesStore, ['getArticles']),
  },
  mounted() {
    this.goToGetHomeArticles();
  },
};
</script>
<style lang="scss" scoped>
.main-img {
  background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1708936810913.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=coIMN4vj%2FhT9ywSbS%2FZF%2BjM1CZTewhhkDlR05aXEyCYbAHIn6wP2Zrj2q2yd444z%2BRwOHKFzU423mqF3MjTwpFfx%2Bh4achbHPfhr%2F78GE3rT7P30lNaVL6V9%2BbhDs0yk8CJC%2F86M2x2xBjq8ue%2Bga2DYOLvun1ki16osdhAiTYWrHuPmQyzewyuEmkNNB6eAygVFq2qtpaDtmalPgCcKYladrg5etlxtFfGGzXr8q9ga0CwPym6Vt3nYE9YG7A5t5D7seR4e%2FwRUsxHRWyOJkW7Oro%2BA%2FW0N%2BSIb%2B9R0kludYwZQGnHD5UFhMFmnhGdNua5Rx24nTXvesHfck2mo4A%3D%3D);
  background-position: center center;
  height: 80vh;
}
.bundle-image {
  transform: scale(1, 1);
  transition: all 1s ease-out;
  display: block;
  &:hover {
    transform: scale(1.2, 1.2);
  }
}
</style>
