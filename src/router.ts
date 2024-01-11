import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./routes/HomePage.vue') },
  { path: '/players', component: () => import('./routes/PlayersPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
