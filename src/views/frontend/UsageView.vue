<template>
  <div class="container message py-5">
    <h2 class="mb-3">蠟燭使用方式</h2>
    <p>✦</p>
    <p>
      蠟燭商品為手工調色製作，非機器生產，會有些許色差、有痕跡、紋路為正常的情形，請以實體商品為主。
    </p>
    <p>✦</p>
    <div class="accordion">
      <!-- 注意事項 -->
      <BasicCollapse :uniqueId="'CautionaryNotes'">
        <template v-slot:header> 注意事項 </template>
        <template v-slot:body>
          <ul>
            <li>我們使用天然蠟材，燃燒過後必定不會平整，也可能會有收縮現象，屬正常現象。</li>
          </ul>
        </template>
      </BasicCollapse>
      <!-- 使用說明 -->
      <BasicCollapse :uniqueId="'InstructionsForUse'">
        <template v-slot:header> 使用說明 </template>
        <template v-slot:body>
          <ul>
            <li>
              點燃蠟燭後，需燃燒至少約一小時，讓蠟燭表面都融化成蠟液，每款香味擴散的效果不同，需等待的時間也會不一樣。
            </li>
            <li>
              如果燃燒時間過短，容易造成蠟燭只燒到中間小圈的情形，香味會無法達到最佳擴散效果，另外也會讓蠟燭壽命縮短唷！
            </li>
            <li>每次點燃不超過 4 小時，預防容器過熱。</li>
            <li>
              如果燃燒後一小時，還是有邊緣硬蠟未融化，在燃燒時，可輕輕轉動蠟燭，讓已融化的蠟液接觸邊緣的蠟。
            </li>
            <li>木片芯每次點燃前都需修剪，留約0.6公分。</li>
          </ul>
        </template>
      </BasicCollapse>
      <!-- 點不著怎麼辦 -->
      <BasicCollapse :uniqueId="'CannotClickWhatToDo'">
        <template v-slot:header> 點不著怎麼辦 </template>
        <template v-slot:body>
          <ul>
            <li>有時候木芯需要時間適應環境，點火可以久一些。</li>
            <li>如果使用打火機，可以將蠟燭微傾斜讓木芯接觸到火源。</li>
          </ul>
        </template>
      </BasicCollapse>
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
