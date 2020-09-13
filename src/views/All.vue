<template>
  <div>
    <feed-list></feed-list>
    <br />
    <recommend></recommend>
  </div>
</template>

<script>
import FeedList from "../components/FeedList.vue";
import Recommend from "../components/Recommend";

export default {
  name: "All",
  components: {
    FeedList,
    Recommend,
  },
};
</script>
