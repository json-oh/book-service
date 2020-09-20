<template>
  <v-container id="userlist">
    <h1>전체 사용자 목록</h1>
    <small>(이미지 클릭하면 팔로우 토글)</small>
    <div v-if="users.length > 0">
      <v-row>
        <v-col :key="index" v-for="(user, index) in users" sm="2">
          <v-row>
            <v-badge
              bordered
              bottom
              dot
              offset-x="10"
              offset-y="10"
              :color="user.follow ? 'blue lighten-5' : 'blue accent-4'"
              sm-6
            >
              <v-avatar>
                <a href="javascript:void(0);" @click="toggleFollow(user)">
                  <img
                    v-if="user.profileImageUrl"
                    :src="user.profileImageUrl"
                    :alt="user.nickname"
                  />
                  <img v-else src="../assets/user.png" alt="defaultImage" />
                </a>
              </v-avatar>
            </v-badge>
          </v-row>
          <v-row>
            {{ user.nickname }}
          </v-row>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<style scoped>
.v-avatar img,
.v-avatar svg {
  width: 40px;
  height: 40px;
}
</style>
<script>
import { API, graphqlOperation, Storage } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import { createFriend, deleteFriend } from "../graphql/mutations";
import { mapState } from "vuex";
import { getImageUrl } from "../utils/imageUtil";

export default {
  name: "UserList",
  data() {
    return {
      users: [],
      followingIds: [],
    };
  },
  computed: {
    ...mapState(["dbUser"]),
  },
  methods: {
    init() {
      this.users = [];
      this.followingIds = this.dbUser.followings.items.map(
        (x) => x.followingID
      );
    },
    async getUsers() {
      const result = await API.graphql(graphqlOperation(listUsers));
      const userResponse = result.data.listUsers.items;
      for (const user of userResponse) {
        if (user.profileImage) {
          console.log(user.profileImage);
          const profileImageUrl = await getImageUrl(
            user.profileImage.key,
            user.profileImage.identityID
          );
          console.log(profileImageUrl);
          user.profileImageUrl = profileImageUrl;
        }

        user.follow = this.followingIds.includes(user.id);
        this.users.push(user);
      }
    },
    async toggleFollow(targetUser) {
      if (targetUser.follow) {
        targetUser.follow = false;
        API.graphql(
          graphqlOperation(deleteFriend, {
            input: {
              followerID: this.dbUser.id,
              followingID: targetUser.id,
            },
          })
        );
      } else {
        targetUser.follow = true;
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
  async created() {
    await this.getUsers();
  },
};
</script>
