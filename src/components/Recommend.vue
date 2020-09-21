<template>
  <v-container>
    <v-row>
      <template v-if="books">
        <v-col v-for="book in books" :key="book.id" cols="4">
          <recommend-card :book="book"></recommend-card>
        </v-col>
      </template>
      <template v-else>
        <v-col v-for="n in 3" :key="n" cols="4">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { API, Auth } from "aws-amplify";
import RecommendCard from "./RecommendCard";

export default {
  name: "Recommend",
  components: {
    RecommendCard,
  },
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
