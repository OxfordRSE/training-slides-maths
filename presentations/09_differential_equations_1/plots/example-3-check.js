// Lecture 9, cell 23: e^x dy/dx = x/y with y(0) = 0. The exact positive solution
// y = sqrt(-2e^-x (1 + x) + 2) (red) against the numerical one (dashed black),
// from y = 1e-8 as in the notebook, since dy/dx = x e^-x / y is undefined at 0.
// Only the positive solution, as in the code on the slide; the negative one is
// its mirror image.
import * as Plot from '@observablehq/plot'
import { linspace, odeint } from '#plots/numerics.js'
import { line, vermillion } from '#plots/style.js'

const xs = linspace(0, 1, 100)
const exact = xs.map(x => Math.sqrt(-2 * Math.exp(-x) * (1 + x) + 2))
const numerical = odeint((y, x) => Math.exp(-x) * x / y, 1e-8, xs)

export default () => ({
  x: { label: 'x' },
  y: { label: 'y' },
  color: { domain: ['exact', 'numerical'], range: [vermillion, '#1a1a1a'], legend: true },
  marks: [
    Plot.line(xs, { ...line, x: x => x, y: (_, i) => exact[i], stroke: () => 'exact' }),
    Plot.line(xs, { ...line, x: x => x, y: (_, i) => numerical[i], stroke: () => 'numerical', strokeDasharray: '10 6' }),
  ],
})
