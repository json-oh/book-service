<template>
  <div id="recommend">
    <h1>추천 목록</h1>
    <table>
      <thead>
        <tr>
          <th>제목</th>
          <th>작가</th>
          <th>이미지</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in books" :key="index">
          <td>{{ book.title }}</td>
          <td>{{ book.authors }}</td>
          <td>
            <img :src="book.thumbnail_link" width="150px" :alt="book.title" />
          </td>
        </tr>
      </tbody>
    </table>
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
