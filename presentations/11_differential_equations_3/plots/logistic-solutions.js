// Lecture 11: the logistic equation dN/dt = rN(1 - N/K), solved exactly,
// N(t) = K N0 e^(rt) / (K + N0 (e^(rt) - 1)), from several initial population
// sizes N0, below and above K. Every curve that starts above zero tends to the
// stable steady state N = K (dotted). The axes are fixed so that the sliders
// visibly move the curves.
import * as Plot from '@observablehq/plot'
import { format } from '#plots/controls.js'
import { linspace } from '#plots/numerics.js'
import { blue, label, line } from '#plots/style.js'

export const controls = {
  r: { min: 0.2, max: 2, step: 0.01, value: 1, color: blue },
  K: { min: 0.5, max: 2.5, step: 0.01, value: 1, color: blue },
}

const N0s = [0.05, 0.5, 2, 3]
const ts = linspace(0, 10, 200)

export default ({ r, K }) => {
  const data = N0s.flatMap(N0 => ts.map(t => {
    const e = Math.exp(r * t)
    return { N0, t, N: K * N0 * e / (K + N0 * (e - 1)) }
  }))
  return {
    x: { label: 't' },
    y: { label: 'N', domain: [0, 3.2] },
    marks: [
      Plot.ruleY([K], { stroke: '#1a1a1a', strokeWidth: 2, strokeDasharray: '2 6' }),
      Plot.line(data, { ...line, x: 't', y: 'N', z: 'N0', stroke: blue }),
      Plot.text([`N = K = ${format(K, { step: 0.01 })}`], { ...label, x: 10, y: K, dy: -16, textAnchor: 'end' }),
    ],
  }
}
