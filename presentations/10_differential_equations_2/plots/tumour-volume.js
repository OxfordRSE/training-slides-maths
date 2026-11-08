// Lecture 10, cell 18: the tumour volume V = ((kt + c)/3)^3, the solution of
// dV/dt = k V^(2/3), with c = 3 V0^(1/3) from the volume V0 = 10 at t = 0 (the
// notebook's sliders were k and c; only k is kept). Against it (dashed),
// exponential growth dV/dt = rV from the same volume and at the same initial
// rate (r = k V0^(-1/3)), which nutrients only through the surface can't keep up
// with. The axes are fixed so that the slider visibly moves the curves.
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { blue, line, vermillion } from '#plots/style.js'

export const controls = {
  k: { min: 0.1, max: 1, step: 0.01, value: 1, color: blue },
}

const V0 = 10
const ts = linspace(0, 10, 200)

export default ({ k }) => {
  const c = 3 * Math.cbrt(V0)
  const r = k / Math.cbrt(V0)
  return {
    x: { label: 't', domain: [0, 10] },
    y: { label: 'V', domain: [0, 400] },
    marks: [
      Plot.line(ts, { ...line, x: t => t, y: t => V0 * Math.exp(r * t), stroke: vermillion, strokeDasharray: '10 6', clip: true }),
      Plot.line(ts, { ...line, x: t => t, y: t => ((k * t + c) / 3) ** 3, stroke: blue, clip: true }),
    ],
  }
}
