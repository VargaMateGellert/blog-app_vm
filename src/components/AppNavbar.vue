<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>
      <router-link to="/" style="text-decoration: none; color: inherit;">Blog App</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text v-for="(category, index) in categories" :key="index" :to="{ name: 'Category', params: { id: category } }">
      {{ category }}
    </v-btn>
    <v-spacer></v-spacer>
    <div>
      <v-btn text v-if="isAdmin" to="/admin">Admin</v-btn>
      <v-btn text v-if="!isLoggedIn" to="/login">Login</v-btn>
      <v-btn text v-if="!isLoggedIn" to="/register">Register</v-btn>
      <v-btn text v-if="isLoggedIn" @click="logout">Logout</v-btn>
    </div>
  </v-app-bar>
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