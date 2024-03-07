<template>
  <div>
    <div class="container-fluid bg-main-medium py-5 text-center">
      <h5 class="">訂單相關問題，請交由官方 LINE@ 詢問</h5>
      <h6 class="mb-3">客服時間： 週一至週五 09:00~17:00</h6>
      <button class="btn btn-solid-dpgray" type="button">LINE@ 官方客服</button>
    </div>
    <div class="container message py-5">
      <h2 class="mb-3">購物說明</h2>
      <p>✦</p>
      <h5>出貨時程與天數</h5>
      <p>
        香氛商品純手工製作，我們團隊需安排固定的製作日程，下單付款完成後，約 3 - 7
        工作天不含假日及國定假日安排出貨。 <br />如有現貨，將會在 3
        日內出貨，可以諮詢我們的客服貨物狀況。
      </p>
      <p>✦</p>
      <div class="accordion">
        <!-- 購物流程說明 -->
        <BasicCollapse :uniqueId="'ShoppingProcessExplanation'">
          <template v-slot:header> 購物流程說明 </template>
          <template v-slot:body>
            <ul>
              <li>
                將喜愛的商品加入購物車 → 進入購物車，填寫收件資料 → 按下結帳按鈕 →
                訂單編號產生，並前往付款 → 完成購物 → 確認訂單明細
              </li>
              <li>
                提醒您，商品加入購物車但未結帳前，並無保留商品庫存功能，商品庫存分配將以結帳順序為依據。
              </li>
            </ul>
          </template>
        </BasicCollapse>
        <!-- 購買注意事項 -->
        <BasicCollapse :uniqueId="'PurchaseImportantNotes'">
          <template v-slot:header> 購買注意事項 </template>
          <template v-slot:body>
            <ul>
              <li>
                下單付款後，等同於同意光輝時刻有限公司之退換貨政策，即視為同意接受本賣場規範，光輝時刻有限公司有權決定取消、終止、修改或暫停本賣場規範。
              </li>
              <li>
                當包裹出貨完成未被領取或拒收退回(
                到貨後7日計算)，該訂購帳號若達三次本公司有權暫停您的帳號並拒絕您使用本服務，同時列為交易黑名單。
              </li>
              <li>
                提醒您，若您無故或惡意違反光輝時刻有限公司制定訂購與退貨相關規則，本公司有權暫停您的帳號並拒絕您使用本服務，同時列為交易黑名單，請您留意。
              </li>
            </ul>
          </template>
        </BasicCollapse>
        <!-- 付款及配送方式 -->
        <BasicCollapse :uniqueId="'PaymentAndDeliveryMethods'">
          <template v-slot:header> 付款及配送方式 </template>
          <template v-slot:body>
            <ul>
              <li>我們提供線上刷卡及 LINE PAY，目前無提供到貨付款。</li>
              <li>配送方式：大榮貨運宅配 免運費（本島＆外島）。</li>
              <li>
                宅配約 1-2
                工作天，若您遲遲未收到商品，請盡速與客服連絡。（實際配送時間以物流狀況為準）
              </li>
            </ul>
          </template>
        </BasicCollapse>
        <!-- 訂單查詢／修改方式 -->
        <BasicCollapse :uniqueId="'OrderModificationMethods'">
          <template v-slot:header> 訂單修改方式 </template>
          <template v-slot:body>
            <ul>
              <li>如需修改、取消訂單，請儘速聯繫客服。</li>
            </ul>
          </template>
        </BasicCollapse>
      </div>
    </div>
  </div>
</template>
<script>
import BasicCollapse from '../../components/frontend/BasicCollapse.vue';

export default {
  data() {
    return {};
  },
  components: {
    BasicCollapse,
  },
};
</script>
<style scoped>
.message {
  max-width: 600px;
}
</style>
