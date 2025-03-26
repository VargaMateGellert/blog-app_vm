<template>
  <v-container class="mt-4">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h1>Regisztráció</h1>
        <v-form @submit.prevent="onRegister">
          <v-text-field
            v-model="form.name"
            label="Név"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            label="Email"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            label="Jelszó"
            type="password"
            required
          ></v-text-field>
          <v-btn color="primary" type="submit">Regisztráció</v-btn>
        </v-form>
        <v-alert type="error" v-if="error" class="mt-2">{{ error }}</v-alert>
      </v-col>
    </v-row>
  </v-container>
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
