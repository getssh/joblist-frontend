<template>
  <div>
    <h2>Job List</h2>
    <ul>
      <li v-for="job in jobs" :key="job._id">
        <div class="job-card">
          <h3>{{ job.position }}</h3>
          <p>{{ job.company }}</p>
          <p>Location: {{ job.location }}</p>
          <p>Posted At: {{ new Date(job.postedAt).toDateString() }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'JobList',
  data() {
    return {
      jobs: [],
    };
  },
  mounted() {
    axios
      .get('http://localhost:5000/api/jobs/')
      .then((response) => {
        this.jobs = response.data;
      })
      .catch((error) => {
        console.error('Error fetching job data', error);
      });
  },
};
</script>

<style scoped>
.job-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: #f9f9f9;
}
</style>
