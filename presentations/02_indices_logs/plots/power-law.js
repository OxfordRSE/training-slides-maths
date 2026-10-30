// Lecture 2, cell 41: the data to test against y = Ax^n, joined up
import * as Plot from '@observablehq/plot'
import { blue, dot, line, orange } from '#plots/style.js'
import data from './data/power-law.js'

export default () => ({
  x: { label: 'x' },
  y: { label: 'y' },
  marks: [
    Plot.line(data, { ...line, x: 'x', y: 'y', stroke: blue }),
    Plot.dot(data, { ...dot, x: 'x', y: 'y', fill: orange, r: 7 }),
  ],
})
