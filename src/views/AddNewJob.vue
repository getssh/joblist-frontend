<template>
  <div v-if="isAuthenticated && isSuperAdmin" class="add-job">
    <h2>Add New Job</h2>
    <p v-if="jobCreationMessage">{{ jobCreationMessage }}</p>
    <form @submit.prevent="createJob" class="form">
      <div class="column">
        <div class="form-group">
          <label for="company">Company</label>
          <input v-model="job.company" type="text" id="company" required />
        </div>

        <div class="form-group">
          <label for="logo">Company Logo URL</label>
          <input v-model="job.logo" type="text" id="logo" required />
        </div>

        <div class="form-group">
          <label for="new">New</label>
          <input v-model="job.new" type="checkbox" id="new" />
        </div>

        <div class="form-group">
          <label for="featured">Featured</label>
          <input v-model="job.featured" type="checkbox" id="featured" />
        </div>

        <div class="form-group">
          <label for="position">Position</label>
          <input v-model="job.position" type="text" id="position" required />
        </div>
      </div>

      <div class="column">
        <div class="form-group">
          <label for="role">Role</label>
          <input v-model="job.role" type="text" id="role" required />
        </div>

        <div class="form-group">
          <label for="level">Level</label>
          <input v-model="job.level" type="text" id="level" required />
        </div>

        <div class="form-group">
          <label for="contract">Contract</label>
          <input v-model="job.contract" type="text" id="contract" required />
        </div>

        <div class="form-group">
          <label for="location">Location</label>
          <input v-model="job.location" type="text" id="location" required />
        </div>

        <div class="form-group">
          <label for="languages">Languages</label>
          <input v-model="job.languages" type="text" id="languages" required />
        </div>

        <div class="form-group">
          <label for="tools">Tools</label>
          <input v-model="job.tools" type="text" id="tools" required />
        </div>
      </div>

      <button type="submit">Create Job</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
import { useAuthStore } from '@/store/auth';

export default {
  data() {
    return {
      job: {
        company: '',
        logo: '',
        new: false,
        featured: false,
        position: '',
        role: '',
        level: '',
        contract: '',
        location: '',
        languages: '',
        tools: '',
      },
      jobCreationMessage: '',
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
    createJob() {

      const authStore = useAuthStore();
      const userToken = authStore.token;

      this.job.languages = this.job.languages.split(',').map(item => item.trim());
      this.job.tools = this.job.tools.split(',').map(item => item.trim());

axios
        .post('http://localhost:5000/api/jobs/', this.job, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('Job created successfully:', response.data);
          this.jobCreationMessage = 'Job created successfully';
        })
        .catch((error) => {
          console.error('Error creating job:', error);
          this.jobCreationMessage = 'Error creating job';
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
  text-align: left;
  padding-left: 10px;
}

input[type="text"] {
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