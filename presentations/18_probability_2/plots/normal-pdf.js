// Lecture 18, cell 22 (left): the standard normal pdf between its 1st and 99th
// percentiles, over a density histogram of 1000 samples
import * as Plot from '@observablehq/plot'
import { histogram, linspace, norm } from '#plots/numerics.js'
import { rng } from '#plots/random.js'
import { blue, line } from '#plots/style.js'

const ppf99 = 2.3263478740408408
const zs = linspace(-ppf99, ppf99, 100)
const bins = histogram(rng(18).normal(0, 1, 1000))

export default () => ({
  x: { label: 'z' },
  y: { label: 'f(z)' },
  marks: [
    Plot.rectY(bins, { x1: 'x1', x2: 'x2', y: 'y', fill: blue, fillOpacity: 0.2 }),
    Plot.line(zs, { ...line, x: z => z, y: z => norm.pdf(z), stroke: blue }),
  ],
})
