<template>
    <div class="card mb-3">
      <img :src="post.image" class="card-img-top" alt="Post kép" v-if="post.image" />
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ post.subtitle }}</h6>
        <p class="card-text">{{ post.shortText }}</p>
        <router-link class="btn btn-primary" :to="`/post/${post.id}`">Tovább</router-link>
      </div>
    </div>
  </template>
  
  <script>
export default {
  name: 'BlogPostCard',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

  
  <style scoped>
  </style>
  