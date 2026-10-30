// Lecture 2, cell 32: y = log10(x)
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { blue, line } from '#plots/style.js'

export default () => ({
  x: { label: 'x' },
  y: { label: 'log₁₀(x)' },
  marks: [
    Plot.line(linspace(0.01, 10, 1000), { ...line, x: x => x, y: Math.log10, stroke: blue }),
  ],
})
