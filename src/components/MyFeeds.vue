<template>
  <div id="feedList" v-if="isLoggedIn">
    <h1>{{ user.attributes.email }}의 피드 목록</h1>
    <table>
      <thead>
        <tr>
          <th>제목</th>
          <th>작가</th>
          <th>한줄평</th>
          <th>이미지</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(feed, index) in feeds" :key="index">
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
  name: "MyFeeds",
  data() {
    return {
      identityId: undefined,
      feeds: [],
    };
  },
  methods: {
    init() {
      this.feeds = [];
    },
    async getMyFeeds() {
      const creds = await Auth.currentCredentials();
      this.identityId = creds.identityId;
      const myInit = {
        headers: {
          Authorization: (await Auth.currentSession())
            .getIdToken()
            .getJwtToken(),
        },
      };
      const feedData = await API.get("feedapi", "/feed", myInit);
      this.feeds = feedData;
      this.getImageUrl();
    },
    async getImageUrl() {
      try {
        for (let i = 0; i < this.feeds.length; i++) {
          let feed = this.feeds[i];
          feed.imageUrl = await Storage.get(feed.imageKey, {
            level: "protected",
            identityId: this.identityId,
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
    this.getMyFeeds();
  },
};
</script>
