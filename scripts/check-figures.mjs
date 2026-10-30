#!/usr/bin/env node

// Draws every figure, presentations/*/plots/*.js, in Node: at its starting
// values, and with each slider at both ends of its range. Fails if a figure
// throws, draws NaN or Infinity, draws no data at all, or has a slider whose
// starting value is outside its range. It checks that figures draw, not that
// they look right.

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'
import { parseHTML } from 'linkedom'
import { render } from '../addon/plots/render.js'
import { presentationsDir } from './events.mjs'

const { document } = parseHTML('<!doctype html><html><body></body></html>')

// Marks that are not data: axes, grid lines and the axis lines
const scaffolding = /axis|grid|frame/

// Whether an element draws something: Plot leaves an empty group, or an
// empty path, for a line whose points are all missing, e.g. NaN
function draws(el) {
  const tag = el.tagName.toLowerCase()
  if (tag === 'path')
    return Boolean(el.getAttribute('d'))
  if (tag === 'g')
    return [...el.children].some(draws)
  return true
}

function problemsWith(figure) {
  if (typeof figure.default !== 'function')
    return ['has no default export that returns Plot options']

  const problems = []
  const settings = [{}]
  for (const [name, c] of Object.entries(figure.controls ?? {})) {
    if (!(c.min < c.max) || c.value < c.min || c.value > c.max)
      problems.push(`slider ${name} starts at ${c.value}, outside [${c.min}, ${c.max}]`)
    settings.push({ [name]: c.min }, { [name]: c.max })
  }

  for (const params of settings) {
    const at = Object.keys(params).length ? ` with ${JSON.stringify(params)}` : ''
    const { node } = render(figure, params, { document })
    if (/NaN|Infinity/.test(node.outerHTML))
      problems.push(`draws NaN or Infinity${at}`)
    const marks = [...node.querySelectorAll('g[aria-label]')]
      .filter(g => !scaffolding.test(g.getAttribute('aria-label')))
    if (!marks.some(g => [...g.children].some(draws)))
      problems.push(`draws no data${at}`)
  }
  return problems
}

let checked = 0
let failed = 0
for (const deck of fs.readdirSync(presentationsDir).sort()) {
  const dir = path.join(presentationsDir, deck, 'plots')
  if (!fs.existsSync(dir))
    continue
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort()) {
    const where = `presentations/${deck}/plots/${file}`
    let problems
    try {
      problems = problemsWith(await import(pathToFileURL(path.join(dir, file))))
    }
    catch (error) {
      problems = [error.stack ?? String(error)]
    }
    checked++
    if (problems.length) {
      failed++
      for (const problem of problems)
        console.log(`${where}: ${problem}`)
    }
  }
}

console.log(`${checked} figure(s) checked, ${failed} with problems`)
process.exitCode = failed ? 1 : 0
