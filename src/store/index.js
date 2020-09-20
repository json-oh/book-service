import Vue from "vue";
import Vuex from "vuex";
import { Auth } from "aws-amplify";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authState: null,
    cognitoUser: null,
    dbUser: null,
    identityId: null,
  },
  mutations: {
    SET_USER(state, payload) {
      state.authState = payload.authState;
      state.cognitoUser = payload.cognitoUser;
      state.dbUser = payload.dbUser;
    },
    SET_IDENTITY_ID(state, identityId) {
      state.identityId = identityId;
    },
  },
  actions: {
    fetchIdentityId({ commit }) {
      Auth.currentCredentials()
        .then(({ identityId }) => {
          commit("SET_IDENTITY_ID", identityId);
        })
        .catch(() => {
          commit("SET_IDENTITY_ID", null);
        });
    },
  },
  modules: {},
});
