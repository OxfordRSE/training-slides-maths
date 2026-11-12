// Lecture 16: the types of fixed point in the (determinant, trace) plane of J,
// redrawn from the old diagram. Delta = det J across, tau = tr J up. Delta < 0
// gives a saddle; for Delta > 0, tau < 0 is stable and tau > 0 unstable, with
// nodes outside the parabola tau^2 = 4 Delta (orange) and spirals inside it;
// centres lie on the positive Delta axis, and stars and degenerate nodes on the
// parabola. Each region has a small phase portrait of an example matrix, with
// its fixed point, arrows showing the direction of motion, and (for real
// eigenvalues) its eigenvector directions. The nodes and the saddle use the
// same matrices as linear-portrait.js's preset buttons; the spirals here decay
// more slowly (real part +-0.2), so they turn a few times inside the small
// portrait. Equal units, so the portraits are not squashed.
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { dot, green, label, line, orange } from '#plots/style.js'

const black = '#1a1a1a'

// The solution of x' = Mx through `start`, by fixed-step RK4, forwards (sign 1)
// or backwards (sign -1), inside the unit circle
function path(M, start, sign, steps = 1500) {
  const f = ([x, y]) => [sign * (M[0] * x + M[1] * y), sign * (M[2] * x + M[3] * y)]
  const h = 0.02
  const points = [start]
  let p = start
  for (let i = 0; i < steps; i++) {
    const k1 = f(p)
    const k2 = f(p.map((v, j) => v + h / 2 * k1[j]))
    const k3 = f(p.map((v, j) => v + h / 2 * k2[j]))
    const k4 = f(p.map((v, j) => v + h * k3[j]))
    p = p.map((v, j) => v + h / 6 * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]))
    if (Math.hypot(...p) > 1 || Math.hypot(...p) < 0.03)
      break
    points.push(p)
  }
  return points
}

// The real eigenvalues of M = (a b; c d), each with a unit eigenvector (none
// if they are complex)
function eigen([a, b, c, d]) {
  const tr = a + d
  const disc = tr * tr - 4 * (a * d - b * c)
  if (disc < 0)
    return []
  return [-1, 1].map((s) => {
    const lambda = (tr + s * Math.sqrt(disc)) / 2
    const v = Math.abs(b) > 1e-9 ? [b, lambda - a] : Math.abs(c) > 1e-9 ? [lambda - d, c] : (s < 0 ? [1, 0] : [0, 1])
    const n = Math.hypot(...v)
    return { lambda, v: [v[0] / n, v[1] / n] }
  })
}

// A small phase portrait of x' = Mx, centred at `at`, `r` across in data units
function portrait({ M, at, starts }, r) {
  const place = ([x, y]) => [at[0] + r * x, at[1] + r * y]
  const scale = (v, k) => [k * v[0], k * v[1]]
  const solutions = starts.map(s => [...path(M, s, -1).reverse(), ...path(M, s, 1).slice(1)])
  const arrows = starts.map((s) => {
    const d = [M[0] * s[0] + M[1] * s[1], M[2] * s[0] + M[3] * s[1]]
    const n = Math.hypot(...d) || 1
    return { from: s, to: [s[0] + 0.25 * d[0] / n, s[1] + 0.25 * d[1] / n] }
  })
  // Along each eigenvector, both ways: a ray from the fixed point, with an
  // arrow pointing in (negative eigenvalue) or out (positive)
  const rays = eigen(M).flatMap(({ lambda, v }) => [1, -1].map((s) => {
    const u = scale(v, s)
    return { u, from: scale(u, lambda < 0 ? 0.95 : 0.45), to: scale(u, lambda < 0 ? 0.55 : 0.85) }
  }))
  return [
    ...solutions.map(points => Plot.line(points.map(place), { stroke: green, strokeWidth: 2 })),
    ...rays.map(({ u }) => Plot.line([place([0, 0]), place(u)], { stroke: green, strokeWidth: 2 })),
    Plot.arrow([...arrows, ...rays], {
      x1: d => place(d.from)[0], y1: d => place(d.from)[1], x2: d => place(d.to)[0], y2: d => place(d.to)[1],
      stroke: green, strokeWidth: 2, headLength: 8,
    }),
    Plot.dot([at], { ...dot, r: 4, fill: black }),
  ]
}

const ring = (n, radius = 0.9, phase = 0.4) => linspace(0, 2 * Math.PI, n + 1).slice(0, n).map(t => [radius * Math.cos(t + phase), radius * Math.sin(t + phase)])

const r = 0.95
const examples = [
  { text: 'saddle', M: [1, 1, 2, 0], at: [-2.2, 2.2], starts: ring(4, 0.9, 0.9), labelAt: [-2.2, 0.8] },
  { text: 'unstable node', M: [2, 1, 1, 2], at: [1.0, 3.7], starts: ring(4, 0.9, 0), labelAt: [1.0, 5.1] },
  { text: 'stable node', M: [-2, 1, 1, -2], at: [1.0, -3.7], starts: ring(4, 0.9, 0), labelAt: [1.0, -5.1] },
  { text: 'unstable spiral', M: [0.2, 1, -1, 0.2], at: [4.6, 2.3], starts: [[0.95, 0]], labelAt: [4.6, 0.85] },
  { text: 'stable spiral', M: [-0.2, 1, -1, -0.2], at: [4.6, -2.3], starts: [[0.95, 0]], labelAt: [4.6, -0.85] },
  { text: 'centre', M: [0, 1, -1, 0], at: [7.0, 0], starts: [[0.45, 0], [0.9, 0]], labelAt: [7.0, -1.45] },
]

const parabola = linspace(-5.5, 5.5, 200).map(tau => [tau * tau / 4, tau])

export default () => ({
  aspectRatio: 1,
  x: { label: 'Δ = det J', domain: [-4, 8] },
  y: { label: 'τ = tr J', domain: [-5.5, 5.5] },
  marks: [
    Plot.ruleX([0], { stroke: black, strokeWidth: 2 }),
    Plot.ruleY([0], { stroke: black, strokeWidth: 2 }),
    Plot.line(parabola, { ...line, stroke: orange, clip: true }),
    ...examples.flatMap(e => portrait(e, r)),
    Plot.text(examples, { ...label, fontSize: 16, x: e => e.labelAt[0], y: e => e.labelAt[1], text: 'text', textAnchor: e => e.anchor ?? 'middle' }),
    Plot.text(['τ² = 4Δ'], { ...label, fontSize: 16, x: 7.9, y: 4.4, textAnchor: 'end' }),
  ],
})
