<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { ref, computed } from 'vue'

interface Movie {
  id: number
  title: string
  year: number
}

const query = ref<string>('')
const watchlist = ref<Movie[]>([])

const movies: Movie[] = [
  { id: 1, title: 'Spirited Away', year: 2001 },
  { id: 2, title: 'Inception', year: 2010 },
  { id: 3, title: 'Amélie', year: 2001 },
  { id: 4, title: 'Parasite', year: 2019 },
]

const filteredMovies = computed<Movie[]>(() =>
  movies.filter((m) =>
    m.title.toLowerCase().includes(query.value.toLowerCase())
  )
)

function addMovie(movie: Movie): void {
  if (!watchlist.value.some((m) => m.id === movie.id)) {
    watchlist.value.push(movie)
  }
}
</script>

<template>
  
</template>

<style scoped>

</style>
