// Lecture 11, cells 4-5: radioactive decay dN/dt = -lambda N with lambda = 1
// and N(0) = 1, solved numerically: N and dN/dt both tend to the steady state 0
import * as Plot from '@observablehq/plot'
import { linspace, odeint } from '#plots/numerics.js'
import { blue, line, orange } from '#plots/style.js'

const lambda = 1
const ts = linspace(0, 6, 100)
const N = odeint(N => -lambda * N, 1, ts)

export default () => ({
  x: { label: 't' },
  color: { domain: ['N', 'dN/dt'], range: [blue, orange], legend: true },
  marks: [
    Plot.line(ts, { ...line, x: t => t, y: (_, i) => N[i], stroke: () => 'N' }),
    Plot.line(ts, { ...line, x: t => t, y: (_, i) => -lambda * N[i], stroke: () => 'dN/dt' }),
  ],
})
