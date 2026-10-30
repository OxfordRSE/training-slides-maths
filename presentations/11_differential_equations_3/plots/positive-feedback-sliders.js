// Lecture 11, cell 16: ds/dt = k1 s - k2 s^2 against s, with the steady states
// s = 0 and s = k1/k2 marked; k1 and k2 were sliders in the notebook
import * as Plot from '@observablehq/plot'
import { format } from '#plots/controls.js'
import { linspace } from '#plots/numerics.js'
import { blue, label, line } from '#plots/style.js'

export const controls = {
  k1: { label: 'k₁', min: 0.01, max: 2, step: 0.01, value: 1, color: blue },
  k2: { label: 'k₂', min: 0.01, max: 2, step: 0.01, value: 1, color: blue },
}

const ss = linspace(-0.1, 2, 100)
const dashed = { stroke: 'gray', strokeWidth: 2, strokeDasharray: '6 4' }

export default ({ k1, k2 }) => ({
  x: { label: 's', domain: [-0.1, 2] },
  y: { label: 'ds/dt' },
  marks: [
    Plot.ruleX([0, k1 / k2], dashed),
    Plot.ruleY([0], { ...dashed, stroke: '#1a1a1a' }),
    Plot.line(ss, { ...line, x: s => s, y: s => k1 * s - k2 * s ** 2, stroke: blue }),
    Plot.text([`s = k₁/k₂ = ${format(k1 / k2, { step: 0.01 })}`], { ...label, frameAnchor: 'top-right', textAnchor: 'end', dx: -12, dy: 14 }),
  ],
})
