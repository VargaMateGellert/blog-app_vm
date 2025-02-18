<template>
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        v-model="searchQuery"
        placeholder="Keresés a címekben..."
        @input="onSearch"
      />
    </div>
  </template>
  
  <script>
import { ref } from 'vue';

export default {
  name: 'BlogSearchBar',
  emits: ['search'],
  setup(props, { emit }) {
    const searchQuery = ref('');
    const onSearch = () => {
      emit('search', searchQuery.value);
    };

    return {
      searchQuery,
      onSearch,
    };
  },
};
</script>

  
  <style scoped>
  </style>
  