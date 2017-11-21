import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import iView from 'iview'
import VueParticles from 'vue-particles'
import 'iview/dist/styles/iview.css';


Vue.use(iView)
Vue.use(VueParticles)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
