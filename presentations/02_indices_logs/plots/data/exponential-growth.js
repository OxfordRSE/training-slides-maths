// Content review: hourly counts of a population that doubles every 2 hours,
// N = 200 * 2^(t/2) = 200 e^(kt) with k = ln(2)/2, rounded to whole cells
const t = [0, 1, 2, 3, 4, 5, 6]
const N = [200, 283, 400, 566, 800, 1131, 1600]

export default t.map((ti, i) => ({ t: ti, N: N[i] }))
