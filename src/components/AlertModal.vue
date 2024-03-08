<template>
  <div
    class="modal fade"
    ref="modal"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel2"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
            {{ alertMessage.success ? '成功' : '失敗' }}
          </h1>
          <button
            @click="hideModal"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          {{ alertMessage.message }}
        </div>
        <div class="modal-footer">
          <button
            @click="hideModal"
            class="btn btn-normal-dpgray"
            data-bs-target="#exampleModalToggle"
            data-bs-toggle="modal"
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

import { mapState } from 'pinia';
import alertStore from '../stores/alertStore';

export default {
  data() {
    return {
      modal: null,
    };
  },
  mounted() {
    // 獲取 bsResultModal DOM
    // 建立 bootstrap modal 實體
    this.modal = new Modal(this.$refs.modal);
  },
  watch: {
    alertMessage(newMessage) {
      console.log('newMessage', newMessage);
      if (newMessage) {
        this.openModal();
      }
    },
  },
  computed: {
    ...mapState(alertStore, ['alertMessage']),
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
};
</script>
