<template>
  <div v-if="isAuthenticated && isSuperAdmin" class="add-job">
    <h2>Add New Job</h2>
    <p v-if="userCreationMessage">{{ userCreationMessage }}</p>
    <form @submit.prevent="createUser" class="form">

      <div class="column">
        <div class="form-group">
          <label for="role">Username</label>
          <input v-model="user.username" type="text" id="username" required />
        </div>

        <div class="form-group">
          <label for="level">Email</label>
          <input v-model="user.email" type="email" id="email" required />
        </div>

        <div class="form-group">
          <label for="contract">Password</label>
          <input v-model="user.password" type="password" id="password" required />
        </div>

        <div class="form-group">
          <label for="location">Role</label>
          <input v-model="user.role" type="text" id="role" required />
        </div>
      </div>

      <button type="submit">Create User</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
import { useAuthStore } from '@/store/auth';

export default {
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
        role: '',
      },
      userCreationMessage: '',
    };
  },
  computed: {
    isAuthenticated() {
      return useAuthStore().token !== '';
    },
    isAdminOrSuperAdmin() {
      const role = useAuthStore().role;
      return role === 'admin' || role === 'superadmin';
    },
    isSuperAdmin() {
      return useAuthStore().role === 'superadmin';
    },
  },
  methods: {
    createUser() {
      axios
        .post('http://localhost:5000/api/auth/register', this.user)
        .then((response) => {
          console.log('User created successfully:', response.data);
          this.userCreationMessage = 'User created successfully';
        })
        .catch((error) => {
          console.error('Error creating User', error);
          this.userCreationMessage = 'Error creating job';
        });
    },
  },
};
</script>

<style scoped>
.add-job {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
input[type="email"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type="checkbox"] {
  margin-right: 5px;
}

button {
  background-color: #5BA4A4;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #3E7E7E;
}
</style>