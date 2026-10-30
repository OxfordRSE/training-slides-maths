// Lecture 4, cell 7: sin(x) and cos(x), to see where each is increasing,
// decreasing or flat. The notebook used a legend; here each line is labelled
// just past its end.
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { blue, label, line, orange } from '#plots/style.js'

const xs = linspace(0, 8, 100)
const ends = [
  { x: 8, y: Math.sin(8), text: 'sin(x)' },
  { x: 8, y: Math.cos(8), text: 'cos(x)' },
]

export default () => ({
  marginRight: 80,
  x: { label: 'x' },
  y: { label: 'y' },
  marks: [
    Plot.line(xs, { ...line, x: x => x, y: Math.sin, stroke: blue }),
    Plot.line(xs, { ...line, x: x => x, y: Math.cos, stroke: orange }),
    Plot.text(ends, { ...label, x: 'x', y: 'y', text: 'text', textAnchor: 'start', dx: 12, clip: false }),
  ],
})
