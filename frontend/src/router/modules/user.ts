import Layout from '@/views/layout/Index.vue'
export default {
  name: 'user',
  path: '/user',
  meta: {
    title: '用户管理'
  },
  rank: 10,
  component: Layout,
  children: [
    {
      path: 'userList',
      name: 'userList',
      meta: {
        title: '用户列表'
      },
      component: () => import('@/views/user/UserList.vue')
    }
  ]
}
