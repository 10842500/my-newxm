import Vue from 'vue'
import App from './App.vue'
// 导入包
// 导入样式
import Elementul from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入axios
import componnets from '@/components'
import axios from '@/api/axios.js'
// 导入index.js
import router from '@/router'
// 导入全局样式
import '@/styles/index.less'

Vue.use(componnets)
// 基准路径
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// // 保存token
// axios.defaults.headers = {
//   Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('newxm')).token
// }
// 加载到原型上面
Vue.prototype.$http = axios
Vue.use(Elementul)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
