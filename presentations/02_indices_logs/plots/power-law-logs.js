// Lecture 2, cell 43: the same data on log scales, W = log10(x) and Z = log10(y)
import * as Plot from '@observablehq/plot'
import { blue, dot, line, orange } from '#plots/style.js'
import data from './data/power-law.js'

const logs = data.map(d => ({ W: Math.log10(d.x), Z: Math.log10(d.y) }))

export default () => ({
  x: { label: 'W = log₁₀(x)' },
  y: { label: 'Z = log₁₀(y)' },
  marks: [
    Plot.line(logs, { ...line, x: 'W', y: 'Z', stroke: blue }),
    Plot.dot(logs, { ...dot, x: 'W', y: 'Z', fill: orange, r: 7 }),
  ],
})
