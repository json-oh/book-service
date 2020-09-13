<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <login v-if="authState !== 'signedin'"></login>
    <template v-if="authState === 'signedin' && user">
      <amplify-sign-out></amplify-sign-out>
      <div id="nav">
        <router-link to="/">Feed</router-link> |
        <router-link to="/upload">Upload</router-link> |
        <router-link to="/recommendation">Recommendation</router-link>
      </div>
      <router-view />
    </template>
  </div>
</template>

<script>
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import Login from "./components/Login.vue";

export default {
  name: "App",
  components: {
    Login,
  },
  created() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    });
  },
  data() {
    return {
      user: null,
      authState: null,
    };
  },
  beforeDestroy() {
    return onAuthUIStateChange;
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
