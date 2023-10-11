<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login" class="login-form">
      <input v-model="email" type="email" placeholder="Email" required class="form-input" />
      <input v-model="password" type="password" placeholder="Password" required class="form-input" />
      <button type="submit" class="login-button">Login</button>
    </form>
    <p class="login-message">{{ message }}</p>
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
          authStore.setId(data.id);
          authStore.setRole(data.role);
          console.log(data);
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

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 5px 0;
}

.login-button {
  background-color: #5BA4A4;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.login-button:hover {
  background-color: #3E7E7E;
}

.login-message {
  margin-top: 10px;
  font-weight: bold;
  color: #FF0000;
}
</style>