<template>
  <v-container class="mt-4" v-if="post">
    <v-row>
      <v-col>
        <h1>{{ post.title }}</h1>
        <h2 class="text--secondary">{{ post.subtitle }}</h2>
      </v-col>
    </v-row>
    <v-row v-if="post.image">
      <v-col>
        <v-img :src="post.image" height="300"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p>{{ post.text }}</p>
      </v-col>
    </v-row>
  </v-container>
  <v-container class="mt-4" v-else>
    <v-row>
      <v-col>
        <p>Betöltés...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { usePostsStore } from '../store/posts';

export default {
  name: 'PostView',
  setup() {
    const route = useRoute();
    const postId = route.params.id;
    const postsStore = usePostsStore();
    const post = ref(null);

    const loadPost = async () => {
      post.value = await postsStore.fetchPost(postId);
    };

    onMounted(loadPost);

    return {
      post,
    };
  },
};
</script>

<style scoped>
</style>
