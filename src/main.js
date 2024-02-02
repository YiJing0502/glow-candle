import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 載入 vue-axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// 載入 vue-loading-overlay
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App)
// 使用 vue-loading-overlay
app.use(LoadingPlugin);

app.use(createPinia())
app.use(router)
// 使用 vue-axios
app.use(VueAxios, axios);
app.mount('#app')
