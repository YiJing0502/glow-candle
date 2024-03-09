<template>
  <div
    class="modal fade"
    ref="modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">搜尋產品</h1>
          <button
            @click="keyword = ''"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="">
            <label for="exampleDataList" class="form-label">請在此輸入「產品名稱」</label>
            <input
              @input="searchProduct(keyword)"
              v-model="keyword"
              class="form-control mb-3"
              list="datalistOptions"
              id="exampleDataList"
              placeholder="輸入即搜索..."
            />
            <datalist id="datalistOptions">
              <option v-for="item in showProductsData" :key="item.id" :value="item.title" />
            </datalist>
            <table v-if="showProductsData.length !== 0 && keyword !== ''" class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">「{{ keyword }}」的搜尋結果</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in showProductsData" :key="item.id">
                  <th class="py-3" scope="row">{{ index + 1 }}</th>
                  <td>
                    <button
                      @click="goToPage(item.id, 'product', item.category)"
                      class="btn btn-normal-dpgray"
                    >
                      {{ item.title }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="d-flex flex-column align-items-center"
              v-if="showProductsData.length === 0 && keyword !== ''"
            >
              <span class="material-icons-round fs-1">announcement</span>
              <p class="text-center">
                找不到與「{{ keyword }}」相符的結果。<br />請檢查拼字或使用其他字詞。
              </p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            @click="keyword = ''"
            type="button"
            class="btn btn-normal-dpgray"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from 'bootstrap';
import { mapActions, mapState } from 'pinia';
import productsStore from '../../stores/productsStore';
import pageStore from '../../stores/pageStore';

export default {
  data() {
    return {
      keyword: '',
    };
  },
  computed: {
    ...mapState(productsStore, ['showProductsData']),
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    goToPage(id, name, category) {
      this.changeNowPage(category);
      this.$router.push({
        name,
        params: { id },
      });
      this.hideModal();
      this.keyword = '';
    },
    ...mapActions(productsStore, ['searchProduct']),
    ...mapActions(pageStore, ['changeNowPage']),
  },
  mounted() {
    // 獲取  DOM
    // 建立 bootstrap modal 實體
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>
