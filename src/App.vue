<template>
  <div id="app">
    <AppNavbar />
    <router-view />
  </div>
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
