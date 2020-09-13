<template>
  <div id="feedRegister" v-if="isLoggedIn">
    <h1>피드 등록</h1>
    <form @submit.prevent="upload" id="uploadForm">
      <label for="image">업로드할 사진을 선택해 주세요.</label>
      <br />
      <input
        type="file"
        id="image"
        name="image"
        accept="image/png, image/jpeg"
        @change="onFileChange"
      />
      <button type="submit" :disabled="!this.image">업로드</button>
    </form>
    <div v-if="progress !== null && !uploadedImageUrl">
      <progress :value="progress"></progress>
    </div>
    <div v-if="uploadedImageUrl">
      <p>업로드가 완료되었습니다.</p>
      <img alt="업로드된 이미지" :src="uploadedImageUrl" />
    </div>
    <div v-if="searchValue">
      <input type="search" :value="searchValue" />
    </div>
    <div v-if="error">
      <p>업로드에 실패했습니다.<br />{{ error }}</p>
    </div>
    <form @submit.prevent="createFeed" id="feedForm" v-if="searchValue">
      <label for="title">제목</label>
      <input
        id="title"
        name="title"
        type="text"
        v-model="title"
        placeholder="Title"
      />
      <label for="author">저자</label>
      <input
        id="author"
        name="author"
        type="text"
        v-model="author"
        placeholder="Author"
      />
      <label for="comment">한줄평</label>
      <input
        id="comment"
        name="comment"
        type="text"
        v-model="comment"
        placeholder="Comment"
      />
      <button type="submit">피드 등록</button>
    </form>
  </div>
</template>

<script>
import { API, Auth, Storage } from "aws-amplify";
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import Predictions from "@aws-amplify/predictions";
import { mapState } from "vuex";

export default {
  name: "FeedRegister",
  data() {
    return {
      image: null,
      progress: null,
      imageKey: "",
      uploadedImageUrl: "",
      error: "",
      searchValue: "",
      identityId: undefined,
      title: "",
      author: "",
      comment: "",
    };
  },
  computed: {
    ...mapState(["user", "authState"]),
    isLoggedIn() {
      return this.authState === "signedin";
    },
  },
  methods: {
    onFileChange(event) {
      this.image = event.target.files[0];
    },
    resetResult() {
      this.progress = 0;
      this.uploadedImageUrl = "";
      this.error = "";
    },
    async upload() {
      if (!this.image) {
        return;
      }

      this.resetResult();

      try {
        // put object
        const { key } = await Storage.put(this.image.name, this.image, {
          level: "protected",
          contentType: this.image.type,
          progressCallback: (progress) => {
            this.progress = progress.loaded / progress.total;
          },
        });

        this.updateImageUrl(key);
        this.identifyText(key);
        this.imageKey = key;
      } catch (e) {
        if (e.message.includes("403")) {
          this.error = "인증 정보가 올바르지 않습니다.";
        } else {
          this.error = "알 수 없는 오류가 발생했습니다.";
        }
      }
    },
    async updateImageUrl(imageKey) {
      const creds = await Auth.currentCredentials();
      this.identityId = creds.identityId;
      try {
        this.uploadedImageUrl = await Storage.get(imageKey, {
          level: "protected",
          identityId: this.identityId,
        });
      } catch (e) {
        // TODO: 에러 처리
        console.error(e);
      }
    },
    async identifyText(imageKey) {
      try {
        const result = await Predictions.identify({
          text: {
            source: {
              key: imageKey,
              level: "protected",
            },
          },
        });
        this.searchValue = result.text.fullText;
      } catch (e) {
        // TODO: 에러 처리
        console.error(e);
      }
    },
    async createFeed() {
      const { title, author, comment, imageKey } = this;
      const identityId = this.identityId;
      const feed = { title, author, comment, imageKey, identityId };
      console.log(feed);
      const myInit = {
        headers: {
          Authorization: (await Auth.currentSession())
            .getIdToken()
            .getJwtToken(),
        },
        body: feed,
      };
      const apiData = await API.post("feedapi", "/feed", myInit);
      console.log({ apiData });
      location.reload();
    },
    async getIdentityId() {
      let creds = await Auth.currentCredentials();
      return creds.identityId;
    },
  },
  created() {
    onAuthUIStateChange((authState, authData) => {
      console.log(authData);
      this.authState = authState;
      this.user = authData;
    });
  },
  beforeDestroy() {
    return onAuthUIStateChange;
  },
};
</script>
