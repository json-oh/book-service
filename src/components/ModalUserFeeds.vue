<template>
  <v-row justify="center">
    <v-dialog v-model="show" scrollable max-width="1000px">
      <v-card >
        <h1>사용자</h1>

        <user-feed v-if="show" :user="user"></user-feed>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="close()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import UserFeed from "./UserFeeds";

export default {
  name: "ModalUserFeeds",
  components: { UserFeed },
  props: {
    dialog: Boolean,
    user: Object,
  },
  computed: {
    show: {
      get: function () {
        return this.dialog;
      },
      set: function () {
        this.close();
      },
    },
  },
  methods: {
    close() {
      this.$emit("closeModalFeeds");
    },
  },
};
</script>
