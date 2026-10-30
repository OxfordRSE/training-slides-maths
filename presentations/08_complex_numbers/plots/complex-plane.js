// Lecture 8, cells 7-8: the point (a, b) on the complex plane, with dashed
// lines to each axis; a and b were sliders in the notebook
import * as Plot from '@observablehq/plot'
import { blue, dot } from '#plots/style.js'

export const controls = {
  a: { min: 0, max: 20, step: 1, value: 10, color: blue },
  b: { min: 0, max: 20, step: 1, value: 10, color: blue },
}

export default ({ a, b }) => ({
  x: { label: 'Real axis', domain: [-5, 25] },
  y: { label: 'Imaginary axis', domain: [-5, 25] },
  marks: [
    Plot.ruleX([0], { stroke: '#1a1a1a', strokeWidth: 1.5 }),
    Plot.ruleY([0], { stroke: '#1a1a1a', strokeWidth: 1.5 }),
    Plot.link([{ x1: 0, y1: b, x2: a, y2: b }, { x1: a, y1: 0, x2: a, y2: b }], {
      x1: 'x1', y1: 'y1', x2: 'x2', y2: 'y2', stroke: 'gray', strokeWidth: 2, strokeDasharray: '6 4',
    }),
    Plot.dot([{ a, b }], { ...dot, x: 'a', y: 'b', fill: blue, r: 7 }),
  ],
})
