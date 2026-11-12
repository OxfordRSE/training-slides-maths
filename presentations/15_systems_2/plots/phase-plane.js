// Lecture 15: the phase plane of x' = x(1 - x) - xy, y' = 2y(1 - y/2) - 3xy:
// the direction field (grey arrows), the nullclines (x' = 0 blue, y' = 0
// orange), the fixed points (dots), and solutions (green) from the starred
// points, as in the 2018 notebook. The sliders pick one more starting point,
// whose solution is drawn in vermillion.
import * as Plot from '@observablehq/plot'
import { linspace, odeint } from '#plots/numerics.js'
import { blue, dot, green, line, orange, vermillion } from '#plots/style.js'
import { fixedPoints } from './nullclines.js'

export const controls = {
  x0: { label: 'start x₀', min: 0, max: 1.1, step: 0.05, value: 0.2, color: vermillion },
  y0: { label: 'start y₀', min: 0, max: 2.1, step: 0.05, value: 1.5, color: vermillion },
}

const f = ([x, y]) => [x * (1 - x) - x * y, 2 * y * (1 - y / 2) - 3 * x * y]

const xs = linspace(-0.1, 1.1, 24)
const ys = linspace(-0.1, 2.1, 24)
const field = xs.flatMap(x => ys.map(y => {
  const [dx, dy] = f([x, y])
  return { x, y, angle: Math.atan2(dx, dy) * 180 / Math.PI }
}))

const starts = [[1.05, 1.0], [0.9, 1.3], [0.7, 1.6], [0.5, 1.8], [0.5, 0.2], [0.32, 0.2], [0.1, 0.2]]
const ts = linspace(0, 10, 200)
const trajectories = starts.map(start => odeint(f, start, ts))

// `extra: false` leaves out the slider's solution (for the static export)
export default ({ x0, y0, extra = true }) => ({
  x: { label: 'x', domain: [-0.05, 1.1] },
  y: { label: 'y', domain: [-0.05, 2.1] },
  marks: [
    Plot.vector(field, { x: 'x', y: 'y', rotate: 'angle', length: 12, anchor: 'start', stroke: '#c4c4c4', strokeWidth: 1.5, clip: true }),
    Plot.ruleY([0], { ...line, stroke: orange }),
    Plot.ruleX([0], { ...line, stroke: blue }),
    Plot.line(xs, { ...line, x: x => x, y: x => 1 - x, stroke: blue, clip: true }),
    Plot.line(xs, { ...line, x: x => x, y: x => 2 - 3 * x, stroke: orange, clip: true }),
    ...trajectories.map(points => Plot.line(points, { ...line, stroke: green, clip: true })),
    Plot.dot(starts, { symbol: 'star', r: 9, fill: green, stroke: 'white', strokeWidth: 1 }),
    ...(extra
      ? [
          Plot.line(odeint(f, [x0, y0], ts), { ...line, stroke: vermillion, clip: true }),
          Plot.dot([[x0, y0]], { ...dot, r: 8, fill: vermillion }),
        ]
      : []),
    Plot.dot(fixedPoints, { ...dot, r: 8, fill: '#1a1a1a' }),
  ],
})
