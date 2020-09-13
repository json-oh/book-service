<template>
  <div id="feedList" v-if="isLoggedIn">
    <h1>전체 피드 목록</h1>
    <table>
      <thead>
        <tr>
          <th>작성자</th>
          <th>제목</th>
          <th>작가</th>
          <th>한줄평</th>
          <th>이미지</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(feed, index) in feeds" :key="index">
          <td>{{ feed.userId }}</td>
          <td>{{ feed.book.title }}</td>
          <td>{{ feed.book.authors }}</td>
          <td>{{ feed.comment }}</td>
          <td>
            <img :src="feed.imageUrl" width="150px" :alt="feed.imageKey" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { API, Auth, Storage } from "aws-amplify";
import { mapState } from "vuex";

export default {
  name: "AllFeeds",
  data() {
    return {
      feeds: [],
    };
  },
  methods: {
    init() {
      this.feeds = [];
    },
    async getAllFeeds() {
      const myInit = {
        headers: {
          Authorization: (await Auth.currentSession())
            .getIdToken()
            .getJwtToken(),
        },
      };
      const feedData = await API.get("feedapi", "/feed/all", myInit);
      this.feeds = feedData;
      this.getImageUrl();
    },
    async getImageUrl() {
      try {
        for (let i = 0; i < this.feeds.length; i++) {
          let feed = this.feeds[i];
          feed.imageUrl = await Storage.get(feed.imageKey, {
            level: "protected",
            identityId: feed.identityId,
          });
          this.feeds.splice(i, 1, feed);
        }
      } catch (e) {
        // TODO: 에러 처리
        console.error(e);
      }
    },
  },
  computed: {
    ...mapState(["user", "authState"]),
    isLoggedIn() {
      return this.authState === "signedin";
    },
  },
  created() {
    this.getAllFeeds();
  },
};
</script>
