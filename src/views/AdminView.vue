<template>
    <div class="container mt-4">
      <h1>Admin felület</h1>
      <button class="btn btn-success mb-3" @click="showAddForm = true">Új bejegyzés hozzáadása</button>
      
      <div v-if="showAddForm">
        <h2>Új bejegyzés</h2>
        <BlogPostForm @submit="addPost" @cancel="cancelForm" />
      </div>
      
      <div v-if="editPostData">
        <h2>Bejegyzés szerkesztése</h2>
        <BlogPostForm :post="editPostData" @submit="updatePost" @cancel="cancelForm" />
      </div>
      
      <div v-if="posts.length">
        <div v-for="post in posts" :key="post.id" class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <button class="btn btn-primary me-2" @click="prepareEdit(post)">Szerkesztés</button>
            <button class="btn btn-danger" @click="deletePost(post.id)">Törlés</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Nincs bejegyzés.</p>
      </div>
    </div>
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
    // If no user is logged in or the user is not an admin, redirect to home
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
  