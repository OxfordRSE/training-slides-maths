// Lecture 19, cell 20: 1000 samples each from Pois(100) and N(100, 10²), with
// bins offset by half a bin, as in the notebook
import { arange } from '#plots/numerics.js'
import { rng } from '#plots/random.js'
import { sampled } from './data/sampled.js'

const random = rng(1920)
const poisson = random.poisson(100, 1000)
const normal = random.normal(100, 10, 1000)

export default () => sampled({
  histograms: [
    { label: 'Poisson (100)', samples: poisson, bins: arange(60, 145, 5) },
    { label: 'Normal (100, sqrt(100))', samples: normal, bins: arange(62.5, 142.5, 5) },
  ],
  x: { label: 'x', domain: [60, 140] },
})
