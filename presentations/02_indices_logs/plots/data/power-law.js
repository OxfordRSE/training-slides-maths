// Lecture 2, cell 41: data to test against y = Ax^n
const x = [4, 16, 25, 64]
const y = [6, 12, 15, 24]

export default x.map((xi, i) => ({ x: xi, y: y[i] }))
