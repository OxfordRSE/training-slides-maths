// Lecture 1, cells 17-18: the transformed quadratic data with a trendline
// Y = mX + c, whose gradient and intercept are sliders, as in the notebook
import * as Plot from '@observablehq/plot'
import { format } from '#plots/controls.js'
import { equation } from '#plots/marks.js'
import { blue, dot, line, orange } from '#plots/style.js'
import data from './data/quadratic.js'

export const controls = {
  m: { min: 3, max: 7, step: 0.05, value: 5, color: orange },
  c: { min: 2, max: 172, step: 1, value: 87, color: orange },
}

const ys = data.map(d => d.y)

export default ({ m, c }) => ({
  title: 'Linear trend with trendline',
  x: { label: 'X = x²', domain: [0, 64] },
  y: { label: 'Y = y', domain: [Math.min(...ys) - 10, Math.max(...ys) + 10] },
  marks: [
    Plot.dot(data, { ...dot, x: d => d.x * d.x, y: 'y', fill: blue }),
    Plot.line([0, 64], { ...line, x: X => X, y: X => m * X + c, stroke: orange }),
    ...equation(`Y = ${format(m, controls.m)}X + ${format(c, controls.c)}`, orange),
  ],
})
