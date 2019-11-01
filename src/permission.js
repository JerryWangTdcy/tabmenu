import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import { getToken } from '@/utils/auth' // 从cookie获取token
import 'nprogress/nprogress.css' // 进度条样式

NProgress.configure({ showSpinner: false }) // 进度条配置

const whiteList = ['/login'] // 从定向白名单

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已经登录，重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 确定用户是否通过getInfo获得了他的权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if(hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息
          // 角色必须是一个对象数组!例如:['admin']或，['developer'，'editor']
          const { roles } = await store.dispatch('user/getInfo')

          // 根据角色生成可访问路由映射
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 动态添加可访问路由
          router.addRoutes(accessRoutes)

          // 设置replace: true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 清除token，进入登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没有token时
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 进度完成
  NProgress.done()
})
