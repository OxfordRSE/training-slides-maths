<script setup>
// Shows a figure from the deck's `plots/` directory on a slide, by name, e.g.
// <PlotFigure name="enzyme-trendline" />. If the figure exports `controls`, a
// slider for each one sits under the plot's axes (`:sliders="false"` hides
// them); `params` can drive the figure too, e.g. from clicks. The figure fills
// the width of its container, up to `maxWidth`. `height` is for the whole
// figure, including its title, legend and sliders; the default fits a slide
// under the header bar. The drawing itself is in addon/plots/render.js.
import { computed, onBeforeUnmount, onMounted, reactive, ref, watchEffect } from 'vue'
import { format } from '../plots/controls.js'
import { defaults, render } from '../plots/render.js'

// The current deck's figures: Slidev builds each deck with its directory as the root
const figures = import.meta.glob('/plots/*.js', { eager: true })

const props = defineProps({
  name: { type: String, required: true },
  params: { type: Object, default: () => ({}) },
  sliders: { type: Boolean, default: true },
  maxWidth: { type: Number, default: 680 },
  height: { type: Number, default: 400 },
})

const figure = figures[`/plots/${props.name}.js`]
if (!figure)
  throw new Error(`No figure "${props.name}": expected plots/${props.name}.js in this deck`)

const controls = computed(() => props.sliders ? figure.controls : undefined)

// Each slider's current value, starting from the notebook's default
const values = reactive(defaults(figure.controls))

// How far along its track a slider is, to fill the track up to the thumb
const fill = (name, c) => `${100 * (values[name] - c.min) / (c.max - c.min)}%`

// Height of the row of sliders, taken out of the figure's overall height
const sliderRow = 52

const el = ref(null)
const available = ref(0)
let drawn
let observer

// Measured in the next frame, so that redrawing cannot feed back into the measurement
onMounted(() => {
  observer = new ResizeObserver(([entry]) => {
    requestAnimationFrame(() => { available.value = Math.floor(entry.contentRect.width) })
  })
  observer.observe(el.value)
})

// Where the plot's axes sit across the figure, so the sliders can line up with them
const axesBox = reactive({ width: 0, left: 0, right: 0 })

watchEffect(() => {
  if (!el.value || !available.value)
    return
  const width = Math.min(available.value, props.maxWidth)
  const height = props.height - (controls.value ? sliderRow : 0)
  const { node, marginLeft, marginRight } = render(figure, { ...values, ...props.params }, { width, height })
  el.value.querySelector('.plot-canvas').replaceChildren(node)
  drawn = node
  Object.assign(axesBox, { width, left: marginLeft, right: marginRight })
})

// Keep keys on a focused slider, so arrows move it rather than change slide;
// a mouse drag hands the keys back to the slides, as does Escape
function keydown(event) {
  if (event.key === 'Escape')
    event.target.blur()
  else
    event.stopPropagation()
}

onBeforeUnmount(() => {
  observer?.disconnect()
  drawn?.remove()
})
</script>

<template>
  <div ref="el" class="plot-figure">
    <div class="plot-canvas" />
    <div
      v-if="controls"
      class="plot-controls"
      :style="{
        height: `${sliderRow}px`,
        width: `${axesBox.width}px`,
        paddingLeft: `${axesBox.left}px`,
        paddingRight: `${axesBox.right}px`,
        gridTemplateColumns: `repeat(${Object.keys(controls).length}, 1fr)`,
      }"
    >
      <label
        v-for="(c, name) in controls"
        :key="name"
        :style="{ '--color': c.color ?? '#002147', '--fill': fill(name, c) }"
      >
        <input
          v-model.number="values[name]"
          type="range"
          :min="c.min"
          :max="c.max"
          :step="c.step"
          @keydown="keydown"
          @pointerup="$event.target.blur()"
        >
        <span class="caption">
          <span class="name">{{ c.label ?? name }}</span> = <span class="value">{{ format(values[name], c) }}</span>
        </span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.plot-figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
}

.plot-canvas {
  display: flex;
  justify-content: center;
  width: 100%;
}

.plot-canvas :deep(figure) {
  margin: 0;
}

/* Sliders share the width of the plot's axes, in equal columns, each with
   its caption ("m = 4.90") centred underneath */
.plot-controls {
  display: grid;
  column-gap: 2rem;
  box-sizing: border-box;
  padding-top: 8px;
}

.plot-controls label {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2px;
}

.plot-controls .caption {
  font-size: 16px;
  line-height: 22px;
  text-align: center;
}

.plot-controls .name {
  font-family: KaTeX_Math, serif;
  font-size: 18px;
  font-style: italic;
}

.plot-controls .value {
  font-variant-numeric: tabular-nums;
}

/* The track and thumb drawn the same in every browser: a 4px track filled up
   to the thumb in the colour of what the slider controls, and a round thumb
   with a white ring */
.plot-controls input {
  width: 100%;
  height: 20px;
  margin: 0;
  background: transparent;
  cursor: pointer;
  appearance: none;
}

.plot-controls input::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(to right, var(--color) var(--fill), #d0d4da var(--fill));
}

.plot-controls input::-moz-range-track {
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(to right, var(--color) var(--fill), #d0d4da var(--fill));
}

.plot-controls input::-webkit-slider-thumb {
  width: 18px;
  height: 18px;
  margin-top: -7px;
  border: 2px solid white;
  border-radius: 50%;
  background: var(--color);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.35);
  appearance: none;
}

.plot-controls input::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border: 2px solid white;
  border-radius: 50%;
  background: var(--color);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.35);
}

/* A clear ring when a slider is focused from the keyboard */
.plot-controls input:focus-visible {
  outline: 2px solid var(--color);
  outline-offset: 4px;
  border-radius: 4px;
}
</style>
