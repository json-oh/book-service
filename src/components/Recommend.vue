<template>
  <div id="recommend">
    <h2>추천 목록</h2>
    <vs-card-group>
      <vs-card v-for="(book, index) in books" :key="index">
        <template #title>
          <h3>{{ book.title }}</h3>
        </template>
        <template #img>
          <img
            :src="book.thumbnail_link"
            alt="book.title"
            height="250px"
            style="width: auto"
          />
        </template>
        <template #text>
          <p>{{ book.authors }}</p>
        </template>
        <template #interactions>
          <vs-button danger icon>
            <i class="bx bx-heart"></i>
          </vs-button>
          <vs-button class="btn-chat" shadow primary>
            <i class="bx bx-chat"></i>
            <span class="span"> 54 </span>
          </vs-button>
        </template>
      </vs-card>
    </vs-card-group>
  </div>
</template>

<script>
import { API, Auth } from "aws-amplify";

export default {
  name: "Recommend",
  data() {
    return {
      books: null,
    };
  },
  methods: {
    async recommendBooks() {
      try {
        const myInit = {
          headers: {
            Authorization: (await Auth.currentSession())
              .getIdToken()
              .getJwtToken(),
          },
        };
        const result = await API.get(
          "recommendation-api",
          "/recommendation",
          myInit
        );
        this.books = result.data.map((doc) => ({
          id: doc._id,
          ...doc._source,
        }));
      } catch (e) {
        // TODO: 에러 처리
        console.error(e);
      }
    },
  },
  created() {
    this.recommendBooks();
  },
};
</script>
