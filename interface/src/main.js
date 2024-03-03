import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'

import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(router)
Vue.prototype.$axios = axios

new Vue({
  router, // 使用路由
  render: h => h(App)
}).$mount('#app')
