<template>
  <div id="feedList" v-if="isLoggedIn">
    <h1>{{ user.attributes.email }}의 피드 목록</h1>
    <table>
      <thead>
        <tr>
          <th>title</th>
          <th>author</th>
          <th>contents</th>
          <th>image</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(feed, index) in feeds" :key="index">
          <td>{{ feed.title }}</td>
          <td>{{ feed.author }}</td>
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
import { API, Auth } from "aws-amplify";
import { mapState } from "vuex";

export default {
  name: "FeedList",
  data() {
    return {
      feeds: [],
    };
  },
  methods: {
    init() {
      this.feeds = [];
    },
    async getMyFeeds() {
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
            identityId: this.getIdentityId(),
          });
          this.feeds.splice(i, 1, feed);
        }
      } catch (e) {
        // TODO: 에러 처리
        console.error(e);
      }
    },
    getIdentityId() {
      let creds = Auth.currentCredentials();
      return creds.identityId;
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
