// Lecture 10, cell 10: the leaf growth model dy/dt = k1 y - k2 y^2 from
// y(0) = 0.1. The exact solution y = k1 e^(k1 t + d) / (1 + k2 e^(k1 t + d))
// (red) against a numerical solution (dashed black), with the length the leaf
// levels off at, y = k1/k2 (dotted). k1 and k2 were sliders in the notebook;
// their ranges keep k1/k2 between 0.125 and 5 (above y0, so the leaf grows),
// and the y axis can stay fixed.
import * as Plot from '@observablehq/plot'
import { linspace, odeint } from '#plots/numerics.js'
import { blue, label, line, vermillion } from '#plots/style.js'

export const controls = {
  k1: { label: 'k₁', min: 0.25, max: 2, step: 0.01, value: 1, color: blue },
  k2: { label: 'k₂', min: 0.4, max: 2, step: 0.01, value: 0.5, color: blue },
}

const y0 = 0.1
const ts = linspace(0, 10, 100)

export default ({ k1, k2 }) => {
  // e^d from the initial condition: y0 / (k1 - k2 y0)
  const ed = y0 / (k1 - k2 * y0)
  const exact = ts.map(t => {
    const e = ed * Math.exp(k1 * t)
    return k1 * e / (1 + k2 * e)
  })
  const numerical = odeint(y => k1 * y - k2 * y ** 2, y0, ts)
  const data = [
    ...ts.map((t, i) => ({ t, y: exact[i], line: 'exact' })),
    ...ts.map((t, i) => ({ t, y: numerical[i], line: 'numerical' })),
  ]
  return {
    x: { label: 't' },
    y: { label: 'y', domain: [0, 5.5] },
    color: { domain: ['exact', 'numerical'], range: [vermillion, '#1a1a1a'], legend: true },
    marks: [
      Plot.ruleY([k1 / k2], { stroke: '#1a1a1a', strokeWidth: 2, strokeDasharray: '2 6' }),
      Plot.text([`y = k₁/k₂ = ${(k1 / k2).toFixed(2)}`], { ...label, x: 10, y: k1 / k2, dy: -16, textAnchor: 'end' }),
      Plot.line(data.filter(d => d.line === 'exact'), { ...line, x: 't', y: 'y', stroke: 'line' }),
      Plot.line(data.filter(d => d.line === 'numerical'), { ...line, x: 't', y: 'y', stroke: 'line', strokeDasharray: '10 6' }),
    ],
  }
}
