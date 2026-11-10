// Lecture 11, cell 13: ds/dt = k1 s - k2 s^2 against s, for k1 = k2 = 1, with
// the steady states s = 0 and s = k1/k2 marked, and arrows showing which way s
// moves. The slide passes `arrows: false` until its last click, so the class
// can work out the stability first; exports leave it out, and get the arrows.
import * as Plot from '@observablehq/plot'
import { phaseArrows } from '#plots/marks.js'
import { linspace } from '#plots/numerics.js'
import { blue, line } from '#plots/style.js'

const k1 = 1
const k2 = 1
const f = s => k1 * s - k2 * s ** 2
const dashed = { stroke: 'gray', strokeWidth: 2, strokeDasharray: '6 4' }

export default ({ arrows = true } = {}) => ({
  x: { label: 's' },
  y: { label: 'ds/dt' },
  marks: [
    Plot.ruleX([0, k1 / k2], dashed),
    Plot.ruleY([0], dashed),
    Plot.line(linspace(-0.1, 1.5, 100), { ...line, x: s => s, y: f, stroke: blue }),
    arrows ? phaseArrows(f, [0, k1 / k2], [-0.1, 1.5]) : null,
  ],
})
