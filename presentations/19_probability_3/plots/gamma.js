// Lecture 19, cell 16: 1000 samples from scipy's gamma(a=2, scale=2) against
// its pdf, x e^(-x/2) / 4
import { linspace } from '#plots/numerics.js'
import { rng } from '#plots/random.js'
import { sampled } from './data/sampled.js'

export default () => sampled({
  title: 'a = 2, scale = 2',
  histograms: [{ label: 'sampled', samples: rng(1916).gamma(2, 2, 1000), bins: 20 }],
  ideal: { label: 'ideal', data: linspace(0, 20, 1000), x: x => x, y: x => x * Math.exp(-x / 2) / 4 },
  x: { label: 'x', domain: [0, 20] },
})
