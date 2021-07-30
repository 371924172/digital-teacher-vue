import router, { constantRoutes, asyncRoutes } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/register'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // if (sessionStorage.getItem("accessRoutes")) {
  //   router.removeRoute('admin');
  //   router.addRoutes(JSON.parse(sessionStorage.getItem("accessRoutes")));
  // }
  // 在页面加载时读取sessionStorage里的状态信息
  if (sessionStorage.getItem("store")) {
    store.replaceState(
      Object.assign(
        {},
        store.state,
        JSON.parse(sessionStorage.getItem("store"))
      )
    );
    sessionStorage.removeItem("store")
  }


  // console.log(router.options)
  // start progress bar 
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0
      const status = store.getters.status;
      if (status) {
        if (status == 'True')
          next()
        else {
          Message.error("该用户尚未通过审核，请联系管理员");
          await store.dispatch("user/logout");
        }

      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']

          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          sessionStorage.setItem('routes', JSON.stringify(constantRoutes.concat(accessRoutes)))

          sessionStorage.setItem('accessRoutes', JSON.stringify(accessRoutes))
          // dynamically add accessible routes
          console.log(router)
          router.addRoutes(accessRoutes)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
          
          console.log(router)
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})