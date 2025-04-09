import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/LoginView.vue') // ou import direto se preferir
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router