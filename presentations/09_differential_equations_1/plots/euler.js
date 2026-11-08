// Lecture 9: Euler's method for dy/dx = 2x + c with y(1) = c, for c = 1,
// against the exact solution y = x^2 + cx - 1. The step size h is a slider;
// if h does not divide the interval, the last step is shorter, to end at x = 10.
import * as Plot from '@observablehq/plot'
import { format } from '#plots/controls.js'
import { linspace } from '#plots/numerics.js'
import { legend } from '#plots/marks.js'
import { blue, dot, label, line, vermillion } from '#plots/style.js'

export const controls = {
  h: { min: 0.1, max: 3, step: 0.1, value: 3, color: blue },
}

const c = 1
const x0 = 1
const x1 = 10
const exact = x => x ** 2 + c * x - 1
const dydx = (x, y) => 2 * x + c
const xs = linspace(x0, x1, 200)

function euler(h) {
  const steps = [{ x: x0, y: c }]
  while (x1 - steps.at(-1).x > 1e-9) {
    const { x, y } = steps.at(-1)
    const step = Math.min(h, x1 - x)
    steps.push({ x: x + step, y: y + step * dydx(x, y) })
  }
  return steps
}

export default ({ h }) => {
  const steps = euler(h)
  const error = exact(x1) - steps.at(-1).y
  return {
    x: { label: 'x', domain: [x0, x1] },
    y: { label: 'y', domain: [0, 115] },
    marks: [
      Plot.line(xs, { ...line, x: x => x, y: exact, stroke: vermillion }),
      Plot.line(steps, { ...line, x: 'x', y: 'y', stroke: blue }),
      Plot.dot(steps, { ...dot, x: 'x', y: 'y', fill: blue }),
      ...legend([
        { text: 'exact', color: vermillion },
        { text: 'Euler', color: blue },
      ]),
      Plot.text([`error at x = 10: ${format(error, { step: 0.01 })}`], { ...label, frameAnchor: 'bottom-right', textAnchor: 'end', dx: -12, dy: -14 }),
    ],
  }
}
