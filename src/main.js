import Vue from 'vue'
import App from './App.vue'
// 导入包
// 导入样式
import Elementul from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Elementul)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
