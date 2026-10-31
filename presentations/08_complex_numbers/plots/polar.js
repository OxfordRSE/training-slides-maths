// Lecture 8, cell 38 (right): the same line in polar coordinates, from the
// origin to radius sqrt(2) at angle pi/4. Plot has no polar axes, so the grid
// (circles of constant radius, and spokes every 45 degrees) is drawn here.
// The angles are labelled in radians, as the lecture measures them.
import * as Plot from '@observablehq/plot'
import { blue, dot, line } from '#plots/style.js'

const rMax = 1.5
const radii = [0.5, 1, 1.5]
const angles = [0, 45, 90, 135, 180, 225, 270, 315]
const toXY = (r, deg) => [r * Math.cos(deg * Math.PI / 180), r * Math.sin(deg * Math.PI / 180)]

const circles = radii.flatMap(r => Array.from({ length: 121 }, (_, i) => [r, ...toXY(r, i * 3)]))
const spokes = angles.map(deg => toXY(rMax, deg))
const radians = ['0', 'π/4', 'π/2', '3π/4', 'π', '5π/4', '3π/2', '7π/4']
const angleLabels = angles.map((deg, i) => [...toXY(rMax * 1.14, deg), radians[i]])
const points = [toXY(0, 45), toXY(Math.SQRT2, 45)]
const grid = { stroke: '#000', strokeOpacity: 0.18 }

export default () => ({
  title: 'Polar plot',
  grid: false,
  x: { domain: [-rMax * 1.25, rMax * 1.25], axis: null },
  y: { domain: [-rMax * 1.25, rMax * 1.25], axis: null },
  marks: [
    Plot.line(circles, { ...grid, x: d => d[1], y: d => d[2], z: d => d[0] }),
    Plot.link(spokes, { ...grid, x1: 0, y1: 0, x2: d => d[0], y2: d => d[1] }),
    Plot.text(angleLabels, { x: d => d[0], y: d => d[1], text: d => d[2], fontSize: 14 }),
    Plot.line(points, { ...line, x: d => d[0], y: d => d[1], stroke: blue }),
    Plot.dot(points, { ...dot, x: d => d[0], y: d => d[1], fill: blue }),
  ],
})
