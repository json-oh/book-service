<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />

    <login v-if="authState !== 'signedin'"></login>
    <template v-if="authState === 'signedin' && user">
      <amplify-sign-out></amplify-sign-out>
      <div id="nav">
        <router-link to="/">전체 피드</router-link> |
        <router-link to="/feed">내 피드</router-link> |
        <router-link to="/create">피드 작성</router-link> |
        <!--        <router-link to="/upload">Upload</router-link> |-->
        <router-link to="/recommendation">추천</router-link>
      </div>
      <router-view />
    </template>
  </div>
</template>

<script>
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import Login from "./components/Login.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Login,
  },
  created() {
    onAuthUIStateChange((authState, user) => {
      this.$store.commit("SET_USER", { authState, user });
    });
  },
  computed: mapState(["authState", "user"]),
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
