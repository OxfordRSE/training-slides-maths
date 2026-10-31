// The straight line y = x/2 + 1, marking its y intercept (at c), its x
// intercept (at -c/m), and a triangle under it showing the gradient as the
// change in y divided by the change in x
import * as Plot from '@observablehq/plot'
import { blue, dot, label, line, orange, vermillion } from '#plots/style.js'

const m = 0.5
const c = 1
const f = x => m * x + c

// The triangle: along from x0 to x1, then up to the line
const x0 = 1
const x1 = 4

export default () => ({
  x: { label: 'x', domain: [-3, 6] },
  y: { label: 'y', domain: [-1, 4.5] },
  marks: [
    Plot.ruleX([0], { stroke: '#888' }),
    Plot.ruleY([0], { stroke: '#888' }),
    Plot.line([-3, 6], { ...line, x: x => x, y: f, stroke: blue }),
    Plot.line([[x0, f(x0)], [x1, f(x0)], [x1, f(x1)]], { ...line, stroke: orange, strokeDasharray: '8 6' }),
    Plot.text([[(x0 + x1) / 2, f(x0)]], { ...label, text: () => `Δx = ${x1 - x0}`, dy: 20 }),
    Plot.text([[x1, (f(x0) + f(x1)) / 2]], { ...label, text: () => `Δy = ${f(x1) - f(x0)}`, dx: 14, textAnchor: 'start' }),
    Plot.text([[(x0 + x1) / 2, f(x1)]], { ...label, text: () => 'gradient m = Δy/Δx = 1/2', dx: -40, dy: -50, textAnchor: 'end' }),
    Plot.dot([[0, c], [-c / m, 0]], { ...dot, fill: vermillion, r: 7 }),
    Plot.text([[0, c]], { ...label, text: () => 'y intercept: y = c = 1', dx: -14, dy: -24, textAnchor: 'end' }),
    Plot.text([[-c / m, 0]], { ...label, text: () => 'x intercept: x = -c/m = -2', dy: 26, textAnchor: 'start', dx: -10 }),
  ],
})
