import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Movie } from '@/types/movie'

export const useWatchlistStore = defineStore('watchlist', () => {
  const movies = ref<Movie[]>([])

  const count = computed(() => movies.value.length)

  function add(movie: Movie): void {
    if (!movies.value.some((m) => m.id === movie.id)) {
      movies.value.push(movie)
    }
  }

  function remove(id: number): void {
    movies.value = movies.value.filter((m) => m.id !== id)
  }

  return { movies, count, add, remove }
})