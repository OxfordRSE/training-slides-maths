// Lecture 11, cell 16: the logistic equation dN/dt = rN(1 - N/K) against N,
// with the steady states N = 0 and N = K marked, and arrows showing which way N
// moves. (The notebook's slider figure here plotted the positive feedback
// equation; the logistic is the same with k1 = r and k2 = r/K.) The axes are
// fixed so that the sliders visibly move the curve.
import * as Plot from '@observablehq/plot'
import { format } from '#plots/controls.js'
import { phaseArrows } from '#plots/marks.js'
import { linspace } from '#plots/numerics.js'
import { blue, label, line } from '#plots/style.js'

export const controls = {
  r: { min: 0.1, max: 2, step: 0.01, value: 1, color: blue },
  K: { min: 0.5, max: 2, step: 0.01, value: 1, color: blue },
}

const range = [-0.1, 2.2]
const Ns = linspace(...range, 200)
const dashed = { stroke: 'gray', strokeWidth: 2, strokeDasharray: '6 4' }

export default ({ r, K }) => {
  const f = N => r * N * (1 - N / K)
  return {
    x: { label: 'N', domain: range },
    y: { label: 'dN/dt', domain: [-1, 1] },
    marks: [
      Plot.ruleX([0, K], dashed),
      Plot.ruleY([0], dashed),
      Plot.line(Ns, { ...line, x: N => N, y: f, stroke: blue, clip: true }),
      phaseArrows(f, [0, K], range),
      Plot.text([`N = K = ${format(K, { step: 0.01 })}`], { ...label, frameAnchor: 'top-right', textAnchor: 'end', dx: -12, dy: 14 }),
    ],
  }
}
