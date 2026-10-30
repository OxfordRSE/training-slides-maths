// Content review: the same data with only N logged, Y = ln(N) against X = t
import * as Plot from '@observablehq/plot'
import { blue, dot, line, orange } from '#plots/style.js'
import data from './data/exponential-growth.js'

const logs = data.map(d => ({ X: d.t, Y: Math.log(d.N) }))

export default () => ({
  x: { label: 'X = t (hours)' },
  y: { label: 'Y = ln(N)' },
  marks: [
    Plot.line(logs, { ...line, x: 'X', y: 'Y', stroke: blue }),
    Plot.dot(logs, { ...dot, x: 'X', y: 'Y', fill: orange, r: 7 }),
  ],
})
