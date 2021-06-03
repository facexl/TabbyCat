import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const originModule = require.context('./modules', true, /\.ts/)

const rawRoutes = originModule.keys().map(it => originModule(it).default).sort((a, b) => a.rank - b.rank)

console.log(rawRoutes)

const routes: Array<RouteRecordRaw> = []
const router = createRouter({
//   scrollBehavior: () => ({ y: 0 }),
  history: createWebHistory(process.env.BASE_URL),
  routes: routes.concat(rawRoutes)
})

export default router
