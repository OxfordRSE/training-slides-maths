// The quadratic data with y plotted against x^p, and the least-squares straight
// line through them: the points lie along the line only at p = 2, so the
// slider shows the test failing as well as passing
import * as Plot from '@observablehq/plot'
import { mean } from 'd3-array'
import { blue, dot, line, orange } from '#plots/style.js'
import data from './data/quadratic.js'

export const controls = {
  p: { min: 1, max: 3, step: 0.1, value: 1, color: blue },
}

export default ({ p }) => {
  const points = data.map(d => ({ X: d.x ** p, Y: d.y }))
  const Xbar = mean(points, d => d.X)
  const Ybar = mean(points, d => d.Y)
  const m = mean(points, d => (d.X - Xbar) * (d.Y - Ybar)) / mean(points, d => (d.X - Xbar) ** 2)
  const Xmax = 8 ** p
  return {
    x: { label: 'X = xᵖ', domain: [0, Xmax] },
    y: { label: 'Y = y' },
    marks: [
      Plot.dot(points, { ...dot, x: 'X', y: 'Y', fill: blue }),
      Plot.line([0, Xmax], { ...line, x: X => X, y: X => Ybar + m * (X - Xbar), stroke: orange }),
    ],
  }
}
