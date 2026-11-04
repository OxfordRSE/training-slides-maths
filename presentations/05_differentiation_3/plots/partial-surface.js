// The surface z = x^2 - 2y^2 (example 1) seen in 3D, as a wireframe, cut by
// the plane y = y0. The cut is an ordinary curve, z = x^2 - 2y0^2, and its
// tangent at x = x0 has gradient dz/dx = 2x0: the partial derivative. Plot is
// 2D only, so the surface is projected onto the page here. Shares its sliders
// with partial-slice.js, which shows the same cut flat.
import * as Plot from '@observablehq/plot'
import { linspace } from '#plots/numerics.js'
import { blue, dot, label, line, orange, vermillion } from '#plots/style.js'

export const controls = {
  y0: { label: 'y₀', min: -2, max: 2, step: 0.1, value: 1, color: blue },
  x0: { label: 'x₀', min: -2, max: 2, step: 0.1, value: 1, color: orange },
  turn: { label: 'turn', min: -60, max: 60, step: 1, value: 30 },
}

const f = (x, y) => x ** 2 - 2 * y ** 2

// Heights are shrunk to keep the surface (z from -8 to 4) about as tall as it
// is wide, and the view looks down on it from this angle above the x-y plane
const zScale = 0.25
const tilt = 25 * Math.PI / 180

// A point (x, y, z) on the page, seen with the surface turned by `turn` degrees
// about the z axis: u across the page, v up it
function project(x, y, z, turn) {
  const a = turn * Math.PI / 180
  const across = x * Math.cos(a) - y * Math.sin(a)
  const depth = x * Math.sin(a) + y * Math.cos(a)
  return { u: across, v: z * zScale * Math.cos(tilt) + depth * Math.sin(tilt) }
}

const ts = linspace(-2, 2, 41)
const grid = linspace(-2, 2, 9)

export default ({ y0, x0, turn }) => {
  const at = (x, y, z) => project(x, y, z, turn)

  // Grid lines of the surface, along x and along y, one series each, split at
  // the plane y = y0. The view always looks at the plane from the side where
  // y < y0, so those parts are in front of it, and the rest behind.
  const point = (x, y, wire) => ({ ...at(x, y, f(x, y)), wire })
  const front = []
  const back = []
  grid.forEach((y, i) => (y < y0 ? front : back).push(...ts.map(x => point(x, y, `y${i}`))))
  grid.forEach((x, i) => {
    const ys = [...ts.filter(y => y !== y0), y0].sort((a, b) => a - b)
    front.push(...ys.filter(y => y <= y0).map(y => point(x, y, `x${i}`)))
    back.push(...ys.filter(y => y >= y0).map(y => point(x, y, `x${i}`)))
  })

  // The cutting plane y = y0, a little wider and taller than the surface, so
  // that it clearly cuts all the way through
  const plane = [[-2.6, -10], [2.6, -10], [2.6, 5.5], [-2.6, 5.5], [-2.6, -10]].map(([x, z]) => at(x, y0, z))

  const cut = ts.map(x => at(x, y0, f(x, y0)))
  const z0 = f(x0, y0)
  const tangent = [-0.8, 0.8].map(h => at(x0 + h, y0, z0 + 2 * x0 * h))

  // Short x, y and z axes from a fixed point in the bottom-left corner, which
  // turn with the surface, to show which way is which
  const corner = { u: -2.4, v: -3.3 }
  const axis = (dx, dy, dz, name) => {
    const end = at(dx, dy, dz)
    const ends = [corner, { u: corner.u + end.u, v: corner.v + end.v }]
    return [
      Plot.line(ends, { x: 'u', y: 'v', stroke: '#1a1a1a', strokeWidth: 2, markerEnd: 'arrow' }),
      Plot.text([ends[1]], { ...label, x: 'u', y: 'v', text: () => name, dx: 10 * Math.sign(ends[1].u - ends[0].u || 1), dy: -10 }),
    ]
  }

  return {
    aspectRatio: 1,
    frame: false,
    grid: false,
    marginLeft: 16,
    marginBottom: 16,
    x: { axis: null, domain: [-3.3, 3.3] },
    y: { axis: null, domain: [-3.9, 2.7] },
    marks: [
      // Wires behind the plane faint, then the plane, then wires in front of it darker
      Plot.line(back, { x: 'u', y: 'v', z: 'wire', stroke: '#bbb', strokeWidth: 1 }),
      Plot.line(plane, { x: 'u', y: 'v', fill: blue, fillOpacity: 0.18, stroke: blue, strokeOpacity: 0.5 }),
      Plot.line(front, { x: 'u', y: 'v', z: 'wire', stroke: '#444', strokeWidth: 1.25 }),
      Plot.line(cut, { ...line, x: 'u', y: 'v', stroke: blue }),
      Plot.line(tangent, { ...line, x: 'u', y: 'v', stroke: orange, strokeDasharray: '10 6' }),
      Plot.dot([at(x0, y0, z0)], { ...dot, x: 'u', y: 'v', fill: vermillion, r: 7 }),
      ...axis(0.8, 0, 0, 'x'),
      ...axis(0, 0.8, 0, 'y'),
      ...axis(0, 0, 3.2, 'z'),
    ],
  }
}
