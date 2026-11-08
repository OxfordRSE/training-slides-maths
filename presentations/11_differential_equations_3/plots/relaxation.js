// Lecture 11: the production and degradation model ds/dt = k1 - k2 s, solved
// exactly, s(t) = s0 e^(-k2 t) + (k1/k2)(1 - e^(-k2 t)), from several initial
// concentrations s0. Every curve relaxes to the steady state s = k1/k2 (dotted),
// whatever s0 is. The axes are fixed so that the sliders visibly move the curves.
import * as Plot from '@observablehq/plot'
import { format } from '#plots/controls.js'
import { linspace } from '#plots/numerics.js'
import { blue, label, line } from '#plots/style.js'

export const controls = {
  k1: { label: 'k₁', min: 0.5, max: 2, step: 0.01, value: 1, color: blue },
  k2: { label: 'k₂', min: 0.5, max: 2, step: 0.01, value: 1, color: blue },
}

const s0s = [0, 1, 2, 3, 4]
const ts = linspace(0, 6, 150)

export default ({ k1, k2 }) => {
  const steady = k1 / k2
  const data = s0s.flatMap(s0 => ts.map(t => ({
    s0, t, s: s0 * Math.exp(-k2 * t) + steady * (1 - Math.exp(-k2 * t)),
  })))
  return {
    x: { label: 't' },
    y: { label: 's', domain: [0, 4.2] },
    marks: [
      Plot.ruleY([steady], { stroke: '#1a1a1a', strokeWidth: 2, strokeDasharray: '2 6' }),
      Plot.line(data, { ...line, x: 't', y: 's', z: 's0', stroke: blue }),
      Plot.text([`s = k₁/k₂ = ${format(steady, { step: 0.01 })}`], { ...label, x: 6, y: steady, dy: -16, textAnchor: 'end' }),
    ],
  }
}
