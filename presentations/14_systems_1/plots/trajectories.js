// Lecture 14: the solution of dx/dt = x + y, dy/dt = 2x from x(0) = 0, y(0) = 3,
// which is x = 2 v1 e^-t + v2 e^2t, with eigenvectors v1 = (-1/2, 1) (lambda = -1)
// and v2 = (1, 1) (lambda = 2). The grey arrows are the direction field, the
// dashed lines the two eigenvector directions. The slider is the time t, and the
// dot is the solution at that time: going back in time it comes in along v1, and
// as t grows the e^2t term takes over and it heads out along v2.
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { blue, dot, green, label, line, orange } from '#plots/style.js'

export const controls = {
  t: { min: -0.8, max: 0.6, step: 0.05, value: 0, color: green },
}

const solution = t => [Math.exp(2 * t) - Math.exp(-t), Math.exp(2 * t) + 2 * Math.exp(-t)]

const field = linspace(-4, 4, 17).flatMap(x => linspace(-3, 6, 19).map(y => {
  const [dx, dy] = [x + y, 2 * x]
  return { x, y, angle: Math.atan2(dx, dy) * 180 / Math.PI }
}))

const path = linspace(-2, 1, 300).map(solution)
const dashed = { ...line, strokeDasharray: '8 8', clip: true }

export default ({ t }) => ({
  aspectRatio: 1,
  x: { label: 'x', domain: [-4, 4] },
  y: { label: 'y', domain: [-3, 6] },
  marks: [
    Plot.vector(field, { x: 'x', y: 'y', rotate: 'angle', length: 12, anchor: 'start', stroke: '#c4c4c4', strokeWidth: 1.5 }),
    Plot.ruleX([0], { stroke: '#1a1a1a', strokeWidth: 1.5 }),
    Plot.ruleY([0], { stroke: '#1a1a1a', strokeWidth: 1.5 }),
    // the eigenvector directions: y = -2x (v1) and y = x (v2)
    Plot.line([[-4, 8], [4, -8]], { ...dashed, stroke: blue }),
    Plot.line([[-4, -4], [6, 6]], { ...dashed, stroke: orange }),
    Plot.text(['v₁'], { ...label, x: 1.5, y: -3, dx: 22, dy: -12 }),
    Plot.text(['v₂'], { ...label, x: -3, y: -3, dx: 22, dy: -6 }),
    Plot.line(path, { ...line, stroke: green, clip: true }),
    Plot.dot([solution(t)], { ...dot, r: 9, fill: green, clip: true }),
  ],
})
