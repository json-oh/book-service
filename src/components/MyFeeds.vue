<template>
  <div>
    <v-row class="ml-10">
      <v-col
        :key="index"
        v-for="(user, index) in followings"
        sm="2"
        class="pa-n16"
      >
        <v-list-item @click="showModalFeeds(user)" style="cursor: pointer">
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

    <modal-user-feeds
      v-if="modalUser"
      :dialog="showModal"
      :user="modalUser"
      @closeModalFeeds="closeModalFeeds"
    ></modal-user-feeds>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserFeed from "./UserFeeds";
import { getImageUrl } from "../utils/imageUtil";
import ModalUserFeeds from "./ModalUserFeeds";

export default {
  name: "MyFeeds",
  components: { UserFeed, ModalUserFeeds },
  data: function () {
    return {
      followings: [],
      showModal: false,
      modalUser: null,
    };
  },
  computed: {
    ...mapState(["dbUser"]),
  },
  methods: {
    closeModalFeeds() {
      this.modalUser = null;
      this.showModal = false;
    },
    showModalFeeds(user) {
      this.modalUser = user;
      this.showModal = true;
    },
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
