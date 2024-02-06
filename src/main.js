// 引入 material-icons 的 CSS檔案
import 'material-icons/iconfont/material-icons.css';

import { createApp } from 'vue'
// 載入 pinia
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// 載入 vue-axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// 載入 vue-loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App)
// 將 Bootstrap 添加到全局 window 對象中
window.bootstrap = bootstrap;

// 註冊 vue-loading-overlay 元件
app.component('VueLoading', Loading);
// 使用pinia
app.use(createPinia())
app.use(router)
// 使用 vue-axios
app.use(VueAxios, axios);
app.mount('#app')
