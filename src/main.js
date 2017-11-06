// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import Resource from 'vue-resource'
import Vuecookie from 'vue-cookie'
Vue.use(Resource)
Vue.use(Vuecookie)
// Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://192.168.2.110/VChangeUserService/Router.aspx'
// credentials设置true跨域有问题
Vue.http.options.credentials = false
// Vue.http.headers.common['Access-Control-Request-Method'] = '*'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
