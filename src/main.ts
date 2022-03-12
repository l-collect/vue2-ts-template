import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as api from '@/api'
import store from './store'
Vue.config.productionTip = false
declare module 'vue/types/vue' {
  interface Vue {
    $api: typeof import('@/api')
  }
  interface VueConstructor {
    $api: typeof import('@/api')
  }
}
Vue.prototype.$api=api
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
