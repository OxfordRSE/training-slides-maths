// Lecture 19, cell 19: 1000 samples from N(5, 2²) against its pdf
import { arange, linspace, norm } from '#plots/numerics.js'
import { rng } from '#plots/random.js'
import { sampled } from './data/sampled.js'

export default () => sampled({
  title: 'μ = 5, σ = 2',
  histograms: [{ label: 'sampled', samples: rng(1919).normal(5, 2, 1000), bins: arange(-4, 14, 0.5) }],
  ideal: { label: 'ideal', data: linspace(-4, 14, 1000), x: x => x, y: x => norm.pdf(x, 5, 2) },
  x: { label: 'x', domain: [-4, 14] },
})
