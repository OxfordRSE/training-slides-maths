<script setup>
// On an exercise slide (`layout: exercise`), a green header bar with a pencil,
// drawn over the theme's navy one with the same title and logos
import logo from 'slidev-theme-oxrse/img/logos/2024_oxrse_next_to_oxford.svg'
</script>

<template>
  <div v-if="$nav.currentLayout === 'exercise'" class="oxrse-header exercise-header">
    <span class="oxrse-header-title">
      <carbon-pen class="exercise-pen" />
      {{ $nav.currentSlideRoute.meta?.slide?.title || '' }}
    </span>
    <img :src="logo" alt="Oxford and OxRSE" class="oxrse-header-logo">
  </div>
</template>

<style>
.exercise-header {
  z-index: 11;
  background: #0b6e4f;
}

.exercise-pen {
  display: inline-block;
  margin-right: 0.5rem;
  vertical-align: -0.1em;
}
</style>
