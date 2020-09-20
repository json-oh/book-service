<template>
  <v-container id="feedRegister">
    <h1>리뷰 등록</h1>
    <v-stepper v-model="stepper" vertical>
      <v-stepper-step :complete="step.fileUploaded" step="1">
        책 표지 등록
        <small>책 표지 사진을 업로드합니다.</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <div v-if="step.fileUploading">
          <v-file-input
            label="표지 선택"
            filled
            prepend-icon="mdi-camera"
            id="image"
            name="image"
            accept="image/png, image/jpeg"
            @change="onFileChange"
          ></v-file-input>

          <v-btn color="primary" @click="upload()">업로드</v-btn>
        </div>
        <div v-if="step.fileUploaded">
          <div v-if="uploadedImageUrl">
            <v-img
              width="250px"
              alt="업로드된 이미지"
              :src="uploadedImageUrl"
            />
          </div>
        </div>
      </v-stepper-content>

      <v-stepper-step :complete="step.textIdentified" step="2">
        제목 및 저자 입력
      </v-stepper-step>

      <v-stepper-content step="2">
        <div v-if="step.textIdentifying">
          <small>책 표지에서 자동으로 정보를 찾고 있습니다!</small>
        </div>

        <div v-if="step.textIdentified">
          <h3></h3>
          <form v-if="searchValue !== null" @submit.prevent="searchBooks">
            <v-text-field
              v-model.trim="searchValue"
              label="아래의 정보를 찾았어요!"
              required
            ></v-text-field>

            <v-btn type="submit" color="primary">다시 검색</v-btn>
          </form>
        </div>
      </v-stepper-content>

      <v-stepper-step :complete="step.bookSearched" step="3">
        책 선택
      </v-stepper-step>

      <v-stepper-content step="2">
        <div v-if="step.bookSearching">
          <small>일치하는 책을 찾고 있어요.</small>
        </div>

        <div v-if="step.bookSearched">
          <small>일치하는 책을 선택해주세요!</small>
          <v-radio-group>
            <v-radio
              v-for="book in searchResult"
              :key="book.id"
              :label="`${book.title} - ${book.authors}`"
              :value="book.id"
              @click="select(book)"
            ></v-radio>
          </v-radio-group>
        </div>
      </v-stepper-content>

      <v-stepper-step :complete="step.reviewCreated" step="4">
        리뷰 작성
      </v-stepper-step>

      <v-stepper-content step="2">
        <div v-if="step.reviewCreating">
          <small>리뷰를 작성해주세요.</small>
          <form @submit.prevent="createReview" id="feedForm">
            <v-text-field
              v-model="title"
              label="제목"
              disabled="disabled"
            ></v-text-field>
            <v-text-field
              v-model="author"
              label="저자"
              disabled="disabled"
            ></v-text-field>
            <v-text-field
              v-model="comment"
              label="한줄 평"
              placeholder="한줄 평"
            ></v-text-field>

            <v-btn type="submit" color="primary">리뷰 등록</v-btn>
          </form>
        </div>
        <div v-if="step.reviewCreated">
          <small>리뷰가 등록되었습니다. :)</small>
        </div>
      </v-stepper-content>
    </v-stepper>
    <v-overlay :value="overlay"></v-overlay>
  </v-container>
</template>
<style>
.v-stepper__wrapper {
  height: auto !important;
}
</style>
<script>
import { API, Auth, graphqlOperation, Storage } from "aws-amplify";
import Predictions from "@aws-amplify/predictions";
import { mapState } from "vuex";
import { createReview } from "../graphql/mutations";

export default {
  name: "FeedRegister",
  data() {
    return {
      overlay: false,
      step: {
        fileUploading: true,
        fileUploaded: false,
        textIdentifying: false,
        textIdentified: false,
        bookSearching: false,
        bookSearched: false,
        reviewCreating: false,
        reviewCreated: false,
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
    stepper() {
      if (this.step.fileUploading) {
        return 1;
      } else if (this.step.textIdentifying) {
        return 2;
      } else if (this.step.bookSearching) {
        return 3;
      } else if (this.step.reviewCreating) {
        return 4;
      } else {
        return 0;
      }
    },
  },
  watch: {
    selectedBook: function (val) {
      this.select(this.searchResult[val]);
    },
  },
  methods: {
    onFileChange(file) {
      this.image = file;
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
      this.resetResult();
      this.overlay = true;

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
        this.overlay = false;

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
      this.step.reviewCreating = true;
    },
    async createReview() {
      const { book, comment, imageKey } = this;
      const identityId = this.identityId;
      await API.graphql(
        graphqlOperation(createReview, {
          input: {
            userID: this.dbUser.id,
            book: book,
            image: {
              identityID: identityId,
              key: imageKey,
            },
            content: comment,
            dummy: "dummy",
          },
        })
      );
      this.step.reviewCreating = false;
      this.step.reviewCreated = true;
      location.reload();
    },
  },
};
</script>
