import Vue from 'vue'
import App from './App.vue'
// 导入包
// 导入样式
import Elementul from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入index.js
import router from '@/router'
Vue.use(Elementul)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
