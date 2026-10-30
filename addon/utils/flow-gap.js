// Spreads a slide's content down the space below the header bar. Every gap
// between blocks (paragraphs, lists, displayed maths, code, figures) is
// var(--flow-gap) (see addon/styles/index.css), and this sets it per slide, as
// large as still fits, between MIN_GAP and MAX_GAP. A sparse slide gets roomy,
// even spacing but stays top-aligned; a dense one closes up to MIN_GAP. A slide
// that overflows even then is marked data-flow-overflow, for
// scripts/check-overflow.mjs to report. Content hidden by v-click keeps its
// space (opacity 0), so the spacing is the same at every click.

// In px at the slide's own size, before Slidev scales it to the window
const MIN_GAP = 16
const MAX_GAP = 36

// Layouts that place their own content
const SKIP = ['cover', 'exercise', 'section', 'questions', 'orientation', 'orientation-weeks']

const pending = new Set()

function applies(layout) {
  return !SKIP.some(name => layout.classList.contains(name))
}

// The bottom of the lowest content on the slide, looking inside grid and flex
// containers (e.g. the two-cols columns, which stretch to the slide's height)
function contentBottom(element) {
  let bottom = -Infinity
  for (const child of element.children) {
    const style = getComputedStyle(child)
    if (style.display === 'none' || style.position === 'absolute' || style.position === 'fixed')
      continue
    bottom = Math.max(bottom, /grid|flex/.test(style.display) ? contentBottom(child) : child.getBoundingClientRect().bottom)
  }
  return bottom
}

// How far, in px at the slide's own size, the content runs past the bottom
// padding (negative if it fits)
function excess(layout) {
  const box = layout.getBoundingClientRect()
  const scale = box.height / layout.offsetHeight
  const limit = box.bottom - Number.parseFloat(getComputedStyle(layout).paddingBottom) * scale
  return (contentBottom(layout) - limit) / scale
}

function fits(layout) {
  return excess(layout) <= 0.5
}

function setGap(layout, gap) {
  layout.style.setProperty('--flow-gap', `${gap}px`)
}

function fit(layout) {
  if (!layout.isConnected || !layout.offsetHeight)
    return
  setGap(layout, MAX_GAP)
  if (fits(layout)) {
    delete layout.dataset.flowOverflow
    return
  }
  setGap(layout, MIN_GAP)
  if (!fits(layout)) {
    layout.dataset.flowOverflow = String(Math.round(excess(layout)))
    return
  }
  delete layout.dataset.flowOverflow
  let lo = MIN_GAP
  let hi = MAX_GAP
  while (hi - lo > 0.5) {
    const mid = (lo + hi) / 2
    setGap(layout, mid)
    if (fits(layout))
      lo = mid
    else
      hi = mid
  }
  setGap(layout, Math.floor(lo))
}

function schedule(layout) {
  if (pending.size === 0)
    requestAnimationFrame(() => {
      for (const l of pending)
        fit(l)
      pending.clear()
    })
  pending.add(layout)
}

const resized = new ResizeObserver((entries) => {
  for (const entry of entries)
    schedule(entry.target.closest('.slidev-layout') ?? entry.target)
})

function watch(layout) {
  if (layout.dataset.flowWatched !== undefined || !applies(layout))
    return
  layout.dataset.flowWatched = ''
  resized.observe(layout)
  for (const child of layout.querySelectorAll(':scope > *, :scope > .col-left > *, :scope > .col-right > *'))
    resized.observe(child)
  schedule(layout)
}

export function startFlowGap() {
  const scan = (root) => {
    if (root.matches?.('.slidev-layout'))
      watch(root)
    root.querySelectorAll?.('.slidev-layout').forEach(watch)
  }
  new MutationObserver((mutations) => {
    for (const m of mutations)
      m.addedNodes.forEach(node => node.nodeType === 1 && scan(node))
  }).observe(document.body, { childList: true, subtree: true })
  scan(document.body)
  document.fonts?.ready.then(() => document.querySelectorAll('.slidev-layout[data-flow-watched]').forEach(schedule))
}
