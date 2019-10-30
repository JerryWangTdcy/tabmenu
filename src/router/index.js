import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/Layout'

/* Router Modules */ 

/**
 * 基础路由
 * 不需要访问权限路由 
 */
export const constantRoutes = [
  {
    //重定向
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/',
    hidden: true,
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }
]

/* 
* 动态加载路由
* 需要根据角色权限显示的路由
*/ 
export const asyncRoutes = [

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', //启动history模式需要后台服务端支持
  scrollBehavior: () => ({ y:0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router