// Lecture 1, cells 26-27: the transformed enzyme data with a trendline
// Y = mX + c, whose gradient and intercept are sliders, as in the notebook
import * as Plot from '@observablehq/plot'
import { format } from '#plots/controls.js'
import { equation } from '#plots/marks.js'
import { blue, dot, line, orange } from '#plots/style.js'
import data from './data/enzyme.js'

export const controls = {
  m: { min: 2, max: 4, step: 0.05, value: 3, color: orange },
  c: { min: 0, max: 10, step: 0.2, value: 5, color: orange },
}

export default ({ m, c }) => ({
  x: { label: 'X = 1/S' },
  y: { label: 'Y = 1/V' },
  marks: [
    Plot.dot(data, { ...dot, x: d => 1 / d.S, y: d => 1 / d.V, fill: blue }),
    Plot.line([1.25, 5], { ...line, x: X => X, y: X => m * X + c, stroke: orange }),
    ...equation(`Y = ${format(m, controls.m)}X + ${format(c, controls.c)}`, orange),
  ],
})
