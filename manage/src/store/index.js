import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    userInfo: {},
  },
  getters: {},
  mutations: {
    // 修改token，并将token存入localStorage
    setToken(state, user) {
      state.token = user.token;
      localStorage.setItem('token', user.token);
    },
    removeToken(state) {
      state.token = '';
      localStorage.removeItem('token');
    },
    setUserInfo(state, user) {
      state.userInfo = user.login ? {} : user.userInfo;
    },
  },
  actions: {},
  modules: {},
});
