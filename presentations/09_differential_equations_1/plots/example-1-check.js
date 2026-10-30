// Lecture 9, cell 13: dy/dx = 2x + c with y(1) = c, for c = 1. The exact
// solution y = x^2 + cx - 1 (red) against a numerical solution (dashed black).
import * as Plot from '@observablehq/plot'
import { linspace, odeint } from '#plots/numerics.js'
import { line, vermillion } from '#plots/style.js'

const c = 1
const A = -1
const xs = linspace(1, 10, 100)
const exact = xs.map(x => x ** 2 + c * x + A)
const numerical = odeint((y, x) => 2 * x + c, c, xs)

const data = [
  ...xs.map((x, i) => ({ x, y: exact[i], line: 'exact' })),
  ...xs.map((x, i) => ({ x, y: numerical[i], line: 'numerical' })),
]

export default () => ({
  x: { label: 'x' },
  y: { label: 'y' },
  color: { domain: ['exact', 'numerical'], range: [vermillion, '#1a1a1a'], legend: true },
  marks: [
    Plot.line(data.filter(d => d.line === 'exact'), { ...line, x: 'x', y: 'y', stroke: 'line' }),
    Plot.line(data.filter(d => d.line === 'numerical'), { ...line, x: 'x', y: 'y', stroke: 'line', strokeDasharray: '10 6' }),
  ],
})
