import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import wcSwiper from 'wc-swiper'
import 'wc-swiper/style.css'
import publicFunc from "./publicFunction";

import { Loading, Dialog } from 'vant';
import 'vant/lib/loading/style';
import 'vant/lib/dialog/style';

import hzComponents from './hz-components.js';

import ba from 'vue-ba'
Vue.use(ba, 'bf00644fac65639c30256ba57f96ebe5')
Vue.use(hzComponents);
Vue.use(Loading);
Vue.use(Dialog);
Vue.use(wcSwiper);
Vue.use(publicFunc);
Vue.prototype.$axios = axios
Vue.prototype.$dialog = Dialog
Vue.config.productionTip = false
// 开发环境
axios.defaults.baseURL = '/tools-coupon'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Storage.prototype.setExpire = (key, value, expire) => {
  let obj = {
    data: value,
    time: Date.now(),
    expire: expire
  };
  localStorage.setItem(key, JSON.stringify(obj));
}

Storage.prototype.getExpire = key => {
  let val = localStorage.getItem(key);
  if (!val) {
    return val;
  }
  val = JSON.parse(val);
  // 当前时间 Date.now()
  // 创建时间 val.time
  // 有效时长 (val.expire / 1000 / 3600)
  if (Date.now() - val.time > val.expire) {
    localStorage.removeItem(key);
    return null;
  }
  return val.data;
}
