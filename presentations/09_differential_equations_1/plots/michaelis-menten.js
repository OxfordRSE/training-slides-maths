// Lecture 9, cells 28-29: the Michaelis-Menten equation ds/dt = -Vs/(K + s),
// solved numerically from s(0) = 1 with V = 1. K was a slider in the notebook:
// small K gives a zeroth order (straight line) decline, large K a first order
// (exponential) one.
import * as Plot from '@observablehq/plot'
import { linspace, odeint } from '#plots/numerics.js'
import { blue, line } from '#plots/style.js'

export const controls = {
  K: { min: 0.01, max: 2, step: 0.01, value: 0.01, color: blue },
}

const V = 1
const ts = linspace(0, 10, 500)

export default ({ K }) => {
  const s = odeint(s => -V * s / (K + s), 1, ts)
  return {
    x: { label: 't' },
    y: { label: 's' },
    marks: [
      Plot.line(ts, { ...line, x: t => t, y: (_, i) => s[i], stroke: blue }),
    ],
  }
}
