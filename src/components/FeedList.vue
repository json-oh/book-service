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
  </v-container>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import { getReviewsOrderByCreatedAt } from "../graphql/queries_custom";
import ReviewCard from "./ReviewCard.vue";

export default {
  name: "all-review-list",
  components: { ReviewCard },
  data() {
    return {
      reviews: [],
      reviewLimit: 10,
      reviewNextToken: null,
    };
  },
  created() {
    this.getReviews(null);
  },
  methods: {
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
};
</script>
