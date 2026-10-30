// Lecture 6, cells 4-5: the area under y = x^2 between x = 1 and x = 2, and
// one strip of it, 0.1 wide and as tall as the curve at its right edge. Where
// the strip starts was a slider in the notebook.
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { blue, line } from '#plots/style.js'

export const controls = {
  start: { label: 'x', min: 1, max: 1.9, step: 0.1, value: 1 },
}

const f = x => x ** 2
const width = 0.1

export default ({ start }) => ({
  x: { label: 'x', domain: [0.8, 2.2] },
  y: { label: 'f(x)', domain: [0, 5] },
  marks: [
    Plot.rect([start], { x1: x => x, x2: x => x + width, y1: 0, y2: x => f(x + width), fill: '#1a1a1a', fillOpacity: 0.4 }),
    Plot.line(linspace(0.8, 2.2, 200), { ...line, x: x => x, y: f, stroke: blue }),
    Plot.ruleX([1, 2], { y1: 0, y2: f, stroke: 'gray', strokeWidth: 2, strokeDasharray: '6 4' }),
  ],
})
