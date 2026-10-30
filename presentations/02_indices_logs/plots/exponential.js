// Lecture 2, cell 56: y = exp(x) and its tangent y = x + 1 at the point (0, 1).
// The notebook used a legend; here each line is labelled just past its end.
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { blue, dot, green, label, line, orange } from '#plots/style.js'

const xs = linspace(-1, 1, 1000)
const ends = [
  { x: 1, y: Math.exp(1), text: 'y = exp(x)' },
  { x: 1, y: 2, text: 'y = x + 1' },
]

export default () => ({
  marginRight: 110,
  x: { label: 'x' },
  y: { label: 'y = exp(x)' },
  marks: [
    Plot.line(xs, { ...line, x: x => x, y: Math.exp, stroke: blue }),
    Plot.line(xs, { ...line, x: x => x, y: x => x + 1, stroke: orange, strokeDasharray: '10 6' }),
    Plot.dot([{ x: 0, y: 1 }], { ...dot, x: 'x', y: 'y', fill: green, r: 7 }),
    Plot.text(ends, { ...label, x: 'x', y: 'y', text: 'text', textAnchor: 'start', dx: 12, clip: false }),
  ],
})
