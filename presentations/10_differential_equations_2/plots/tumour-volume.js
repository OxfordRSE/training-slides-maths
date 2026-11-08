// Lecture 10, cell 18: the tumour volume V = ((kt + c)/3)^3, the solution of
// dV/dt = k V^(2/3), with c = 3 V0^(1/3) from the volume V0 at t = 0. The
// notebook's sliders were k and c; V0 replaces c, as it has a meaning.
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { blue, line } from '#plots/style.js'

export const controls = {
  k: { min: 0.01, max: 2, step: 0.01, value: 1, color: blue },
  V0: { label: 'V₀', min: 1, max: 50, step: 1, value: 10, color: blue },
}

const ts = linspace(0, 10, 100)

export default ({ k, V0 }) => {
  const c = 3 * Math.cbrt(V0)
  return {
    x: { label: 't' },
    y: { label: 'V', zero: true },
    marks: [
      Plot.line(ts, { ...line, x: t => t, y: t => ((k * t + c) / 3) ** 3, stroke: blue }),
    ],
  }
}
