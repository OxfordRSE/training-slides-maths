// Content review: the data to test against N = N0 e^(kt)
import * as Plot from '@observablehq/plot'
import { blue, dot } from '#plots/style.js'
import data from './data/exponential-growth.js'

export default () => ({
  x: { label: 't (hours)' },
  y: { label: 'N' },
  marks: [
    Plot.dot(data, { ...dot, x: 't', y: 'N', fill: blue }),
  ],
})
