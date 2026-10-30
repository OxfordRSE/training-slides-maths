// Seeded random samples for figures, so that "random" data comes out the same
// on every build. The samplers take numpy's arguments, e.g. `normal(0, 0.2, 100)`
// for np.random.normal(0, 0.2, 100).
import { randomLcg, randomNormal, randomUniform } from 'd3-random'

export function rng(seed) {
  const source = randomLcg(seed)
  const sample = (generator, n) => Array.from({ length: n }, () => generator())
  return {
    normal: (mean, sd, n) => sample(randomNormal.source(source)(mean, sd), n),
    uniform: (low, high, n) => sample(randomUniform.source(source)(low, high), n),
  }
}
