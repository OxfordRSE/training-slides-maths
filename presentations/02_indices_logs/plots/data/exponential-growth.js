// Snagging: made-up hourly counts of a population that doubles every 2 hours,
// N = 200 * 2^(t/2) = 200 e^(kt) with k = ln(2)/2, with about 6% noise and
// rounded to whole cells (z_other_sources/scratch/gen02data.py, numpy seed 2)
const t = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const N = [199, 292, 386, 570, 758, 1190, 1618, 2308, 3280, 4259, 6708]

export default t.map((ti, i) => ({ t: ti, N: N[i] }))
