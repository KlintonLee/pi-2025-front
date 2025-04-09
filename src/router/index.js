import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      redirect: '/home/feeds',
      children: [
        {
          path: 'feeds',
          name: 'Feeds',
          component: () => import('../components/HomeView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/LoginView.vue')
    }
  ]
})

export default router
