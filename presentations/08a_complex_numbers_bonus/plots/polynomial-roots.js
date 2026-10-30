// Lecture 8a, cells 2-3: filled contours of |z^p + c| over the complex plane,
// where the dark patches are the roots of z^p + c = 0. c and p were sliders in
// the notebook, which drew this with matplotlib's contourf and a colour bar.
import * as Plot from '@observablehq/plot'

export const controls = {
  c: { min: -1, max: 1, step: 0.1, value: -1 },
  p: { min: 2, max: 8, step: 1, value: 2 },
}

// |z^p + c| for z = x + iy, using z^p = r^p (cos p theta + i sin p theta)
function modulus(x, y, p, c) {
  const r = Math.hypot(x, y) ** p
  const theta = p * Math.atan2(y, x)
  return Math.hypot(r * Math.cos(theta) + c, r * Math.sin(theta))
}

// Contour levels from 0 to 3.5, as in the notebook (which used 150)
const thresholds = Array.from({ length: 36 }, (_, i) => i / 10)

export default ({ c, p }) => ({
  title: 'y = xᵖ + c',
  grid: false,
  x: { label: 'Real axis', domain: [-1.5, 1.5] },
  y: { label: 'Imaginary axis', domain: [-1.5, 1.5] },
  // One colour per contour band, whose legend (unlike a continuous one) needs
  // no canvas; only the whole numbers are labelled, with no tick marks
  color: {
    type: 'threshold',
    scheme: 'viridis',
    domain: thresholds.slice(1),
    legend: true,
    tickSize: 0,
    tickFormat: d => Number.isInteger(d) ? d : '',
  },
  marks: [
    Plot.contour({
      x1: -1.5, x2: 1.5, y1: -1.5, y2: 1.5, width: 150, height: 150,
      value: (x, y) => Math.min(modulus(x, y, p, c), 3.5),
      fill: 'value',
      stroke: null,
      thresholds,
    }),
  ],
})
