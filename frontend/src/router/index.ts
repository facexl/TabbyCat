import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import commonRoutes from './commonRoutes'

const originModule = require.context('./modules', true, /\.ts/)

interface RouteRecordLocal{
    rank:number,
    hidden:boolean
}

const routes:Array<RouteRecordRaw | RouteRecordLocal> = originModule.keys().map(it => originModule(it).default).sort((a, b) => a.rank - b.rank)

const router = createRouter({
//   scrollBehavior: () => ({ y: 0 }),
  history: createWebHistory(process.env.BASE_URL),
  routes: routes.concat(commonRoutes) as any
})

export {
  routes
}

export default router
