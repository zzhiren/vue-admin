import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import iView from 'iview'
import store from './store/'
import './components/common/css/iview.css';
Vue.use(iView)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
// axios.defaults.headers['access-token'] = 'store.state.token '

// const instance = axios.create();
axios.interceptors.request.use(
  config => {
      //每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器
      if(store.state.token){
          config.headers.Authorization =store.state.token;
      }
      return config;
  },
  err => {
      return Promise.reject(err);
  }
);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
