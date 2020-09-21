<template>
  <v-container>
    <v-row>
      <template v-if="reviews.length > 0">
        <v-col v-for="review in reviews" :key="review.id" cols="4">
          <review-card :initial-review="review"></review-card>
        </v-col>
      </template>
      <template v-else>
        <v-col v-for="n in 3" :key="n" cols="4">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
      </template>
    </v-row>
    <v-row justify="center">
      <v-btn v-if="reviewNextToken" @click="getReviews(reviewNextToken)">
        더 보기
      </v-btn>
    </v-row>
    <modal-user-feeds
      v-if="modalUser"
      :dialog="showModal"
      :user="modalUser"
      @closeModalFeeds="closeModalFeeds"
    ></modal-user-feeds>
  </v-container>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import { getReviewsOrderByCreatedAt } from "../graphql/queries_custom";
import ReviewCard from "./ReviewCard.vue";
import ModalUserFeeds from "./ModalUserFeeds";
import { mapState } from "vuex";

export default {
  name: "all-review-list",
  components: { ModalUserFeeds, ReviewCard },
  data() {
    return {
      showModal: false,
      modalUser: null,
      reviews: [],
      reviewLimit: 10,
      reviewNextToken: null,
    };
  },
  created() {
    this.getReviews(null);
  },
  methods: {
    closeModalFeeds() {
      this.modalUser = null;
      this.showModal = false;
    },
    showModalFeeds(user) {
      this.modalUser = user;
      this.showModal = true;
    },
    async getReviews(nextToken) {
      try {
        const { data } = await API.graphql(
          graphqlOperation(getReviewsOrderByCreatedAt, {
            dummy: "dummy",
            limit: this.reviewLimit,
            sortDirection: "DESC",
            nextToken,
          })
        );
        this.reviews = [
          ...this.reviews,
          ...data.getReviewsOrderByCreatedAt.items,
        ];
        this.reviewNextToken = data.getReviewsOrderByCreatedAt.nextToken;
      } catch (e) {
        // TODO: 에러 처리
        console.error(e);
      }
    },
  },
  computed: {
    ...mapState(["dbUser"]),
  },
};
</script>
