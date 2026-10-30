// Lecture 17, cells 3, 4 and 6: the logistic equation dN/dt = rN(1 - N/K),
// solved from N(0) = K/100, plus normally distributed noise with standard
// deviation `ep` (0 for the deterministic model, 0.01 for the probabilistic one)
import * as Plot from '@observablehq/plot'
import { linspace, odeint } from '#plots/numerics.js'
import { rng } from '#plots/random.js'
import { blue, line } from '#plots/style.js'

const r = 1.0
const K = 1.0
const n = 100
const ts = linspace(0, 10, n)
const N = odeint(N => r * N * (1 - N / K), K / 100, ts)

export default ({ ep = 0 }) => {
  const noise = rng(17).normal(0, ep, n)
  return {
    x: { label: 't' },
    y: { label: 'N' },
    marks: [
      Plot.line(ts, { ...line, x: t => t, y: (_, i) => N[i] + noise[i], stroke: blue }),
    ],
  }
}
