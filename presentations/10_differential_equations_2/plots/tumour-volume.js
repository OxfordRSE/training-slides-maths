// Lecture 10, cell 18: the tumour volume V = ((kt + c)/3)^3, the solution of
// dV/dt = k V^(2/3), with c = 3 V0^(1/3) from the volume V0 at t = 0. The
// notebook's sliders were k and c; V0 replaces c, as it has a meaning. Against
// it (dashed), exponential growth dV/dt = rV from the same volume and at the same
// initial rate (r = k V0^(-1/3)), which nutrients only through the surface can't
// keep up with. The axes are fixed so that the sliders visibly move the curves.
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { blue, line, vermillion } from '#plots/style.js'

export const controls = {
  k: { min: 0.1, max: 1, step: 0.01, value: 1, color: blue },
  V0: { label: 'V₀', min: 1, max: 50, step: 1, value: 10, color: blue },
}

const ts = linspace(0, 10, 200)
const names = ['through the surface', 'exponential']

export default ({ k, V0 }) => {
  const c = 3 * Math.cbrt(V0)
  const r = k / Math.cbrt(V0)
  const data = [
    ...ts.map(t => ({ t, V: ((k * t + c) / 3) ** 3, growth: names[0] })),
    ...ts.map(t => ({ t, V: V0 * Math.exp(r * t), growth: names[1] })),
  ]
  return {
    x: { label: 't', domain: [0, 10] },
    y: { label: 'V', domain: [0, 400] },
    color: { domain: names, range: [blue, vermillion], legend: true },
    marks: [
      Plot.line(data.filter(d => d.growth === names[1]), { ...line, x: 't', y: 'V', stroke: 'growth', strokeDasharray: '10 6', clip: true }),
      Plot.line(data.filter(d => d.growth === names[0]), { ...line, x: 't', y: 'V', stroke: 'growth', clip: true }),
    ],
  }
}
