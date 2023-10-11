import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent  from '../views/LoginComponent.vue';
import JobList from '../views/JobList.vue';
import AddNewJob from '../views/AddNewJob.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'LoginComponent',
    component: LoginComponent,
  },
  {
    path: '/jobs',
    name: 'JobList',
    component: JobList,
  },
  {
    path: '/add-job',
    name: 'AddNewJob',
    component: AddNewJob,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
