import Layout from '@/views/layout/Index.vue'
export default {
  name: 'dashboard',
  path: '/dashboard',
  meta: {
    title: 'Dashboard'
  },
  component: Layout,
  rank: 1,
  children: [
    {
      path: 'workspace',
      name: 'workspace',
      meta: {
        title: '工作台'
      },
      component: () => import('@/views/dashboard/WorkSpace.vue')
    }
  ]
}
