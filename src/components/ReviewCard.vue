<template>
  <v-card>
    <v-img :src="imageUrl" aspect-ratio="1.778" contain>
      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey"></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <v-card-title>{{ review.book.title }}</v-card-title>
    <v-card-subtitle>{{ review.book.authors }}</v-card-subtitle>
    <v-card-text>{{ review.content }}</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        icon
        :color="like ? 'pink' : undefined"
        @click="like ? removeLike() : addLike()"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-bottom-sheet v-model="openDetail" inset>
        <template #activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-message-reply-text</v-icon>
          </v-btn>
        </template>
        <v-sheet>
          <v-subheader>좋아하는 사람</v-subheader>
          <v-chip-group class="mx-3">
            <v-chip v-for="like in likes" :key="like.id">
              {{ like.nickname || like.userID }}
            </v-chip>
            <v-chip v-if="review.likes.nextToken">...</v-chip>
          </v-chip-group>
          <v-divider></v-divider>
          <v-subheader>댓글</v-subheader>
          <v-list class="overflow-y-auto" max-height="400" two-line>
            <v-list-item v-for="comment in comments" :key="comment.id">
              <v-list-item-avatar>
                <v-img
                  v-if="comment.profileImage"
                  :src="comment.profileImage"
                ></v-img>
                <v-skeleton-loader
                  v-else
                  boilerplate
                  type="avatar"
                ></v-skeleton-loader>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-subtitle>
                  {{ comment.nickname || comment.userID }}
                </v-list-item-subtitle>
                <v-list-item-title>
                  {{ comment.content }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list-item>
            <v-text-field
              v-model="commentText"
              append-icon="mdi-send"
              @click:append="addComment"
            ></v-text-field>
          </v-list-item>
        </v-sheet>
      </v-bottom-sheet>
    </v-card-actions>
  </v-card>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import { mapState } from "vuex";
import { getLike } from "../graphql/queries";
import { getReview } from "../graphql/queries_custom";
import { createComment, createLike, deleteLike } from "../graphql/mutations";
import { getImageUrl } from "../utils/imageUtil";

export default {
  name: "review-card",
  props: {
    initialReview: Object,
  },
  data() {
    return {
      like: false,
      openDetail: false,
      commentText: "",
      likes: [],
      likesNextToken: null,
      comments: [],
      commentsNextToken: null,
      review: { ...this.initialReview },
      imageUrl: null,
    };
  },
  created() {
    this.getImageUrl();
    this.getLike();
    this.mapLikes(this.review.likes);
    this.mapComments(this.review.comments);
  },
  watch: {
    review(newReview) {
      this.getImageUrl();
      this.getLike();
      this.mapLikes(newReview.likes);
      this.mapComments(newReview.comments);
    },
  },
  computed: {
    ...mapState(["cognitoUser"]),
  },
  methods: {
    async getImageUrl() {
      this.imageUrl = await getImageUrl(
        this.review.image.key,
        this.review.image.identityID
      );
    },
    async getReview() {
      const { data } = await API.graphql(
        graphqlOperation(getReview, {
          id: this.review.id,
        })
      );
      if (data && data.getReview) {
        this.review = data.getReview;
      }
    },
    mapLikes(likes) {
      if (likes.items) {
        this.likes = likes.items.map((item) => ({
          id: item.reviewID + item.user.id,
          userID: item.user.id,
          nickname: item.user.nickname,
        }));
        this.likesNextToken = likes.nextToken;
      }
    },
    async mapComments(comments) {
      if (comments.items) {
        const promises = comments.items.map(async (item) => {
          const { profileImage } = item.user;
          return {
            id: item.id,
            userID: item.user.id,
            nickname: item.user.nickname,
            profileImage:
              profileImage &&
              (await getImageUrl(profileImage.key, profileImage.identityId)),
            content: item.content,
          };
        });
        this.comments = await Promise.all(promises);
        this.commentsNextToken = comments.nextToken;
      }
    },
    async getLike() {
      const { data } = await API.graphql(
        graphqlOperation(getLike, {
          reviewID: this.review.id,
          userID: this.cognitoUser.attributes.sub,
        })
      );
      this.like = !!data.getLike;
    },
    async addLike() {
      this.like = true;
      const { data } = await API.graphql(
        graphqlOperation(createLike, {
          input: {
            reviewID: this.review.id,
            userID: this.cognitoUser.attributes.sub,
          },
        })
      );
      this.like = !!data.createLike;
      this.getReview();
    },
    async removeLike() {
      this.like = false;
      const { data } = await API.graphql(
        graphqlOperation(deleteLike, {
          input: {
            reviewID: this.review.id,
            userID: this.cognitoUser.attributes.sub,
          },
        })
      );
      this.like = !data.deleteLike;
      this.getReview();
    },
    async addComment() {
      if (!this.commentText) {
        return;
      }

      const commentText = this.commentText;
      this.commentText = "";
      const { data } = await API.graphql(
        graphqlOperation(createComment, {
          input: {
            reviewID: this.review.id,
            userID: this.cognitoUser.attributes.sub,
            content: commentText,
          },
        })
      );
      if (data && data.createComment) {
        this.getReview();
      }
    },
  },
};
</script>
