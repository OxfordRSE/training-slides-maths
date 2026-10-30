// Lecture 9, cell 23: e^x dy/dx = x/y with y(0) = 0. The exact solutions
// y = +-sqrt(-2e^-x (1 + x) + 2) (red) against numerical ones (dashed black),
// from y = 1e-8 as in the notebook, since dy/dx = x e^-x / y is undefined at 0
import * as Plot from '@observablehq/plot'
import { linspace, odeint } from '#plots/numerics.js'
import { line, vermillion } from '#plots/style.js'

const xs = linspace(0, 1, 100)
const exact = xs.map(x => Math.sqrt(-2 * Math.exp(-x) * (1 + x) + 2))
const numerical = odeint((y, x) => Math.exp(-x) * x / y, 1e-8, xs)

const curves = [
  ['exact+', exact, 1],
  ['exact-', exact, -1],
  ['numerical+', numerical, 1],
  ['numerical-', numerical, -1],
].flatMap(([name, ys, sign]) => xs.map((x, i) => ({ x, y: sign * ys[i], name })))

export default () => ({
  x: { label: 'x' },
  y: { label: 'y' },
  color: {
    domain: ['exact+', 'exact-', 'numerical+', 'numerical-'],
    range: [vermillion, vermillion, '#1a1a1a', '#1a1a1a'],
    legend: true,
  },
  marks: [
    Plot.line(curves.filter(d => d.name.startsWith('exact')), { ...line, x: 'x', y: 'y', z: 'name', stroke: 'name' }),
    Plot.line(curves.filter(d => d.name.startsWith('numerical')), { ...line, x: 'x', y: 'y', z: 'name', stroke: 'name', strokeDasharray: '10 6' }),
  ],
})
