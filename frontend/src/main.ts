import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css'
import '@/styles/index.less'
import router from './router'
import store from './store'
import $api from '@/api/index'

const app = createApp(App)

app.use(store).use(router).use(ElementPlus).mount('#app')

app.config.globalProperties.$api = $api
