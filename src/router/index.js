import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入login index.vue组件
import Login from '@/views/login'
// 导入home组件
import Home from '@/views/home'
// 导入欢迎页
import Welcome from '@/views/welcome'
// 导入404页面
import Zbd from '@/views/404'
// 导入内容管理页面
import Article from '@/views/article'
// 导入素材管理页面
import Image from '@/views/image'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    // 配置login路由
    {
      path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome },
        { name: 'article', path: '/article', component: Article },
        // 素材管理内容
        { name: 'Image', path: '/image', component: Image }
      ] },
    { name: 'login', path: '/login', component: Login },
    { name: 'zbd', path: '*', component: Zbd }
  ] // 配置路由规则

})
// 拦截未登录路由
router.beforeEach((to, from, next) => {
  // ... 每一次的跳转路由会执行这个函数
  // to 目标路由对象  from 当前路由对象  to.path 目标路径
  // next() 放行  next('/login') 拦截
  if (to.path === '/login') return next()
  const user = window.sessionStorage.getItem('newxm')
  if (user) return next()
  next('/login')
})
export default router
