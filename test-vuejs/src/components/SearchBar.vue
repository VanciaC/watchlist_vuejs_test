<script setup lang="ts">
const model = defineModel<string>( 'search',{ required: true })
function resetSearch() {
  model.value = ''
}
</script>

<template>
  <input v-model="model" type="text" placeholder="Search for a movie..." />
    <button @click="resetSearch">Effacer</button>

</template>