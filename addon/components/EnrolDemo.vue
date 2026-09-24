<script setup>
// Animated mock-up of enrolling on an event at train.rse.ox.ac.uk, played by
// SiteDemo. A simplified sketch of the site, not a recording: grey bars stand in
// for text, and the event name, key and sessions come from the event YAML.
//
// @unocss-ignore: this file uses its own class names, not UnoCSS utilities
import { createTimeline, enrolmentKey, escapeHtml, eventName, sessions, siteDate } from '../utils/site-demo.js'

const shownSessions = sessions.slice(0, 3)
const eventDate = shownSessions.length ? siteDate(shownSessions[0]) : ''

const steps = [
  'Click <b>+ Enrol on event</b>',
  `Find <b>${escapeHtml(eventName)}</b> and click <b>Enrol</b>`,
  `Enter the enrolment key <code>${escapeHtml(enrolmentKey)}</code>`,
  'Close the dialog and click <b>Select</b> to make it your active event',
  'Click the <b>calendar icon</b> to see the event overview',
]

const initial = {
  page: 'home',
  modal: false,
  typed: '',
  success: false,
  enrolled: false,
  selected: false,
  sidebar: false,
}

const timeline = createTimeline(({ wait, move, click, set, type }) => {
  wait(1000)
  move('enrolOnEvent')
  click()
  set({ page: 'events', step: 1 }, 800)
  move('enrolButton')
  click()
  set({ modal: true, step: 2 }, 600)
  move('keyInput')
  click()
  type('typed', enrolmentKey)
  move('submit', 700)
  click()
  set({ success: true }, 1300)
  set({ step: 3 })
  move('close', 700)
  click()
  set({ modal: false, enrolled: true }, 700)
  move('enrolButton', 700)
  click()
  set({ selected: true }, 900)
  set({ step: 4 })
  move('calendar')
  click()
  set({ sidebar: true }, 700)
  move('sidebarTitle')
  wait(3500)
})
</script>

<template>
  <SiteDemo :timeline="timeline" :initial="initial" :steps="steps">
    <template #default="{ state }">
      <SiteDemoBar :crumb="state.page === 'events' ? 'Events' : ''" />

      <!-- Home page -->
      <div v-if="state.page === 'home'" class="page">
        <p class="site-title"><span class="logo big">OxRSE</span> OxRSE Training</p>
        <div class="columns">
          <div class="stack">
            <div class="card">
              <div class="card-head">
                <div>
                  <p class="card-title">Your Events</p>
                  <p class="muted small">Your enrolled events.</p>
                </div>
                <span data-target="enrolOnEvent" class="button small">+ Enrol on event</span>
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
              <span data-target="enrolButton" class="btn-outline" :class="{ active: state.selected }">
                {{ state.selected ? 'Unselect' : state.enrolled ? 'Select' : 'Enrol' }} &rarr;
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
      <div v-if="state.modal" class="overlay">
        <div class="dialog">
          <div class="dialog-head">
            <span>{{ eventName }}</span>
            <span data-target="close" class="close">&times;</span>
          </div>
          <div class="dialog-body">
            <p>You should have received an enrolment key from the course organiser.</p>
            <div class="key-row">
              <span data-target="keyInput" class="input" :class="{ focus: state.typed || state.success }">{{ state.typed }}</span>
              <span data-target="submit" class="button">Enrol</span>
            </div>
            <p v-if="state.success" class="toast"><span class="toast-tick">&#10003;</span> Enrolment Successful</p>
          </div>
          <div class="dialog-foot">
            <p>If you have not received an enrolment key, you can request enrolment:</p>
            <span class="button">Request Enrollment</span>
          </div>
        </div>
      </div>

      <!-- Event overview, opened from the calendar icon -->
      <div class="sidebar" :class="{ open: state.sidebar }">
        <div class="sidebar-head">
          <span class="change">&#8644; Change Event</span>
          <span class="sidebar-name">{{ eventName }}</span>
        </div>
        <p data-target="sidebarTitle" class="sidebar-title">{{ eventName }}</p>
        <p class="description"><b>Description:</b> <span class="bar-text inline" style="width: 55%" /></p>
        <div v-for="(s, i) in shownSessions" :key="i" class="session">
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
    </template>
  </SiteDemo>
</template>

<style scoped>
/* Events page timeline */
.card.events-card { gap: 0.3rem; }
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
</style>
