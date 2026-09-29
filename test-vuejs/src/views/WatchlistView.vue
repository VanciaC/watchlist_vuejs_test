<script setup lang="ts">
    import { useWatchlistStore } from '@/stores/watchlist'
    const watchlistStore = useWatchlistStore()
</script>

<template>
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