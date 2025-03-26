<template>
  <v-container class="mt-4">
    <v-row>
      <v-col>
        <h1>{{ categoryId }}</h1>
      </v-col>
    </v-row>
    <v-row v-if="posts.length">
      <v-col cols="12" md="6" v-for="post in posts" :key="post.id">
        <BlogPostCard :post="post" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <p>Nincs bejegyzés ebben a kategóriában.</p>
      </v-col>
    </v-row>
  </v-container>
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
    const categoryId = route.params.id;

    const loadCategoryPosts = async () => {
      await postsStore.fetchPostsByCategory(categoryId);
      posts.value = postsStore.posts;
    };

    onMounted(loadCategoryPosts);

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
      categoryId,
    };
  },
};
</script>

<style scoped>
</style>
