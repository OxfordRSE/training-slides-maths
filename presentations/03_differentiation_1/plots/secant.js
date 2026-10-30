// Lecture 3, cells 15-16: on y = x^2, the line through x = 2 and x = 2 + h (green)
// approaches the tangent at x = 2 (orange) as h, a slider in the notebook, shrinks
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { blue, dot, green, line, orange } from '#plots/style.js'

export const controls = {
  h: { min: 0.05, max: 9, step: 0.05, value: 5, color: green },
}

const f = x => x ** 2
const x0 = 2

export default ({ h }) => {
  const gradient = (f(x0 + h) - f(x0)) / h
  return {
    title: 'y = x²',
    x: { label: 'x', domain: [-2, 11] },
    y: { label: 'y = x²', domain: [-15, 121] },
    marks: [
      Plot.line(linspace(-2, 11, 100), { ...line, x: x => x, y: f, stroke: blue }),
      Plot.line([-8, 12], { ...line, x: x => x, y: x => f(x0) + 2 * x0 * (x - x0), stroke: orange }),
      Plot.line([-8, 12], { ...line, x: x => x, y: x => f(x0) + gradient * (x - x0), stroke: green }),
      Plot.dot([x0, x0 + h], { ...dot, x: x => x, y: f, fill: 'black', r: 7 }),
    ],
  }
}
