<template>
    <form @submit.prevent="onSubmit" class="mb-3">
      <div class="mb-3">
        <label class="form-label">Cím:</label>
        <input type="text" v-model="form.title" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Alcím:</label>
        <input type="text" v-model="form.subtitle" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Rövid szöveg:</label>
        <textarea v-model="form.shortText" class="form-control" required></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Szöveg:</label>
        <textarea v-model="form.text" class="form-control" required></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Kép URL:</label>
        <input type="text" v-model="form.image" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Kategória:</label>
        <input type="text" v-model="form.category" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">{{ isEdit ? 'Frissítés' : 'Mentés' }}</button>
      <button type="button" class="btn btn-secondary ms-2" @click="$emit('cancel')">Mégse</button>
    </form>
  </template>
  
  <script>
import { ref, watch } from 'vue';

export default {
  name: 'BlogPostForm',
  props: {
    post: {
      type: Object,
      default: null,
    },
  },
  emits: ['submit', 'cancel'],
  setup(props, { emit }) {
    const isEdit = ref(false);
    const form = ref({
      title: '',
      subtitle: '',
      shortText: '',
      text: '',
      image: '',
      category: '',
    });

    watch(
      () => props.post,
      (newVal) => {
        if (newVal) {
          isEdit.value = true;
          form.value = { ...newVal };
        } else {
          isEdit.value = false;
          form.value = {
            title: '',
            subtitle: '',
            shortText: '',
            text: '',
            image: '',
            category: '',
          };
        }
      },
      { immediate: true }
    );

    const onSubmit = () => {
      emit('submit', form.value);
    };

    return {
      isEdit,
      form,
      onSubmit,
    };
  },
};
</script>

  
  <style scoped>
  </style>
  