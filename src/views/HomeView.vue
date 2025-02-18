<template>
    <div class="container mt-4">
      <BlogSearchBar @search="onSearch" />
      <h1 class="mb-4">Legújabb bejegyzések</h1>
      <div v-if="posts.length">
        <BlogPostCard v-for="post in posts" :key="post.id" :post="post" />
      </div>
      <div v-else>
        <p>Nincs megjelenítendő bejegyzés.</p>
      </div>
    </div>
  </template>
  
  <script>
import { onMounted, ref } from 'vue';
import { usePostsStore } from '../store/posts';
import BlogPostCard from '../components/BlogPostCard.vue';
import BlogSearchBar from '../components/BlogSearchBar.vue';

export default {
  name: 'HomeView',
  components: {
    BlogPostCard,
    BlogSearchBar,
  },
  setup() {
    const postsStore = usePostsStore();
    const posts = ref([]);

    const loadPosts = async () => {
      await postsStore.fetchPosts();
      posts.value = postsStore.posts;
    };

    onMounted(loadPosts);

    const onSearch = async (query) => {
      if (query) {
        await postsStore.searchPosts(query);
      } else {
        await postsStore.fetchPosts();
      }
      posts.value = postsStore.posts;
    };

    return {
      posts,
      onSearch,
    };
  },
};
</script>

  
  <style scoped>
  </style>
  