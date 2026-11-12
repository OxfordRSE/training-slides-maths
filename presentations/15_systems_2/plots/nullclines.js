// Lecture 15: the nullclines of x' = x(1 - x) - xy, y' = 2y(1 - y/2) - 3xy.
// The x-nullclines (x' = 0, blue) are x = 0 and y = 1 - x; the y-nullclines
// (y' = 0, orange) are y = 0 and y = 2 - 3x. The fixed points (dots) are where
// an x-nullcline crosses a y-nullcline: (0, 0), (1, 0), (0, 2) and (1/2, 1/2).
// The y range leaves room at the top for the legend.
import * as Plot from '@observablehq/plot'
import { legend } from '#plots/marks.js'
import { linspace } from '#plots/numerics.js'
import { blue, dot, line, orange } from '#plots/style.js'

const xs = linspace(-0.1, 1.1, 24)
export const fixedPoints = [[0, 0], [1, 0], [0, 2], [0.5, 0.5]]

export default () => ({
  x: { label: 'x', domain: [-0.05, 1.1] },
  y: { label: 'y', domain: [-0.05, 2.5] },
  marks: [
    Plot.ruleY([0], { ...line, stroke: orange }),
    Plot.ruleX([0], { ...line, stroke: blue }),
    Plot.line(xs, { ...line, x: x => x, y: x => 1 - x, stroke: blue, clip: true }),
    Plot.line(xs, { ...line, x: x => x, y: x => 2 - 3 * x, stroke: orange, clip: true }),
    Plot.dot(fixedPoints, { ...dot, r: 8, fill: '#1a1a1a' }),
    ...legend([
      { text: 'x-nullclines, dx/dt = 0', color: blue },
      { text: 'y-nullclines, dy/dt = 0', color: orange },
    ]),
  ],
})
