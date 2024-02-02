import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 載入 vue-axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// 載入 vue-loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App)
// 註冊 vue-loading-overlay 元件
app.component('vueLoading', Loading);

app.use(createPinia())
app.use(router)
// 使用 vue-axios
app.use(VueAxios, axios);
app.mount('#app')
