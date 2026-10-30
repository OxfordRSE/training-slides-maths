// Lecture 8, cell 38 (left): the line from (0, 0) to (1, 1) in cartesian coordinates
import * as Plot from '@observablehq/plot'
import { blue, dot, line } from '#plots/style.js'

const points = [{ x: 0, y: 0 }, { x: 1, y: 1 }]

export default () => ({
  title: 'Cartesian plot',
  x: { label: 'X-axis' },
  y: { label: 'Y-axis' },
  marks: [
    Plot.line(points, { ...line, x: 'x', y: 'y', stroke: blue }),
    Plot.dot(points, { ...dot, x: 'x', y: 'y', fill: blue }),
  ],
})
