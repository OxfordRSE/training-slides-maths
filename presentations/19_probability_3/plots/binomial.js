// Lecture 19, cell 5: 1000 samples from B(100, 0.5) against its pmf
import { arange, binom } from '#plots/numerics.js'
import { rng } from '#plots/random.js'
import { sampled } from './data/sampled.js'

const b = arange(30, 70)

export default () => sampled({
  title: 'n = 100, p = 0.5',
  histograms: [{ label: 'sampled', samples: rng(1905).binomial(100, 0.5, 1000), bins: b }],
  ideal: { label: 'ideal', data: b, x: k => k + 0.5, y: k => binom.pmf(k, 100, 0.5) },
  x: { label: 'k' },
})
