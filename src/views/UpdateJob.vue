<template>
  <div v-if="isAuthenticated" class="update-job">
    <h2>Edit Job</h2>
    <form @submit.prevent="updateJob">
      <div class="form-group">
        <label for="company">Company</label>
        <input v-model="editedJob.company" type="text" id="company" required />
      </div>
      <div class="form-group">
        <label for="company">Logo URL</label>
        <input v-model="editedJob.logo" type="text" id="logo" required />
      </div>
      <div class="form-group">
          <label for="new">New</label>
          <input v-model="editedJob.new" type="checkbox" id="new" />
        </div>
        <div class="form-group">
          <label for="featured">Featured</label>
          <input v-model="editedJob.featured" type="checkbox" id="featured" />
        </div>
        <div class="form-group">
          <label for="position">Position</label>
          <input v-model="editedJob.position" type="text" id="position" required />
        </div>
        <div class="form-group">
          <label for="role">Role</label>
          <input v-model="editedJob.role" type="text" id="role" required />
        </div>
        <div class="form-group">
          <label for="level">Level</label>
          <input v-model="editedJob.level" type="text" id="level" required />
        </div>
        <div class="form-group">
          <label for="contract">Contract</label>
          <input v-model="editedJob.contract" type="text" id="contract" required />
        </div>
        <div class="form-group">
          <label for="location">Location</label>
          <input v-model="editedJob.location" type="text" id="location" required />
        </div>
        <div class="form-group">
          <label for="languages">Languages</label>
          <input v-model="editedJob.languages" type="text" id="languages" required />
        </div>
        <div class="form-group">
          <label for="tools">Tools</label>
          <input v-model="editedJob.tools" type="text" id="tools" required />
        </div>
      <button type="submit">Update Job</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/store/auth';

export default {
  data() {
    return {
      editedJob: {},
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
    updateJob() {
      const authStore = useAuthStore();
      const userToken = authStore.token;

      axios
        .put(`http://localhost:5000/api/jobs/${this.$route.params.id}`, this.editedJob, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          }
        })
        .then((response) => {
          if (response.data) {
            this.jobUpdateMessage = 'Job updated successfully';
          } else {
            this.jobUpdateMessage = 'Error updating job';
          }
        })
        .catch((error) => {
          console.error('Error updating job', error);
          this.jobUpdateMessage = 'Error updating job';
        });
    },
    fetchJobData() {
      axios
        .get(`http://localhost:5000/api/jobs/${this.$route.params.id}`)
        .then((response) => {
          this.editedJob = response.data;
        })
        .catch((error) => {
          console.error('Error fetching job data', error);
        });
    },
  },
  created() {
    this.fetchJobData();
  },
};
</script>

<style scoped>
.update-job {
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
