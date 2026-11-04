// The cut through z = x^2 - 2y^2 at y = y0 (partial-surface.js), drawn flat:
// with y held constant it is an ordinary curve in x, whose tangent at x = x0
// has gradient 2x0, the partial derivative dz/dx there. Takes y0 and x0 from
// partial-surface.js's sliders.
import * as Plot from '@observablehq/plot'
import { format } from '#plots/controls.js'
import { equation } from '#plots/marks.js'
import { linspace } from '#plots/numerics.js'
import { blue, dot, label, line, orange, vermillion } from '#plots/style.js'

const xs = linspace(-2, 2, 101)

export default ({ y0 = 1, x0 = 1 }) => {
  const z = x => x ** 2 - 2 * y0 ** 2
  const slope = 2 * x0
  const tangent = [-0.8, 0.8].map(h => ({ x: x0 + h, z: z(x0) + slope * h }))
  const y = format(y0, { step: 0.1 })

  return {
    x: { label: 'x', domain: [-2, 2] },
    y: { label: 'z', domain: [-9, 5] },
    marks: [
      Plot.line(xs, { ...line, x: x => x, y: z, stroke: blue }),
      Plot.line(tangent, { ...line, x: 'x', y: 'z', stroke: orange, strokeDasharray: '10 6' }),
      Plot.dot([{ x: x0, z: z(x0) }], { ...dot, x: 'x', y: 'z', fill: vermillion, r: 7 }),
      ...equation(`z = x² - 2(${y})²`, blue),
      Plot.text([`∂z/∂x = 2x = ${format(slope, { step: 0.1 })}`], { ...label, frameAnchor: 'bottom-right', textAnchor: 'end', dx: -12, dy: -14 }),
    ],
  }
}
