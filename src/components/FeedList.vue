<template>
  <div id="feedList" v-if="isLoggedIn">
    <h1>{{ user.attributes.email }}'s Feed List</h1>
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
          <td>{{ feed.bookTitle }}</td>
          <td>{{ feed.bookAuthor }}</td>
          <td>{{ feed.contents }}</td>
          <td><img :src="feed.imageUrl" width="150px" /></td>
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
