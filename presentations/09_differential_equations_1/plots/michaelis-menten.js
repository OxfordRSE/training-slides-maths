// Lecture 9, cells 28-29: the Michaelis-Menten equation ds/dt = -Vmax s/(Km + s),
// solved numerically from s(0) = 1 with Vmax = 1. Km was a slider in the notebook:
// small Km gives a zeroth order (straight line) decline, large Km a first order
// (exponential) one.
import * as Plot from '@observablehq/plot'
import { linspace, odeint } from '#plots/numerics.js'
import { blue, line } from '#plots/style.js'

export const controls = {
  Km: { label: 'Kₘ', min: 0.01, max: 2, step: 0.01, value: 0.2, color: blue },
}

const Vmax = 1
const ts = linspace(0, 10, 500)

export default ({ Km }) => {
  const s = odeint(s => -Vmax * s / (Km + s), 1, ts)
  return {
    x: { label: 't' },
    y: { label: 's' },
    marks: [
      Plot.line(ts, { ...line, x: t => t, y: (_, i) => s[i], stroke: blue }),
    ],
  }
}
