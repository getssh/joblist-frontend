<template>
  <div class="update-job">
    <h2>Edit Job</h2>
    <form @submit.prevent="updateJob">
      <div class="form-group">
        <label for="company">Company</label>
        <input v-model="editedJob.company" type="text" id="company" required />
      </div>
      <div class="form-group">
        <label for="company">Logo URL</label>
        <input v-model="editedJob.logo" type="text" id="company" required />
      </div>
      <div class="form-group">
        <label for="company">Company:</label>
        <input v-model="editedJob.company" type="text" id="company" required />
      </div>
      <div class="form-group">
        <label for="company">Company:</label>
        <input v-model="editedJob.company" type="text" id="company" required />
      </div>
      
      
      <button type="submit">Update Job</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      editedJob: {},
      jobUpdateMessage: '',
    };
  },
  methods: {
    updateJob() {
      axios
        .put(`http://localhost:5000/api/jobs/${this.$route.params.id}`, this.editedJob)
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
