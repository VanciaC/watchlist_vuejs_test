import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Movie } from '@/types/movie'

const STORAGE_KEY = 'watchlist'

function loadFromStorage(): Movie[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Movie[]
  } catch {
    return []
  }
}

export const useWatchlistStore = defineStore('watchlist', () => {
    const movies = ref<Movie[]>(loadFromStorage())

    const count = computed(() => movies.value.length)

    watch(
      movies,
      (newMovies) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newMovies))
      },
      { deep: true }
    )

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