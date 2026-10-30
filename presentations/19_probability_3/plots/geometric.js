// Lecture 19, cell 7: 1000 samples from scipy's geom(0.3, loc=-1) against its pmf
import { arange, geom } from '#plots/numerics.js'
import { rng } from '#plots/random.js'
import { sampled } from './data/sampled.js'

const b = arange(0, 30)

export default () => sampled({
  title: 'p = 0.3',
  histograms: [{ label: 'sampled', samples: rng(1907).geometric(0.3, 1000), bins: b }],
  ideal: { label: 'ideal', data: b, x: k => k + 0.5, y: k => geom.pmf(k, 0.3) },
  x: { label: 'k' },
})
