import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css/normalize.css'
import '@/styles/index.less'
import router from './router'
import store from './store'
import $api from '@/api/index'
import * as elIcons from '@element-plus/icons-vue'

const app = createApp(App)

// console.log($api)

app.use(store).use(router).use(ElementPlus).mount('#app');

// 注册el icon
Object.values(elIcons).forEach(it=>{
    app.component(
        it.name,
        it
    )
})


app.config.globalProperties.$api = $api
