import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authState: null,
    cognitoUser: null,
    dbUser: null,
    identityId: null,
  },
  mutations: {
    SET_COGNITO_USER(state, payload) {
      state.authState = payload.authState;
      state.cognitoUser = payload.cognitoUser;
      state.dbUser = payload.dbUser;
    },
    SET_DB_USER(state, dbUser) {
      state.dbUser = dbUser;
    },
    SET_IDENTITY_ID(state, identityId) {
      state.identityId = identityId;
    },
  },
  actions: {},
  modules: {},
});
