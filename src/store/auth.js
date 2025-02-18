import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('http://localhost:3000/login', credentials);
        this.user = response.data.user;
        this.token = response.data.token;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    async register(data) {
      try {
        const response = await axios.post('http://localhost:3000/register', data);
        this.user = response.data.user;
        this.token = response.data.token;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
    },
  },
});
