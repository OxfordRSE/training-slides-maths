import { defineAppSetup } from '@slidev/types'
import { startFlowGap } from '../utils/flow-gap.js'

// Spreads each slide's content down the slide; see addon/utils/flow-gap.js
export default defineAppSetup(() => {
  if (typeof window !== 'undefined')
    startFlowGap()
})
