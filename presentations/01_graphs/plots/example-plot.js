// Lecture 1, cells 3-4: an example plot with a title and axis labels, of
// made-up data (a sine curve plus noise)
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { rng } from '#plots/random.js'
import { blue, dot } from '#plots/style.js'

const x = linspace(0, 25, 100)
const e = rng(1).normal(0, 0.2, 100)
const points = x.map((xi, i) => ({ x: xi, y: Math.sin(xi) + e[i] }))

export default () => ({
  title: 'Plot title',
  x: { label: 'x-label (units)' },
  y: { label: 'y-label (units)' },
  marks: [
    Plot.dot(points, { ...dot, x: 'x', y: 'y', fill: blue }),
  ],
})
