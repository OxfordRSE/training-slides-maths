// Lecture 1, cell 21: made-up enzyme kinetics data, reaction rate V against
// substrate concentration S, with 1/V = m/S + c for m = 3 and c = 5, plus noise
import { rng } from '#plots/random.js'

const m = 3
const c = 5
const r = rng(3)
const e = r.normal(0, 0.001, 100)
const S = r.uniform(0.2, 0.8, 100)

export default S.map((s, i) => ({ S: s, V: e[i] + s / (m + c * s) }))
