<script setup lang="ts">
import { ref, watch } from 'vue'
import MovieCard from './components/MovieCard.vue'
import SearchBar from './components/SearchBar.vue'
import type { Movie } from '@/types/movie'
import { searchMovies } from '@/api/omdb'

const query = ref<string>('')
const watchlist = ref<Movie[]>([])
const results = ref<Movie[]>([])
const isLoading = ref<boolean>(false)
const error = ref<string | null>(null)

let debounceTimer: ReturnType<typeof setTimeout>

watch(query, (newQuery) => {
	// Clear any existing debounce timer
	clearTimeout(debounceTimer)
	// Reset error state
	error.value = null
	
	// If the query is empty, clear results and stop loading
	if (newQuery.trim() === '') {
		results.value = []
		isLoading.value = false
		return
	}

	// Set loading state to true before starting the search
	isLoading.value = true

	// Debounce the search to avoid making too many API calls
	debounceTimer = setTimeout(async () => {
		try {
		results.value = await searchMovies(newQuery)
		} catch (err) {
		error.value = err instanceof Error ? err.message : 'Unknown error'
		} finally {
		isLoading.value = false
		}
  	}, 500)
})

function addMovie(movie: Movie): void {
  if (!watchlist.value.some((m) => m.id === movie.id)) {
    watchlist.value.push(movie)
  }
}
</script>

<template>
	<SearchBar v-model:search="query" />
	<p v-if="isLoading">Loading...</p>
	<p v-else-if="error">{{ error }}</p>
	<p v-else-if="query.trim() === ''">Please enter a movie name</p>
	<p v-else-if="results.length === 0">No results found</p>
	<ul v-else>
		<MovieCard v-for="movie in results" :key="movie.id" :movie="movie" @add="addMovie" />
	</ul>

	<h2 v-if="watchlist.length > 0">Watchlist {{ watchlist.length }}</h2>
	<h2 v-else>No movies in watchlist</h2>
	<ul v-if="watchlist.length > 0">
		<li v-for="movie in watchlist" :key="movie.id">
			{{ movie.title }} ({{ movie.year }})
		</li>
	</ul>
</template>

<style scoped>

</style>
