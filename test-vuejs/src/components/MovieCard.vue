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
  <li class="movie-card">
    <RouterLink :to="`/movie/${movie.id}`" class="movie-title">
      {{ movie.title }} ({{ movie.year }})
    </RouterLink>
    <button @click="emit('add', movie)">Add</button>
  </li>
</template>

<style>
</style>