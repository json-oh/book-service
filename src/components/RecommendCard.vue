<template>
  <v-card>
    <v-img
      :src="book.thumbnail_link"
      alt="book.title"
      aspect-ratio="1.778"
      contain
    ></v-img>
    <v-card-title>{{ book.title }}</v-card-title>
    <v-card-subtitle>{{ book.authors }}</v-card-subtitle>
    <v-card-actions>
      <v-dialog v-model="dialog" max-width="800">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">더 보기</v-btn>
        </template>
        <v-card>
          <v-card-title>{{ book.title }}</v-card-title>
          <v-card-subtitle>{{ book.authors }}</v-card-subtitle>
          <v-card-text>{{ book.description }}</v-card-text>
          <v-divider class="mb-3"></v-divider>
          <v-card-text>
            {{ book.publisher }}, {{ book.published_date }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialog = false">닫기</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  title: "recommend-card",
  props: {
    book: Object,
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
