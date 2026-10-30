// Numerical helpers for figures, named after their numpy equivalents

// `n` evenly spaced values from `start` to `stop` inclusive, like np.linspace
export function linspace(start, stop, n) {
  return Array.from({ length: n }, (_, i) => start + (stop - start) * i / (n - 1))
}
