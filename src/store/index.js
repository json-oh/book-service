import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authState: null,
    user: null,
  },
  mutations: {
    SET_USER(state, payload) {
      state.authState = payload.authState;
      state.user = payload.user;
    },
  },
  actions: {},
  modules: {},
});
