import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css/normalize.css'
import '@/styles/index.less'
import router from './router'
import store from './store'
import * as elIcons from '@element-plus/icons-vue'
// import { transformDefineReactiveMacro } from '../defineReactive'

const app = createApp(App)

app.use(store).use(router).use(ElementPlus).mount('#app');

// 注册el icon
Object.values(elIcons).forEach(it=>{
    app.component(
        it.name,
        it
    )
})

// const content = transformDefineReactiveMacro(`
// <script setup>
//     const state = defineReactive({
//         showApp:false,
//         loading:false
//     })
// </script>
// `,{
//     needImport:true
// })

// console.log(content)