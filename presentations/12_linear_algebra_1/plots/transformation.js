// Lecture 12: a 2x2 matrix A = (p q; r s) as a transformation of the plane.
// The unit square (dashed) is mapped to the parallelogram with sides A(1, 0) =
// (p, r) and A(0, 1) = (q, s), drawn as arrows. Its area is |det A| = |ps - qr|;
// a negative determinant flips the square over (the arrows swap their order
// around the corner), and det A = 0 squashes it flat onto a line or a point.
// The default A = (2 1; 1 2) is reused for eigenvectors in lecture 13.
import * as Plot from '@observablehq/plot'
import { blue, label, line, vermillion } from '#plots/style.js'

export const controls = {
  p: { min: -1.5, max: 2, step: 0.1, value: 2, color: vermillion },
  q: { min: -1.5, max: 1.5, step: 0.1, value: 1, color: blue },
  r: { min: -1.5, max: 1.5, step: 0.1, value: 1, color: vermillion },
  s: { min: -1.5, max: 2, step: 0.1, value: 2, color: blue },
}

const square = [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]

export default (params) => {
  const [p, q, r, s] = ['p', 'q', 'r', 's'].map(k => +params[k].toFixed(2))
  const det = p * s - q * r
  const image = square.map(([x, y]) => [p * x + q * y, r * x + s * y])
  const text = Math.abs(det) < 1e-9
    ? 'det A = 0: flattened, no inverse'
    : `det A = ${det.toFixed(2)}${det < 0 ? ' (flipped)' : ''}`
  return {
    aspectRatio: 1,
    // wider than y, with equal units, so the four sliders below get room
    x: { label: 'x', domain: [-5.5, 5.5] },
    y: { label: 'y', domain: [-3.2, 3.2] },
    marks: [
      Plot.ruleX([0], { stroke: '#1a1a1a', strokeWidth: 1.5 }),
      Plot.ruleY([0], { stroke: '#1a1a1a', strokeWidth: 1.5 }),
      Plot.line(square, { x: d => d[0], y: d => d[1], stroke: 'gray', strokeWidth: 2, strokeDasharray: '6 4' }),
      Plot.line(image, { x: d => d[0], y: d => d[1], stroke: '#1a1a1a', strokeWidth: 2, fill: blue, fillOpacity: 0.15 }),
      Plot.arrow([{ x: p, y: r, c: vermillion }, { x: q, y: s, c: blue }], {
        ...line, x1: 0, y1: 0, x2: 'x', y2: 'y', stroke: 'c', headLength: 14,
      }),
      Plot.text([text], { ...label, frameAnchor: 'bottom-left', dx: 8, dy: -8, textAnchor: 'start' }),
    ],
  }
}
