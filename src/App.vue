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
        <vs-navbar-item
          :active="path === '/users'"
          @click="$router.push('/users')"
        >
          사용자 목록(임시)
        </vs-navbar-item>
        <template #right>
          <vs-button flat @click="$router.push('/myinfo')">내정보</vs-button>
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
  background-color: var(--vs-theme-bg) !important;
}

.page {
  margin: 0 auto;
  max-width: 900px;
  min-height: 1200px;
}

:root {
  --vs-primary: 26, 92, 255;
  --vs-theme-bg: #f4f7f8;
  --vs-theme-color: #2c3e50;
  --vs-theme-layout: #fff;
  --vs-theme-bg2: #eef2f5;
  --vs-theme-code: #3f3d56;
  --vs-theme-code2: #363449;
}
.card .content {
  padding: 50px;
  border-radius: 20px 20px 20px 20px;
  border-bottom: 0 solid rgba(0, 0, 0, 0.03);
  background: var(--vs-theme-layout);
  height: auto;
}
</style>
