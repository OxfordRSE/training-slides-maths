// Numerical helpers for figures, named after their numpy and scipy equivalents
import { bin, extent, range } from 'd3-array'

// `n` evenly spaced values from `start` to `stop` inclusive, like np.linspace
export function linspace(start, stop, n) {
  return Array.from({ length: n }, (_, i) => start + (stop - start) * i / (n - 1))
}

// Values from `start` up to but not including `stop`, `step` apart, like np.arange
export const arange = range

// The Dormand-Prince 5(4) tableau, as in scipy's RK45: nodes, stage weights
// (the last row gives the fifth-order solution), and the weights of the
// difference between the fifth- and fourth-order solutions
const C = [0, 1 / 5, 3 / 10, 4 / 5, 8 / 9, 1, 1]
const A = [
  [],
  [1 / 5],
  [3 / 40, 9 / 40],
  [44 / 45, -56 / 15, 32 / 9],
  [19372 / 6561, -25360 / 2187, 64448 / 6561, -212 / 729],
  [9017 / 3168, -355 / 33, 46732 / 5247, 49 / 176, -5103 / 18656],
  [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84],
]
const E = [71 / 57600, 0, -71 / 16695, 71 / 1920, -17253 / 339200, 22 / 525, -1 / 40]

// One step of size h from (t, y): the fifth-order solution, and its error estimate
function dopri(f, y, t, h) {
  const k = []
  let stage
  for (let s = 0; s < 7; s++) {
    stage = y.map((yi, i) => yi + h * A[s].reduce((sum, a, j) => sum + a * k[j][i], 0))
    k.push(f(stage, t + C[s] * h))
  }
  return [stage, y.map((_, i) => h * E.reduce((sum, e, j) => sum + e * k[j][i], 0))]
}

// Solves dy/dt = f(y, t) from y(ts[0]) = y0, like scipy.integrate.odeint, and
// returns y at each time in `ts`, which must increase. y is a number, or an
// array of numbers for a system, in which case f returns an array too. Uses
// adaptive Dormand-Prince RK45, so steps shrink where the solution changes
// fast, keeping each step's error within `rtol` relative or `atol` absolute.
export function odeint(f, y0, ts, { rtol = 1e-8, atol = 1e-10, maxSteps = 100000 } = {}) {
  const scalar = !Array.isArray(y0)
  const g = scalar ? (y, t) => [f(y[0], t)] : f
  let y = scalar ? [y0] : y0
  let t = ts[0]
  let h = (ts.at(-1) - t) / 100
  let steps = 0

  const out = [y]
  for (const next of ts.slice(1)) {
    while (t < next) {
      if (++steps > maxSteps)
        throw new Error(`odeint: more than ${maxSteps} steps, stuck at t = ${t}`)
      // Land exactly on the next output time
      const step = Math.min(h, next - t)
      const [candidate, error] = dopri(g, y, t, step)
      const norm = Math.hypot(...error.map((e, i) =>
        e / (atol + rtol * Math.max(Math.abs(y[i]), Math.abs(candidate[i]))))) / Math.sqrt(y.length)
      if (!Number.isFinite(norm))
        throw new Error(`odeint: the solution is not finite at t = ${t}`)
      if (norm <= 1) {
        t = step === next - t ? next : t + step
        y = candidate
      }
      // Grow or shrink the step towards the tolerance, by at most 5 times, but
      // don't let a step cut short to land on an output time shrink the next
      const scaled = step * Math.min(5, Math.max(0.2, 0.9 * norm ** -0.2))
      h = norm <= 1 ? Math.max(h, scaled) : scaled
    }
    out.push(y)
  }
  return scalar ? out.map(v => v[0]) : out
}

// The error function, to within 1.5e-7 (Abramowitz and Stegun 7.1.26)
export function erf(x) {
  const t = 1 / (1 + 0.3275911 * Math.abs(x))
  const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))))
  return Math.sign(x) * (1 - poly * Math.exp(-x * x))
}

// The normal distribution's pdf and cdf, like scipy.stats.norm.pdf and norm.cdf
export const norm = {
  pdf: (x, loc = 0, scale = 1) => Math.exp(-(((x - loc) / scale) ** 2) / 2) / (scale * Math.sqrt(2 * Math.PI)),
  cdf: (x, loc = 0, scale = 1) => (1 + erf((x - loc) / (scale * Math.SQRT2))) / 2,
}

// The log of k!, summed directly: fine for the k of a lecture's figures
function logFactorial(k) {
  let sum = 0
  for (let i = 2; i <= k; i++)
    sum += Math.log(i)
  return sum
}

// Probability mass functions, like scipy.stats' binom.pmf, poisson.pmf and
// geom.pmf; `geom` counts the failures before the first success, as
// geom(p, loc=-1) does
export const binom = {
  pmf: (k, n, p) => k < 0 || k > n ? 0 : Math.exp(logFactorial(n) - logFactorial(k) - logFactorial(n - k) + k * Math.log(p) + (n - k) * Math.log1p(-p)),
}
export const poisson = {
  pmf: (k, mu) => k < 0 ? 0 : Math.exp(-mu + k * Math.log(mu) - logFactorial(k)),
}
export const geom = {
  pmf: (k, p) => k < 0 ? 0 : p * (1 - p) ** k,
}

// A density histogram of `samples`, like matplotlib's hist(samples, bins,
// density=True): `bins` is a number of equal bins from the samples' minimum to
// their maximum, or an array of bin edges, in which case samples outside them
// are left out. Returns { x1, x2, y } per bin, for Plot.rectY
export function histogram(samples, bins = 10) {
  const edges = Array.isArray(bins) ? bins : linspace(...extent(samples), bins + 1)
  // d3's bins, like numpy's, include their left edge; the last also its right
  const binned = bin().domain([edges[0], edges.at(-1)]).thresholds(edges.slice(1, -1))(samples)
  const total = binned.reduce((sum, b) => sum + b.length, 0)
  return binned.map(b => ({ x1: b.x0, x2: b.x1, y: b.length / (total * (b.x1 - b.x0)) }))
}
