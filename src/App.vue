<template>
  <v-app id="bookservice">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense nav>
        <v-list-item v-for="item in navItems" :key="item.to" :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-if="authState === 'signedin' && user">
          <v-divider class="my-2"></v-divider>
          <v-list-item to="/myInfo">
            <v-list-item-icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>내 정보</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="signOut">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>로그아웃</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-img class="me-3" src="./assets/logo.png" max-width="20"></v-img>
      <v-toolbar-title>book-service</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view v-if="authState === 'signedin' && user"></router-view>
      <login v-else></login>
    </v-main>
  </v-app>
</template>

<script>
import { Auth, API, graphqlOperation } from "aws-amplify";
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import Login from "./components/Login.vue";
import { mapState } from "vuex";
import { getUser } from "./graphql/queries";
import { createUser } from "./graphql/mutations";

export default {
  name: "App",
  components: {
    Login,
  },
  data: () => ({
    drawer: false,
    navItems: [
      {
        icon: "mdi-view-dashboard",
        title: "전체 피드",
        to: "/",
      },
      {
        icon: "mdi-account-details",
        title: "내 피드",
        to: "/feed",
      },
      {
        icon: "mdi-pencil",
        title: "피드 작성",
        to: "/create",
      },
      {
        icon: "mdi-account-supervisor",
        title: "사용자 목록(임시)",
        to: "/users",
      },
    ],
  }),
  created() {
    onAuthUIStateChange((authState, user) => {
      this.$store.commit("SET_USER", { authState, user });
      this.saveUserDB(user);
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
    async saveUserDB(user) {
      try {
        const result = await API.graphql(
          graphqlOperation(getUser, { id: user.attributes.sub })
        );
        const saved = result?.data?.getUser;
        if (!saved) {
          await API.graphql(
            graphqlOperation(createUser, { input: { id: user.attributes.sub } })
          );
        }
      } catch (e) {
        // TODO: 에러 처리
        console.error(e);
      }
    },
  },
  beforeDestroy() {
    return onAuthUIStateChange;
  },
};
</script>
