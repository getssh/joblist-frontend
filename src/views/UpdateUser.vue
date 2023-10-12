<template>
  <div v-if="isAuthenticated && isSuperAdmin" class="update-job">
    <h2>Edit Job</h2>
    <form @submit.prevent="updateUser">
        <div class="form-group">
          <label for="role">Username</label>
          <input v-model="editedUser.username" type="text" id="username" required />
        </div>

        <div class="form-group">
          <label for="level">Email</label>
          <input v-model="editedUser.email" type="email" id="email" required />
        </div>

        <div class="form-group">
          <label for="contract">Password</label>
          <input v-model="editedUser.password" type="password" id="password" required />
        </div>

        <div class="form-group">
          <label for="location">Role</label>
          <input v-model="editedUser.role" type="text" id="role" required />
        </div>
        <button type="submit">Update User</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/store/auth';

export default {
  data() {
    return {
      editedUser: {},
      jobUpdateMessage: '',
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
    updateUser() {
      const authStore = useAuthStore();
      const userToken = authStore.token;

      axios
        .put(`http://localhost:5000/api/users/${this.$route.params.id}`, this.editedUser, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          }
        })
        .then((response) => {
          if (response.data) {
            this.jobUpdateMessage = 'User updated successfully';
          } else {
            this.jobUpdateMessage = 'Error updating job';
          }
        })
        .catch((error) => {
          console.error('Error updating User', error);
          this.jobUpdateMessage = 'Error updating User';
        });
    },
    fetchUserData() {
      const authStore = useAuthStore();
      const userToken = authStore.token;
      axios
        .get(`http://localhost:5000/api/users/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          }
        })
        .then((response) => {
          this.editedUser = response.data;
        })
        .catch((error) => {
          console.error('Error fetching job data', error);
        });
    },
  },
  created() {
    this.fetchUserData();
  },
};
</script>
