import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import Error404View from '../views/Errors/Error404View'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  { path: '/:pathMatch(.*)*', component: Error404View }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
