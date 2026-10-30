// Lecture 3, cells 8-9: the tangent to y = ln(x) at a point x, a slider in the notebook
// (the notebook wrote log(x); the course writes ln for the natural log)
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { blue, dot, line, orange } from '#plots/style.js'

export const controls = {
  x: { min: 0.4, max: 1.8, step: 0.05, value: 1, color: orange },
}

export default ({ x }) => ({
  title: 'y = ln(x)',
  x: { label: 'x', domain: [0.2, 2] },
  y: { label: 'y = ln(x)', domain: [-2, 1] },
  marks: [
    Plot.line(linspace(0.2, 2, 100), { ...line, x: t => t, y: Math.log, stroke: blue }),
    Plot.line([0.2, 2], { ...line, x: t => t, y: t => Math.log(x) + (t - x) / x, stroke: orange }),
    Plot.dot([x], { ...dot, x: t => t, y: Math.log, fill: 'black', r: 7 }),
  ],
})
