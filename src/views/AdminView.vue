<template>
  <v-container class="mt-4">
    <v-row>
      <v-col>
        <h1>Admin felület</h1>
      </v-col>
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="success" class="mb-3" @click="showAddForm = true">
          Új bejegyzés hozzáadása
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="showAddForm">
      <v-col cols="12">
        <h2>Új bejegyzés</h2>
        <BlogPostForm @submit="addPost" @cancel="cancelForm" />
      </v-col>
    </v-row>

    <v-row v-if="editPostData">
      <v-col cols="12">
        <h2>Bejegyzés szerkesztése</h2>
        <BlogPostForm :post="editPostData" @submit="updatePost" @cancel="cancelForm" />
      </v-col>
    </v-row>

    <v-row v-if="posts.length">
      <v-col cols="12" v-for="post in posts" :key="post.id">
        <v-card class="mb-3">
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-actions>
            <v-btn color="primary" class="me-2" @click="prepareEdit(post)">Szerkesztés</v-btn>
            <v-btn color="error" @click="deletePost(post.id)">Törlés</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <p>Nincs bejegyzés.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import { usePostsStore } from '../store/posts';
import { useAuthStore } from '../store/auth';
import BlogPostForm from '../components/BlogPostForm.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'AdminView',
  components: {
    BlogPostForm,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    if (!authStore.user || authStore.user.role !== 'admin') {
      router.push('/');
    }
    
    const postsStore = usePostsStore();
    const posts = ref([]);
    const showAddForm = ref(false);
    const editPostData = ref(null);

    const loadPosts = async () => {
      await postsStore.fetchPosts();
      posts.value = postsStore.posts;
    };

    onMounted(loadPosts);

    const addPost = async (postData) => {
      await postsStore.addPost(postData);
      showAddForm.value = false;
      loadPosts();
    };

    const prepareEdit = (post) => {
      editPostData.value = post;
    };

    const updatePost = async (postData) => {
      await postsStore.updatePost(postData.id, postData);
      editPostData.value = null;
      loadPosts();
    };

    const deletePost = async (id) => {
      if (confirm('Are you sure you want to delete this post?')) {
        await postsStore.deletePost(id);
        loadPosts();
      }
    };

    const cancelForm = () => {
      showAddForm.value = false;
      editPostData.value = null;
    };

    return {
      posts,
      showAddForm,
      editPostData,
      addPost,
      prepareEdit,
      updatePost,
      deletePost,
      cancelForm,
    };
  },
};
</script>

<style scoped>
</style>
