<script setup>
// Variant of the oxrse `orientation` layout for a two-week course.
// Sessions with a `week` field are grouped into one column per week;
// sessions without one (e.g. the introduction) span the full width above.
const schedule = __EVENT_SCHEDULE__
const props = defineProps({
  highlight: { type: String, default: '' },
})

const sessions = schedule.sessions || []
const fullWidth = sessions.filter(s => s.week === undefined)
const weeks = [...new Set(sessions.filter(s => s.week !== undefined).map(s => s.week))]
  .map(week => ({ week, sessions: sessions.filter(s => s.week === week) }))

// "02 Nov" + year -> "Mon 02 Nov 09:30"
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function when(s) {
  const [day, month] = s.date.split(' ')
  const date = new Date(Date.UTC(schedule.year, MONTHS.indexOf(month), Number(day)))
  const weekday = date.toLocaleDateString('en-GB', { weekday: 'short', timeZone: 'UTC' })
  return `${weekday} ${s.date} ${s.slot}`
}
</script>

<template>
  <div class="slidev-layout orientation-weeks">
    <table v-if="fullWidth.length" class="schedule-table full-width">
      <tbody>
        <tr v-for="(s, i) in fullWidth" :key="i" :class="{ highlighted: s.topic === props.highlight }">
          <td class="session-time">{{ when(s) }}</td>
          <td class="session-topic">{{ s.topic }}</td>
        </tr>
      </tbody>
    </table>
    <div class="weeks">
      <div v-for="w in weeks" :key="w.week">
        <h3>Week {{ w.week }}</h3>
        <table class="schedule-table">
          <tbody>
            <tr v-for="(s, i) in w.sessions" :key="i" :class="{ highlighted: s.topic === props.highlight }">
              <td class="session-time">{{ when(s) }}</td>
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
  margin: 0 0 0.3rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
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
  padding: 0.35rem 0.75rem;
}

.session-time {
  width: 1%;
  color: #444;
  white-space: nowrap;
  font-family: var(--slidev-code-font-family);
  font-size: 0.75rem;
}

.session-topic {
  color: #222;
}

.highlighted {
  outline: 2.5px solid #e8a735;
  outline-offset: -1px;
}
</style>
