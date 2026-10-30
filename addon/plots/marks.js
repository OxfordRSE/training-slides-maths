// Ready-made marks for figures, in the house style
import * as Plot from '@observablehq/plot'
import { label, line } from './style.js'

// A short horizontal stroke, as a dot symbol: its half-length is the dot's `r`
const dash = {
  draw(context, size) {
    const r = Math.sqrt(size / Math.PI)
    context.moveTo(-r, 0)
    context.lineTo(r, 0)
  },
}

// A line's live equation in the top-left corner of the plot, with a short
// stroke in the line's colour in front of it, so it is clear which line it is
export function equation(text, color) {
  const at = { frameAnchor: 'top-left', dy: 14 }
  return [
    // A little lower than the text's anchor, level with the middle of its digits
    Plot.dot([text], { ...at, dx: 24, dy: at.dy + 4, symbol: dash, r: 10, fill: 'none', stroke: color, strokeWidth: line.strokeWidth, strokeLinecap: 'round' }),
    Plot.text([text], { ...label, ...at, dx: 42, textAnchor: 'start' }),
  ]
}
