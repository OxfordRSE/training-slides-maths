// Lecture 1, cell 24: the enzyme data, with 1/V plotted against 1/S
import * as Plot from '@observablehq/plot'
import { blue, dot } from '#plots/style.js'
import data from './data/enzyme.js'

export default () => ({
  x: { label: 'X = 1/S' },
  y: { label: 'Y = 1/V' },
  marks: [
    Plot.dot(data, { ...dot, x: d => 1 / d.S, y: d => 1 / d.V, fill: blue }),
  ],
})
