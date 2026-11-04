// The temperature T = y^2 - x^2 over a square copper plate, which satisfies
// Laplace's equation: hot along two opposite edges and cold along the other
// two
import * as Plot from '@observablehq/plot'

const T = (x, y) => y ** 2 - x ** 2

// 64 bands of colour, 1/32 apart in temperature from -1 to 1: red for hot,
// blue for cold
const step = 1 / 32
const thresholds = Array.from({ length: 63 }, (_, i) => (i + 1) / 32 - 1)
const diverging = Plot.scale({ color: { type: 'diverging', scheme: 'RdBu', reverse: true, domain: [-1, 1] } })
const bands = [-1, ...thresholds].map(t => diverging.apply(t + step / 2))

const labelled = new Set([-0.5, 0, 0.5])

const extent = { x1: -1, x2: 1, y1: -1, y2: 1, width: 100, height: 100 }

export default () => ({
  aspectRatio: 1,
  grid: false,
  x: { label: 'x', domain: [-1, 1], ticks: [-1, -0.5, 0, 0.5, 1] },
  y: { label: 'y', domain: [-1, 1], ticks: [-1, -0.5, 0, 0.5, 1] },
  color: {
    type: 'threshold',
    domain: thresholds,
    range: bands,
    label: 'T',
    legend: true,
    tickSize: 0,
    // With a minus sign (U+2212), not a hyphen, to match the axes
    tickFormat: d => labelled.has(d) ? `${d < 0 ? String.fromCharCode(0x2212) : ''}${Math.abs(d)}` : '',
    width: 300,
    height: 32,
    marginTop: 0,
    marginBottom: 20,
    style: { fontSize: '16px' },
  },
  marks: [
    // Each band outlined in its own colour, to hide any hairline gaps between
    // them. A contour fills only where T is above its lowest threshold, so
    // the coldest band needs one just below T = -1.
    Plot.contour({ ...extent, value: T, fill: 'value', stroke: 'value', strokeWidth: 1, thresholds: [-1.001, ...thresholds] }),
  ],
})
