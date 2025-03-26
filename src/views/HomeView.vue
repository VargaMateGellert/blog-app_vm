<template>
  <v-container class="mt-4">
    <v-row>
      <v-col cols="12">
        <BlogSearchBar @search="onSearch" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1 class="mb-4">Legújabb bejegyzések</h1>
      </v-col>
    </v-row>
    <v-row v-if="posts.length">
      <v-col cols="12" md="6" v-for="post in posts" :key="post.id">
        <BlogPostCard :post="post" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <p>Nincs megjelenítendő bejegyzés.</p>
      </v-col>
    </v-row>
  </v-container>
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
