// y = a^x and its tangent where it crosses the y axis, at (0, 1). The tangent's
// gradient is ln a: less than 1 for a < e, exactly 1 for a = e, and more than
// 1 for a > e. y = e^x is drawn faintly for comparison.
import * as Plot from '@observablehq/plot'
import { format } from '#plots/controls.js'
import { legend } from '#plots/marks.js'
import { linspace } from '#plots/numerics.js'
import { blue, dot, label, line, orange } from '#plots/style.js'

export const controls = {
  // Fine enough to stop at a = 2.72, where the gradient reads 1.00
  a: { min: 0.5, max: 4, step: 0.01, value: 2, color: blue },
}

const xs = linspace(-1.5, 1.5, 200)
const tangentDash = '10 6'

export default ({ a }) => {
  const slope = Math.log(a)
  return {
    x: { label: 'x', domain: [-1.5, 1.5] },
    y: { label: 'y', domain: [-0.5, 4] },
    marks: [
      Plot.line(xs, { x: x => x, y: Math.exp, stroke: 'gray', strokeWidth: 2 }),
      Plot.line(xs, { ...line, x: x => x, y: x => a ** x, stroke: blue }),
      Plot.line([-1.5, 1.5], { ...line, x: x => x, y: x => 1 + slope * x, stroke: orange, strokeDasharray: tangentDash }),
      Plot.dot([0], { ...dot, x: () => 0, y: () => 1, fill: 'black', r: 7 }),
      ...legend([
        { text: `y = ${format(a, controls.a)}ˣ`, color: blue },
        { text: 'y = eˣ', color: 'gray' },
        { text: 'tangent at x = 0', color: orange, dasharray: tangentDash },
      ]),
      // With a minus sign (U+2212), not a hyphen, to match the axes
      Plot.text([`gradient = ln a = ${slope < 0 ? String.fromCharCode(0x2212) : ''}${Math.abs(slope).toFixed(2)}`], { ...label, frameAnchor: 'bottom-right', textAnchor: 'end', dx: -12, dy: -14 }),
    ],
  }
}
