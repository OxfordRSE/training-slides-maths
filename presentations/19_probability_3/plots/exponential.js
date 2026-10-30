// Lecture 19, cell 14: 1000 samples from scipy's expon(scale=5) against its pdf
import { linspace } from '#plots/numerics.js'
import { rng } from '#plots/random.js'
import { sampled } from './data/sampled.js'

const mu = 5

export default () => sampled({
  title: 'scale = 5',
  histograms: [{ label: 'sampled', samples: rng(1914).exponential(mu, 1000), bins: 18 }],
  ideal: { label: 'ideal', data: linspace(0, 36, 1000), x: x => x, y: x => Math.exp(-x / mu) / mu },
  x: { label: 'x', domain: [0, 36] },
})
