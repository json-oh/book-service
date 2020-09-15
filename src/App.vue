<template>
  <div id="app">
    <login v-if="authState !== 'signedin'"></login>
    <template v-if="authState === 'signedin' && user">
      <vs-navbar>
        <template #left>
          <router-link to="/" class="link">
            <img id="logo" alt="Vue logo" src="./assets/logo.png" />
          </router-link>
        </template>
        <vs-navbar-item :active="path === '/'" @click="$router.push('/')">
          전체 피드
        </vs-navbar-item>
        <vs-navbar-item
          :active="path === '/feed'"
          @click="$router.push('/feed')"
        >
          내 피드
        </vs-navbar-item>
        <vs-navbar-item
          :active="path === '/create'"
          @click="$router.push('/create')"
        >
          피드 작성
        </vs-navbar-item>
        <template #right>
          <vs-button flat @click="signOut">로그아웃</vs-button>
        </template>
      </vs-navbar>
      <div id="view">
        <router-view />
      </div>
    </template>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
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
  computed: {
    ...mapState(["authState", "user"]),
    path() {
      return this.$route.path;
    },
  },
  methods: {
    async signOut() {
      try {
        await Auth.signOut();
      } catch (error) {
        // 에러 처리
        console.error(error);
      }
    },
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

#logo {
  max-height: 20px;
}

.link {
  line-height: 1;
}

#view {
  padding-top: 50px;
}
</style>
