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
    onAuthUIStateChange((authState, cognitoUser) => {
      this.$store.commit("SET_COGNITO_USER", { authState, cognitoUser });
      if (authState === "signedin" && cognitoUser) {
        this.getIdentityId().then((identityId) =>
          this.$store.commit("SET_IDENTITY_ID", identityId)
        );
        this.getOrCreateDBUser(cognitoUser).then((dbUser) =>
          this.$store.commit("SET_DB_USER", dbUser)
        );
      } else {
        this.$store.commit("SET_IDENTITY_ID", null);
        this.$store.commit("SET_DB_USER", null);
      }
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
    async getIdentityId() {
      try {
        const { identityId } = await Auth.currentCredentials();
        return identityId;
      } catch (e) {
        return null;
      }
    },
    async getOrCreateDBUser(cognitoUser) {
      let dbUser;
      try {
        const result = await API.graphql(
          graphqlOperation(createUser, {
            input: {
              id: cognitoUser.username,
              nickname: cognitoUser.attributes.email,
            },
          })
        );
        dbUser = result.data.createUser;
      } catch (e) {
        const result = await API.graphql(
          graphqlOperation(getUser, { id: cognitoUser.username })
        );
        dbUser = result.data.getUser;
      }

      if (dbUser.profileImage) {
        dbUser.profileImageUrl = await getImageUrl(
          dbUser.profileImage.key,
          dbUser.profileImage.identityID
        );
      }

      return dbUser;
    },
  },
  beforeDestroy() {
    return onAuthUIStateChange;
  },
};
</script>
