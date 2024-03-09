<template>
  <div class="container py-5">
    <h2 class="text-center">✦ 讓光輝照亮生活的每一刻 ✦</h2>
    <h6 class="text-center">為您的生活注入光輝是我們的使命</h6>
  </div>
  <!-- 社群媒體 -->
  <div class="container d-flex flex-column social-img mb-5">
    <div class="row justify-content-center my-auto">
      <div class="col-md-4 text-center d-flex flex-column align-items-center">
        <h2 class="text-main-light">
          #光輝蠟燭 <br />
          在 <br />
          INSTAGRAM
        </h2>
        <h6 class="mb-3 text-main-light">加入我們，了解更多有關於我們的產品、發佈會以及活動！</h6>
        <button type="button" class="btn btn-lg btn-solid-main d-flex align-items-center">
          追蹤我們
          <span class="material-icons">chevron_right</span>
        </button>
      </div>
    </div>
  </div>
  <!-- 灰底 -->
  <div class="container-fluid bg-main-medium py-5 border-bottom border-1 border-main-color">
    <section class="container">
      <div class="row row-cols-1 row-cols-sm-4">
        <!-- logo&標語 -->
        <div class="col mb-5">
          <img class="p-1 mb-3" src="/glow-logo.png" alt="glow-logo" width="75" />
        </div>
        <!-- 關於 -->
        <div class="col mb-5">
          <h5>關於</h5>
          <ul class="navbar-nav lh-lg">
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'about' }"
                class="nav-link p-0"
                @click="changeNowPage('關於我們')"
                :class="{ active: nowPage === '關於我們' }"
                aria-current="page"
              >
                關於我們
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'articles' }"
                class="nav-link p-0"
                @click="changeNowPage('動態消息')"
                :class="{ active: nowPage === '動態消息' }"
                aria-current="page"
              >
                動態消息
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'usage' }"
                class="nav-link p-0"
                @click="changeNowPage('蠟燭使用方式')"
                :class="{ active: nowPage === '蠟燭使用方式' }"
                aria-current="page"
              >
                蠟燭使用方式
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'shopping' }"
                class="nav-link p-0"
                @click="changeNowPage('購物說明')"
                :class="{ active: nowPage === '購物說明' }"
                aria-current="page"
              >
                購物說明
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'return' }"
                class="nav-link p-0"
                @click="changeNowPage('退換貨政策')"
                :class="{ active: nowPage === '退換貨政策' }"
                aria-current="page"
              >
                退換貨政策
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'collaborate' }"
                class="nav-link p-0"
                @click="changeNowPage('企業採購/異業合作')"
                :class="{ active: nowPage === '企業採購/異業合作' }"
                aria-current="page"
              >
                企業採購/異業合作
              </RouterLink>
            </li>
          </ul>
        </div>
        <!-- 聯絡我們 -->
        <div class="col mb-5">
          <h5>聯絡我們</h5>
          <ul class="navbar-nav lh-lg">
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'contact' }"
                class="nav-link p-0"
                @click="changeNowPage('聯絡我們')"
                :class="{ active: nowPage === '聯絡我們' }"
                aria-current="page"
              >
                聯絡我們
              </RouterLink>
            </li>
            <li class="nav-item">
              <button type="button" class="nav-link p-0">LINE 訂單客服</button>
            </li>
            <li class="nav-item">
              <button type="button" class="nav-link p-0">INSTAGRAM</button>
            </li>
            <li class="nav-item">
              <button type="button" class="nav-link p-0">FACEBOOK</button>
            </li>
          </ul>
        </div>
        <!-- 品牌 -->
        <div class="col mb-5">
          <h5 class="lh-base">
            光輝時刻<br />
            台灣原創香氛品牌
          </h5>
          <p class="lh-base">
            「自創立以來，光輝的使命一直是在日常生活中營造一種平靜、舒適、和諧的氛圍，為您的生活注入光輝，讓每個時刻都充滿愉悅與寧靜。」
          </p>
        </div>
      </div>
      <!-- social -->
      <div class="row pt-5">
        <div class="col d-flex justify-content-center">
          <button type="button" class="nav-link myImage">
            <img class="px-3" width="52" :src="facebook" alt="" />
          </button>
          <button type="button" class="nav-link myImage">
            <img class="px-3" width="52" :src="instagram" alt="" />
          </button>
          <button type="button" class="nav-link myImage">
            <img class="px-3" width="52" :src="line" alt="" />
          </button>
        </div>
      </div>
    </section>
  </div>
  <!-- 底文 -->
  <div class="container-fluid bg-main-medium py-5">
    <section class="container">
      <div class="row pt-5">
        <div class="col d-flex flex-column justify-content-center align-items-center">
          <p class="text-center text-medium-gray">
            此網站所使用的圖片均來自
            <a target="_blank" href="https://unsplash.com/" class="text-link-medium-gray">
              Unsplash
            </a>
            由世界各地的創作者所提供的免費圖片，網站本身無任何商業用途
          </p>
          <p class="text-center text-medium-gray">
            © {{ currentYear }} 光輝時刻 由
            <a target="_blank" href="https://www.hexschool.com/" class="text-link-medium-gray">
              六角學院
            </a>
            －後端API 與
            <a
              target="_blank"
              href="https://github.com/YiJing0502/glow-candle/tree/main"
              class="text-link-medium-gray"
            >
              YiJing
            </a>
            －前端畫面 技術支援
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import pageStore from '../../stores/pageStore';
import timeStore from '../../stores/timeStore';

import facebook from '../../assets/svg/facebook.svg';
import instagram from '../../assets/svg/instagram.svg';
import line from '../../assets/svg/line.svg';

export default {
  data() {
    return {
      facebook,
      instagram,
      line,
    };
  },
  computed: {
    ...mapState(pageStore, ['nowPage']),
    ...mapState(timeStore, ['currentYear']),
  },
  methods: {
    ...mapActions(pageStore, ['changeNowPage']),
  },
};
</script>
<style scoped>
.social-img {
  background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709002297226.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=K9HTO3SVRrruyAnwfGde6rKMjzqsdWUeQwewzeLqE342vcHJoPQFyHyCIM%2B8eLqZWB%2FempcMHMoGy%2Bh8jLJUnKaJ8y3TKNWr2kcqUHYH%2BdNlFGg5sVVRqVG5Juhca1XJGh0voUWy%2BeyDzpM6RGYycrhgDLzl88m0xA9guewAO16YO8xI2dnetZMINlBEcyvsaDJrxUk3Ys3v%2B2GNjR3eWaq0eh0Izh%2BBBDTRyfK7mxJj7qV7ApSeJ%2FM%2FznI%2BTpLsKPDIfxoZ1cav%2BCT%2Brkp2ShuaavztLaSoMdY98tmpupx6uEmOfivLYqUKPwx0mpwIh09AAPpP63DItXyF%2FgX9tg%3D%3D);
  /* background-position: center center; */
  background-size: cover;
  height: 40vh;
}
.myImage img {
  transform: scale(1, 1);
  transition: all 1s ease-out;
}
.myImage img:hover {
  transform: scale(1.2, 1.2);
}
</style>
