import { defineStore } from 'pinia';

export default defineStore('stringStore', {
  state: () => ({}),
  getters: {},
  actions: {
    // 按換行符拆分字串
    splitStringByNewline(str) {
      return str.split('\n');
    },
  },
});
