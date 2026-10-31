// Lecture 1, cell 8: the polynomial y = x^5 - 5x^3 + 4x, with its zeros at
// x = -2, -1, 0, 1, 2 marked, to check a sketch made from its factorised form
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { blue, dot, line } from '#plots/style.js'

const f = x => x ** 5 - 5 * x ** 3 + 4 * x

export default () => ({
  x: { label: 'x' },
  y: { label: 'y = x⁵ - 5x³ + 4x' },
  marks: [
    Plot.ruleY([0], { stroke: '#1a1a1a', strokeWidth: 1.5 }),
    Plot.line(linspace(-2.2, 2.2, 100), { ...line, x: x => x, y: f, stroke: blue }),
    Plot.dot([-2, -1, 0, 1, 2], { ...dot, x: x => x, y: 0, fill: 'black', r: 7 }),
  ],
})
