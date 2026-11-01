// Lecture 8, cell 38 (left): the line from (0, 0) to (1, 1) in cartesian coordinates.
// Equal units on x and y, as in the polar plot beside it, so that the line
// rises at the same 45 degrees in both.
import * as Plot from '@observablehq/plot'
import { blue, dot, line } from '#plots/style.js'

const points = [{ x: 0, y: 0 }, { x: 1, y: 1 }]

export default () => ({
  title: 'Cartesian plot',
  aspectRatio: 1,
  x: { label: 'X-axis', domain: [0, 1] },
  y: { label: 'Y-axis', domain: [0, 1] },
  marks: [
    Plot.line(points, { ...line, x: 'x', y: 'y', stroke: blue }),
    Plot.dot(points, { ...dot, x: 'x', y: 'y', fill: blue }),
  ],
})
