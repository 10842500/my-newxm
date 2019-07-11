import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    // 配置login路由
    { path: '/', redirect: '/login' },
    { name: 'login', path: '/login', component: Login }
  ] // 配置路由规则
})
export default router
