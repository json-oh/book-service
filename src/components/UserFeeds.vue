<template>
  <v-container>
    <v-row>
      <template v-if="reviews.length > 0">
        <v-col v-for="review in reviews" :key="review.id" cols="12" sm="4">
          <review-card
            :initial-review="review"
            :show-user-info="showUserInfo"
          ></review-card>
        </v-col>
      </template>
      <template v-else>
        <v-col v-for="n in 3" :key="n" cols="12" sm="4">
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
import { getReviewsByUser } from "../graphql/queries_custom";
import ReviewCard from "./ReviewCard.vue";
import { mapState } from "vuex";

export default {
  name: "UserFeed",
  props: {
    user: Object,
    showUserInfo: {
      type: Boolean,
      default: true,
    },
  },
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
  computed: {
    ...mapState(["dbUser"]),
  },
  methods: {
    async getReviews(nextToken) {
      try {
        const { data } = await API.graphql(
          graphqlOperation(getReviewsByUser, {
            userID: this.user.id,
            limit: this.reviewLimit,
            sortDirection: "DESC",
            nextToken,
          })
        );
        this.reviews = [...this.reviews, ...data.getReviewsByUser.items];
        this.reviewNextToken = data.getReviewsByUser.nextToken;
      } catch (e) {
        // TODO: 에러 처리
        console.error(e);
      }
    },
  },
};
</script>
