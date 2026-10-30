// Lecture 15, cell 14: the nullclines of x' = x(1 - x) - xy,
// y' = 2y(1 - y/2) - 3xy; x-nullclines in blue, y-nullclines in orange
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { blue, line, orange } from '#plots/style.js'

const xs = linspace(-0.1, 1.1, 24)

export default () => ({
  x: { label: 'x', domain: [-0.05, 1.1] },
  y: { label: 'y', domain: [-0.05, 2.1] },
  marks: [
    Plot.ruleY([0], { ...line, stroke: orange }),
    Plot.ruleX([0], { ...line, stroke: blue }),
    Plot.line(xs, { ...line, x: x => x, y: x => 1 - x, stroke: blue, clip: true }),
    Plot.line(xs, { ...line, x: x => x, y: x => 2 - 3 * x, stroke: orange, clip: true }),
  ],
})
