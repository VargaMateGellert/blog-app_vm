<template>
  <v-card class="mb-4">
    <v-img :src="post.image" height="200px" v-if="post.image"></v-img>
    <v-card-title>{{ post.title }}</v-card-title>
    <v-card-subtitle>{{ post.subtitle }}</v-card-subtitle>
    <v-card-text>{{ post.shortText }}</v-card-text>
    <v-card-actions>
      <v-btn color="primary" :to="`/post/${post.id}`">Read More</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'BlogPostCard',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>
