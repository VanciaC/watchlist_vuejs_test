<script setup lang="ts">
    import { useWatchlistStore } from '@/stores/watchlist'
    const watchlistStore = useWatchlistStore()
</script>

<template>
    <h2>Watchlist ({{ watchlistStore.count }})</h2>

    <p v-if="watchlistStore.count === 0" class="empty-state">No movies in watchlist</p>

    <ul v-else>
        <li v-for="movie in watchlistStore.movies" :key="movie.id" class="movie-card">
        <span>{{ movie.title }} ({{ movie.year }})</span>
        <button class="danger" @click="watchlistStore.remove(movie.id)">Remove</button>
        </li>
    </ul>
</template>

<style>
</style>