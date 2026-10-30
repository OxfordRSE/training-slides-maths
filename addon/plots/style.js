// House style for figures, chosen to read from the back of a lecture room.
// Change it here rather than in individual figures.

// Okabe-Ito colours: distinguishable with the common forms of colour blindness,
// and dark enough to survive a washed-out projector. Blue and orange are close
// to the pair the old notebooks used.
export const blue = '#0072B2'
export const orange = '#E69F00'
export const vermillion = '#D55E00'
export const green = '#009E73'
export const purple = '#CC79A7'
export const sky = '#56B4E9'

// Spread into marks, e.g. Plot.line(data, { ...line, stroke: blue })
export const line = { strokeWidth: 3.5 }
export const dot = { r: 5, stroke: 'white', strokeWidth: 1 }

// Text on a plot, e.g. a live equation: dark, with a white halo to stand out
// from grid lines and data. Don't colour it orange, which is too faint for text.
export const label = { fontSize: 18, fill: '#1a1a1a', stroke: 'white', strokeWidth: 6, paintOrder: 'stroke' }
