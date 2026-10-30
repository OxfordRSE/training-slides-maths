// Lecture 19, cell 10: 1000 samples each from B(1600, 0.0025) and Pois(4)
import { arange } from '#plots/numerics.js'
import { rng } from '#plots/random.js'
import { sampled } from './data/sampled.js'

const N = 1600
const p = 0.0025
const b = arange(0, 15)
const random = rng(1910)
const binomial = random.binomial(N, p, 1000)
const poisson = random.poisson(N * p, 1000)

export default () => sampled({
  histograms: [
    { label: `Binomial (${N}, ${p})`, samples: binomial, bins: b },
    { label: `Poisson (${N * p})`, samples: poisson, bins: b },
  ],
  x: { label: 'k' },
})
