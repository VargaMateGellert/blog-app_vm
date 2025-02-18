<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">Blog App</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item" v-for="category in categories" :key="category">
            <router-link class="nav-link" :to="`/category/${category}`">
              {{ category }}
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <!-- Show Admin link only if logged-in user is admin -->
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/admin">Admin</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <button class="btn btn-outline-secondary" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
  
  <script>
import { computed, ref } from 'vue';
import { useAuthStore } from '../store/auth';

export default {
  name: 'AppNavbar',
  setup() {
    const authStore = useAuthStore();
    const isLoggedIn = computed(() => authStore.user !== null);
    const isAdmin = computed(() => authStore.user && authStore.user.role === 'admin');
    const categories = ref(['Tech', 'Life', 'Travel', 'Food']);
    const logout = () => {
      authStore.logout();
    };

    return {
      isLoggedIn,
      isAdmin,
      categories,
      logout,
    };
  },
};
</script>


  
  <style scoped>
  </style>
  