// Lecture 6, cells 8-9: the area under y = x^2 between x = 1 and x = 2,
// approximated by n strips, each as tall as the curve at its right edge. The
// number of strips was a slider in the notebook.
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { blue, line } from '#plots/style.js'

export const controls = {
  n: { min: 1, max: 50, step: 1, value: 5 },
}

const f = x => x ** 2

export default ({ n }) => {
  const width = 1 / n
  const strips = Array.from({ length: n }, (_, i) => 1 + i * width)
  return {
    title: 'Integration approximation with multiple rectangles',
    x: { label: 'x', domain: [0.8, 2.2] },
    y: { label: 'f(x)', domain: [0, 5] },
    marks: [
      Plot.rect(strips, { x1: x => x, x2: x => x + width, y1: 0, y2: x => f(x + width), fill: '#1a1a1a', fillOpacity: 0.4, stroke: 'white', strokeWidth: 0.5 }),
      Plot.line(linspace(0.8, 2.2, 200), { ...line, x: x => x, y: f, stroke: blue }),
      Plot.ruleX([1, 2], { y1: 0, y2: f, stroke: 'gray', strokeWidth: 2, strokeDasharray: '6 4' }),
    ],
  }
}
