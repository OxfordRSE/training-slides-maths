// Lecture 16: the phase portrait of the linear system x' = ax + by,
// y' = cx + dy, with a slider for each entry of A = (a b; c d). It shows the
// direction field (grey arrows), solutions through eight points on a circle
// (green, drawn forwards and backwards in time), the eigenvector directions
// when the eigenvalues are real (dashed blue for lambda1, orange for lambda2),
// and the eigenvalues and type of the fixed point at the origin. It starts at
// lecture 14's matrix (1 1; 2 0), a saddle with eigenvalues -1 and 2.
import * as Plot from '@observablehq/plot'
import { directionField } from '#plots/marks.js'
import { linspace } from '#plots/numerics.js'
import { blue, dot, green, label, line, mono, orange } from '#plots/style.js'

const entry = value => ({ min: -2, max: 2, step: 0.01, value, color: '#1a1a1a' })
export const controls = { a: entry(1), b: entry(1), c: entry(2), d: entry(0) }

// Wider than tall, with equal units: the sliders span the axes' width, and
// four of them need the room
const xDomain = [-3, 3]
const yDomain = [-2, 2]
const tiny = 1e-9

// The solution through a point, by fixed-step RK4, forwards (sign 1) or
// backwards (sign -1) in time, until it leaves the box or nearly stops
function path(f, start, sign) {
  const g = p => f(p).map(v => sign * v)
  const h = 0.01
  const points = [start]
  let p = start
  for (let i = 0; i < 2000; i++) {
    const k1 = g(p)
    const k2 = g(p.map((v, j) => v + h / 2 * k1[j]))
    const k3 = g(p.map((v, j) => v + h / 2 * k2[j]))
    const k4 = g(p.map((v, j) => v + h * k3[j]))
    p = p.map((v, j) => v + h / 6 * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]))
    points.push(p)
    if (Math.abs(p[0]) > 1.5 * xDomain[1] || Math.abs(p[1]) > 1.5 * yDomain[1] || Math.hypot(...p) < 1e-3)
      break
  }
  return points
}

// The eigenvalues and type of the fixed point, from the trace and determinant
function classify(a, b, c, d) {
  const tr = a + d
  const det = a * d - b * c
  const disc = tr * tr - 4 * det
  const n = x => (Math.abs(x) < 0.005 ? 0 : x).toFixed(2)
  if (Math.abs(det) < tiny)
    return { real: true, lambdas: [0, tr], text: `λ = ${n(0)}, ${n(tr)}\na line of fixed points` }
  if (disc < -tiny) {
    const re = tr / 2
    const im = Math.sqrt(-disc) / 2
    const kind = Math.abs(tr) < tiny ? 'centre' : tr < 0 ? 'stable spiral' : 'unstable spiral'
    return { real: false, text: `λ = ${n(re)} ± ${n(im)}i\n${kind}` }
  }
  const root = Math.sqrt(Math.max(disc, 0))
  const lambdas = [(tr - root) / 2, (tr + root) / 2]
  const sign = tr < 0 ? 'stable' : 'unstable'
  let kind
  if (det < 0)
    kind = 'saddle'
  else if (Math.abs(disc) < tiny)
    kind = Math.abs(b) < tiny && Math.abs(c) < tiny ? `${sign} star` : `${sign} degenerate node`
  else
    kind = `${sign} node`
  return { real: true, lambdas, text: `λ = ${n(lambdas[0])}, ${n(lambdas[1])}\n${kind}` }
}

// An eigenvector of A for the real eigenvalue lambda
function eigenvector(a, b, c, d, lambda) {
  if (Math.abs(b) > tiny)
    return [b, lambda - a]
  if (Math.abs(c) > tiny)
    return [lambda - d, c]
  return Math.abs(lambda - a) < tiny ? [1, 0] : [0, 1]
}

export default ({ a, b, c, d }) => {
  const f = ([x, y]) => [a * x + b * y, c * x + d * y]
  const { real, lambdas, text } = classify(a, b, c, d)
  const starts = linspace(0, 2 * Math.PI, 9).slice(0, 8).map(t => [1.2 * Math.cos(t + 0.3), 1.2 * Math.sin(t + 0.3)])
  const solutions = starts.map(s => [...path(f, s, -1).reverse(), ...path(f, s, 1).slice(1)])
  const directions = real
    ? lambdas.map((lambda, i) => {
        const [u, v] = eigenvector(a, b, c, d, lambda)
        const k = 2 * xDomain[1] / Math.hypot(u, v)
        return Plot.line([[-k * u, -k * v], [k * u, k * v]], { ...line, stroke: i === 0 ? blue : orange, strokeDasharray: '8 8', clip: true })
      })
    : []
  return {
    aspectRatio: 1,
    x: { label: 'x', domain: xDomain },
    y: { label: 'y', domain: yDomain },
    marks: [
      directionField(f, linspace(-3, 3, 25), linspace(-2, 2, 17), xDomain, yDomain),
      Plot.ruleX([0], { stroke: '#1a1a1a', strokeWidth: 1.5 }),
      Plot.ruleY([0], { stroke: '#1a1a1a', strokeWidth: 1.5 }),
      ...directions,
      ...solutions.map(points => Plot.line(points, { ...line, stroke: green, clip: true })),
      Plot.dot([[0, 0]], { ...dot, r: 7, fill: '#1a1a1a' }),
      Plot.text([text], { ...label, fontFamily: mono, fontSize: 16, frameAnchor: 'top-left', dx: 8, dy: 8, textAnchor: 'start', lineAnchor: 'top' }),
    ],
  }
}
