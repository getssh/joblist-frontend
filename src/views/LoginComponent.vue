<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginComponent',
  setup() {
    const email = ref('');
    const password = ref('');
    const message = ref('');

    const authStore = useAuthStore();
    const router = useRouter();

    const login = async () => {
      if (!email.value || !password.value) {
        message.value = 'Please provide both email and password.';
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email.value, password: password.value }),
        });
        const data = await response.json();

        if (response.ok) {
          message.value = 'Login successful';
          authStore.setToken(data.token);
          router.push('/jobs');
        } else {
          message.value = data.message || 'Login failed';
        }
      } catch (error) {
        console.error(error);
        message.value = 'An error occurred during login.';
      }
    };

    return { email, password, message, login };
  },
};
</script>
