// Lecture 3, cell 27: y = 2x^3 - 5x^2 - 4x, with its maximum, minimum and
// point of inflection marked
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { blue, dot, line } from '#plots/style.js'

const f = x => 2 * x ** 3 - 5 * x ** 2 - 4 * x
const points = [2, -1 / 3, 5 / 6]

export default () => ({
  x: { label: 'x' },
  y: { label: 'y' },
  marks: [
    Plot.line(linspace(-2, 3.5, 100), { ...line, x: x => x, y: f, stroke: blue }),
    Plot.dot(points, { ...dot, x: x => x, y: f, fill: 'black', r: 7 }),
  ],
})
