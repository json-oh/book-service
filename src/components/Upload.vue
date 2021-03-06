<template>
  <div id="upload">
    <form @submit.prevent="upload">
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
    <form v-if="searchValue !== null" @submit.prevent="searchBooks">
      <input type="search" v-model.trim="searchValue" />
      <button type="submit">검색</button>
    </form>
    <ol v-if="Array.isArray(searchResult)">
      <li v-for="book in searchResult" :key="book.id">
        {{ book.title }} - {{ book.authors }}
      </li>
    </ol>
    <div v-if="error">
      <p>업로드에 실패했습니다.<br />{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { Storage, API } from "aws-amplify";
import Predictions from "@aws-amplify/predictions";

export default {
  name: "upload",
  data() {
    return {
      image: null,
      progress: null,
      uploadedImageUrl: "",
      error: "",
      searchValue: null,
      searchResult: null,
    };
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
      } catch (e) {
        if (e.message.includes("403")) {
          this.error = "인증 정보가 올바르지 않습니다.";
        } else {
          this.error = "알 수 없는 오류가 발생했습니다.";
        }
      }
    },
    async updateImageUrl(imageKey) {
      try {
        this.uploadedImageUrl = await Storage.get(imageKey, {
          level: "protected",
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
        this.searchBooks();
      } catch (e) {
        // TODO: 에러 처리
        console.error(e);
      }
    },
    async searchBooks() {
      try {
        const result = await API.get(
          "book_info_api",
          `/books/${encodeURIComponent(this.searchValue)}`
        );
        this.searchResult = result.data.map((doc) => ({
          id: doc._id,
          ...doc._source,
        }));
      } catch (e) {
        // TODO: 에러 처리
        console.error(e);
      }
    },
  },
};
</script>
