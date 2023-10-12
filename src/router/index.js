import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent  from '../views/LoginComponent.vue';
import JobList from '../views/JobList.vue';
import AddNewJob from '../views/AddNewJob.vue'
import UpdateJob from '../views/UpdateJob.vue'
import UserList from '../views/UserList.vue'
import AddNewUser from '../views/AddNewUser.vue'

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
  {
    path: '/update-job/:id',
    name: 'UpdateJob',
    component: UpdateJob,
  },
  {
    path: '/users',
    name: 'UserList',
    component: UserList,
  },
  {
    path: '/new-user',
    name: 'AddNewUser',
    component: AddNewUser,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
