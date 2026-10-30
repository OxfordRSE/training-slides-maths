// Lecture 1, cell 22: the enzyme data, plotted as they are
import * as Plot from '@observablehq/plot'
import { blue, dot } from '#plots/style.js'
import data from './data/enzyme.js'

export default () => ({
  title: 'Original data',
  x: { label: 'S' },
  y: { label: 'V' },
  marks: [
    Plot.dot(data, { ...dot, x: 'S', y: 'V', fill: blue }),
  ],
})
