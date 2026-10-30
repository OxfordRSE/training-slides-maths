// Draws a figure in the house style, chosen to read from the back of a lecture
// room. A figure is a module, `presentations/<deck>/plots/<name>.js`, whose
// default export is a function from parameters to Observable Plot options, and
// which may export `controls`: one entry per parameter, { min, max, step, value },
// optionally with a `color` and a `label`. Used by the slides' PlotFigure
// component, and by scripts/check-figures.mjs to draw every figure in Node.
import * as Plot from '@observablehq/plot'

// Heights taken out of a figure's overall height by its title and legend
export const rows = { title: 32, legend: 32 }

// Each control's starting value, as parameters for the figure
export function defaults(controls = {}) {
  return Object.fromEntries(Object.entries(controls).map(([name, c]) => [name, c.value]))
}

const margins = { marginLeft: 80, marginBottom: 56, marginTop: 16, marginRight: 16 }

// Centred axis labels, clear of the tick labels, without Plot's arrows
const x = { labelArrow: 'none', labelAnchor: 'center', labelOffset: 44 }
const y = { labelArrow: 'none', labelAnchor: 'center', labelOffset: 62 }

// Solid grid lines, dark enough to survive a projector but behind the data,
// and axis lines along the bottom and left
const grid = { stroke: '#000', strokeOpacity: 0.18, strokeWidth: 1, clip: false }
const axes = [Plot.frame({ anchor: 'bottom', clip: false }), Plot.frame({ anchor: 'left', clip: false })]

// Text sizes: tick labels 16px (the figure's own size), axis labels 18px,
// title 20px, legend 16px
function sizeText(node) {
  for (const label of node.querySelectorAll('g[aria-label$="-axis label"]'))
    label.setAttribute('font-size', '18')
  const title = node.querySelector('h2')
  if (title)
    title.setAttribute('style', `height: ${rows.title}px; margin: 0; font-size: 20px; font-weight: 600; line-height: ${rows.title}px; text-align: center`)
  const legend = node.querySelector('figure > div')
  if (legend)
    legend.setAttribute('style', `${legend.getAttribute('style') ?? ''}; height: ${rows.legend}px; margin: 0; align-items: center; justify-content: center; font-size: 16px`)
  // A colour bar's tick lines cross the bar, which Plot does even with tickSize 0
  for (const tick of node.querySelectorAll('svg[class$="-ramp"] .tick line'))
    tick.remove()
}

// Returns the drawn figure (an SVG, or an HTML figure when it has a title or
// legend) and its left and right margins, so that sliders can line up with
// its axes. `height` is the figure's overall height, including any title and
// legend; pass `document` to draw outside a browser.
export function render(figure, params = {}, { width = 640, height = 400, document } = {}) {
  const options = { ...margins, ...figure.default({ ...defaults(figure.controls), ...params }) }
  const node = Plot.plot({
    width,
    height: height
      - (options.title ? rows.title : 0)
      - (options.color?.legend ? rows.legend : 0),
    inset: 8,
    clip: true,
    style: { fontFamily: 'inherit', fontSize: '16px', color: '#1a1a1a', overflow: 'visible' },
    ...(document && { document }),
    ...options,
    x: { ...x, ...options.x },
    y: { ...y, ...options.y },
    color: options.color && { swatchSize: 16, ...options.color },
    marks: options.grid === false
      ? [...options.marks, ...axes]
      : [Plot.gridX(grid), Plot.gridY(grid), ...options.marks, ...axes],
  })
  sizeText(node)
  return { node, marginLeft: options.marginLeft, marginRight: options.marginRight }
}
