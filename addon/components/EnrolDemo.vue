<script setup>
// Animated mock-up of enrolling on an event at train.rse.ox.ac.uk. It is a
// simplified sketch of the site, not a recording: grey bars stand in for text,
// and the event name and sessions come from the event YAML (`name`, `sessions`).
import { onSlideEnter, onSlideLeave } from '@slidev/client'
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'

// @unocss-ignore: this file uses its own scoped classes, so UnoCSS should not
// generate utilities from them (e.g. `outline` or `inline` would add styles)

// Injected by slidev-theme-oxrse from the event YAML; tolerate it being absent
// eslint-disable-next-line no-undef
const schedule = typeof __EVENT_SCHEDULE__ === 'undefined' ? {} : __EVENT_SCHEDULE__
// String() so that e.g. `enrolment_key: 2026` in the YAML still works
const eventName = String(schedule.name || 'Essential Maths')
const KEY = String(schedule.enrolment_key || 'enrolment-key')

// "02 Nov" + "14:00" -> "Nov 2, 2026, 2:00 PM", as the site shows dates
function siteDate(session) {
  const [day, month] = String(session.date ?? '').split(' ')
  const slot = String(session.slot ?? '')
  if (!month || !/^\d{1,2}:\d{2}$/.test(slot))
    return String(session.date ?? '')
  const [h, m] = slot.split(':').map(Number)
  const time = `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
  return `${month} ${Number(day)}, ${schedule.year}, ${time}`
}
const sessions = (Array.isArray(schedule.sessions) ? schedule.sessions : []).slice(0, 3)
const eventDate = sessions.length ? siteDate(sessions[0]) : ''

// Caption under the mock-up, one per step of the timeline below
const escapeHtml = text => text.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const STEPS = [
  'Click <b>+ Enrol on event</b>',
  `Find <b>${escapeHtml(eventName)}</b> and click <b>Enrol</b>`,
  `Enter the enrolment key <code>${escapeHtml(KEY)}</code>`,
  'Close the dialog and click <b>Select</b> to make it your active event',
  'Click the <b>calendar icon</b> to see the event overview',
]

// The animation is a timeline of timed actions, so the scene at any time `t`
// can be worked out directly: this is what lets students pause and scrub.
const TYPE_MS = 70
const CLICK_MS = 800 // length of the yellow click highlight
const timeline = []
let clock = 0
function add(type, props = {}, duration = 0) {
  timeline.push({ type, at: clock, ...props })
  clock += duration
}
add('wait', {}, 1000)
add('move', { target: 'enrolOnEvent' }, 900)
add('click', {}, 350)
add('set', { page: 'events', step: 1 }, 800)
add('move', { target: 'enrolButton' }, 900)
add('click', {}, 350)
add('set', { modal: true, step: 2 }, 600)
add('move', { target: 'keyInput' }, 900)
add('click', {}, 350)
add('type', {}, KEY.length * TYPE_MS + 300)
add('move', { target: 'submit' }, 700)
add('click', {}, 350)
add('set', { success: true }, 1300)
add('set', { step: 3 })
add('move', { target: 'close' }, 700)
add('click', {}, 350)
add('set', { modal: false, enrolled: true }, 700)
add('move', { target: 'enrolButton' }, 700)
add('click', {}, 350)
add('set', { selected: true }, 900)
add('set', { step: 4 })
add('move', { target: 'calendar' }, 900)
add('click', {}, 350)
add('set', { sidebar: true }, 700)
add('move', { target: 'sidebarTitle' }, 900)
add('wait', {}, 3500)
const DURATION = clock
const stepStarts = [0, ...timeline.filter(e => 'step' in e).map(e => e.at)]

const INITIAL = {
  page: 'home',
  modal: false,
  success: false,
  enrolled: false,
  selected: false,
  sidebar: false,
  step: 0,
  target: null,
  typed: '',
  lastClick: -Infinity,
}
function stateAt(time) {
  const scene = { ...INITIAL }
  for (const { type, at, ...props } of timeline) {
    if (at > time)
      break
    if (type === 'set')
      Object.assign(scene, props)
    else if (type === 'move')
      scene.target = props.target
    else if (type === 'click')
      scene.lastClick = at
    else if (type === 'type')
      scene.typed = KEY.slice(0, Math.floor((time - at) / TYPE_MS) + 1)
  }
  return scene
}

// Playback
const t = ref(0)
const playing = ref(false)
const state = computed(() => stateAt(t.value))
const page = computed(() => state.value.page)
const modal = computed(() => state.value.modal)
const typed = computed(() => state.value.typed)
const success = computed(() => state.value.success)
const enrolled = computed(() => state.value.enrolled)
const selected = computed(() => state.value.selected)
const sidebar = computed(() => state.value.sidebar)
const stepIndex = computed(() => state.value.step)

let frameId = null
let last = 0
function tick(now) {
  if (playing.value)
    t.value = (t.value + Math.min(now - last, 100)) % DURATION
  last = now
  frameId = requestAnimationFrame(tick)
}
function start() {
  t.value = 0
  playing.value = true
  last = performance.now()
  cancelAnimationFrame(frameId)
  frameId = requestAnimationFrame(tick)
}
function stop() {
  playing.value = false
  cancelAnimationFrame(frameId)
  t.value = 0
}
function scrub(event) {
  playing.value = false
  t.value = Number(event.target.value)
}
function jump(i) {
  t.value = stepStarts[i]
}
// Slidev ignores keys while a control has focus, which would stop the clicker
// advancing slides. Keyboard use (event.detail === 0) keeps focus as normal.
function releaseFocus(event) {
  if (event.detail !== 0 || event.type === 'pointerup')
    event.currentTarget.blur()
}

onSlideEnter(start)
onSlideLeave(stop)
onBeforeUnmount(stop)

// Elements the cursor moves to
const frame = ref()
const enrolOnEvent = ref()
const enrolButton = ref()
const keyInput = ref()
const submit = ref()
const close = ref()
const calendar = ref()
const sidebarTitle = ref()
const targets = { enrolOnEvent, enrolButton, keyInput, submit, close, calendar, sidebarTitle }

// The cursor sits on the current target; its CSS transition animates the moves.
// Layout offsets (not screen positions) ignore Slidev's scaling and the
// sidebar's slide-in, so a scrub lands the cursor in the right place.
const START = { x: 60, y: 70 }
const cursor = ref(START)
// Set for a moment when the cursor returns to START (e.g. the loop restarting),
// so it jumps there instead of gliding across the frame
const instant = ref(false)
function offsetIn(el) {
  let x = el.offsetWidth / 2
  let y = el.offsetHeight / 2
  while (el && el !== frame.value) {
    x += el.offsetLeft
    y += el.offsetTop
    el = el.offsetParent
  }
  return { x: (x / frame.value.offsetWidth) * 100, y: (y / frame.value.offsetHeight) * 100 }
}
watch(
  [() => state.value.target, page, modal, sidebar],
  async () => {
    const name = state.value.target
    if (!name) {
      instant.value = true
      cursor.value = START
      // Re-enable the transition once the jump has been painted
      requestAnimationFrame(() => requestAnimationFrame(() => {
        instant.value = false
      }))
      return
    }
    await nextTick()
    const el = targets[name].value
    if (el && frame.value)
      cursor.value = offsetIn(el)
  },
  { immediate: true },
)

// Click feedback, drawn from the time so it also shows when paused or scrubbed
const clickAge = computed(() => t.value - state.value.lastClick)
const clicking = computed(() => clickAge.value < 200)
const rippleStyle = computed(() => {
  const progress = clickAge.value / CLICK_MS
  if (!(progress < 1))
    return null
  return {
    left: `${cursor.value.x}%`,
    top: `${cursor.value.y}%`,
    transform: `translate(-50%, -50%) scale(${0.2 + 0.8 * progress})`,
    opacity: 1 - progress,
  }
})
</script>

<template>
  <div class="enrol-demo">
    <div ref="frame" class="demo">
      <!-- Top bar -->
      <div class="bar">
        <span ref="calendar" class="icon-wrap"><svg class="icon calendar" viewBox="0 0 16 16" aria-hidden="true">
          <rect x="1.5" y="3" width="13" height="11.5" rx="2" />
          <rect x="4" y="1" width="1.6" height="4" rx="0.8" />
          <rect x="10.4" y="1" width="1.6" height="4" rx="0.8" />
          <rect x="3.5" y="7" width="9" height="1.4" class="cut" />
        </svg></span>
        <span class="divider" />
        <span class="logo">OxRSE</span>
        <span v-if="page === 'events'" class="crumb">&rsaquo;&nbsp;&nbsp;Events</span>
        <span class="spacer" />
        <svg class="icon" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="8" cy="8" r="7" />
          <circle cx="8.8" cy="7.2" r="3" class="cut" />
          <rect x="3.2" y="10" width="4" height="1.6" rx="0.8" transform="rotate(-45 5.2 10.8)" class="cut" />
        </svg>
        <svg class="icon" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="8" cy="8" r="7" />
          <circle cx="8" cy="6" r="2.4" class="cut" />
          <path d="M3.8 12.4c0.9-2 2.4-2.9 4.2-2.9s3.3 0.9 4.2 2.9" class="cut" />
        </svg>
        <span class="divider" />
        <span class="at">@</span>
      </div>

      <!-- Home page -->
      <div v-if="page === 'home'" class="page">
        <p class="site-title"><span class="logo big">OxRSE</span> OxRSE Training</p>
        <div class="columns">
          <div class="stack">
            <div class="card">
              <div class="card-head">
                <div>
                  <p class="card-title">Your Events</p>
                  <p class="muted small">Your enrolled events.</p>
                </div>
                <span ref="enrolOnEvent" class="button small">+ Enrol on event</span>
              </div>
              <div class="inner">
                <div class="inner-copy">
                  <span class="bar-text dim" style="width: 55%" />
                  <span class="bar-text strong" style="width: 85%" />
                  <span class="bar-text" style="width: 75%" />
                </div>
                <span class="btn-outline">Enrol &rarr;</span>
              </div>
              <span class="button">Browse all events</span>
            </div>
            <div class="card">
              <p class="card-title">Courses</p>
              <span class="bar-text" style="width: 70%" />
            </div>
          </div>
          <div class="card">
            <p class="card-title">Course Material</p>
            <div class="para">
              <span class="bar-text" style="width: 96%" /><span class="bar-text" style="width: 92%" /><span class="bar-text" style="width: 40%" />
            </div>
            <div class="para">
              <span class="bar-text" style="width: 94%" /><span class="bar-text" style="width: 97%" /><span class="bar-text" style="width: 90%" /><span class="bar-text" style="width: 55%" />
            </div>
            <div class="para">
              <span class="bar-text" style="width: 95%" /><span class="bar-text" style="width: 93%" /><span class="bar-text" style="width: 70%" />
            </div>
            <span class="button wide">View the teaching materials &rarr;</span>
          </div>
        </div>
      </div>

      <!-- Events page -->
      <div v-else class="page">
        <p class="page-title">Events</p>
        <div class="card events-card">
          <div class="card-head">
            <p class="card-title">Course Events</p>
            <svg class="search" viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="4.5" />
              <path d="M10 10l4 4" />
            </svg>
          </div>
          <div class="timeline">
            <div class="event">
              <span class="dot" />
              <p class="muted small">{{ eventDate }}</p>
              <p class="event-title">{{ eventName }}</p>
              <span class="bar-text" style="width: 45%" />
              <span ref="enrolButton" class="btn-outline" :class="{ active: selected }">
                {{ selected ? 'Unselect' : enrolled ? 'Select' : 'Enrol' }} &rarr;
              </span>
            </div>
            <div v-for="i in 2" :key="i" class="event">
              <span class="dot" />
              <span class="bar-text dim" style="width: 12%" />
              <span class="bar-text strong" :style="{ width: `${i === 1 ? 38 : 44}%` }" />
              <span class="bar-text" style="width: 45%" />
              <span class="btn-outline">Enrol &rarr;</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Enrol dialog -->
      <div v-if="modal" class="overlay">
        <div class="dialog">
          <div class="dialog-head">
            <span>{{ eventName }}</span>
            <span ref="close" class="close">&times;</span>
          </div>
          <div class="dialog-body">
            <p>You should have received an enrolment key from the course organiser.</p>
            <div class="key-row">
              <span ref="keyInput" class="input" :class="{ focus: typed || success }">{{ typed }}</span>
              <span ref="submit" class="button">Enrol</span>
            </div>
            <p v-if="success" class="toast"><span class="toast-tick">&#10003;</span> Enrolment Successful</p>
          </div>
          <div class="dialog-foot">
            <p>If you have not received an enrolment key, you can request enrolment:</p>
            <span class="button">Request Enrollment</span>
          </div>
        </div>
      </div>

      <!-- Event overview, opened from the calendar icon -->
      <div class="sidebar" :class="{ open: sidebar }">
        <div class="sidebar-head">
          <span class="change">&#8644; Change Event</span>
          <span class="sidebar-name">{{ eventName }}</span>
        </div>
        <p ref="sidebarTitle" class="sidebar-title">{{ eventName }}</p>
        <p class="description"><b>Description:</b> <span class="bar-text inline" style="width: 55%" /></p>
        <div v-for="(s, i) in sessions" :key="i" class="session">
          <span class="dot" />
          <p class="muted small">{{ siteDate(s) }}</p>
          <p class="session-title">{{ s.topic }}</p>
          <div class="session-body">
            <p><b>Location:</b> <span class="bar-text inline" style="width: 50%" /></p>
            <p><b>Material:</b></p>
            <div v-for="j in 2" :key="j" class="material">
              <span class="bar-text" :style="{ width: `${j === 1 ? 40 : 52}%` }" />
              <span class="tag">PYTHON</span>
            </div>
          </div>
        </div>
      </div>

      <span v-if="rippleStyle" class="ripple" :style="rippleStyle" />

      <svg
        class="cursor" :class="{ clicking, instant }"
        :style="{ left: `${cursor.x}%`, top: `${cursor.y}%` }"
        viewBox="0 0 12 18" aria-hidden="true"
      >
        <path d="M1 1 L1 15 L4.5 11.5 L7 17 L9 16 L6.5 10.5 L11 10.5 Z" fill="#fff" stroke="#000" stroke-width="1" />
      </svg>
    </div>
    <div class="controls">
      <button class="play" :aria-label="playing ? 'Pause' : 'Play'" @click="playing = !playing; releaseFocus($event)">
        <svg v-if="playing" viewBox="0 0 16 16" aria-hidden="true">
          <rect x="3" y="2" width="3.5" height="12" rx="1" /><rect x="9.5" y="2" width="3.5" height="12" rx="1" />
        </svg>
        <svg v-else viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.2v11.6l9.5-5.8z" /></svg>
      </button>
      <div class="track">
        <input type="range" min="0" :max="DURATION" step="10" :value="t" aria-label="Animation position" @input="scrub" @pointerup="releaseFocus">
        <button
          v-for="(at, i) in stepStarts" :key="i"
          class="tick" :class="{ reached: t >= at }"
          :style="{ left: `${(at / DURATION) * 100}%` }"
          :aria-label="`Go to step ${i + 1}`"
          @click="jump(i); releaseFocus($event)"
        >
          {{ i + 1 }}
        </button>
      </div>
    </div>
    <Transition name="caption" mode="out-in">
      <p :key="stepIndex" class="caption">
        <span class="step-number">Step {{ stepIndex + 1 }}</span>
        <!-- eslint-disable-next-line vue/no-v-html -- built above, with YAML values escaped -->
        <span v-html="STEPS[stepIndex]" />
      </p>
    </Transition>
  </div>
</template>

<style scoped>
.enrol-demo {
  width: 100%;
}

.caption {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin: 0.8rem 0 0;
  font-size: 1rem;
  color: var(--oxrse-bg-colour, #002147);
}

.caption :deep(code) {
  padding: 0.05rem 0.35rem;
  border-radius: 0.25rem;
  background: #edf4f8;
  font-family: var(--slidev-code-font-family, monospace);
  font-size: 0.9em;
}

.step-number {
  padding: 0.1rem 0.5rem;
  border-radius: 0.3rem;
  background: var(--oxrse-bg-colour, #002147);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
}

.caption-enter-active,
.caption-leave-active {
  transition: opacity 0.25s;
}

.caption-enter-from,
.caption-leave-to {
  opacity: 0;
}

.demo {
  --page: #0f172a;
  --card: #1e293b;
  --inner: #111827;
  --line: #334155;
  --bar: #475569;
  --text: #f1f5f9;
  --muted: #94a3b8;
  --accent: #1b91b0;
  position: relative;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 16 / 8.2;
  border-radius: 0.6rem;
  background: var(--page);
  color: var(--text);
  font-size: 0.7rem;
  line-height: 1.35;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

p { margin: 0; }
.muted { color: var(--muted); }
.small { font-size: 0.6rem; }

/* Top bar */
.bar {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  height: 2rem;
  margin: 0.4rem 0.6rem 0;
  padding: 0 0.6rem;
  border: 1px solid var(--line);
  border-radius: 0.35rem;
  background: var(--card);
}
.icon { width: 1rem; height: 1rem; fill: var(--muted); }
.icon .cut { fill: var(--card); stroke: var(--card); }
.calendar { fill: #cbd5e1; }
.divider { width: 1px; height: 1.2rem; background: var(--line); }
.logo {
  padding: 0 0.15rem;
  border: 1px solid #93c5fd;
  font-family: Georgia, serif;
  font-size: 0.45rem;
  color: #bfdbfe;
  background: #0b2a55;
}
.logo.big { font-size: 0.6rem; padding: 0.1rem 0.25rem; margin-right: 0.3rem; vertical-align: middle; }
.crumb { color: var(--muted); font-size: 0.6rem; }
.spacer { flex: 1; }
.at { color: var(--muted); font-weight: 700; font-size: 1rem; line-height: 1; }

/* Page scaffolding */
.page { padding: 0.7rem 3.2rem; }
.site-title { text-align: center; font-size: 1rem; font-weight: 700; margin-bottom: 0.6rem; }
.page-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; }
.columns { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; align-items: start; }
.stack { display: flex; flex-direction: column; gap: 0.6rem; }

.card {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--line);
  border-radius: 0.35rem;
  background: var(--card);
}
.card-head { display: flex; justify-content: space-between; align-items: flex-start; }
.card-title { font-weight: 700; font-size: 0.85rem; }
.inner {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--line);
  border-radius: 0.3rem;
  background: var(--inner);
}
.inner-copy { display: flex; flex: 1; flex-direction: column; gap: 0.3rem; }
.para { display: flex; flex-direction: column; gap: 0.28rem; }

/* Grey bars standing in for text */
.bar-text { display: block; height: 0.4rem; border-radius: 0.2rem; background: var(--bar); }
.bar-text.strong { height: 0.5rem; background: #64748b; }
.bar-text.dim { background: var(--line); }
.bar-text.inline { display: inline-block; vertical-align: middle; }

.button {
  align-self: flex-start;
  padding: 0.3rem 0.6rem;
  border-radius: 0.3rem;
  background: var(--accent);
  color: #fff;
  font-weight: 600;
  white-space: nowrap;
}
.button.small { padding: 0.2rem 0.45rem; font-size: 0.55rem; }
.button.wide { align-self: stretch; text-align: center; }
.btn-outline {
  align-self: flex-start;
  padding: 0.2rem 0.55rem;
  border: 1px solid #475569;
  border-radius: 0.3rem;
  font-size: 0.6rem;
  color: #cbd5e1;
  white-space: nowrap;
}
.btn-outline.active { border-color: #60a5fa; box-shadow: 0 0 0 1px #60a5fa; }

/* Events page timeline */
.events-card { gap: 0.3rem; }
.search { width: 0.8rem; height: 0.8rem; margin-top: 1.2rem; fill: none; stroke: var(--muted); stroke-width: 1.8; }
.timeline { margin-left: 0.3rem; border-left: 1px solid var(--line); }
.event {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
  padding: 0 0 0.75rem 0.9rem;
}
.event-title { font-weight: 600; font-size: 0.75rem; }
.dot {
  position: absolute;
  left: -0.27rem;
  top: 0.15rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--line);
}

/* Enrol dialog */
.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(2, 6, 23, 0.6);
}
.dialog { width: 56%; border-radius: 0.45rem; background: #374151; }
.dialog-head {
  display: flex;
  justify-content: space-between;
  padding: 0.65rem 0.9rem;
  border-bottom: 1px solid #4b5563;
  font-weight: 700;
  font-size: 0.8rem;
}
.close { color: var(--muted); }
.dialog-body { display: flex; flex-direction: column; gap: 0.55rem; padding: 0.8rem 0.9rem; }
.key-row { display: flex; justify-content: center; gap: 0.4rem; }
.input {
  width: 8rem;
  min-height: 1.5rem;
  padding: 0.25rem 0.45rem;
  border: 2px solid #4b5563;
  border-radius: 0.35rem;
  background: var(--card);
  font-size: 0.65rem;
}
.input.focus { border-color: var(--accent); }
.toast {
  align-self: flex-start;
  padding: 0.3rem 0.6rem;
  border-radius: 0.3rem;
  background: var(--card);
  color: #e2e8f0;
}
.toast-tick { color: #4ade80; font-weight: 700; }
.dialog-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 0.7rem 0.9rem;
  border-top: 1px solid #4b5563;
}

/* Event overview sidebar */
.sidebar {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 36%;
  padding: 0.55rem 0.8rem;
  overflow: hidden;
  background: var(--card);
  border-right: 1px solid var(--line);
  box-shadow: 6px 0 20px rgba(0, 0, 0, 0.4);
  transform: translateX(-105%);
  transition: transform 0.45s ease-out;
}
.sidebar.open { transform: none; }
.sidebar-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding-bottom: 0.4rem;
  margin-bottom: 0.4rem;
  border-bottom: 1px solid var(--line);
  font-size: 0.6rem;
  white-space: nowrap;
}
.change { color: #93c5fd; }
.sidebar-name { overflow: hidden; text-overflow: ellipsis; color: #cbd5e1; }
.sidebar-title { font-size: 1rem; font-weight: 700; line-height: 1.2; margin-bottom: 0.3rem; }
.description { color: var(--muted); margin-bottom: 0.6rem; }
.description b, .session-body b { color: #cbd5e1; }
.session {
  position: relative;
  padding: 0 0 0.6rem 0.9rem;
  margin-left: 0.25rem;
  border-left: 1px solid var(--line);
}
.session-title { font-weight: 700; font-size: 0.75rem; margin: 0.1rem 0 0.2rem; }
.session-body { display: flex; flex-direction: column; gap: 0.25rem; padding-left: 0.5rem; color: var(--muted); }
.material { display: flex; align-items: center; gap: 0.35rem; padding-left: 0.6rem; }
.tag {
  padding: 0 0.3rem;
  border: 1px solid #c2410c;
  border-radius: 0.6rem;
  font-size: 0.45rem;
  color: #fb923c;
}

.cursor {
  position: absolute;
  width: 0.9rem;
  transform-origin: 0 0;
  transition: left 0.8s ease-in-out, top 0.8s ease-in-out, transform 0.15s;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
  pointer-events: none;
  z-index: 5;
}
.cursor.clicking { transform: scale(0.8); }
.cursor.instant { transition: none; }

.ripple {
  position: absolute;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  background: rgba(250, 204, 21, 0.45);
  border: 2px solid #facc15;
  pointer-events: none;
  z-index: 4;
}

.icon-wrap { display: inline-flex; }

/* Playback controls */
.controls {
  display: flex;
  align-items: center;
  /* Room for the step 1 marker, which is centred on the start of the track */
  gap: 1.3rem;
  margin-top: 0.6rem;
}
.play {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.8rem;
  height: 1.8rem;
  border: none;
  border-radius: 50%;
  background: var(--oxrse-bg-colour, #002147);
  cursor: pointer;
}
.play svg { width: 0.8rem; height: 0.8rem; fill: #fff; }
/* Numbered step markers sit above the slider line */
.track { position: relative; flex: 1; height: 2.4rem; }
.track input {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 1.1rem;
  margin: 0;
  accent-color: var(--oxrse-bg-colour, #002147);
  cursor: pointer;
}
.tick {
  position: absolute;
  top: 0;
  width: 1.1rem;
  height: 1.1rem;
  padding: 0;
  border: 1px solid var(--oxrse-bg-colour, #002147);
  border-radius: 50%;
  background: #fff;
  color: var(--oxrse-bg-colour, #002147);
  font-size: 0.6rem;
  font-weight: 700;
  line-height: 1;
  transform: translateX(-50%);
  cursor: pointer;
}
.tick.reached { background: var(--oxrse-bg-colour, #002147); color: #fff; }
</style>
