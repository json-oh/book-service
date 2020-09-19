<template>
  <div id="user" class="page">
    <div class="card" v-if="user">
      <div class="content">
        <h3>내 정보</h3>
        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="3">
            <vs-avatar size="180">
              <a href="#" @click="uploadProfileImage()">
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
            </vs-avatar>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="3">
            <div class="center content-inputs">
              <vs-input label="닉네임" v-model="user.nickname" />
            </div>
          </vs-col>
        </vs-row>
        <vs-row justify="flex-end">
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="3">
            <vs-button flat @click="updateUser()"> 저장 </vs-button>
          </vs-col>
        </vs-row>
      </div>
    </div>
  </div>
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
