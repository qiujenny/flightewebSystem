import Vue from 'vue';
import App from './App';
// 引用router.js
import router from './router/router.js';
import store from './store/index';
import hasAuthorized from './libs/hasAuthorized';
import hasAuthorizedByPathVal from './libs/hasAuthorizedByPathVal';

Vue.config.productionTip = false;
Vue.use(hasAuthorized);
Vue.use(hasAuthorizedByPathVal);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 一定要注入到vue的实例对象上
  router,
  store,
  render: h => h(App)
});
