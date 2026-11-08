<script setup>
// On an exercise slide (`layout: exercise`), a green header bar with a pencil,
// and on an aside (`layout: aside`), a purple one with an information icon,
// drawn over the theme's navy one with the same title and logos
import logo from 'slidev-theme-oxrse/img/logos/2024_oxrse_next_to_oxford.svg'
</script>

<template>
  <div v-if="$nav.currentLayout === 'exercise'" class="oxrse-header exercise-header">
    <span class="oxrse-header-title">
      <carbon-pen class="header-icon" />
      {{ $nav.currentSlideRoute.meta?.slide?.title || '' }}
    </span>
    <img :src="logo" alt="Oxford and OxRSE" class="oxrse-header-logo">
  </div>
  <div v-else-if="$nav.currentLayout === 'aside'" class="oxrse-header aside-header">
    <span class="oxrse-header-title">
      <carbon-information class="header-icon" />
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

.aside-header {
  z-index: 11;
  background: #6b3e8e;
}

.header-icon {
  display: inline-block;
  margin-right: 0.5rem;
  vertical-align: -0.1em;
}
</style>
