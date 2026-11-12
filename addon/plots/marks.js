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

// The direction field of x' = f([x, y])[0], y' = f([x, y])[1]: a short grey
// arrow at each grid point (xs by ys), pointing the way solutions move there.
// Each arrow is drawn between two points in data coordinates, so it points the
// right way whatever the plot's aspect ratio (Plot.vector's `rotate` is in
// screen space, so an angle computed from (x', y') is only right with equal
// units on both axes). Its length is `length` times the plot's width or height
// (between the two, depending on its direction), from the axis domains.
export function directionField(f, xs, ys, xDomain, yDomain, { length = 0.035, stroke = '#c4c4c4' } = {}) {
  const [sx, sy] = [xDomain[1] - xDomain[0], yDomain[1] - yDomain[0]]
  const arrows = xs.flatMap(x => ys.map((y) => {
    const [dx, dy] = f([x, y])
    const [u, v] = [dx / sx, dy / sy]
    const norm = Math.hypot(u, v)
    return norm === 0 ? null : { x1: x, y1: y, x2: x + length * sx * u / norm, y2: y + length * sy * v / norm }
  })).filter(Boolean)
  return Plot.arrow(arrows, { x1: 'x1', y1: 'y1', x2: 'x2', y2: 'y2', stroke, strokeWidth: 1.5, headLength: 6, clip: true })
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
