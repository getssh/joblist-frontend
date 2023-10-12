<template>
  <div v-if="isAuthenticated && isSuperAdmin" class="user-list">
    <h2>User List</h2>
    <router-link v-if="isAuthenticated && isSuperAdmin" to="/new-user" class="nav-link">Add New User</router-link>
    <ul>
      <li class="all-users" v-for="user in users" :key="user._id">
        <div class="user-card">
          <div class="user-info">
            <p><strong>Username:</strong> {{ user.username }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Role:</strong> {{ user.role }}</p>
          </div>
          <div v-if="isAuthenticated && isSuperAdmin" class="action-buttons">
            <button @click="navigateToUpdateUser(user._id)">Edit</button>
            <button @click="deleteUser(user._id)">Delete</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/store/auth';

export default {
  name: 'JobList',
  data() {
    return {
      users: [],
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
    navigateToUpdateUser(userId) {
      this.$router.push({ name: 'UpdateUser', params: { id: userId } });
    },
    async deleteUser(userId) {
      const authStore = useAuthStore();
      const userToken = authStore.token;
      if (confirm('Are you sure you want to delete this job?')) {
        try {
          await axios.delete(`http://localhost:5000/api/users/${userId}`, {
            headers: {
            Authorization: `Bearer ${userToken}`,
            },
          });
          this.users = this.users.filter((user) => user._id !== userId);
        } catch (error) {
          console.error('Error deleting job', error);
        }
      }
    },
  },
  created() {
    const authStore = useAuthStore();
    const userToken = authStore.token;
    axios
      .get('http://localhost:5000/api/users', {
            headers: {
            Authorization: `Bearer ${userToken}`,
            },
        })
      .then((response) => {
        this.users = response.data;
      })
      .catch((error) => {
        console.error('Error fetching User data', error);
      });
  },
};
</script>

<style scoped>
.user-list {
  padding: 20px;
}

ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
}
.all-users {
  list-style-type: none;
}
.user-card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ddd;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.action-buttons button {
  background-color: #4acd85;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.action-buttons button:last-child {
  background-color: red;
  font-weight: 500;
  margin-left: 5px;
}

.nav-link {
  background-color: #4acd85;
  padding: 10px;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
}
</style>
