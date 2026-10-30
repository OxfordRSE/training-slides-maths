// Lecture 3, cells 5-6: the tangent to y = x^2 at a point x, a slider in the notebook
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { blue, dot, line, orange } from '#plots/style.js'

export const controls = {
  x: { min: -3, max: 3, step: 0.2, value: 1, color: orange },
}

const f = x => x ** 2

export default ({ x }) => ({
  title: 'y = x²',
  x: { label: 'x', domain: [-4, 4] },
  y: { label: 'y = x²', domain: [-5, 17] },
  marks: [
    Plot.line(linspace(-5, 5, 100), { ...line, x: t => t, y: f, stroke: blue }),
    Plot.line([-4, 4], { ...line, x: t => t, y: t => f(x) + 2 * x * (t - x), stroke: orange }),
    Plot.dot([x], { ...dot, x: t => t, y: f, fill: 'black', r: 7 }),
  ],
})
