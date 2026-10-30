// Lecture 19, cell 17: 1000 samples each from scipy's expon(scale=5) and
// gamma(a=1, scale=5), the same distribution, against the exponential pdf
import { arange, linspace } from '#plots/numerics.js'
import { rng } from '#plots/random.js'
import { sampled } from './data/sampled.js'

const mu = 5
const b = arange(0, 36, 2)
const random = rng(1917)
const exponential = random.exponential(mu, 1000)
const gamma = random.gamma(1, mu, 1000)

export default () => sampled({
  histograms: [
    { label: 'Exponential (scale = 5)', samples: exponential, bins: b },
    { label: 'Gamma (a = 1, scale = 5)', samples: gamma, bins: b },
  ],
  ideal: { label: 'ideal', data: linspace(0, 36, 1000), x: x => x, y: x => Math.exp(-x / mu) / mu, dashed: true },
  x: { label: 'x', domain: [0, 36] },
})
