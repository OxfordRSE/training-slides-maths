// Lecture 2, cell 41: the data to test against y = Ax^n
import * as Plot from '@observablehq/plot'
import { blue, dot } from '#plots/style.js'
import data from './data/power-law.js'

export default () => ({
  x: { label: 'x' },
  y: { label: 'y' },
  marks: [
    Plot.dot(data, { ...dot, x: 'x', y: 'y', fill: blue }),
  ],
})
