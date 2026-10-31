// Lecture 2, cell 56: y = exp(x) and its tangent y = x + 1 at the point (0, 1),
// with a legend, as in the notebook, so the plot can use the column's width
import * as Plot from '@observablehq/plot'
import { legend } from '#plots/marks.js'
import { linspace } from '#plots/numerics.js'
import { blue, dot, green, line, orange } from '#plots/style.js'

const xs = linspace(-1, 1, 1000)
const tangentDash = '10 6'

export default () => ({
  x: { label: 'x' },
  y: { label: 'y' },
  marks: [
    Plot.line(xs, { ...line, x: x => x, y: Math.exp, stroke: blue }),
    Plot.line(xs, { ...line, x: x => x, y: x => x + 1, stroke: orange, strokeDasharray: tangentDash }),
    Plot.dot([{ x: 0, y: 1 }], { ...dot, x: 'x', y: 'y', fill: green, r: 7 }),
    ...legend([
      { text: 'y = exp(x)', color: blue },
      { text: 'y = x + 1', color: orange, dasharray: tangentDash },
    ]),
  ],
})
