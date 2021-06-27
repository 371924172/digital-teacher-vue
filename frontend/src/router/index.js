import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import Layout from '@/layout'
const Layout = ()=>import('@/layout')

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
        component: () => import('@/views/user/mypgroup'),
        meta: {
          title: '我的题单'
        },
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
      }
    ]
  },
  {
    path: '/problem',
    component: Layout,
    redirect: '/problem/list',
    meta: { title: '题目', icon: 'form' },
    children: [
      {
        path: 'edit',
        name: 'edit',
        component: () => import('@/views/problem/edit'),
        meta: { title: '编辑题目', icon: 'form' },
        hidden: true,
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/problem/list'),
        meta: { title: '题目', icon: 'form' }
      },  {
        path: 'add',
        name: 'addProblem',
        component: () => import('@/views/problem/add'),
        meta: { title: '添加题目', icon: 'form' },
        hidden: true,
      }, {
        path: 'detail',
        name: 'problemDetail',
        component: () => import('@/views/problem/detail'),
        meta: { title: '题目信息' },
        hidden: true,
      }, {
        path: 'psource',
        name: 'psource',
        component: () => import('@/views/psource/list'),
        meta: { title: '题目来源' },
      }, {
        path: 'ptagAndPcategory',
        name: 'ptagAndPcategory',
        component: () => import('@/views/tagandcategory/list'),
        meta: { title: '标签与类别' },
      }

    ]
  },
  {
    path: '/pgroup',
    component: Layout,
    meta: { title: '题单', icon: 'form' },
    children: [{
      path: 'list',
      name: 'pgrouplist',
      component: () => import('@/views/pgroup/list'),
      meta: { title: '题单', icon: 'form' }
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
    }, {
      path: 'myPgroupDetail',
      name: 'myPgroupDetail',
      component: () => import('@/views/user/myPgroupDetail'),
      meta: { title: '题单信息' },
      hidden: true
    },
    ]
  },
  {
    path: '/organization',
    component: Layout,
    meta: { title: "学校信息" },
    children: [
      {
        path: 'class',
        name: 'class',
        component: () => import('@/views/class/list'),
        meta: { title: "班级" }
      }, {
        path: 'major',
        name: 'major',
        component: () => import('@/views/major/list'),
        meta: { title: "专业" }
      }, {
        path: 'college',
        name: 'college',
        component: () => import('@/views/college/list'),
        meta: { title: "学院" }
      }, {
        path: 'organization',
        name: 'organization',
        component: () => import('@/views/organization/list'),
        meta: { title: "学校" }
      }
    ]
  }, {
    path: "/verifyServer",
    name: "/verifyServer",
    component: Layout,
    meta: { title: '验证服务器' },
    children: [{
      path: 'list',
      name: 'serverList',
      component: () => import('@/views/verifyserver/list'),
      meta: { title: '服务器' }
    }
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
    path: 'admin',
    component: Layout,
    meta: { title: '管理员' },
    alwaysShow: true,
    children: [
      {
        path: '/user',
        component: () => import('@/views/admin/user/index'),
        redirect: '/user/list',
        meta: { title: '用户管理', icon: 'form' },
        children: [{
          path: 'list',
          component: () => import('@/views/admin/user/list'),
          meta: { title: '用户列表' }
        }, {
          path: 'checkUser',
          name: 'checkUser',
          component: () => import('@/views/admin/user/checkUser'),
          meta: { title: '用户审核' }
        },
        {
          path: "assignAdmin",
          component: () => import('@/views/admin/user/assignAdmin'),
          meta: { title: '管理员权限分配' }
        },]

      },
      {
        path: '/problemAdmin',
        name: 'problemAdmin',
        redirect: '/problemAdmin/publish',
        component: () => import('@/views/admin/problem/index'),
        redirect: '',
        meta: { title: '题目审核' },
        children: [{
          path: 'publish',
          component: () => import('@/views/admin/problem/publish'),
          meta: { title: "发布审核" }
        }, {
          path: 'withdraw',
          component: () => import('@/views/admin/problem/withdraw'),
          meta: { title: "下架审核" }
        }, {
          path: 'delete',
          component: () => import('@/views/admin/problem/delete'),
          meta: { title: "删除审核" }
        }]
      }
    ]
  }

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
