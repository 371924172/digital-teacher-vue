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
    path: '/register',
    component: () => import('@/views/user/register'),
    hidden: true
  },
  {

    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/dashboard',
    component: Layout,
    meta: { title: 'Dashboard', icon: 'dashboard' },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]

  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: Layout,
        component: () => import('@/views/user/detail'),
        meta: {
          title: '个人信息 '
        },
      },
      {
        path: 'problem',
        component: () => import('@/views/user/myproblem'),
        meta: {
          title: '我的题目'
        },
      },
      {
        path: 'pgroup',
        component: () => import('@/views/user/pgroup'),
        meta: {
          title: '我的题单'
        },
      },
    ]
  },
  {
    path: '/problem',
    component: Layout,
    meta: { title: '题目管理', icon: 'form' },
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
        meta: { roles: ['admin'], title: '测试', icon: 'form' }
      }, {
        path: 'detail',
        name: 'problemDetail',
        component: () => import('@/views/problem/detail'),
        hidden: true
      }, {
        path: 'add',
        name: 'addProblem',
        component: () => import('@/views/problem/add'),
        meta: { title: '添加题目', icon: 'form' }
      },

    ]
  },
  {
    path: '/pgroup',
    component: Layout,
    meta: { title: '题单管理', icon: 'form' },
    children: [{
      path: 'list',
      name: 'pgrouplist',
      component: () => import('@/views/pgroup/list'),
      meta: { title: '题单列表', icon: 'form' }
    }, {
      path: 'add',
      name: 'addpgroup',
      component: () => import('@/views/pgroup/add'),
      meta: { title: '添加题单' },
      hidden: true
    },
    {
      path: 'detail',
      name: 'pgroupdetail',
      component: () => import('@/views/pgroup/detail'),
      meta: { title: '题单中的题目' },
      hidden: true
    },
    ]
  },
  { path: '/', redirect: '/dashboard', hidden: true },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
]
export const asyncRoutes = [
  {
    path: '/user',
    redirect: '/user/list/',
    component: Layout,
    meta: { roles: ['admin'], title: '用户管理', icon: 'form' },
    alwaysShow: true,
    children: [{
      path: 'list',
      component: () => import('@/views/user/list'),
      meta: { title: '用户列表' }
    }, {
      path: 'checkUser',
      component: () => import('@/views/user/checkUser'),
      meta: { title: '用户审核' }
    }, {
      path: 'check',
      // redirect: 'check/publish',
      meta: { title: '题目审核' },
      component: () => import('@/views/user/checkProblem/publish'),
      // children: [{
      //   path: 'publish',
      //   component: () => import('@/views/user/checkProblem/publish'),
      //   meta: { title: '发布审核' }
      // }, {
      //   path: 'withdraw',
      //   component: () => import('@/views/user/checkProblem/withdraw'),
      //   meta: { title: '下架审核' }
      // }]

    }, {
      path: "assignRole",
      component: () => import('@/views/user/assignRole'),
      meta: { title: '权限管理' }
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
