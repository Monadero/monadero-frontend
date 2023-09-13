import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

import Error404View from '../views/Errors/Error404View'
import DashboardView from "@/views/User/DashboardView.vue";
import useAuthUser from "@/composables/useAuthUser";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/user/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      requiresAuth: true
    }
  },
  { path: '/:pathMatch(.*)*', component: Error404View }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const { isLoggedIn } = useAuthUser()
  if (!isLoggedIn() && to.meta.requiresAuth) {
    return {name: "login"}
  }
})

export default router
