<template>
  <v-container class="mt-4">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h1>Bejelentkezés</h1>
        <v-form @submit.prevent="onLogin">
          <v-text-field
            v-model="credentials.email"
            label="Email"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="credentials.password"
            label="Jelszó"
            type="password"
            required
          ></v-text-field>
          <v-btn color="primary" type="submit">Bejelentkezés</v-btn>
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
