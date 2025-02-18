import { defineStore } from 'pinia';
import axios from 'axios';

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
  }),
  actions: {
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:3000/posts');
        const sortedPosts = response.data.sort((a, b) => b.id - a.id);
        this.posts = sortedPosts.slice(0, 6);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    async fetchPostsByCategory(categoryId) {
      try {
        const response = await axios.get(`http://localhost:3000/posts?category=${categoryId}`);
        this.posts = response.data;
      } catch (error) {
        console.error('Error fetching posts by category:', error);
      }
    },
    async fetchPost(id) {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    },
    async addPost(postData) {
      try {
        const response = await axios.post('http://localhost:3000/posts', postData);
        this.posts.unshift(response.data);
      } catch (error) {
        console.error('Error adding post:', error);
      }
    },
    async updatePost(id, postData) {
      try {
        const response = await axios.put(`http://localhost:3000/posts/${id}`, postData);
        const index = this.posts.findIndex(post => post.id === id);
        if (index !== -1) {
          this.posts.splice(index, 1, response.data);
        }
      } catch (error) {
        console.error('Error updating post:', error);
      }
    },
    async deletePost(id) {
      try {
        await axios.delete(`http://localhost:3000/posts/${id}`);
        this.posts = this.posts.filter(post => post.id !== id);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    },
    async searchPosts(query) {
      try {
        const response = await axios.get(`http://localhost:3000/posts?q=${query}`);
        this.posts = response.data;
      } catch (error) {
        console.error('Error searching posts:', error);
      }
    },
  },
});
