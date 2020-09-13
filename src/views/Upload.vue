<template>
  <div>
    <feed-register></feed-register>
    <photo-upload></photo-upload>
  </div>
</template>

<script>
import FeedRegister from "@/components/FeedRegister.vue";
import PhotoUpload from "@/components/Upload.vue";

export default {
  name: "Upload",
  components: {
    FeedRegister,
    PhotoUpload,
  },
};
</script>
