// Lecture 9, cells 39-40: first order growth A = e^(kt) and decay
// A = e^(k(1 - t)), over 0 <= t <= 1; k was a slider in the notebook
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { blue, line, orange } from '#plots/style.js'

export const controls = {
  k: { min: 0.2, max: 2, step: 0.01, value: 1 },
}

const ts = linspace(0, 1, 200)

export default ({ k }) => ({
  x: { label: 't' },
  y: { label: 'A', domain: [0, 7.5] },
  color: { domain: ['First order growth', 'First order decay'], range: [blue, orange], legend: true },
  marks: [
    Plot.line(ts, { ...line, x: t => t, y: t => Math.exp(k * t), stroke: () => 'First order growth' }),
    Plot.line(ts, { ...line, x: t => t, y: t => Math.exp(k * (1 - t)), stroke: () => 'First order decay' }),
  ],
})
