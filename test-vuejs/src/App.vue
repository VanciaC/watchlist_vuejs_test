<script setup lang="ts">
import { ref, watch } from 'vue'
import MovieCard from './components/MovieCard.vue'
import SearchBar from './components/SearchBar.vue'
import type { Movie } from '@/types/movie'
import { searchMovies } from '@/api/omdb'
import { useWatchlistStore } from '@/stores/watchlist'

const watchlistStore = useWatchlistStore()
const query = ref<string>('')
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

</script>

<template>
	<SearchBar v-model:search="query" />
	<p v-if="isLoading">Loading...</p>
	<p v-else-if="error">{{ error }}</p>
	<p v-else-if="query.trim() === ''">Please enter a movie name</p>
	<p v-else-if="results.length === 0">No results found</p>
	<ul v-else>
		<MovieCard v-for="movie in results" :key="movie.id" :movie="movie" @add="watchlistStore.add(movie)" />
	</ul>

	<h2 v-if="watchlistStore.count > 0">Watchlist {{ watchlistStore.count }}</h2>
	<h2 v-else>No movies in watchlist</h2>
	<ul v-if="watchlistStore.count > 0">
		<li v-for="movie in watchlistStore.movies" :key="movie.id">
			{{ movie.title }} ({{ movie.year }})
			<button @click="watchlistStore.remove(movie.id)">Remove</button>
		</li>
	</ul>
</template>

<style scoped>

</style>
