import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  lang: 'zh_CN',
  skin: ''
};

export default new Vuex.Store({
  state
});
