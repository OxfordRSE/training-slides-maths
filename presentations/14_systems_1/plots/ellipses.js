// Lecture 14: the paths of dx/dt = -y, dy/dt = 4x, found by eliminating t:
// dy/dx = -4x/y, so 4x^2 + y^2 = C, a family of ellipses. The solution from
// (x0, 0) is x = x0 cos 2t, y = 2 x0 sin 2t, with C = 4 x0^2, and it goes once
// round its ellipse, anticlockwise, every pi units of time. The sliders are the
// constant C (which picks the ellipse, starting at x0 = sqrt(C)/2) and the time
// t, as a fraction of pi; the grey arrows are the direction field.
import * as Plot from '@observablehq/plot'
import { piFraction } from '#plots/controls.js'
import { linspace } from '#plots/numerics.js'
import { dot, green, line, vermillion } from '#plots/style.js'

const n = 24

export const controls = {
  C: { min: 0.25, max: 9, step: 0.25, value: 4, color: green },
  k: { label: 't', min: 0, max: n, step: 1, value: 0, color: vermillion, format: k => piFraction(k, n) },
}

const field = linspace(-2, 2, 11).flatMap(x => linspace(-3.2, 3.2, 17).map(y => {
  const [dx, dy] = [-y, 4 * x]
  return { x, y, angle: Math.atan2(dx, dy) * 180 / Math.PI }
}))

const angles = linspace(0, 2 * Math.PI, 200)

export default ({ C, k }) => {
  const x0 = Math.sqrt(C) / 2
  const t = k * Math.PI / n
  return {
    aspectRatio: 1,
    x: { label: 'x', domain: [-2, 2] },
    y: { label: 'y', domain: [-3.2, 3.2] },
    marks: [
      Plot.vector(field, { x: 'x', y: 'y', rotate: 'angle', length: 12, anchor: 'start', stroke: '#c4c4c4', strokeWidth: 1.5 }),
      Plot.ruleX([0], { stroke: '#1a1a1a', strokeWidth: 1.5 }),
      Plot.ruleY([0], { stroke: '#1a1a1a', strokeWidth: 1.5 }),
      Plot.line(angles, { ...line, x: a => x0 * Math.cos(a), y: a => 2 * x0 * Math.sin(a), stroke: green }),
      Plot.dot([[x0 * Math.cos(2 * t), 2 * x0 * Math.sin(2 * t)]], { ...dot, r: 9, fill: vermillion }),
    ],
  }
}
