import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import commonRoutes from './commonRoutes'

// const originModule = require.context('./modules', true, /\.ts/) webpack

const originModule = import.meta.globEager('./modules/*.ts') //vite

interface RouteRecordLocal{
    rank:number,
    hidden:boolean
}

// const routes:Array<RouteRecordRaw | RouteRecordLocal> = originModule.keys().map(it => originModule(it).default).sort((a, b) => a.rank - b.rank)

const routes:Array<RouteRecordRaw | RouteRecordLocal> = Object.values(originModule).map(it => it.default).sort((a, b) => a.rank - b.rank)

const router = createRouter({
//   scrollBehavior: () => ({ y: 0 }),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes.concat(commonRoutes) as any
})

export {
  routes
}

export default router
