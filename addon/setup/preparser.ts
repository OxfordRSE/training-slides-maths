import path from 'node:path'
import { definePreparserSetup } from '@slidev/types'
import { eventDecks, readEvent, repoRoot } from '../../scripts/events.mjs'

// In an event build (TRAINING_EVENT set), a deck that is one of the event's
// sessions, or that opens the event (`date: first-session`, e.g. the
// introduction), gets the event's own slides: the orientation slide after the
// cover, then at the end a questions slide, the feedback slide and the animated
// train.rse.ox.ac.uk walkthroughs. A deck leaves out the orientation slide, the
// feedback slide or the walkthroughs with `orientation-slide: false`,
// `feedback-slide: false` or `train-rse-walkthrough: false` in its headmatter.
// Extra space between the rows of a stacked derivation
const ROW_GAP = '0.4em'

export default definePreparserSetup(({ filepath, headmatter }) => {
  const event = readEvent()
  const deck = path.basename(path.dirname(filepath))
  const inEvent = Boolean(event) && eventDecks(event).includes(deck)
  const epilogue = (file: string) => path.relative(path.dirname(filepath), path.join(repoRoot, 'epilogue', file)).replaceAll('\\', '/')

  // Slidev parses the deck itself first, then each file it imports with `src:`
  let parsingDeck = true

  return [{
    transformRawLines(lines) {
      if (!parsingDeck)
        return
      parsingDeck = false
      if (!inEvent)
        return

      if (headmatter['orientation-slide'] !== false) {
        // The cover is the headmatter plus any content up to the next separator
        const headmatterEnd = lines.findIndex((line, i) => i > 0 && line.trimEnd() === '---')
        let coverEnd = lines.findIndex((line, i) => i > headmatterEnd && line.startsWith('---'))
        if (coverEnd === -1)
          coverEnd = lines.length
        lines.splice(coverEnd, 0, '---', 'layout: orientation-weeks', 'title: Orientation', `deck: ${deck}`, '---', '')
      }

      const closing = [['layout: questions']]
      if (headmatter['feedback-slide'] !== false)
        closing.push([`src: ${epilogue('feedback.md')}`])
      if (headmatter['train-rse-walkthrough'] !== false)
        closing.push([`src: ${epilogue('train-rse.md')}`])
      for (const frontmatter of closing)
        lines.push('', '---', ...frontmatter, '---', '')
    },

    // Slides marked `training-event-only: true` appear only in an event build.
    // The rows of a stacked derivation (aligned, gathered) get a little more
    // space than KaTeX gives, so that fractions on adjacent rows don't crowd;
    // a row break that already sets its own space is left alone.
    transformSlide(content, frontmatter) {
      if (frontmatter['training-event-only'] && !process.env.TRAINING_EVENT)
        frontmatter.disabled = true
      return content.replace(/\\begin\{(aligned|gathered)\}[\s\S]*?\\end\{\1\}/g, block => block.replace(/\\\\(?!\s*\[)/g, `\\\\[${ROW_GAP}]`))
    },
  }]
})
