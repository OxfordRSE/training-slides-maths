<script setup>
// Variant of the oxrse `orientation` layout for a two-week course.
// Sessions with a `week` field are grouped into one column per week;
// sessions without one (e.g. the introduction) span the full width above.
// A session's optional `background` colour shades its row, e.g. to group topics.
const schedule = __EVENT_SCHEDULE__
const props = defineProps({
  highlight: { type: String, default: '' },
})

const sessions = schedule.sessions || []
const fullWidth = sessions.filter(s => s.week === undefined)
const weeks = [...new Set(sessions.filter(s => s.week !== undefined).map(s => s.week))]
  .map(week => ({ week, sessions: sessions.filter(s => s.week === week) }))

// "02 Nov" + year -> "Mon 02 Nov"
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function day(s) {
  const [dd, month] = s.date.split(' ')
  const date = new Date(Date.UTC(schedule.year, MONTHS.indexOf(month), Number(dd)))
  const weekday = date.toLocaleDateString('en-GB', { weekday: 'short', timeZone: 'UTC' })
  return `${weekday} ${s.date}`
}
</script>

<template>
  <div class="slidev-layout orientation-weeks">
    <table v-if="fullWidth.length" class="schedule-table full-width">
      <tbody>
        <tr v-for="(s, i) in fullWidth" :key="i" :class="{ highlighted: s.topic === props.highlight, shaded: s.background }" :style="{ background: s.background }">
          <td class="session-when"><span class="day">{{ day(s) }}</span><span class="time">{{ s.slot }}</span></td>
          <td class="session-topic">{{ s.topic }}</td>
        </tr>
      </tbody>
    </table>
    <div class="weeks">
      <div v-for="w in weeks" :key="w.week">
        <h3>Week {{ w.week }}</h3>
        <table class="schedule-table">
          <tbody>
            <tr v-for="(s, i) in w.sessions" :key="i" :class="{ highlighted: s.topic === props.highlight, shaded: s.background }" :style="{ background: s.background }">
              <td class="session-when"><span class="day">{{ day(s) }}</span><span class="time">{{ s.slot }}</span></td>
              <td class="session-topic">{{ s.topic }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.orientation-weeks {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;
}

.weeks {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  gap: 2rem;
}

h3 {
  font-size: 0.85rem;
  font-weight: 600;
  color: #444;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.full-width {
  width: calc(50% - 1rem);
  margin: 0 auto;
}

.schedule-table tr {
  border-bottom: 1px solid #e0e0e0;
}

.schedule-table tr:first-child {
  border-top: 1px solid #e0e0e0;
}

.schedule-table td {
  padding: 0.55rem 0.75rem;
}

/* Keep the time chip visible against a shaded row */
.shaded .time {
  background: #fff;
}

.session-when {
  width: 1%;
  white-space: nowrap;
  font-family: var(--slidev-code-font-family);
}

.day {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #536277;
}

.time {
  margin-left: 0.6rem;
  padding: 0.1rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #002147;
  background: #edf4f8;
}

.highlighted .time {
  color: #fff;
  background: #e8a735;
}

.session-topic {
  color: #222;
}

.highlighted {
  outline: 2.5px solid #e8a735;
  outline-offset: -1px;
}
</style>
