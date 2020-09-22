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
        <template v-if="authState === 'signedin' && dbUser">
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
      <router-view v-if="authState === 'signedin' && dbUser"></router-view>
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
import { getImageUrl } from "./utils/imageUtil";

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
        icon: "mdi-star-face",
        title: "추천 목록",
        to: "/recommendation",
      },
    ],
  }),
  created() {
    onAuthUIStateChange(async (authState, cognitoUser) => {
      const dbUser = await this.getUserDB(cognitoUser);
      this.$store.commit("SET_USER", { authState, cognitoUser, dbUser });
      this.$store.dispatch("fetchIdentityId");
    });
  },
  computed: {
    ...mapState(["authState", "cognitoUser", "dbUser"]),
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
    async getUserDB(cognitoUser) {
      if (!cognitoUser) return;
      const result = await API.graphql(
        graphqlOperation(getUser, { id: cognitoUser.username })
      );
      const userResponse = result.data.getUser;

      if (!userResponse) {
        API.graphql(
          graphqlOperation(createUser, {
            input: {
              id: cognitoUser.username,
              nickname: cognitoUser.attributes.email,
            },
          })
        );
        this.getUserDB(cognitoUser);
        return;
      }

      if (userResponse.profileImage) {
        userResponse.profileImageUrl = await getImageUrl(
          userResponse.profileImage.key,
          userResponse.profileImage.identityID
        );
      }
      return userResponse;
    },
  },
  beforeDestroy() {
    return onAuthUIStateChange;
  },
};
</script>
