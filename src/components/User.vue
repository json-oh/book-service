<template>
  <v-container id="user">
    <h1>내 정보</h1>
    <div v-if="user">
      <v-row>
        <v-col sm="4">
          <v-avatar size="180">
            <a href="javascript:void(0);" @click="uploadProfileImage()">
              <img
                v-if="this.profileImageUrl"
                :src="this.profileImageUrl"
                alt=""
              />
              <img v-else src="../assets/user.png" alt="" />
            </a>
            <input
              id="profileImage"
              type="file"
              ref="profileImage"
              accept="image/png, image/jpeg"
              @change="onFileChange"
              v-show="false"
            />
          </v-avatar>
        </v-col>
        <v-col sm="4">
          <v-text-field
            v-model="user.nickname"
            label="닉네임"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="4"></v-col>
        <v-col sm="4" class="d-flex justify-end">
          <v-btn small color="primary" @click="updateUser()">저장</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { getUser } from "../graphql/queries";
import { createUser, updateUser } from "../graphql/mutations";

export default {
  name: "User",
  data: function () {
    return {
      user: null,
      profileImageFile: null,
      profileImageUrl: null,
    };
  },
  methods: {
    init() {
      this.user = null;
      this.profileImageFile = null;
      this.profileImageUrl = null;
      this.getUser();
    },
    onFileChange(event) {
      this.profileImageFile = event.target.files[0];
      this.profileImageUrl = URL.createObjectURL(this.profileImageFile);
    },
    async getUser() {
      const userinfo = await Auth.currentUserInfo();
      const result = await API.graphql(
        graphqlOperation(getUser, { id: userinfo.username })
      );
      const userResponse = result.data.getUser;

      if (!userResponse) {
        API.graphql(
          graphqlOperation(createUser, {
            input: {
              id: userinfo.username,
              nickname: userinfo.attributes.email,
            },
          })
        );
        this.getUser();
        return;
      }

      if (userResponse.profileImage) {
        this.profileImageUrl = await Storage.get(
          userResponse.profileImage.key,
          {
            level: "protected",
            identityId: userResponse.profileImage.identityID,
          }
        );
      }

      this.user = userResponse;
    },
    async uploadProfileImage() {
      this.$refs.profileImage.click();
    },
    async updateUser() {
      let userInput = {
        id: this.user.id,
        nickname: this.user.nickname,
      };
      if (this.profileImageFile) {
        const { key } = await Storage.put(
          this.profileImageFile.name,
          this.profileImageFile,
          {
            level: "protected",
            contentType: this.profileImageFile.type,
          }
        );
        this.user.profileImage = key;
        const creds = await Auth.currentCredentials();
        userInput.profileImage = {
          identityID: creds.identityId,
          key: this.user.profileImage,
        };
      }

      await API.graphql(
        graphqlOperation(updateUser, {
          input: userInput,
        })
      );
      this.$vs.notification({
        position: "top-center",
        title: "저장하였습니다!",
      });
      this.init();
    },
  },
  async created() {
    await this.getUser();
  },
};
</script>
