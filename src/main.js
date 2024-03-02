/* eslint-disable camelcase */
// 引入 material-icons 的 CSS檔案
import 'material-icons/iconfont/material-icons.css';

import { createApp } from 'vue';
// 載入 pinia
import { createPinia } from 'pinia';
// 載入 CKEditor
import CKEditor from '@ckeditor/ckeditor5-vue';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

// 載入 vue-axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// 載入 vue-loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
// 載入 vee-validation
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import {
  required,
  email,
  max,
  min_value,
  numeric,
  integer,
  one_of,
  url,
  size,
  ext,
  max_value,
} from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import router from './router';
import App from './App.vue';
// 全域元件
import ResultModal from './components/ResultModal.vue';
import PageLoading from './components/PageLoading.vue';

defineRule('required', required);
defineRule('email', email);
defineRule('max', max);
defineRule('min_value', min_value);
defineRule('numeric', numeric);
defineRule('integer', integer);
defineRule('one_of', one_of);
defineRule('url', url);
defineRule('size', size);
defineRule('ext', ext);
defineRule('max_value', max_value);
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

const app = createApp(App);
// 將 Bootstrap 添加到全局 window 對象中
window.bootstrap = bootstrap;

// 註冊 vue-loading-overlay 元件
app.component('VueLoading', Loading);
// 註冊 vee-validation 元件
app.component('VeeForm', Form);
app.component('VeeField', Field);
app.component('VeeErrorMessage', ErrorMessage);
// 註冊全域元件
app.component('ResultModal', ResultModal);
app.component('PageLoading', PageLoading);
// 使用pinia
app.use(createPinia());
app.use(router);
// 使用 vue-axios
app.use(VueAxios, axios);
// 使用 CKEditor
app.use(CKEditor);
app.mount('#app');
