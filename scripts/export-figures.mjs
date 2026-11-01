#!/usr/bin/env node

// Draws slide figures as standalone SVG images for the course material, as
// listed in scripts/figure-exports.mjs:
//
//   node scripts/export-figures.mjs <output directory> [file ...]
//
// Every image is the same size, whatever the figure's height on its slide. Each
// is drawn at the slides' sizes but WIDTH px wide, then scaled down to
// OUTPUT_WIDTH, so its text and lines come out smaller than on a slide, as suits
// a page read on screen. A title (Plot draws it in HTML) is redrawn inside the
// SVG, and the image has its own background, white or dark to match the page.

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'
import { parseHTML } from 'linkedom'
import { render, rows } from '../addon/plots/render.js'
import exports from './figure-exports.mjs'
import { presentationsDir } from './events.mjs'

const WIDTH = 800
const HEIGHT = 500
const OUTPUT_WIDTH = 680
const FONT = '\'Noto Sans\', \'Helvetica Neue\', Arial, sans-serif'

// Dark mode. An SVG shown with <img> can't see the page's styles, but its own
// prefers-color-scheme media query follows the page's color-scheme, which
// gutenberg (next-themes) sets with its theme toggle. So each image carries
// its colours for both modes: the light ones as attributes, from the slides,
// and here the dark ones, matched to gutenberg's dark background. Text halos
// and point outlines (white) take the background colour.
const DARK = {
  background: 'oklch(0.208 0.042 265.755)',
  ink: '#e2e8f0',
  grid: '#fff',
  colours: { '#0072B2': '#56B4E9' },
}
const STYLE = `<style>
@media (prefers-color-scheme: dark) {
  svg { color: ${DARK.ink} }
  .background, [fill="white"] { fill: ${DARK.background} }
  [stroke="white"] { stroke: ${DARK.background} }
  [stroke="#000"] { stroke: ${DARK.grid} }
  [fill="black"], [fill="#1a1a1a"] { fill: ${DARK.ink} }
  [stroke="black"], [stroke="#1a1a1a"] { stroke: ${DARK.ink} }
${Object.entries(DARK.colours).map(([light, dark]) => `  [fill="${light}"] { fill: ${dark} }\n  [stroke="${light}"] { stroke: ${dark} }`).join('\n')}
}
</style>`

// Plot spaces ticks by pixels, so the larger canvas would double them; space
// them out to about as many as on a slide
const AXES = { x: { tickSpacing: 100 }, y: { tickSpacing: 60 } }

const [outDir, ...only] = process.argv.slice(2)
if (!outDir) {
  console.error('usage: node scripts/export-figures.mjs <output directory> [file ...]')
  process.exit(2)
}
fs.mkdirSync(outDir, { recursive: true })

const { document } = parseHTML('<!doctype html><html><body></body></html>')
const escape = text => text.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

// One figure as SVG markup, `width` by `height`, placed at (x, 0)
async function panel(deck, name, params, x, width) {
  const figure = await import(pathToFileURL(path.join(presentationsDir, deck, 'plots', `${name}.js`)))
  const { node } = render(figure, params, { width, height: HEIGHT, document, axes: AXES })
  const svg = node.tagName.toLowerCase() === 'svg' ? node : node.querySelector('svg')
  const title = node.tagName.toLowerCase() === 'svg' ? '' : node.querySelector('h2')?.textContent ?? ''
  const top = title ? rows.title : 0
  svg.setAttribute('x', String(x))
  svg.setAttribute('y', String(top))
  // The slides' text size, font and colour are in a style attribute, which an
  // image viewer may ignore, so give them as attributes instead
  svg.removeAttribute('style')
  svg.removeAttribute('font-family')
  svg.setAttribute('font-size', '16')
  svg.setAttribute('color', '#1a1a1a')
  const heading = title
    ? `<text x="${x + width / 2}" y="${rows.title - 8}" text-anchor="middle" font-size="20" font-weight="600" fill="#1a1a1a">${escape(title)}</text>`
    : ''
  return heading + svg.outerHTML
}

let written = 0
for (const entry of exports) {
  if (only.length && !only.includes(entry.file))
    continue
  const names = entry.panels ?? [entry.figure]
  const width = WIDTH / names.length
  const parts = []
  for (const [i, name] of names.entries())
    parts.push(await panel(entry.deck, name, entry.params ?? {}, i * width, width))
  const scale = OUTPUT_WIDTH / WIDTH
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${OUTPUT_WIDTH}" height="${Math.round(HEIGHT * scale)}" viewBox="0 0 ${WIDTH} ${HEIGHT}" font-family="${FONT}">`,
    STYLE,
    `<rect class="background" width="${WIDTH}" height="${HEIGHT}" fill="white"/>`,
    ...parts,
    '</svg>',
  ].join('\n')
  fs.writeFileSync(path.join(outDir, entry.file), `${svg}\n`)
  written++
}
console.log(`${written} image(s) written to ${outDir}`)
