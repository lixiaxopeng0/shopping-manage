import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    userInfo: localStorage.getItem('userInfo')
      ? localStorage.getItem('userInfo')
      : `{}`,
    isCollapse: localStorage.getItem('isCollapse') === 'true',
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
      state.userInfo = user.exit ? `{}` : JSON.stringify(user.userInfo);
      !user.exit &&
        localStorage.setItem('userInfo', JSON.stringify(user.userInfo));
      user.exit && localStorage.removeItem('userInfo');
    },
    changeStoreCollapse(state, bool) {
      state.isCollapse = bool;
      localStorage.setItem('isCollapse', bool);
    },
  },
  actions: {},
  modules: {},
});
