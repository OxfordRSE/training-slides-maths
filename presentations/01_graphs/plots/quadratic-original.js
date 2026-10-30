// Lecture 1, cell 13: the quadratic data, plotted as they are
import * as Plot from '@observablehq/plot'
import { blue, dot } from '#plots/style.js'
import data from './data/quadratic.js'

export default () => ({
  title: 'Nonlinear trend',
  x: { label: 'X = x' },
  y: { label: 'Y = y' },
  marks: [
    Plot.dot(data, { ...dot, x: 'x', y: 'y', fill: blue }),
  ],
})
