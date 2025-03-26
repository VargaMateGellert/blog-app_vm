<template>
  <v-text-field
    v-model="searchQuery"
    label="Search by title"
    append-icon="mdi-magnify"
    @input="onSearch"
    solo
    clearable
  ></v-text-field>
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
