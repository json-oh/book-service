<template>
  <div id="userlist" class="page">
    <div class="card" v-if="users.length > 0">
      <div class="content">
        <h3>전체 사용자 목록</h3>
        <vs-row>(이미지 클릭하면 팔로우/언팔)</vs-row>
        <vs-row>
          <vs-col
            :key="index"
            v-for="(user, index) in users"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            w="1"
          >
            <vs-avatar v-if="user.follow" badge badge-color="primary">
              <a href="javascript:void(0);" @click="unfollow(user)">
                <img
                  v-if="user.profileImageUrl"
                  :src="user.profileImageUrl"
                  alt=""
                />
                <img v-else src="../assets/user.png" alt="" />
              </a>
            </vs-avatar>
            <vs-avatar v-else>
              <a href="javascript:void(0);" @click="follow(user)">
                <img
                  v-if="user.profileImageUrl"
                  :src="user.profileImageUrl"
                  alt=""
                />
                <img v-else src="../assets/user.png" alt="" />
              </a>
            </vs-avatar>
          </vs-col>
        </vs-row>
      </div>
    </div>
  </div>
</template>

<script>
import { API, Auth, graphqlOperation, Storage } from "aws-amplify";
import { getUser, listUsers } from "../graphql/queries";
import { createFriend, deleteFriend } from "../graphql/mutations";

export default {
  name: "UserList",
  data() {
    return {
      user: null,
      users: [],
      followingIds: [],
    };
  },
  methods: {
    init() {
      this.users = [];
    },
    async getUser() {
      const userinfo = await Auth.currentUserInfo();
      const result = await API.graphql(
        graphqlOperation(getUser, { id: userinfo.username })
      );
      this.user = result.data.getUser;
      this.followingIds = this.user.followings.items.map((x) => x.followingID);
    },
    async getUsers() {
      const result = await API.graphql(graphqlOperation(listUsers));
      const userResponse = result.data.listUsers.items;
      for (const user of userResponse) {
        if (user.profileImage) {
          const profileImageUrl = await Storage.get(user.profileImage.key, {
            level: "protected",
            identityId: user.profileImage.identityID,
          });
          user.profileImageUrl = profileImageUrl;
        }

        user.follow = this.followingIds.includes(user.id);
        this.users.push(user);
      }
    },
    async follow(targetUser) {
      if (!targetUser.follow) {
        targetUser.follow = true;
        API.graphql(
          graphqlOperation(createFriend, {
            input: {
              followerID: this.user.id,
              followingID: targetUser.id,
            },
          })
        );
      }
    },
    async unfollow(targetUser) {
      if (targetUser.follow) {
        targetUser.follow = false;
        API.graphql(
          graphqlOperation(deleteFriend, {
            input: {
              followerID: this.user.id,
              followingID: targetUser.id,
            },
          })
        );
      }
    },
  },
  async created() {
    await this.getUser();
    await this.getUsers();
  },
};
</script>
