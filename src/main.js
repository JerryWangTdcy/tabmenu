import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axiosApi from './api/axios.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import './icons' // icon
import '@/styles/index.scss' // global css

require('../mock/index.js');
// import '../mock'

Vue.use(ElementUI)
Vue.use(axiosApi)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
