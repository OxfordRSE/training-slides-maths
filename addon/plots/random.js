// Seeded random samples for figures, so that "random" data comes out the same
// on every build. The samplers take numpy's arguments, e.g. `normal(0, 0.2, 100)`
// for np.random.normal(0, 0.2, 100).
import {
  randomBinomial,
  randomExponential,
  randomGamma,
  randomGeometric,
  randomLcg,
  randomNormal,
  randomPoisson,
  randomUniform,
} from 'd3-random'

export function rng(seed) {
  const source = randomLcg(seed)
  const sample = (generator, n) => Array.from({ length: n }, () => generator())
  return {
    normal: (mean, sd, n) => sample(randomNormal.source(source)(mean, sd), n),
    uniform: (low, high, n) => sample(randomUniform.source(source)(low, high), n),
    binomial: (trials, p, n) => sample(randomBinomial.source(source)(trials, p), n),
    poisson: (lam, n) => sample(randomPoisson.source(source)(lam), n),
    // The number of failures before the first success, as scipy's geom(p, loc=-1);
    // d3 counts the trials up to and including it, one more
    geometric: (p, n) => sample(randomGeometric.source(source)(p), n).map(k => k - 1),
    exponential: (scale, n) => sample(randomExponential.source(source)(1 / scale), n),
    gamma: (shape, scale, n) => sample(randomGamma.source(source)(shape, scale), n),
  }
}
