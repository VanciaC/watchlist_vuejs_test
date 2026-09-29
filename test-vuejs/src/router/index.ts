import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '@/views/SearchView.vue'
import WatchlistView from '@/views/WatchlistView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'search', component: SearchView },
    { path: '/watchlist', name: 'watchlist', component: WatchlistView },
  ],
})

export default router
