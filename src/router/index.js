import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/menu',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/menu/index'),
        name: 'menu',
        meta: { title: 'menu',icon: 'documentation', affix: true}
      }
    ]
  },
  {
    path: '/list',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/list/index'),
        name: 'list',
        meta: { title: 'list',icon: 'guide', affix: true}
      }
    ]
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