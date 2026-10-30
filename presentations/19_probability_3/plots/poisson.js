// Lecture 19, cell 9: 1000 samples from Pois(40) against its pmf
import { arange, poisson } from '#plots/numerics.js'
import { rng } from '#plots/random.js'
import { sampled } from './data/sampled.js'

const mu = 40
const b = arange(0, 3 * mu)

export default () => sampled({
  title: 'μ = 40',
  histograms: [{ label: 'sampled', samples: rng(1909).poisson(mu, 1000), bins: b }],
  ideal: { label: 'ideal', data: b, x: k => k + 0.5, y: k => poisson.pmf(k, mu) },
  x: { label: 'k' },
})
