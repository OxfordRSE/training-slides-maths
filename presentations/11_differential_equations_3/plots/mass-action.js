// Lecture 11, cell 9: ds/dt = k1 - k2 s against s, for k1 = k2 = 1, with the
// steady state s = k1/k2 marked
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { blue, line } from '#plots/style.js'

const k1 = 1
const k2 = 1
const dashed = { stroke: 'gray', strokeWidth: 2, strokeDasharray: '6 4' }

export default () => ({
  x: { label: 's' },
  y: { label: 'ds/dt' },
  marks: [
    Plot.ruleX([k1 / k2], dashed),
    Plot.ruleY([0], dashed),
    Plot.line(linspace(0, 2, 100), { ...line, x: s => s, y: s => k1 - k2 * s, stroke: blue }),
  ],
})
