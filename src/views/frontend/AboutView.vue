<template>
  <!-- branner -->
  <div class="container about-img"></div>
  <!-- 介紹 -->
  <div class="container">
    <div class="text-center py-5">
      <h2 class="text-main-spec fs-1">點亮屬於你的時刻</h2>
      <h6 class="lh-lg">
        「光輝」是一個專注於製作高品質蠟燭的品牌，致力於為客戶營造溫馨、浪漫和舒適的氛圍。<br />以下是我們的堅持的品牌理念：
      </h6>
    </div>
  </div>
  <!-- 理念 -->
  <div class="container-fluid bg-main-medium">
    <section class="container py-5">
      <div class="row row-cols-md-3 row-cols-2">
        <div class="col">
          <span class="material-icons-round fs-1 mb-3 text-main-spec"> family_restroom </span>
          <p class="fs-2">愉悅的時刻</p>
          <p>
            我們的使命是透過精心設計和製作，提供創造美好瞬間的蠟燭，讓客戶在生活中享受愉悅的時刻。
          </p>
        </div>
        <div class="col">
          <span class="material-icons-round fs-1 mb-3 text-main-spec"> verified_user </span>
          <p class="fs-2">高品質材料</p>
          <p>
            我們僅選用優質的蠟料和香料，確保蠟燭燃燒時散發出濃郁、持久的香氣，同時保持安全環保。
          </p>
        </div>
        <div class="col">
          <span class="material-icons-round fs-1 mb-3 text-main-spec"> design_services </span>
          <p class="fs-2">造型設計</p>
          <p>每一款「光輝」蠟燭的外觀和造型都經過精心設計，將蠟燭納為空間裝飾的一部分。</p>
        </div>
        <div class="col">
          <span class="material-icons-round fs-1 mb-3 text-main-spec"> view_carousel </span>
          <p class="fs-2">多元的香氣</p>
          <p>
            我們提供多樣的香氣選擇，涵蓋花香、果香、木質香等不同系列，滿足客戶各種喜好和場合需求。
          </p>
        </div>
        <div class="col">
          <span class="material-icons-round fs-1 mb-3 text-main-spec"> emoji_nature </span>
          <p class="fs-2">可持續發展</p>
          <p>「光輝」致力於可持續發展，我們優先選擇環保友好的材料，並努力減少對環境的影響。</p>
        </div>
        <div class="col">
          <span class="material-icons-round fs-1 mb-3 text-main-spec"> wb_incandescent </span>
          <p class="fs-2">客製化服務</p>
          <p>我們提供客製化訂製服務，讓客戶可以根據自己的喜好和場合定制獨一無二的蠟燭。</p>
        </div>
      </div>
    </section>
  </div>
  <!-- 團隊 -->
  <div class="container py-5">
    <div class="row row-cols-xxl-2 row-cols-1">
      <div class="col px-0">
        <div class="overflow-hidden w-100">
          <img
            src="https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709087936648.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Iu5aXZlqvF1Zs6Z1V4nO0li5mysvgULDEMmaoIyJeZ7byBtshAsY3pAnW17CNQqJWLRk9W5dHnVHETXU96A33pBLOGeukr3z7gk3H27SIuW23k7%2FbO5klKBdTOocLjcZyaNak%2BTvU%2FMnwuPGB13WfMOQ5cD2Urcu6D8E3ao0BfiCSlLOCwDCUxDzvw5VSm2ECguQNU8xzpt3dWPJoUIXZIPoLBqkEf%2FdmlzPe%2FfpCvHCeeZv2G7zSB1dzVOngESEqm%2BQB0iLpDLjNDndcKxYnZHpE3DgUk7UxIT8SlxHSuY7nlMjPTloM13BnIKv476plgbnfNbFzWOk5qPb5FWGIg%3D%3D"
            alt="關於我們的團隊"
            class="img-fluid"
          />
        </div>
      </div>
      <div class="col bg-main-spec d-flex flex-column justify-content-center align-items-start p-5">
        <h2 class="text-main-light">關於我們的團隊</h2>
        <p class="text-main-light font-monospace lh-base">
          自 2023 年創立，來自台灣原創生活風格品牌，以手工香氛蠟燭作為開端。
          <br />
          從生產到顧客使用，我們致力於讓所有細小的過程體驗都能創造平靜、舒適、和諧的氛圍。
          <br />
          我們持續探索更多可能性，創造出不同作品。
        </p>
        <p class="text-center text-main-light">歡迎您與我們一起共同創作。</p>
        <RouterLink
          :to="{ name: 'collaborate' }"
          type="button"
          class="btn btn-lg btn-solid-main d-flex align-items-center"
          >成為合作夥伴
          <span class="material-icons">chevron_right</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.about-img {
  background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709084811905.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=BgWRKSWrG7bpRZ03f7ZcDDzl1Gyr6Ngp3CZqF4GN08a2imZTaDBnyZzYMa4%2F5SdmtFBiaCxzAnr1nN7S%2FAmCTz9h9nt7hWYAzusrcNmL5WzOafLFkFLIv%2FlZ%2BZMmsXR5HzONGX92qSGglifPT%2BhRA2vbZGC6pWN%2BJK2BIvbXAGMdci9aU%2FzBA%2Bfv%2BZv3M9OhH7Cy6rLoWgRpUbuB2AoU55N%2BBckPvctB9lv6M1eSRp8IA7f7qcMwPvr8xIYR%2BtmWLjw7BLkzxkb7hmp7RsQ%2FCYqBRu3%2B4934FOIKAb1eFIl5EkMFixwmNfRmCqCQNOCTM3TXtJGygbzR8x0yGRhkog%3D%3D);
  height: 80vh;
  background-position: 50% 75%;
}
</style>
