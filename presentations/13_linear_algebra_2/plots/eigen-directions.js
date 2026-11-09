// Lecture 13: eigenvectors as the directions a matrix only stretches. A unit
// vector v at an angle (slider, in degrees) and its image Av, for A = (2 1; 1 2),
// the matrix of lecture 12's determinant aside. Av usually points a different
// way from v (the dotted line extends v); at 45 degrees Av = 3v and at 135
// degrees Av = v, the two eigenvectors. For a unit v, v x Av = cos(2 angle), so
// they line up exactly at those whole-degree angles.
import * as Plot from '@observablehq/plot'
import { legend } from '#plots/marks.js'
import { blue, label, line, vermillion } from '#plots/style.js'

export const controls = {
  angle: { min: 0, max: 180, step: 1, value: 20, color: blue },
}

const A = [[2, 1], [1, 2]]

export default ({ angle }) => {
  const t = angle * Math.PI / 180
  const v = [Math.cos(t), Math.sin(t)]
  const Av = [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]]
  const aligned = Math.abs(v[0] * Av[1] - v[1] * Av[0]) < 1e-9
  const lambda = v[0] * Av[0] + v[1] * Av[1]
  const text = aligned
    ? `Av = ${Math.abs(lambda - 1) < 1e-9 ? '' : lambda.toFixed(0)}v: an eigenvector`
    : 'Av points a different way from v'
  return {
    aspectRatio: 1,
    // wider than y, with equal units, so the slider below gets room
    x: { label: 'x', domain: [-4.5, 4.5] },
    y: { label: 'y', domain: [-3.4, 3.4] },
    marks: [
      Plot.ruleX([0], { stroke: '#1a1a1a', strokeWidth: 1.5 }),
      Plot.ruleY([0], { stroke: '#1a1a1a', strokeWidth: 1.5 }),
      // the line through v, so it is clear whether Av lies along it
      Plot.link([{ x1: -5 * v[0], y1: -5 * v[1], x2: 5 * v[0], y2: 5 * v[1] }], {
        x1: 'x1', y1: 'y1', x2: 'x2', y2: 'y2', stroke: 'gray', strokeWidth: 2, strokeDasharray: '2 6', clip: true,
      }),
      Plot.arrow([{ x: Av[0], y: Av[1] }], { ...line, x1: 0, y1: 0, x2: 'x', y2: 'y', stroke: vermillion, headLength: 14 }),
      Plot.arrow([{ x: v[0], y: v[1] }], { ...line, x1: 0, y1: 0, x2: 'x', y2: 'y', stroke: blue, headLength: 14 }),
      ...legend([{ text: 'v', color: blue }, { text: 'Av', color: vermillion }]),
      Plot.text([text], { ...label, frameAnchor: 'bottom-left', dx: 8, dy: -8, textAnchor: 'start' }),
    ],
  }
}
