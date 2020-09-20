import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authState: null,
    cognitoUser: null,
    dbUser: null,
  },
  mutations: {
    SET_USER(state, payload) {
      state.authState = payload.authState;
      state.cognitoUser = payload.cognitoUser;
      state.dbUser = payload.dbUser;
    },
  },
  actions: {},
  modules: {},
});
