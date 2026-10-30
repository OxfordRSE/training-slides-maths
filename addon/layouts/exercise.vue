<script setup>
// A slide with an exercise for students to do in the lecture. addon/global-top.vue
// turns its header bar green, with a pencil, so it stands out from the slides
// around it. Its content is spread down the slide, between the header bar and
// the bottom, so each question has room under it for working on the whiteboard:
// a list's items are spread evenly below any text before it, and otherwise each
// block (e.g. an equation) is spread evenly. To keep some content together at
// the top, e.g. a question and its hints, put what is to be worked after
// `::work::`; only that part is spread. Everything sits on the left, displayed
// maths included, so the right of the slide stays clear for the working.
</script>

<template>
  <div class="slidev-layout default exercise" :class="{ 'exercise-with-work': $slots.work }">
    <template v-if="$slots.work">
      <div><slot /></div>
      <div class="exercise-work">
        <slot name="work" />
      </div>
    </template>
    <slot v-else />
  </div>
</template>

<style>
.slidev-layout.exercise {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.slidev-layout.exercise > ol,
.slidev-layout.exercise > ul,
.slidev-layout.exercise .exercise-work {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 0;
}

.slidev-layout.exercise.exercise-with-work {
  justify-content: flex-start;
}

.slidev-layout.exercise > *,
.slidev-layout.exercise .exercise-work {
  max-width: 60%;
}

.slidev-layout.exercise .katex-display > .katex {
  padding-left: 1.5rem;
  text-align: left;
}
</style>
