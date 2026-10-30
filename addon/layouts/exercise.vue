<script setup>
// A slide with an exercise for students to do in the lecture. addon/global-top.vue
// turns its header bar green, with a pencil, so it stands out from the slides
// around it. Its content is spread down the slide, between the header bar and
// the bottom, so each question has room under it for working on the whiteboard:
// a list's items are spread evenly below any text before it, and otherwise each
// block (e.g. an equation) is spread evenly.
</script>

<template>
  <div class="slidev-layout default exercise">
    <slot />
  </div>
</template>

<style>
.slidev-layout.exercise {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.slidev-layout.exercise > ol,
.slidev-layout.exercise > ul {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 0;
}
</style>
