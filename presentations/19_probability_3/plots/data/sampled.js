// Density histograms of samples overlaid with the ideal distribution, as the
// notebook's hist-plus-plot cells drew them. Each series takes the next colour
// in matplotlib's order (blue, orange, green), and the legend names them.
import * as Plot from '@observablehq/plot'
import { histogram } from '#plots/numerics.js'
import { blue, green, line, orange } from '#plots/style.js'

// `histograms`: [{ label, samples, bins }]; `ideal`: { label, data, x, y, dashed }
export function sampled({ title, histograms, ideal, x = {}, y = {} }) {
  const labels = [...histograms.map(h => h.label), ...(ideal ? [ideal.label] : [])]
  return {
    title,
    x: { label: null, ...x },
    y: { label: 'density', ...y },
    color: { domain: labels, range: [blue, orange, green].slice(0, labels.length), legend: true },
    marks: [
      ...histograms.map(h => Plot.rectY(histogram(h.samples, h.bins), {
        x1: 'x1', x2: 'x2', y: 'y', fill: () => h.label, fillOpacity: 0.5, clip: true,
      })),
      ...(ideal
        ? [Plot.line(ideal.data, {
            ...line, x: ideal.x, y: ideal.y, stroke: () => ideal.label, strokeDasharray: ideal.dashed ? '8 6' : null, clip: true,
          })]
        : []),
    ],
  }
}
