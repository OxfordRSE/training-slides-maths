// Lecture 15: the phase plane of x' = x(1 - x) - xy, y' = 2y(1 - y/2) - 3xy:
// the direction field (grey arrows), the nullclines (x' = 0 blue, y' = 0
// orange), the fixed points (black dots), and solutions (green) from the
// starting points of the 2018 notebook (green dots). The sliders pick one more
// starting point (open black circle), whose solution is drawn in black: not
// vermillion, which is too close to the orange nullclines, especially with
// red-green colour blindness. Solutions run to t = 40, long enough to reach
// their fixed point even when they pass close to the saddle at (1/2, 1/2).
import * as Plot from '@observablehq/plot'
import { directionField } from '#plots/marks.js'
import { linspace, odeint } from '#plots/numerics.js'
import { blue, dot, green, line, orange } from '#plots/style.js'
import { fixedPoints } from './nullclines.js'

const black = '#1a1a1a'

export const controls = {
  x0: { label: 'start x₀', min: 0, max: 1.1, step: 0.01, value: 0.2, color: black },
  y0: { label: 'start y₀', min: 0, max: 2.1, step: 0.01, value: 1.5, color: black },
}

const f = ([x, y]) => [x * (1 - x) - x * y, 2 * y * (1 - y / 2) - 3 * x * y]

const xDomain = [-0.05, 1.1]
const yDomain = [-0.05, 2.1]
const xs = linspace(-0.1, 1.1, 24)
const field = directionField(f, xs, linspace(-0.1, 2.1, 24), xDomain, yDomain)

const starts = [[1.05, 1.0], [0.9, 1.3], [0.7, 1.6], [0.5, 1.8], [0.5, 0.2], [0.32, 0.2], [0.1, 0.2]]
const ts = linspace(0, 40, 800)
const trajectories = starts.map(start => odeint(f, start, ts))

// `extra: false` leaves out the slider's solution (for the static export)
export default ({ x0, y0, extra = true }) => ({
  x: { label: 'x', domain: xDomain },
  y: { label: 'y', domain: yDomain },
  marks: [
    field,
    Plot.ruleY([0], { ...line, stroke: orange }),
    Plot.ruleX([0], { ...line, stroke: blue }),
    Plot.line(xs, { ...line, x: x => x, y: x => 1 - x, stroke: blue, clip: true }),
    Plot.line(xs, { ...line, x: x => x, y: x => 2 - 3 * x, stroke: orange, clip: true }),
    ...trajectories.map(points => Plot.line(points, { ...line, stroke: green, clip: true })),
    Plot.dot(starts, { ...dot, r: 7, fill: green }),
    ...(extra
      ? [
          Plot.line(odeint(f, [x0, y0], ts), { ...line, stroke: black, clip: true }),
          Plot.dot([[x0, y0]], { r: 8, fill: 'white', stroke: black, strokeWidth: 3 }),
        ]
      : []),
    Plot.dot(fixedPoints, { ...dot, r: 8, fill: black }),
  ],
})
