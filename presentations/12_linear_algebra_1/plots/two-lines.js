// Lecture 12: two simultaneous equations as two straight lines in the (x, y)
// plane, x + 5y = 11 (fixed) and ax + 5y = 9 (slider a). The solution is where
// they cross, x = 2/(1 - a), y = (11 - x)/5; at a = -1 that is (1, 2), the
// lecture's worked example. The determinant of the coefficients is 5 - 5a, and
// as a -> 1 it goes to 0 and the lines become parallel (no solution).
import * as Plot from '@observablehq/plot'
import { legend } from '#plots/marks.js'
import { linspace } from '#plots/numerics.js'
import { blue, dot, label, line, vermillion } from '#plots/style.js'

export const controls = {
  a: { min: -2, max: 2, step: 0.05, value: -1, color: vermillion },
}

// Zoomed out, so the crossing point can be followed a long way as the lines
// turn towards parallel (x = 20 at a = 0.9)
const [x0, x1] = [-10, 30]
const xs = linspace(x0, x1, 2)

export default ({ a: raw }) => {
  const a = +raw.toFixed(2)
  const det = 5 - 5 * a
  const meets = Math.abs(det) > 1e-9
  const x = meets ? 2 / (1 - a) : NaN
  const y = (11 - x) / 5
  const shown = meets && x >= x0 && x <= x1
  const coef = a === 1 ? '' : a === -1 ? '-' : `${a}`
  return {
    x: { label: 'x', domain: [x0, x1] },
    y: { label: 'y', domain: [-5, 6] },
    marks: [
      ...legend([
        { text: 'x + 5y = 11', color: blue },
        { text: a === 0 ? '5y = 9' : `${coef}x + 5y = 9`, color: vermillion },
      ]),
      Plot.line(xs, { ...line, x: t => t, y: t => (11 - t) / 5, stroke: blue, clip: true }),
      Plot.line(xs, { ...line, x: t => t, y: t => (9 - a * t) / 5, stroke: vermillion, clip: true }),
      shown ? Plot.dot([{ x, y }], { ...dot, x: 'x', y: 'y', r: 8, fill: '#1a1a1a' }) : null,
      Plot.text([meets ? `determinant 5 - 5a = ${det.toFixed(2)}` : 'determinant 0: the lines are parallel'], { ...label, frameAnchor: 'bottom-right', dx: -8, dy: -8, textAnchor: 'end' }),
    ],
  }
}
