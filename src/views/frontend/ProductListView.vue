<template>
  <div>
    <PageLoading v-if="isLoading"></PageLoading>
    <div
      v-else
      class="container bg-main-medium container-rounded my-5 py-7r px-lg-5 px-md-4 px-sm-3"
    >
      <div
        class="d-flex align-items-center justify-content-center flex-column"
        v-if="productPagesData.products?.length === 0"
      >
        <div>
          <span class="material-icons-round fs-1">announcement</span>
        </div>
        <h2>很抱歉，沒有相符的產品資料</h2>
        <button class="btn btn-outline-dpgray fs-5 mt-3" @click="this.$router.go(-1)">
          返回上一頁
        </button>
      </div>
      <div v-else>
        <!-- 標題 -->
        <div
          class="d-flex align-items-center justify-content-center flex-column mb-3 text-main-light container position-relative px-0"
        >
          <img
            v-if="!this.$route.query.content"
            :src="imageUrl"
            alt=""
            class="container m-0 p-0 object-fit-cover rounded-5"
            height="300"
          />
          <img
            v-else
            :src="seriesImageUrl"
            alt=""
            class="container m-0 p-0 object-fit-cover rounded-5"
            height="300"
          />
          <div class="position-absolute top-50 start-50 translate-middle text-center">
            <h2 class="border-secondary pb-2 fw-bold">{{ productsPageStatus }}</h2>
            <!-- 香氛蠟燭 -->
            <h4 class="">{{ this.$route.query.content }}</h4>
          </div>
        </div>
        <!-- dropDown/sort -->
        <div class="d-flex justify-content-between">
          <div v-if="productsPageStatus === '香氛蠟燭'" class="">
            <!-- 系列 -->
            <div class="btn-group">
              <button
                type="button"
                class="btn dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                系列
              </button>
              <ul class="dropdown-menu">
                <li v-for="(item, index) in uniqueSeriesArray" :key="index">
                  <button @click="goToFilterCandles(2, item)" class="dropdown-item">
                    {{ item }}
                  </button>
                </li>
              </ul>
            </div>
            <!-- 調性 -->
            <div class="btn-group">
              <button
                type="button"
                class="btn dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                調性
              </button>
              <ul class="dropdown-menu">
                <li v-for="(item, index) in uniqueTonesArray" :key="index">
                  <button @click="goToFilterCandles(1, item)" class="dropdown-item">
                    {{ item }}
                  </button>
                </li>
              </ul>
            </div>
            <!-- 容量 -->
            <div class="btn-group">
              <button
                type="button"
                class="btn dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                容量
              </button>
              <ul class="dropdown-menu">
                <li v-for="(item, index) in uniqueCapacitiesArray" :key="index">
                  <button @click="goToFilterCandles(3, item)" class="dropdown-item">
                    {{ item }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <!-- <div class="">
            <button
                type="button"
                class="btn dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                價格篩選
              </button>
              <ul class="dropdown-menu">
                <li>
                  <button
                  @click="goToPriceSort('asc')"
                  class="dropdown-item">
                    價格由低到高
                  </button>
                </li>
                <li>
                  <button
                  @click="goToPriceSort('desc')"
                  class="dropdown-item">
                    價格由高到低
                  </button>
                </li>
              </ul>
          </div> -->
        </div>
        <!-- product card -->
        <div
          class="row row-cols-xl-4 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-2 mt-3 mb-3"
          role="button"
        >
          <div class="col mb-3" v-for="item in productPagesData.products" :key="item.id">
            <ProductCard :product="item"></ProductCard>
          </div>
        </div>
        <!-- pageBtn -->
        <div
          v-if="
            productPagesData &&
            productPagesData.pagination &&
            productPagesData.products?.length !== 0
          "
          class="d-flex justify-content-end mt-4"
        >
          <nav aria-label="Page navigation example">
            <ul class="pagination" id="pageid">
              <PageBtn
                :prev-is-enabled="productPagesData.pagination.has_pre"
                :next-is-enabled="productPagesData.pagination.has_next"
                :totalPage="productPagesData.pagination.total_pages"
                :current-page="productPagesData.pagination.current_page"
                @change-prev-page="goToChangePage(productPagesData.pagination.current_page - 1)"
                @change-next-page="goToChangePage(productPagesData.pagination.current_page + 1)"
                @change-page="goToChangePage"
              ></PageBtn>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import productsStore from '../../stores/productsStore';
import alertStore from '../../stores/alertStore';

import PageBtn from '../../components/PageBtn.vue';
import ProductCard from '../../components/frontend/ProductCard.vue';

export default {
  data() {
    return {};
  },
  components: {
    PageBtn,
    ProductCard,
  },
  methods: {
    goToChangePage(page) {
      const { query } = this.$route;
      const updatedQuery = { ...query, page };
      this.$router.push({
        name: 'products',
        query: updatedQuery,
      });
    },
    goToPriceSort(sort) {
      this.$router.push({
        name: 'products',
        query: {
          category: this.$route.query.category,
          page: this.$route.query.page,
          price: sort,
        },
      });
    },
    goToFilterCandles(key, content) {
      this.$router.push({
        name: 'products',
        query: {
          category: '香氛蠟燭',
          key,
          content,
          page: 1,
        },
      });
    },
    ...mapActions(alertStore, ['showAlertMessage']),
    ...mapActions(productsStore, [
      'getProductsAll',
      'getProduct',
      'pagination',
      'getProducts',
      'sortPrice',
      'filterCandles',
    ]),
  },
  computed: {
    imageUrl() {
      switch (this.productsPageStatus) {
        case '全部產品':
          return 'https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709534574174.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ABPeY2OCx99%2FsoaPNDfiNgaIcr41VQ6%2B5QjhZFaVAtQgidcOuH7ufl3LCQswIy9OfTkDYpCeDC6vPh0jzPfmLQopQSfw8FB3dFocXAl9FGMc%2BBua60LicOdL%2F8unBVXSfwNlDAo4aQqvixCiemVyTnjCkryhbjiNQhw3l2c1uZkDkTgkfTMu3liiJ7nfLx5%2FYUWsGqpHGHHuLVO8UXqdr0q7miBe%2B4n5tAG1I7zH9B%2FFOcyqgzcleniRL3ONt8G1Re4Bc2y9a5TepIgRFwqlJrpmqI3jhxowUsFjoUBHltFF7hrACSEwDA5ufSJ9fmKCIt0%2BwaqEUEGLuDJm7%2FbdaA%3D%3D';
        case '香氛蠟燭':
          return 'https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709529481871.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=p1GdhWSVPN0436tdQpvm4iRsUBVr7mZIsGSKVUn98lcygsPZGHN%2BcBF7PGKSjGSHfeqwkrVvPUnmikjtbfvRckZyPmfLMqE4Jha2dd1hFSOtF4UaVT6YBtuYo2GTDCBbJ%2Fs9SjpMTET%2B7Ab%2BvC%2Bn%2FwbdzJJ%2BY80X1I9PFH5WcU1Wbq4KOvgFBcudXOUq%2FHV2wCYfO8hsr%2Bl9zKkFTPzFwwafZGRugwNdVwfKEw5cNhHeuc7zsiBzLpYkCNm%2F839GKBI%2FYp7AHOBFjG1XDPmVhr7eXQX%2Fnt3VOCs9ZK8kO9A0nIcbk02wlVEYqlp%2BLUf3Wrfqksll5%2FviP0%2BgkSY3Pw%3D%3D';
        case '送禮搭配':
          return 'https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709536203350.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=q4V%2BB9FZlU%2BieF8NhSKgmmMAFgpy0VcpNuiz7GemG2O11BUgPEeCX6LqxP92URhIvjK77rcP4BCWkMPN9SHt%2BAZvtXG8Q40sHMjPzDMzZRsxnkkMJfdVrLAQ%2BXuiw0%2FF%2FYHZLAQ%2FgjrDWh8IUPFnh0XwNHecSbHamDuOoIt7Amv5%2BOezk27QF99batFr8MXFofBlMpnwiEx5h8gcNoQc8askN47J1fsXAn3fuQnUQ8Fo7ShH1Au%2Fr%2FGS8R6NpcNvx5VxJSyFmlYXE6QnRfLuDSizdBMzzLBrLJlI53c8lh923ofyl5lY6UYz0SKf0TvB4j%2FRlzgzC1n1d9KjR4QPiA%3D%3D';
        case '蠟燭配件':
          return 'https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709539999911.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=U%2Bgr3oSFe681HFVnzh27z3ZuoY0VMPZy3ZjDWu82vMLymJiGA1alh7jI3JdxtSQ7L1ma9s5AYvj7TF6HyhCyQZZ875iEeP1D2%2BidkWKGpyqf0OrUwMS%2FlXptKbnzIj2A%2BE8y%2FwVfyjCJzCQcsuZqUW%2B5phVDSgg8u6Sikok6jqItTNDYYZMnn718tTiFG48qK%2FX6IWIz5971H253%2FZnHzdmL235sYxCV9HTDZvHG0%2BQGkM4w2UgxDfiYExkoOrA%2FVrCjbp8dmAw4ufTj9kGW2j4HdVFDN%2F%2F7IN2%2B2VcSDs0QA41OPfdMwlIMNzt412na4sG3VbInI%2Beb6VNRNuaFHA%3D%3D';
        default:
          return 'https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709534574174.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ABPeY2OCx99%2FsoaPNDfiNgaIcr41VQ6%2B5QjhZFaVAtQgidcOuH7ufl3LCQswIy9OfTkDYpCeDC6vPh0jzPfmLQopQSfw8FB3dFocXAl9FGMc%2BBua60LicOdL%2F8unBVXSfwNlDAo4aQqvixCiemVyTnjCkryhbjiNQhw3l2c1uZkDkTgkfTMu3liiJ7nfLx5%2FYUWsGqpHGHHuLVO8UXqdr0q7miBe%2B4n5tAG1I7zH9B%2FFOcyqgzcleniRL3ONt8G1Re4Bc2y9a5TepIgRFwqlJrpmqI3jhxowUsFjoUBHltFF7hrACSEwDA5ufSJ9fmKCIt0%2BwaqEUEGLuDJm7%2FbdaA%3D%3D';
      }
    },
    seriesImageUrl() {
      switch (this.$route.query.content) {
        case '愜意花園系列':
          return 'https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709537287121.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=UIP7vA7MgUbWvrfQMl5nFBBl%2FAEj%2FlgtLp%2Bo8mTr1Qf4gz%2BSGUr0V%2BI3RInQHryUMTJMtR7EeE62wRwiWDExcYELcRYgMOV4ivJdzXFfAjC3nauZK0ZrXLiAlFwylVN5nFA62uxuxzU8XzGVf3OwVuA0Uh67AlMTDjbPfOC6r7hZ0TfxqwakhfYu6WtBfsly1PL0HOFfOyKQfF3ErPx8focEQayVzYHyNCgup5%2BxjkduwvgpOhXure%2BnyH6zmaXOvhWg0vOCLSJxctN8VYirWd5lSCoYgVxPKu2cmKCvrx3U8m6JtEF3zefCjifA32UPYljWtb7MwuTzHoUDPdwbGA%3D%3D';
        case '平靜日系列':
          return 'https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709537740040.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=lcrCPkWt1kEbO1McLtEYd1eiFrZuthKDPCPDFGXzclQx1je3qQ02nX3rwEKZN0qVTRkxCyheQfR9cTPo%2FEDVQgXAC%2FeHfHDv1KcOt7sRZQgkLGo7hgg6%2FevAzNjsenM26SAiMDlnvePEIf5y4JYyF6gSsUz8ZKNQIVlLLTM3l7%2BYiwrNq6O7YUh9G%2BKCjSkpuq71FjdOrhNLjTdA058YJFxKQsgvpPrRlI%2BMilkHZ0l5RGZwhzKudtBWIP9RCtOCrMmayPu5Eq%2FP6rTjLhssFictu5DW5aD2kQHEMqpuJVdd4EpVvFEIlYX3VAtpx1ZeKto9uSMO%2B3STcrI9lh9%2F6g%3D%3D';
        case '大地懷抱系列':
          return 'https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709537892666.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=j668ZuCdeF3bNbadE486q19FFGkbuw2%2FWG%2BqIaMMcZpO78xDsCc%2F9vWbYI2oEVUVFQHRIJGeMWn7t7meeXiCllpskRbBPIRr1XP6JpI5WgMSwInWvqhVUy1XiH5obPfK7iyj%2BbyTD0TD0BmHiDs4i2%2FLtYS1FbWDED2cwdPGPOkAzHjD9OYbFT1qi7diEZs%2BihdKf6DmFNUEWrMqqjvbKbTGvsw2rUHKGhctftnQzbSPqZfL2uTl5hGuOnC9%2FOvBiaw81IAI4y4PnW26epK2dGR1p0chwimwP9rWEK3i7stPALwwy49OtW6yhE0bt1MfCleo6jPDu1MS%2B1QBr%2F%2FKPQ%3D%3D';
        case '花香調':
          return 'https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709540346274.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=NXL41QVCy1vxzPPzzBI6dsfiFlso15%2BfnNVuAxahJDwkKSVi7RHs%2Fjc4PlNmIQWn8r0VrCt4Jq1DJ4YvqttjtdqrKi0YafUN0xzYN%2F3rch%2Fqeyi7WCSp2l1B8OKmFlDTvWYpSt1cpWKgOk9QjVOqMNJ5nU4h4VIJAv%2Bum27eihRBQVf1Munkv6Iu9nrTZrof3Eg7wgyHaiD%2BHBs%2FoZDR1vQXcRkV9dUwbkAmLzdIX0ALoZzFMQ4ZwyrISOnHNEFmZsgUGRNd5DDEozHTTs7mIkqoa1XNWgojTNk71Ec558M3LoqxzMO6iMhgU9bmj0sftnp4MtKVRQaaqw4bxoupAg%3D%3D';
        case '果香調':
          return 'https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709538939546.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=gKAGbW2iKwfs4TmVV10rSWo2nS0VjKQh20gVTev5JE91DRgcqG0gy%2F8ll2bsajGbuMUW%2BG6pa%2FXeatxvxeUphtU5e9hTbcDahenZEj8D13I2PBPHbQ5VjtTLU1SOT14oJstAJPh2%2Bs9RUED33vWEdRNifkHRmP%2BXWXqJq%2BUj75Onw5Urd1MoUw1rO72QRxnr%2BeWGh7ZTT%2FNPbkAbOqVHHi%2BQwjvmoboa3rPV2KGzQHxsBYV4qDuiKtgle220y8vDJRuwEBgcEWQPwYLZEylF%2BMFMvRojbCr3P374uADpAu40zeffH9ufwZ1kW%2BKSH8Rn0MPpZCsW8IC84KmkOv%2FyMw%3D%3D';
        case '草本調':
          return 'https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709539121906.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=aRVC1Ns19I9nt09PuVonHRINz0HOCMOUhvs%2BQKEF%2FQvW4NK1aiOEtr25SZ%2FMWAa56QIFi5prB22B8cW0%2FnzC29CPuwzDeACr6cY9pjdQu%2FbBqDq39D%2BpiyBKmeTZBQ1T%2BEK92VPMnXCY%2Fxrd0xAt%2BNR8klC3ZqAScxZQS2XvU5%2BYzcRG2qSI4aF9EBxmfjAViahjm2tQC6EWPNTkVDpQckOBj%2BB9ScsSdlz3RquZXcAtDDz3VEIPHgycETZZ2EfOXibh4%2Fk5CEtMnMOOpHxnyQyi2Yf6EH5p8ZiwIOK8c2Btz2JC3JhP4OXTvHaZzfiaNqfL4Gclj14m9LUEViuZ7g%3D%3D';
        case '木質調':
          return 'https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709539272664.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=RGXdzhvo0tuQqMtvyBkSjW4ygdxTjDGuYhC92YXPHtT20Xs6KdbC8xmBeP6HudY1OuaKNZDSEvZhYaeWRadP5AI9XYh%2F6DazuDndzrYrxocCZRnrg2oIv%2BIuEQKrgBT1rpr9zJM33F3t3DH8o1%2F1AX5btTSNqLtBaaCm2gg%2FK1F0Egya9Ehq0VOOBsN0mxUxzP95r8r9uoCNicKewQP0RZPihS73OfjvCLMPi2oYT708QNMyAsnY30uAsJ4Cu69%2FTCDCmeFxSawquT2ATJy523OhYEiaz4E339cOkAmRV0oNaVGGtRAEPrGUPNzsv8mi1FK%2F%2BRuWir85shgQzFhXcg%3D%3D';
        default:
          return 'https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709534574174.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ABPeY2OCx99%2FsoaPNDfiNgaIcr41VQ6%2B5QjhZFaVAtQgidcOuH7ufl3LCQswIy9OfTkDYpCeDC6vPh0jzPfmLQopQSfw8FB3dFocXAl9FGMc%2BBua60LicOdL%2F8unBVXSfwNlDAo4aQqvixCiemVyTnjCkryhbjiNQhw3l2c1uZkDkTgkfTMu3liiJ7nfLx5%2FYUWsGqpHGHHuLVO8UXqdr0q7miBe%2B4n5tAG1I7zH9B%2FFOcyqgzcleniRL3ONt8G1Re4Bc2y9a5TepIgRFwqlJrpmqI3jhxowUsFjoUBHltFF7hrACSEwDA5ufSJ9fmKCIt0%2BwaqEUEGLuDJm7%2FbdaA%3D%3D';
      }
    },
    ...mapState(productsStore, [
      'isLoading',
      'productPagesData',
      'productsPageStatus',
      'productsCategory',
      'uniqueSeriesArray',
      'uniqueTonesArray',
      'uniqueCapacitiesArray',
      'initializePage',
    ]),
  },
  watch: {},
  mounted() {
    this.initializePage(this.$route.query);
  },
};
</script>
<style scoped>
.product-img {
  background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709525514095.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=S%2FTiO5GLY7xJkia3yyAP3OicSR09vOUVwyKyveW7XrFX47EjXIfvoZPGI9l1GFZeTZtehE7nXXywLAe%2FYHumX%2FNFKr4uNhv%2BhTo2MqOI4wA%2BavPD6cM%2BrXwEtZSYxr0x8W%2BQmg9sglChhFKO1No56PCchwRubAIQ%2BH%2FgJ9qNZYAHmB1Oz%2F4CqCGALBVkWo%2FqCWbcr08p%2BX3SekHWWeEC7aKrD5JG53bM1gslK7vfmmZExMzfgdtz%2BRCvu9XGkCCXzsMoTc0XGS3BXgVQnJuwLjfoW%2Bc1TrptCTewlVf1C1ETlymtjTbANpj%2Fpm%2FUO%2BhDGEAXmGPpbIBZUMtndLCPYw%3D%3D);
  height: 40vh;
  width: 100%;
}
</style>
