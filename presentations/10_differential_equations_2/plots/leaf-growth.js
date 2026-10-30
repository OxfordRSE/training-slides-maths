// Lecture 10, cell 10: the leaf growth model dy/dt = k1 y - k2 y^2, solved
// numerically from y(0) = 0.1; k1 and k2 were sliders in the notebook
import * as Plot from '@observablehq/plot'
import { linspace, odeint } from '#plots/numerics.js'
import { blue, line } from '#plots/style.js'

export const controls = {
  k1: { label: 'k₁', min: 0.01, max: 2, step: 0.01, value: 1, color: blue },
  k2: { label: 'k₂', min: 0.01, max: 2, step: 0.01, value: 1, color: blue },
}

const ts = linspace(0, 10, 100)

export default ({ k1, k2 }) => {
  const y = odeint(y => k1 * y - k2 * y ** 2, 0.1, ts)
  return {
    x: { label: 't' },
    y: { label: 'y' },
    marks: [
      Plot.line(ts, { ...line, x: t => t, y: (_, i) => y[i], stroke: blue }),
    ],
  }
}
