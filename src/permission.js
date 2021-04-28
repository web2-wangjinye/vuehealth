import store from "./store";
import router from "./router";
// import { Message } from 'element-ui'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

// NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/bind', '/register']
router.beforeEach((to, from, next) => {
  // console.log(to)
  // NProgress.start()
  if (getToken()) {
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      // NProgress.done()
    } else {
      // console.log(store.getters.roles.length)
      // if (store.getters.roles.length === 0) {
      //   console.log(store)
      //   // 判断当前用户是否已拉取完user_info信息
        // store.dispatch('GetInfo').then(() => {
          store.dispatch('GenerateRoutes').then(accessRoutes => {
            // 根据roles权限生成可访问的路由表
            // console.log(to)
            // console.log(router)
            // console.log(accessRoutes)
     
              // router.addRoutes(route)
            // router.addRoutes(accessRoutes)
            // router.matcher = createRouter(accessRoutes).matcher
            router.addRoute(accessRoutes)
            // console.log(to)
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          })
        // }).catch(err => {
        //     store.dispatch('LogOut').then(() => {
        //       Message.error(err)
        //       next({ path: '/' })
        //     })
        //   })
      // } else {
        // next()
      // }
    }
  } else {
    // 没有token
    // console.log(to.path)
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      // NProgress.done()
    }
  }
})

// router.afterEach(() => {
//   NProgress.done()
// })