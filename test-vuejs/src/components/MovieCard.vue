<script setup lang="ts">
import type { Movie } from '@/types/movie'

defineProps<{
  movie: Movie
}>()

const emit = defineEmits<{
  add: [movie: Movie]
}>()
</script>

<template>
  <li>
    {{ movie.title }} ({{ movie.year }})
    <button @click="emit('add', movie)">Add to Watchlist</button>
  </li>
</template>