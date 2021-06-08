import Layout from '@/views/layout/Index.vue'
export default {
  name: 'project',
  path: '/project',
  meta: {
    title: '项目管理'
  },
  rank: 20,
  component: Layout,
  children: [
    {
      path: 'projectList',
      name: 'projectList',
      meta: {
        title: '项目列表'
      },
      component: () => import('@/views/project/ProjectList.vue')
    },
    {
      path: 'projectErrorList',
      name: 'projectErrorList',
      meta: {
        title: '错误列表'
      },
      component: () => import('@/views/project/ProjectErrorList.vue')
    }
  ]
}
