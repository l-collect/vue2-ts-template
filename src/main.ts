import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as api from '@/api'
import * as utils from '@/utils'
import store from './store'
Vue.config.productionTip = false
declare module 'vue/types/vue' {
  interface Vue {
    $api: typeof import('@/api')
    $utils:typeof import('@/utils')
  }
}
Vue.prototype.$api=api
Vue.prototype.$utils=utils
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
