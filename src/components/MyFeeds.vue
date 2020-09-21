<template>
  <user-feed :user="dbUser"></user-feed>
</template>

<script>
import { mapState } from "vuex";
import UserFeed from "./UserFeeds";

export default {
  name: "MyFeeds",
  components: { UserFeed },
  computed: {
    ...mapState(["dbUser"]),
  },
};
</script>
