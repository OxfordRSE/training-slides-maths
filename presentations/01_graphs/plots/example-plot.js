// Lecture 1, cells 3-4: an example plot with a title and axis labels, of
// made-up data with a clear trend (a straight line plus a little noise; the
// notebook used a noisy sine curve, which made a busy first example)
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { rng } from '#plots/random.js'
import { blue, dot } from '#plots/style.js'

const x = linspace(0, 25, 40)
const e = rng(1).normal(0, 0.8, 40)
const points = x.map((xi, i) => ({ x: xi, y: 2 + 0.6 * xi + e[i] }))

export default () => ({
  title: 'Plot title',
  x: { label: 'x-label (units)' },
  y: { label: 'y-label (units)' },
  marks: [
    Plot.dot(points, { ...dot, x: 'x', y: 'y', fill: blue }),
  ],
})
