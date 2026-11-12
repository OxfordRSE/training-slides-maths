// Lecture 15: the rescaled predator-prey model n' = v1 n(1 - n) - np,
// p' = p(v2 n - 1), with its two "tuning dials" v1 = r/m and v2 = ebK/m as
// sliders. Prey n (blue) and predators p (orange) against time, from
// n = 0.9, p = 0.1. For v2 > 1 they settle (often oscillating) to n = 1/v2,
// p = v1(1 - 1/v2); for v2 < 1 the predators die out and the prey settle at n = 1.
import * as Plot from '@observablehq/plot'
import { legend } from '#plots/marks.js'
import { linspace, odeint } from '#plots/numerics.js'
import { blue, line, orange } from '#plots/style.js'

export const controls = {
  v1: { label: 'v₁', min: 0.2, max: 2, step: 0.1, value: 1, color: blue },
  v2: { label: 'v₂', min: 0.5, max: 3, step: 0.1, value: 2, color: orange },
}

// Not the coexistence state (which at the default dials is n = p = 1/2)
const start = [0.9, 0.1]

const ts = linspace(0, 30, 301)

export default ({ v1, v2 }) => {
  const f = ([n, p]) => [v1 * n * (1 - n) - n * p, p * (v2 * n - 1)]
  const sol = odeint(f, start, ts).map(([n, p], i) => ({ t: ts[i], n, p }))
  return {
    x: { label: 't', domain: [0, 30] },
    // the highest any curve reaches over the sliders' ranges is 1.95
    y: { label: null, domain: [0, 2] },
    marks: [
      Plot.ruleY([0], { stroke: '#1a1a1a', strokeWidth: 1.5 }),
      Plot.line(sol, { ...line, x: 't', y: 'n', stroke: blue, clip: true }),
      Plot.line(sol, { ...line, x: 't', y: 'p', stroke: orange, clip: true }),
      ...legend([{ text: 'prey, n', color: blue }, { text: 'predators, p', color: orange }]),
    ],
  }
}
