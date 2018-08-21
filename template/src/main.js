// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// 引入hui
import HUI from 'hui';
import 'hui/lib/theme-default/index.css';

import router from './router';
// 引入i18n多语言
import i18n from './i18n';
// 引用API文件
import api from './api/http';
// 引入vuex
import store from './store';
// 将HUI引至全局
Vue.use(HUI);

// 将API方法绑定至全局
Vue.prototype.$api = api;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
});
