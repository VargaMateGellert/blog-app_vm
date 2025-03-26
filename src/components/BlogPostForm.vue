<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field v-model="form.title" label="Cím" required></v-text-field>
    <v-text-field v-model="form.subtitle" label="Alcím" required></v-text-field>
    <v-textarea v-model="form.shortText" label="Rövid szöveg" required></v-textarea>
    <v-textarea v-model="form.text" label="Szöveg" required></v-textarea>
    <v-text-field v-model="form.image" label="Kép URL"></v-text-field>
    <v-text-field v-model="form.category" label="Kategória" required></v-text-field>
    <v-btn color="primary" type="submit">
      {{ isEdit ? 'Frissítés' : 'Mentés' }}
    </v-btn>
    <v-btn color="secondary" @click="$emit('cancel')">
      Mégse
    </v-btn>
  </v-form>
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
  