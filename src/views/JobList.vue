<template>
  <div class="job-list">
    <h2>Job List</h2>
    <ul>
      <li class="all-jobs" v-for="job in jobs" :key="job._id">
        <div class="job-card" :class="{ featured: job.featured }">
          <div class="left">
            <div class="company-logo">
              <img :src="job.logo" alt="Company Logo" />
            </div>
            <div class="company-info">
              <div class="row">
                <span>{{ job.company }}</span>
                <span v-if="job.new" class="new">New</span>
                <span v-if="job.featured" class="featured">Featured</span>
              </div>
              <div class="row">
                <span>{{ job.position }}</span>
              </div>
              <div class="row">
                <span>{{ formatPostedAt(job.postedAt) }}</span>
                <span>{{ job.contract }}</span>
                <span>{{ job.location }}</span>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="details">
              <span>{{ job.role }}</span>
              <span>{{ job.level }}</span>
              <span v-for="language in job.languages" :key="language">{{ language }}</span>
            </div>
          </div>
          <div class="action-buttons">
            <button @click="navigateToUpdateJob(job._id)">Edit</button>
            <button @click="deleteJob(job._id)">Delete</button>
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
      jobs: [],
    };
  },
  methods: {
    formatPostedAt(postedAt) {
      const currentDate = new Date();
      const postedDate = new Date(postedAt);
      const timeDifference = currentDate - postedDate;
      const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
    },
    navigateToUpdateJob(jobId) {
      this.$router.push({ name: 'UpdateJob', params: { id: jobId } });
    },
    async deleteJob(jobId) {
      const authStore = useAuthStore();
      const userToken = authStore.token;
      if (confirm('Are you sure you want to delete this job?')) {
        try {
          await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
            headers: {
            Authorization: `Bearer ${userToken}`,
            },
          });
          this.jobs = this.jobs.filter((job) => job._id !== jobId);
        } catch (error) {
          console.error('Error deleting job', error);
        }
      }
    },
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
.job-list {
  padding: 20px;
}

.all-jobs {
  list-style-type: none;
}
.job-card {
  display: flex;
  background-color: #fff;
  border: 1px solid #ddd;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.job-card.featured {
  border-left: 5px solid #5BA4A4;
}

.left {
  display: flex;
  align-items: flex-start;
}

.company-logo {
  border-radius: 50%;
  overflow: hidden;
  width: 60px;
  height: 60px;
  margin-right: 20px;
}

.company-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.company-info .row {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.company-info .new, .company-info .featured {
  background-color: #5BA4A4;
  color: #fff;
  padding: 2px 5px;
  margin-left: 5px;
  border-radius: 2px;
  font-weight: bold;
}

.right {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.details {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.details span {
  margin-right: 5px;
  padding: 2px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  color: #5BA4A4;
  background-color: rgba(91, 164, 164, 0.1);
}

.action-buttons button {
  background-color: #4acd85;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 50%;
}

.action-buttons button:last-child {
  background-color: red;
  font-weight: 500;
  margin-left: 5px;
}
</style>
