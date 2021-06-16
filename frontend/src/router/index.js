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
          title: '我创建的题目'
        },
      },]
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
    path: '/organization',
    component: Layout,
    meta: { title: '组织' },
    children: [
      {
        path: 'edit',
        name: 'edit',
        component: () => import('@/views/organization/edit'),
        meta: { title: '编辑组织', icon: 'form' }
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/organization/list'),
        meta: { title: '组织列表', icon: 'form' }
      },

    ]
  },


  {
    path: '/college',
    component: Layout,
    meta: { title: '学院' },
    children: [
      {
        path: 'edit',
        name: 'edit',
        component: () => import('@/views/college/edit'),
        meta: { title: '编辑学院', icon: 'form' }
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/college/list'),
        meta: { title: '学院列表', icon: 'form'}
      },
    ]
  },

  {
    path: '/major',
    component: Layout,
    meta: { title: '专业' },
    children: [
      {
        path: 'edit',
        name: 'edit',
        component: () => import('@/views/major/edit'),
        meta: { title: '编辑专业', icon: 'form' }
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/major/list'),
        meta: { title: '专业列表' , icon: 'form'}
      },
    ]
  },

  {
    path: '/class',
    component: Layout,
    meta: { title: '班级' },
    children: [
      {
        path: 'edit',
        name: 'edit',
        component: () => import('@/views/class/edit'),
        meta: { title: '编辑班级', icon: 'form' }
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/class/list'),
        meta: { title: '班级列表', icon: 'form' }
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
    meta: { roles: ['admin'], title: '用户管理' },
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
