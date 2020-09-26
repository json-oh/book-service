<template>
  <v-row justify="center" v-if="user">
    <v-dialog v-model="show" scrollable max-width="1000px">
      <v-card>
        <v-card-title>
          <span>{{ user.nickname }}</span>
          <v-spacer></v-spacer>
          <v-icon @click="toggleFollow(user)">{{ followStar }}</v-icon>
        </v-card-title>
        <v-card-text>
          <user-feed
            v-if="show"
            :user="user"
            v-bind:show-user-info="false"
          ></user-feed>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="close()">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import UserFeed from "./UserFeeds";
import { API, graphqlOperation } from "aws-amplify";
import { createFriend, deleteFriend } from "../graphql/mutations";
import { mapState } from "vuex";

export default {
  name: "ModalUserFeeds",
  components: { UserFeed },
  props: {
    dialog: Boolean,
    user: Object,
  },
  data: function () {
    return {
      follow: false,
    };
  },
  computed: {
    ...mapState(["dbUser"]),
    show: {
      get: function () {
        return this.dialog;
      },
      set: function () {
        this.close();
      },
    },
    followStar() {
      return this.follow ? "mdi-star" : "mdi-star-outline";
    },
  },
  methods: {
    close() {
      this.$emit("closeModalFeeds");
    },
    toggleFollow(targetUser) {
      if (this.follow) {
        this.follow = false;
        API.graphql(
          graphqlOperation(deleteFriend, {
            input: {
              followerID: this.dbUser.id,
              followingID: targetUser.id,
            },
          })
        );
      } else {
        this.follow = true;
        API.graphql(
          graphqlOperation(createFriend, {
            input: {
              followerID: this.dbUser.id,
              followingID: targetUser.id,
            },
          })
        );
      }
    },
  },
  created() {
    this.follow = this.dbUser.followings.items.some(
      (x) => x.followingID === this.user.id
    );
  },
};
</script>
