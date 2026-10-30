// Lecture 9, cell 23: e^x dy/dx = x/y with y(0) = 0. The exact solutions
// y = +-sqrt(-2e^-x (1 + x) + 2) (red) against numerical ones (dashed black),
// from y = 1e-8 as in the notebook, since dy/dx = x e^-x / y is undefined at 0
import * as Plot from '@observablehq/plot'
import { linspace, odeint } from '#plots/numerics.js'
import { line, vermillion } from '#plots/style.js'

const xs = linspace(0, 1, 100)
const exact = xs.map(x => Math.sqrt(-2 * Math.exp(-x) * (1 + x) + 2))
const numerical = odeint((y, x) => Math.exp(-x) * x / y, 1e-8, xs)

// Each solution's positive and negative branches, drawn as separate lines
const curves = [
  ['exact', exact],
  ['numerical', numerical],
].flatMap(([line, ys]) => [1, -1].flatMap(sign => xs.map((x, i) => ({ x, y: sign * ys[i], line, branch: `${line}${sign}` }))))

export default () => ({
  x: { label: 'x' },
  y: { label: 'y' },
  color: { domain: ['exact', 'numerical'], range: [vermillion, '#1a1a1a'], legend: true },
  marks: [
    Plot.line(curves.filter(d => d.line === 'exact'), { ...line, x: 'x', y: 'y', z: 'branch', stroke: 'line' }),
    Plot.line(curves.filter(d => d.line === 'numerical'), { ...line, x: 'x', y: 'y', z: 'branch', stroke: 'line', strokeDasharray: '10 6' }),
  ],
})
