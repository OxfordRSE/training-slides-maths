// Lecture 2, cell 43: the same data on log scales, X = log10(x) and Y = log10(y)
// (W and Z in the notebook; X and Y here, to match lecture 1's linearising recipe)
import * as Plot from '@observablehq/plot'
import { blue, dot } from '#plots/style.js'
import data from './data/power-law.js'

const logs = data.map(d => ({ X: Math.log10(d.x), Y: Math.log10(d.y) }))

export default () => ({
  x: { label: 'X = log₁₀(x)' },
  y: { label: 'Y = log₁₀(y)' },
  marks: [
    Plot.dot(logs, { ...dot, x: 'X', y: 'Y', fill: blue }),
  ],
})
