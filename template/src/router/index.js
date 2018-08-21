import Vue from 'vue';
import Router from 'vue-router';
// 引入vuex-store
import store from '../store/index';
// 引入多语言工具方法
import langUtil from '../utils/set-lang';
// 引入换肤工具
import skinUtil from '../utils/set-skin';

// 引入组件
const apiTest = resolve => {
  import('../view/test-lab/demo.vue').then(module => {
    resolve(module);
  });
};
Vue.use(Router);

const router = new Router({
  mode: process.env.NODE_ENV !== 'development' ? 'history' : '', // 开发模式下用hash模式
  base: '/demo',
  routes: [
    {
      path: '/',
      component: apiTest,
      name: 'apiTest'
    }
  ]
});
router.beforeEach(async (to, from, next) => {
  // 设置语言
  await langUtil.setLang(store.state.lang);
  //换肤
  skinUtil.setSkin(store.state.skin);

  next();
});

export default router;
