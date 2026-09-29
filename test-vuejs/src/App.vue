<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useWatchlistStore } from '@/stores/watchlist'

const watchlistStore = useWatchlistStore()
</script>

<template>
	<nav>
		<RouterLink to="/">Search</RouterLink>
		<RouterLink to="/watchlist">Watchlist ({{ watchlistStore.count }})</RouterLink>
	</nav>
	<RouterView />
</template>

<style>

</style>
