// Lecture 1, cell 15: the quadratic data, with y plotted against x^2
import * as Plot from '@observablehq/plot'
import { blue, dot } from '#plots/style.js'
import data from './data/quadratic.js'

export default () => ({
  title: 'Linear trend',
  x: { label: 'X = x²' },
  y: { label: 'Y = y' },
  marks: [
    Plot.dot(data, { ...dot, x: d => d.x * d.x, y: 'y', fill: blue }),
  ],
})
