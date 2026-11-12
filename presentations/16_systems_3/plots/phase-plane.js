// Lecture 16: the phase plane of lecture 15's example, x' = x(1 - x) - xy,
// y' = y(2 - y) - 3xy: the direction field (grey arrows), the nullclines
// (x' = 0 blue, y' = 0 orange), and solutions (green) from the green dots.
// With `stability`, the fixed points are filled if stable ((1, 0) and (0, 2))
// and open if unstable ((0, 0) and the saddle (1/2, 1/2)), and the dashed line
// is the separatrix: the two solutions that come into the saddle along its
// stable eigenvector (1, sqrt 3), found by integrating backwards in time from
// just beside it. Solutions starting on one side of it go to (1, 0), and on the
// other side to (0, 2). The sliders start one more solution (black). The
// outward branch of the separatrix runs off to infinity at about t = 6.5
// backwards, so it stops at t = 6.4, well outside the plot.
import * as Plot from '@observablehq/plot'
import { directionField } from '#plots/marks.js'
import { linspace, odeint } from '#plots/numerics.js'
import { blue, dot, green, line, orange } from '#plots/style.js'

const black = '#1a1a1a'

export const controls = {
  x0: { label: 'start x₀', min: 0, max: 1.1, step: 0.01, value: 0.2, color: black },
  y0: { label: 'start y₀', min: 0, max: 2.1, step: 0.01, value: 1.5, color: black },
}

const f = ([x, y]) => [x * (1 - x) - x * y, y * (2 - y) - 3 * x * y]
const backwards = p => f(p).map(d => -d)

const xDomain = [-0.05, 1.1]
const yDomain = [-0.05, 2.1]
const xs = linspace(-0.1, 1.1, 24)
const field = directionField(f, xs, linspace(-0.1, 2.1, 24), xDomain, yDomain)

const starts = [[1.05, 1.0], [0.9, 1.3], [0.7, 1.6], [0.5, 1.8], [0.5, 0.2], [0.32, 0.2], [0.1, 0.2]]
const ts = linspace(0, 40, 800)
const trajectories = starts.map(start => odeint(f, start, ts))

const stable = [[1, 0], [0, 2]]
const unstable = [[0, 0], [0.5, 0.5]]

// The separatrix: from the saddle, a tiny step either way along (1, sqrt 3)
const eps = 1e-4 / 2
const separatrix = [
  odeint(backwards, [0.5 - eps, 0.5 - eps * Math.sqrt(3)], linspace(0, 15, 400)).reverse(),
  odeint(backwards, [0.5 + eps, 0.5 + eps * Math.sqrt(3)], linspace(0, 6.4, 400)),
].flat()

// `stability: false` draws every fixed point the same (for the recap), and
// `extra: false` leaves out the slider's solution (for the static export)
export default ({ x0, y0, stability = true, extra = true }) => ({
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
    ...(stability ? [Plot.line(separatrix, { ...line, stroke: black, strokeDasharray: '8 8', clip: true })] : []),
    ...(extra
      ? [
          Plot.line(odeint(f, [x0, y0], ts), { ...line, stroke: black, clip: true }),
          Plot.dot([[x0, y0]], { r: 6, fill: black }),
        ]
      : []),
    Plot.dot(stable, { ...dot, r: 8, fill: black }),
    Plot.dot(unstable, stability ? { r: 8, fill: 'white', stroke: black, strokeWidth: 3 } : { ...dot, r: 8, fill: black }),
  ],
})
