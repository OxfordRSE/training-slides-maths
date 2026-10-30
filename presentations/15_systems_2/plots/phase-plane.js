// Lecture 15, cell 15: the phase plane of x' = x(1 - x) - xy,
// y' = 2y(1 - y/2) - 3xy: nullclines, the direction field coloured by speed,
// and trajectories from the starred points
import * as Plot from '@observablehq/plot'
import { linspace, odeint } from '#plots/numerics.js'
import { blue, green, line, orange } from '#plots/style.js'

const dX = ([x, y]) => [x * (1 - x) - x * y, 2 * y * (1 - y / 2) - 3 * x * y]

const xs = linspace(-0.1, 1.1, 24)
const ys = linspace(-0.1, 2.1, 24)
const field = xs.flatMap(x => ys.map(y => {
  const [dx, dy] = dX([x, y])
  return { x, y, angle: Math.atan2(dx, dy) * 180 / Math.PI, speed: Math.hypot(dx, dy) }
}))

const starts = [[1.05, 1.0], [0.9, 1.3], [0.7, 1.6], [0.5, 1.8], [0.5, 0.2], [0.32, 0.2], [0.1, 0.2]]
const ts = linspace(0, 10, 100)
const trajectories = starts.map(start => odeint(dX, start, ts))

export default () => ({
  x: { label: 'x', domain: [-0.05, 1.1] },
  y: { label: 'y', domain: [-0.05, 2.1] },
  color: { scheme: 'viridis', label: 'speed' },
  marks: [
    Plot.vector(field, { x: 'x', y: 'y', rotate: 'angle', stroke: 'speed', length: 14, anchor: 'start', strokeWidth: 1.5, clip: true }),
    Plot.ruleY([0], { ...line, stroke: orange }),
    Plot.ruleX([0], { ...line, stroke: blue }),
    Plot.line(xs, { ...line, x: x => x, y: x => 1 - x, stroke: blue, clip: true }),
    Plot.line(xs, { ...line, x: x => x, y: x => 2 - 3 * x, stroke: orange, clip: true }),
    ...trajectories.map(points => Plot.line(points, { ...line, x: p => p[0], y: p => p[1], stroke: green, clip: true })),
    Plot.dot(starts, { x: p => p[0], y: p => p[1], symbol: 'star', r: 9, fill: green, stroke: 'white', strokeWidth: 1 }),
  ],
})
