<script setup lang="ts">
const model = defineModel<string>('search', { required: true })
</script>

<template>
  <input v-model="model" type="text" placeholder="Search for a movie..." class="search-bar" />
</template>

<style scoped>
  .search-bar {
    width: 100%;
    padding: 0.6rem 0.9rem;
    border-radius: var(--radius);
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text);
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .search-bar:focus {
    outline: none;
    border-color: var(--color-primary);
  }
</style>