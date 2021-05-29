import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'


export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/user/login'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/user/register'),
    hidden: true
  },
  {

    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    meta: { title: 'Dashboard', icon: 'dashboard' }

  },
  {
    path: '/profile',
    name: 'userProfile',
    component: Layout,
    component: () => import('@/views/user/detail'),
    meta: {
      title: '个人信息 '
    },
    hidden: true,
  },
  {
    path: '/problem',
    component: Layout,
    meta: { title: '题目管理' },
    children: [
      {
        path: 'edit',
        name: 'edit',
        component: () => import('@/views/problem/edit'),
        meta: { title: '编辑题目', icon: 'form' }
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/problem/list'),
        meta: { title: '题目列表', icon: 'form' }
      }, {
        path: 'test',
        name: 'test',
        component: () => import('@/views/problem/test'),
        meta: { title: '测试', icon: 'form' }
      }, {
        path: 'detail',
        name: 'problemDetail',
        component: () => import('@/views/problem/detail'),
      },
    ]
  },
  {
    path: '/user',
    redirect: '/user/list/',
    component: Layout,
    meta: { title: '用户管理' },
    alwaysShow: true,
    children: [{
      path: 'list',
      component: () => import('@/views/user/list'),
      meta: { title: '用户列表' }
    }, {
      path: 'check',
      component: () => import('@/views/user/check'),
      meta: { title: '用户审核' }
    }, {
      path: 'detail',
      name: 'userDetail',
      component: () => import('@/views/user/detail'),
      meta: { title: '详细信息' },
      hidden: true,
    },
    {
      path: 'changePassword',
      component: () => import('@/views/user/changePassword'),
      meta: { title: '修改密码' },
    }]

  },
  { path: '/', redirect: '/dashboard', hidden: true },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
export const asyncRoutes = [
  // {
  //   path: '/user',
  //   component: Layout,
  //   meta: { title: '用户管理' },
  //   children: [{
  //     path: 'list',
  //     component: () => import('@/views/user/list'),
  //     meta: { title: '用户列表' }
  //   }]
  // }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
