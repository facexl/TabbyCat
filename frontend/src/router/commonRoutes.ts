export default [
  {
    name: 'init',
    path: '/',
    redirect: '/dashboard/workspace',
    rank: 0,
    hidden: true
  },
  {
    name: 'login',
    path: '/login',
    rank: 0,
    hidden: true,
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login/Login.vue')
  }
]
