<template>
  <v-app>
    <AppNavbar />
    <v-main :key="$route.fullPath">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
  },
};
</script>

<style>
/* Alap stílusok */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>
