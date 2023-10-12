<template>
  <header class="header">
    <router-link v-if="isAuthenticated" to="/jobs" class="nav-link">JobList</router-link>
    <!-- <router-link v-if="isAuthenticated && isAdminOrSuperAdmin" to="/add-job" class="nav-link">Add New Job</router-link> -->
    <router-link v-if="isSuperAdmin" to="/users" class="nav-link">Users</router-link>
    <router-link v-if="!isAuthenticated" to="/login" class="nav-link">Login</router-link>
    <button v-if="isAuthenticated" @click="logout" class="nav-link">Logout</button>
  </header>
</template>

<script>
import { defineComponent } from 'vue';
import { useAuthStore } from '@/store/auth';
// import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HeaderComponent',
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
      logout() {
      const authStore = useAuthStore();
      authStore.clearToken();
      this.$router.push('/login');
    },
  },
});
</script>

<style scoped>
.header {
  background-color: #5ba4a4;
  color: #fff;
  padding: 25px;
  display: flex;
  justify-content: flex-end;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  margin-right: 10px;
  font-size: 18px;
}

button.nav-link {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>
