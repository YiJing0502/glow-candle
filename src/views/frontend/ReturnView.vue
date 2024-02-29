<template>
  <div class="container-fluid bg-main-medium py-5 text-center">
    <h5 class="">訂單相關問題，請交由官方 LINE@ 詢問</h5>
    <h6 class="mb-3">客服時間： 週一至週五 09:00~17:00</h6>
    <button class="btn btn-solid-dpgray" type="button">LINE@ 官方客服</button>
  </div>
  <div
  class="container message py-5">
    <h2 class="mb-3">退換貨政策</h2>
    <p>✦</p>
    <h5>退款換貨須知</h5>
    <p>若對商品有疑問，請在購買前向我們提出。購買前詳盡地溝通，可省下退款/換貨所耗費的心力、金錢與時間。</p>
    <p>✦</p>
    <h5>退換貨時程</h5>
    <p>
      依照消費者保護法規定，消費者享有商品到貨 7 天鑑賞期（包含例假日)之權益，七日鑑賞期屬『考慮期』並非『試用期』，若商品如經拆 封、使用、以致缺乏完整性即失去再販售價值時，恕無法退貨。
    </p>
    <p>收到商品發現有損壞而需要退換貨，請於收到商品日起七天內聯繫我們，我們將與您確認商品瑕疵或者損壞狀況，並作後續的退貨動作。</p>
    <p>✦</p>
    <h5>退貨貨款何時可以收到 ?</h5>
    <p>收到您完整的退貨商品及發票，確定符合退換貨標準，客服人員會在七個工作天內完成退換貨，並e-mail通知您退換貨完成。</p>
    <p>若您已付訖貨款者，請您提供「訂購人」之「退款銀行、分行」及「帳號」。於退款中加扣 $15 匯款手續費，恕不另行通知。
    </p>
    <p>✦</p>
    <h5>退貨商品</h5>
    <p>
      退回商品必須是全新狀態且保持包裝完整，因消費者個人不當使用拆卸產生人為因素造成故障、毀損、磨損、擦傷、刮傷、髒污、包裝破損不完整者，
      或是發票、配件不齊者，商品及贈品一經拆封使用，恕不接受退貨。
    </p>
    <p>✦</p>
    <h5>商品破損</h5>
    <p>損壞商品，請於收到貨品當日內，請立即利用「 聯繫我們 」向客服人員聯繫，請提供訂單號碼和您的e - mail地址，以獲得更快的服務。</p>
    <p>瑕疵損壞定義:</p>
    <ul>
      <li>1. 收到商品時產品外觀破損</li>
      <li>2. 收到商品時內容物外漏</li>
    </ul>
    <p>✦</p>
    <h5>出貨項目交付錯誤</h5>
    <p>
    收到產品與您訂購品項或數量不合，請於立即與客服人員聯絡。<br>
    為了保護產品，箱子會內置防震材料，請確認箱內產品已完全取出，以避免造成您產品的遺失。
    </p>
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import pageStore from '../../stores/pageStore';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState(pageStore, ['nowPage']),
  },
  methods: {
    ...mapActions(pageStore, ['changeNowPage']),
  },
};
</script>
<style scoped>
.message {
  max-width: 600px;
}
</style>
