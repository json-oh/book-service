<template>
  <div id="feedList" v-if="isLoggedIn">
    <h2>내 피드 목록</h2>
    <vs-card-group>
      <vs-card v-for="(feed, index) in feeds" :key="index">
        <template #title>
          <h3>{{ feed.book.title }}</h3>
        </template>
        <template #img>
          <img
            :src="feed.imageUrl"
            alt="feed.imageKey"
            height="250px"
            style="width: auto"
          />
        </template>
        <template #text>
          <p>{{ feed.comment }}</p>
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
