<template>
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h1>Bejelentkezés</h1>
          <form @submit.prevent="onLogin">
            <div class="mb-3">
              <label class="form-label">Email:</label>
              <input type="email" v-model="credentials.email" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Jelszó:</label>
              <input type="password" v-model="credentials.password" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary">Bejelentkezés</button>
          </form>
          <p class="text-danger mt-2" v-if="error">{{ error }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginView',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const credentials = ref({
      email: '',
      password: '',
    });
    const error = ref('');

    const onLogin = async () => {
      try {
        await authStore.login(credentials.value);
        router.push('/');
      } catch (err) {
        error.value = 'Hibás bejelentkezési adatok!';
      }
    };

    return {
      credentials,
      error,
      onLogin,
    };
  },
};
</script>

  
  <style scoped>
  </style>
  