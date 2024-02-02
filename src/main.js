import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 載入 vue-axios
import axios from 'axios';
import VueAxios from 'vue-axios';

const app = createApp(App)

app.use(createPinia())
app.use(router)
// 使用 vue-axios
app.use(VueAxios, axios);
app.mount('#app')
