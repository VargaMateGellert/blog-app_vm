<template>
    <div class="container mt-4">
      <h1>Kategória: {{ categoryId }}</h1>
      <div v-if="posts.length">
        <BlogPostCard v-for="post in posts" :key="post.id" :post="post" />
      </div>
      <div v-else>
        <p>Nincs bejegyzés ebben a kategóriában.</p>
      </div>
    </div>
  </template>
  
  <script>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePostsStore } from '../store/posts';
import BlogPostCard from '../components/BlogPostCard.vue';

export default {
  name: 'CategoryView',
  components: {
    BlogPostCard,
  },
  setup() {
    const route = useRoute();
    const postsStore = usePostsStore();
    const posts = ref([]);

    const loadCategoryPosts = async () => {
      // Use the current category from route params
      await postsStore.fetchPostsByCategory(route.params.id);
      posts.value = postsStore.posts;
    };

    // Load posts on initial mount
    onMounted(loadCategoryPosts);

    // Watch for changes in the category parameter and re-load posts
    watch(
      () => route.params.id,
      (newCategory, oldCategory) => {
        if (newCategory !== oldCategory) {
          loadCategoryPosts();
        }
      }
    );

    return {
      posts,
    };
  },
};
</script>


  <style scoped>
  </style>
  