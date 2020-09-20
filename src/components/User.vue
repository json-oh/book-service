<template>
  <v-container id="user">
    <h1>내 정보</h1>
    <div v-if="dbUser">
      <v-row>
        <v-col sm="4">
          <v-avatar size="180" color="grey lighten-2">
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
            v-model="dbUser.nickname"
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

    <v-snackbar v-model="saved" timeout="4000">
      저장되었습니다.

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<style>
.v-avatar img,
.v-avatar svg {
  width: 180px;
  height: 180px;
}
</style>
<script>
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { updateUser } from "../graphql/mutations";
import { mapState } from "vuex";

export default {
  name: "User",
  data: function () {
    return {
      profileImageFile: null,
      profileImageUrl: null,
      saved: false,
    };
  },
  computed: {
    ...mapState(["cognitoUser", "dbUser", "authState"]),
  },
  methods: {
    init() {
      this.profileImageFile = null;
      this.profileImageUrl = this.dbUser.profileImageUrl;
    },
    onFileChange(event) {
      this.profileImageFile = event.target.files[0];
      this.profileImageUrl = URL.createObjectURL(this.profileImageFile);
    },
    async uploadProfileImage() {
      this.$refs.profileImage.click();
    },
    async updateUser() {
      let userInput = {
        id: this.dbUser.id,
        nickname: this.dbUser.nickname,
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
        this.dbUser.profileImage = key;
        const creds = await Auth.currentCredentials();
        userInput.profileImage = {
          identityID: creds.identityId,
          key: this.dbUser.profileImage,
        };
      }

      await API.graphql(
        graphqlOperation(updateUser, {
          input: userInput,
        })
      );
      this.saved = true;
      this.init();
    },
  },
  created() {
    this.init();
  },
};
</script>
