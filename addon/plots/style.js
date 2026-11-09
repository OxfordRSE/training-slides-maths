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

// Monospaced font for live numbers on a plot, so their width doesn't change as
// a slider moves (the decks' code font, then the system's)
export const mono = '"JetBrains Mono Variable", ui-monospace, monospace'

// A number in a fixed format for live text: `decimals` places, right-aligned in
// `width` characters with figure spaces (U+2007, as wide as a digit in a
// monospaced font; plain spaces would be collapsed in SVG text)
export function fixed(value, decimals, width) {
  const s = (Math.abs(value) < 0.5 * 10 ** -decimals ? 0 : value).toFixed(decimals)
  return s.padStart(width, ' ')
}
