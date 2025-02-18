<template>
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h1>Regisztráció</h1>
          <form @submit.prevent="onRegister">
            <div class="mb-3">
              <label class="form-label">Név:</label>
              <input type="text" v-model="form.name" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Email:</label>
              <input type="email" v-model="form.email" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Jelszó:</label>
              <input type="password" v-model="form.password" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary">Regisztráció</button>
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
  name: 'RegisterView',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const form = ref({
      name: '',
      email: '',
      password: '',
    });
    const error = ref('');

    const onRegister = async () => {
      try {
        await authStore.register(form.value);
        router.push('/');
      } catch (err) {
        error.value = 'Regisztráció sikertelen!';
      }
    };

    return {
      form,
      error,
      onRegister,
    };
  },
};
</script>

  
  <style scoped>
  </style>
  