// Lecture 10, cell 18: the tumour volume V = ((kt + c)/3)^3, the solution of
// dV/dt = k V^(2/3); k and c were sliders in the notebook
import * as Plot from '@observablehq/plot'
import { format } from '#plots/controls.js'
import { linspace } from '#plots/numerics.js'
import { blue, line } from '#plots/style.js'

export const controls = {
  k: { min: 0.01, max: 2, step: 0.01, value: 1, color: blue },
  c: { min: 0.01, max: 20, step: 0.01, value: 10, color: blue },
}

const ts = linspace(0, 10, 100)

export default ({ k, c }) => ({
  title: `Plot of V vs t, k = ${format(k, controls.k)}, c = ${format(c, controls.c)}`,
  x: { label: 't' },
  y: { label: 'V' },
  marks: [
    Plot.line(ts, { ...line, x: t => t, y: t => ((k * t + c) / 3) ** 3, stroke: blue }),
  ],
})
