#!/usr/bin/env node

// Serves a deck and visits every slide in a browser, reporting the gap that
// addon/utils/flow-gap.js chose for it. Even at the smallest gap, a slide whose
// content runs into the bottom padding is TIGHT (fine, and usual for a figure
// that fills the slide), and one whose content runs off the slide altogether is
// OVERFLOW. Exits non-zero if any slide overflows.
//
//   node scripts/check-overflow.mjs presentations/<deck> [port]
//
// Needs playwright-chromium: `npm install --no-save playwright-chromium`.

import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { parseSync } from '@slidev/parser'
import { chromium } from 'playwright-chromium'

const [deckDir, port = '3300'] = process.argv.slice(2)
if (!deckDir) {
  console.error('usage: node scripts/check-overflow.mjs presentations/<deck> [port]')
  process.exit(2)
}
const file = path.join(deckDir, 'slides.md')
const count = parseSync(fs.readFileSync(file, 'utf8'), file).slides.length
const url = `http://127.0.0.1:${port}`

const server = spawn(path.resolve('node_modules/.bin/slidev'), ['slides.md', '--port', port], { cwd: deckDir, stdio: 'ignore' })
const stop = () => server.kill()
process.on('exit', stop)

async function waitForServer() {
  for (let i = 0; i < 120; i++) {
    try {
      if ((await fetch(url)).ok)
        return
    }
    catch {}
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  throw new Error(`no server at ${url}`)
}

await waitForServer()
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
let overflowing = 0
for (let n = 1; n <= count; n++) {
  await page.goto(`${url}/#/${n}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  const result = await page.evaluate((n) => {
    const layout = document.querySelector(`.slidev-page-${n} .slidev-layout`)
    if (!layout)
      return { title: '(not rendered)' }
    return {
      title: document.querySelector(`.slidev-page-${n} h1`)?.textContent?.trim() ?? '',
      layout: [...layout.classList].filter(c => c !== 'slidev-layout').join(' '),
      gap: layout.style.getPropertyValue('--flow-gap') || '-',
      excess: layout.dataset.flowOverflow,
      padding: Number.parseFloat(getComputedStyle(layout).paddingBottom),
    }
  }, n)
  const excess = result.excess === undefined ? undefined : Number(result.excess)
  const off = excess !== undefined && excess > result.padding
  if (off)
    overflowing++
  const flag = excess === undefined ? '' : `${off ? 'OVERFLOW' : 'tight'} ${excess}px`
  console.log(`${String(n).padStart(3)}  ${(result.gap ?? '').padEnd(5)}  ${flag.padEnd(12)}  ${result.title}${result.layout ? ` [${result.layout}]` : ''}`)
}
await browser.close()
stop()
console.log(overflowing ? `${overflowing} slide(s) overflow` : 'no slides overflow')
process.exit(overflowing ? 1 : 0)
