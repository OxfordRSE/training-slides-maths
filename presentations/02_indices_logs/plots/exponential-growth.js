// Content review: the data to test against N = N0 e^(kt), joined up
import * as Plot from '@observablehq/plot'
import { blue, dot, line, orange } from '#plots/style.js'
import data from './data/exponential-growth.js'

export default () => ({
  x: { label: 't (hours)' },
  y: { label: 'N' },
  marks: [
    Plot.line(data, { ...line, x: 't', y: 'N', stroke: blue }),
    Plot.dot(data, { ...dot, x: 't', y: 'N', fill: orange, r: 7 }),
  ],
})
