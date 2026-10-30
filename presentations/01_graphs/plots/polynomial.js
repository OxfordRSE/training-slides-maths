// Lecture 1, cell 8: the polynomial y = x^5 - 5x^3 + 4x
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { blue, line } from '#plots/style.js'

const f = x => x ** 5 - 5 * x ** 3 + 4 * x

export default () => ({
  title: 'Example polynomial',
  x: { label: 'x' },
  y: { label: 'y = x⁵ - 5x³ + 4x' },
  marks: [
    Plot.line(linspace(-2.2, 2.2, 100), { ...line, x: x => x, y: f, stroke: blue }),
  ],
})
