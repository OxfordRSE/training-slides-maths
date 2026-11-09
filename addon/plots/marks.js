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

// A legend in the top-left corner of the plot, one row per line: a short stroke
// in the line's colour (and dash pattern, if any) in front of its text
// An item's optional `fontFamily` (e.g. `mono` from style.js) sets its text's
// font, so that live numbers keep a fixed width as they change.
export function legend(items) {
  return items.flatMap(({ text, color, dasharray, fontFamily }, i) => {
    const at = { frameAnchor: 'top-left', dy: 14 + 28 * i }
    return [
      // A little lower than the text's anchor, level with the middle of its digits
      Plot.dot([text], { ...at, dx: 24, dy: at.dy + 4, symbol: dash, r: 10, fill: 'none', stroke: color, strokeWidth: line.strokeWidth, strokeLinecap: 'round', strokeDasharray: dasharray }),
      Plot.text([text], { ...label, ...at, dx: 42, textAnchor: 'start', ...(fontFamily && { fontFamily }) }),
    ]
  })
}

// A line's live equation in the top-left corner of the plot, with a short
// stroke in the line's colour in front of it, so it is clear which line it is
export function equation(text, color) {
  return legend([{ text, color }])
}

// Arrows along the horizontal axis (y = 0) of a plot of ds/dt against s, for
// ds/dt = f(s): one in each interval between the steady states `steady`, within
// the plot's s range [lo, hi], pointing the way s moves there (right where
// ds/dt > 0, left where it is negative). So they point towards a stable steady
// state and away from an unstable one.
export function phaseArrows(f, steady, [lo, hi]) {
  const edges = [lo, ...steady.filter(s => s > lo && s < hi).sort((a, b) => a - b), hi]
  const arrows = []
  for (let i = 0; i < edges.length - 1; i++) {
    const [a, b] = [edges[i], edges[i + 1]]
    const mid = (a + b) / 2
    const sign = Math.sign(f(mid))
    // Skip an interval too narrow to hold a visible arrow
    if (sign === 0 || b - a < (hi - lo) * 0.03) continue
    const half = Math.min((b - a) * 0.3, (hi - lo) * 0.08)
    arrows.push({ x1: mid - sign * half, x2: mid + sign * half })
  }
  return Plot.arrow(arrows, { x1: 'x1', x2: 'x2', y1: 0, y2: 0, stroke: '#1a1a1a', strokeWidth: 3, headLength: 14 })
}
