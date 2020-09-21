<template>
  <div>
    <v-row class="ml-10">
      <v-col
        :key="index"
        v-for="(user, index) in followings"
        sm="2"
        class="pa-n16"
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-img
              v-if="user.profileImageUrl"
              :src="user.profileImageUrl"
              :alt="user.nickname"
            />
            <v-img v-else src="../assets/user.png" alt="defaultImage" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">{{
              user.nickname
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <user-feed :user="dbUser"></user-feed>

    <v-row justify="center">
      <v-btn @click="$router.push('create')">
        <v-icon>mdi-pencil</v-icon> 새 리뷰 쓰기</v-btn
      >
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserFeed from "./UserFeeds";
import { getImageUrl } from "../utils/imageUtil";

export default {
  name: "MyFeeds",
  components: { UserFeed },
  data: function () {
    return {
      followings: [],
    };
  },
  computed: {
    ...mapState(["dbUser"]),
  },
  methods: {
    async getProfileImageUrl(user) {
      const { profileImage } = user;
      if (profileImage) {
        return await getImageUrl(profileImage.key, profileImage.identityID);
      } else {
        return null;
      }
    },
  },
  async created() {
    const promises = await this.dbUser.followings.items.map(async (friend) => {
      const user = friend.following;
      user.profileImageUrl = await this.getProfileImageUrl(user);
      return user;
    });
    this.followings = await Promise.all(promises);
  },
};
</script>
