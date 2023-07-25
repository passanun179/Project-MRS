import { createRouter, createWebHistory } from 'vue-router'
import SigninView from '../views/SigninView.vue';
import RegisterView from '../views/RegisterView.vue';
import PatientView from '../views/Patients/View.vue';
import PatientCreate from '../views/Patients/Create.vue';
import PatientEdit from '../views/Patients/Edit.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SigninView
    },
    {
      path: '/signup',
      name: 'signup',
      component: RegisterView

    },
    {
      path: '/patients',
      name: 'patients',
      component: PatientView
    },
    {
      path: '/patients/create',
      name: 'patientCreate',
      component: PatientCreate
    },
    {
      path: '/patients/:id/edit',
      name: 'patientEdit',
      component: PatientEdit
    }
    
  ]
})

export default router
