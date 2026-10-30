// Lecture 18, cell 22 (right): the standard normal cdf between its 1st and
// 99th percentiles
import * as Plot from '@observablehq/plot'
import { linspace, norm } from '#plots/numerics.js'
import { blue, line } from '#plots/style.js'

const ppf99 = 2.3263478740408408
const zs = linspace(-ppf99, ppf99, 100)

export default () => ({
  x: { label: 'z' },
  y: { label: 'F(z)' },
  marks: [
    Plot.line(zs, { ...line, x: z => z, y: z => norm.cdf(z), stroke: blue }),
  ],
})
