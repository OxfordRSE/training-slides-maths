// Lecture 1, cell 11: made-up data with a quadratic trend, y = 5x^2 + 87 plus noise
import { rng } from '#plots/random.js'

const r = rng(2)
const x = r.uniform(0, 8, 100)
const e = r.normal(0, 8, 100)

export default x.map((xi, i) => ({ x: xi, y: 5 * xi * xi + 87 + e[i] }))
