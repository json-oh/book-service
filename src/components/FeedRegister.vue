<template>
  <div id="feedRegister" v-if="isLoggedIn" class="page">
    <div class="card">
      <div class="content">
        <progress :value="progress" style="width: 300px"></progress>

        <div v-if="step.fileSelecting">
          <h3>책 표지를 업로드해주세요.</h3>
          <form @submit.prevent="upload">
            <div class="center content-inputs">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/png, image/jpeg"
                @change="onFileChange"
              />
              <vs-button
                flat
                type="submit"
                :disabled="!this.image"
                style="display: inline-block"
              >
                업로드
              </vs-button>
            </div>
          </form>
        </div>

        <div v-if="step.fileUploading">
          <h3>책 표지를 업로드하는 중입니다.</h3>
        </div>

        <div v-if="step.fileUploaded">
          <div v-if="uploadedImageUrl">
            <h3>업로드가 완료되었습니다.</h3>
            <img width="250px" alt="업로드된 이미지" :src="uploadedImageUrl" />
          </div>
        </div>

        <div v-if="step.textIdentifying">
          <h3>책 표지에서 정보를 찾고 있어요.</h3>
        </div>

        <div v-if="step.textIdentified">
          <h3>아래의 제목 또는 저자를 찾았어요!</h3>
          <form v-if="searchValue !== null" @submit.prevent="searchBooks">
            <vs-input type="search" v-model.trim="searchValue" />
            <vs-button flat type="submit" style="display: inline-block">
              다시 검색
            </vs-button>
          </form>
        </div>

        <div v-if="step.bookSearching">
          <h3>일치하는 책을 찾고 있어요.</h3>
        </div>

        <div v-if="step.bookSearched">
          <h3>일치하는 책을 선택해주세요!</h3>
          <div v-if="searchResult">
            <span v-for="book in searchResult" :key="book.id">
              <vs-radio v-model="selectedBook" :val="book.id">
                {{ book.title }} - {{ book.authors }}
              </vs-radio>
            </span>
          </div>
        </div>

        <div v-if="step.bookSearched">
          <h3>피드를 작성해주세요!</h3>
          <form @submit.prevent="createFeed" id="feedForm">
            <vs-row justify="space-around" direction="column" class="mh">
              <vs-col>
                <vs-input
                  id="title"
                  name="title"
                  label="제목"
                  type="text"
                  v-model="title"
                  placeholder="Title"
                  disabled="disabled"
                />
              </vs-col>
            </vs-row>
            <br />
            <vs-row justify="space-around" direction="column" class="mh">
              <vs-col>
                <vs-input
                  id="author"
                  name="author"
                  label="저자"
                  type="text"
                  v-model="author"
                  placeholder="Author"
                  disabled="disabled"
                />
              </vs-col>
            </vs-row>
            <br />
            <vs-row justify="space-around" direction="column" class="mh">
              <vs-col>
                <vs-input
                  id="comment"
                  label="한줄평"
                  name="comment"
                  type="text"
                  v-model="comment"
                  placeholder="Comment"
                />
              </vs-col>
            </vs-row>
            <vs-button flat type="submit" style="display: inline-block">
              피드 등록
            </vs-button>
          </form>
        </div>
      </div>
    </div>

    <div v-if="error">
      <p>
        업로드에 실패했습니다.
        <br />
        {{ error }}
      </p>
    </div>
  </div>
</template>
<style>
.vs-input {
  width: 100%;
}
.vs-radio-content {
  justify-content: start;
}
</style>
<script>
import { API, Auth, Storage } from "aws-amplify";
import Predictions from "@aws-amplify/predictions";
import { mapState } from "vuex";

export default {
  name: "FeedRegister",
  data() {
    return {
      step: {
        fileSelecting: true,
        fileSelected: false,
        fileUploading: false,
        fileUploaded: false,
        textIdentifying: false,
        textIdentified: false,
        bookSearching: false,
        bookSearched: false,
        feedCreating: false,
        feedCreated: false,
      },
      image: null,
      imageKey: "",
      uploadedImageUrl: "",
      error: "",
      searchValue: null,
      searchResult: null,
      identityId: null,
      selectedBook: null,
      title: "",
      author: "",
      book: null,
      comment: "",
    };
  },
  computed: {
    ...mapState(["cognitoUser", "dbUser", "authState"]),
    isLoggedIn() {
      return this.authState === "signedin";
    },
    progress() {
      return (
        (1 +
          this.step.fileSelected +
          this.step.fileUploaded +
          this.step.textIdentified +
          this.step.bookSearched +
          this.step.feedCreated) /
        6
      );
    },
  },
  watch: {
    selectedBook: function (val) {
      this.select(this.searchResult[val]);
    },
  },
  methods: {
    onFileChange(event) {
      this.image = event.target.files[0];
    },
    resetResult() {
      // this.progress = 0;
      this.uploadedImageUrl = "";
      this.error = "";
    },
    async upload() {
      if (!this.image) {
        return;
      }
      this.step.fileSelecting = false;
      this.step.fileSelected = true;
      this.step.fileUploading = true;
      this.resetResult();

      try {
        // put object
        const { key } = await Storage.put(this.image.name, this.image, {
          level: "protected",
          contentType: this.image.type,
          // progressCallback: (progress) => {
          //   this.progress = (progress.loaded / progress.total) * 100;
          // },
        });

        this.step.fileUploading = false;
        this.step.fileUploaded = true;

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
      this.step.textIdentifying = true;
      try {
        const result = await Predictions.identify({
          text: {
            source: {
              key: imageKey,
              level: "protected",
            },
          },
        });
        this.step.textIdentifying = false;
        this.step.textIdentified = true;
        this.searchValue = result.text.fullText;
        this.searchBooks();
      } catch (e) {
        // TODO: 에러 처리
        console.error(e);
      }
    },
    async searchBooks() {
      try {
        this.step.bookSearching = true;
        const result = await API.get(
          "book_info_api",
          `/books/${encodeURIComponent(this.searchValue)}`
        );
        this.step.bookSearching = false;
        this.step.bookSearched = true;
        this.searchResult = result.data
          .map((doc) => ({
            id: doc._id,
            ...doc._source,
          }))
          .reduce(function (map, obj) {
            map[obj.id] = obj;
            return map;
          }, {});
        console.log(typeof this.searchResult);
      } catch (e) {
        // TODO: 에러 처리
        console.error(e);
      }
    },
    select(book) {
      this.book = book;
      this.title = book.title;
      this.author = book.authors;
    },
    async createFeed() {
      this.step.feedCreating = true;

      const { book, comment, imageKey } = this;
      const identityId = this.identityId;
      const feed = { book, comment, imageKey, identityId };
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
      this.step.feedCreating = false;
      this.step.feedCreated = false;
      location.reload();
    },
  },
};
</script>
