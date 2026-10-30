// Lecture 19, cell 12: 1000 samples from U(5, 15) against its pdf
import { linspace } from '#plots/numerics.js'
import { rng } from '#plots/random.js'
import { sampled } from './data/sampled.js'

const lower = 5
const upper = 15

export default () => sampled({
  title: 'a = 5, b = 15',
  histograms: [{ label: 'sampled', samples: rng(1912).uniform(lower, upper, 1000), bins: 10 }],
  ideal: { label: 'ideal', data: linspace(lower, upper, 50), x: x => x, y: () => 1 / (upper - lower) },
  x: { label: 'x', domain: [lower, upper] },
  y: { domain: [0, 1.5 / (upper - lower)] },
})
