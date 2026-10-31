// Snagging: made-up data to test against y = Ax^n, from y = 3x^0.5 with about
// 6% noise (z_other_sources/scratch/gen02data.py, numpy seed 2). The notebook
// had four points exactly on the curve, which looked contrived.
const x = [1, 2, 4, 6, 9, 12, 16, 20, 25, 30, 36, 42, 49, 56, 64]
const y = [3.03, 4.11, 5.85, 6.35, 10.03, 11.13, 11.77, 14.05, 15.26, 15.89, 19.09, 19.08, 20.59, 21.41, 24.66]

export default x.map((xi, i) => ({ x: xi, y: y[i] }))
