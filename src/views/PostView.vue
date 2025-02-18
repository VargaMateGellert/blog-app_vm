<template>
    <div class="container mt-4" v-if="post">
      <h1>{{ post.title }}</h1>
      <h2 class="text-muted">{{ post.subtitle }}</h2>
      <img :src="post.image" class="img-fluid my-3" alt="Post kép" v-if="post.image" />
      <p>{{ post.text }}</p>
    </div>
    <div class="container mt-4" v-else>
      <p>Betöltés...</p>
    </div>
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
  