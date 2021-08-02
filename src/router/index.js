import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import Layout from '@/layout'
const Layout = () => import('@/layout')

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/user/login'),
    hidden: true
  },


  {
    path: '/register',
    name: 'register',
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
  }, {
    path: '/dashboard',
    component: Layout,
    meta: {
      title: 'dashboard',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'dashboard', icon: 'dashboard' }
      },]
  },
  {
    path: '/problem',
    component: Layout,
    redirect: '/problem/list',
    meta: { title: '题目管理', icon: 'form' },
    children: [

      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/problem/list'),
        meta: { title: '题目列表', icon: 'el-icon-document' }
      },
      {
        path: 'psource',
        name: 'psource',
        component: () => import('@/views/psource/list'),
        meta: { title: '题目来源', icon: 'el-icon-connection' },
      }, {
        path: 'ptagAndPcategory',
        name: 'ptagAndPcategory',
        component: () => import('@/views/tagandcategory/list'),
        meta: {
          title: '题目标签与类别', icon: 'el-icon-collection-tag'
        },
      },
      {
        path: 'add',
        name: 'addProblem',
        component: () => import('@/views/problem/add'),
        meta: { title: '添加题目', icon: 'form' },
        hidden: true,
      }, {
        path: 'detail',
        name: 'problemDetail',
        component: () => import('@/views/problem/detail'),
        meta: { title: '题目信息', icon: 'form' },
        hidden: true,
      },
    ]
  },
  {
    path: '/pgroup',
    component: Layout,
    meta: { title: '题单管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'pgrouplist',
        component: () => import('@/views/pgroup/list'),
        meta: { title: '题单管理', icon: 'el-icon-folder' }
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
  }, {
    path: '/les',
    name: 'les',
    redirect: '/les/lesson',
    component: Layout,
    meta: { title: '课程管理', icon: 'el-icon-date' },
    children: [
      {
        path: 'lesson',
        component: () => import('@/views/lesson/list'),
        meta: { title: '课程列表', icon: 'el-icon-collection' },
      },

      {
        path: 'instruct',
        component: () => import('@/views/instruct/list'),
        meta: { title: '授课管理', icon: 'form', icon: 'el-icon-top-right' },
      },

      {
        path: 'selclass',
        component: () => import('@/views/selclass/list'),
        meta: { title: '选课管理', icon: 'el-icon-finished' },
      },]
  },
  {
    path: '/organization',
    component: Layout,
    meta: { title: "学校管理", icon: 'el-icon-school' },
    children: [
      {
        path: 'student',
        component: () => import('@/views/student/list'),
        meta: { title: '学生', icon: 'el-icon-user' },
      },
      {
        path: 'class',
        name: 'class',
        component: () => import('@/views/class/list'),
        meta: { title: "班级", icon: 'el-icon-reading' }
      }, {
        path: 'major',
        name: 'major',
        component: () => import('@/views/major/list'),
        meta: { title: "专业", icon: 'el-icon-data-line' }
      }, {
        path: 'college',
        name: 'college',
        component: () => import('@/views/college/list'),
        meta: { title: "学院", icon: 'el-icon-house' }
      }, {
        path: 'organization',
        name: 'organization',
        component: () => import('@/views/organization/list'),
        meta: { title: "学校", icon: 'el-icon-office-building' }
      },
    ]
  }, {
    path: "/verifyServer",
    name: "verifyServer",
    component: Layout,
    redirect: '/verifyServer/list',
    meta: { title: '服务器管理', icon: 'el-icon-cpu' },
    children: [{
      path: 'list',
      name: 'serverList',
      component: () => import('@/views/verifyserver/list'),
      meta: { title: '服务器信息' },
      hidden: true,
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
    path: '/admin',
    name: "admin",
    component: Layout,
    meta: { title: '管理员', icon: 'el-icon-s-management' },
    alwaysShow: true,
    children: [
      {
        path: 'user',
        component: () => import('@/views/admin/user/index'),
        redirect: '/user/list',
        meta: { title: '用户管理', icon: 'el-icon-user' },
        children: [{
          path: 'list',
          component: () => import('@/views/admin/user/list'),
          meta: { title: '用户列表', icon: 'el-icon-user-solid' }
        }, {
          path: 'checkUser',
          name: 'checkUser',
          component: () => import('@/views/admin/user/checkUser'),
          meta: { title: '用户审核', icon: 'el-icon-success' }
        },
        ],
      }, {
        path: 'role',
        component: () => import('@/views/admin/role/index'),
        redirect: '/role/admin',
        meta: { title: '角色分配', icon: 'el-icon-s-custom' },
        children: [
          {
            path: "admin",
            component: () => import('@/views/admin/role/admin'),
            meta: { title: '管理员', icon: 'el-icon-s-check' }
          }, {
            path: "student",
            component: () => import('@/views/admin/role/student'),
            meta: { title: '学生', icon: 'el-icon-user' }
          }, {
            path: "teacher",
            component: () => import('@/views/admin/role/teacher'),
            meta: { title: '教师', icon: 'el-icon-user-solid' }
          },]

      },
      {
        path: 'problemAdmin',
        name: 'problemAdmin',
        redirect: '/problemAdmin/publish',
        component: () => import('@/views/admin/problem/index'),
        redirect: '',
        meta: { title: '题目审核', icon: 'el-icon-circle-check' },
        children: [{
          path: 'publish',
          component: () => import('@/views/admin/problem/publish'),
          meta: { title: "发布审核", icon: 'el-icon-top' }
        }, {
          path: 'withdraw',
          component: () => import('@/views/admin/problem/withdraw'),
          meta: { title: "下架审核", icon: 'el-icon-bottom' }
        }, {
          path: 'delete',
          component: () => import('@/views/admin/problem/delete'),
          meta: { title: "删除审核", icon: 'el-icon-delete' }
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
