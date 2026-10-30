# OxRSE essential maths slides

[sli.dev](https://sli.dev/) slideshows for the Oxford DTC essential maths course, published at <https://maths.rse.ox.ac.uk>.
Each lecture is a single `presentations/<slug>/slides.md`.
Shared pieces live alongside:

- `addon/`: a local Slidev addon loaded by every lecture. It adds the event
  slides in an event build, and holds shared layouts and components such as
  `FeedbackQr`.
- `epilogue/`: closing slides added to a lecture in an event build.
- `events/`: one YAML file per course run (see below).

## Slidev build

First, install dependencies:

```console
npm install
```

To preview / live edit a presentation:

```console
npx slidev --open --entry presentations/00_intro/slides.md
```

To build every presentation and the index page into `dist/`:

```console
./build_all.sh
```

### Event and generic builds

The same slides can be built in two ways:

- **Event build**, for the course itself. Set `TRAINING_EVENT` to the basename of a
  YAML file in `events/`. Each lecture in that event gets the event's slides
  (see below), using the dates and feedback form from that file.
- **Generic build**, for the rest of the year. Leave `TRAINING_EVENT` unset and
  no event slides are added.

Both builds build every lecture.

```console
TRAINING_EVENT='michaelmas-2026' npx slidev --open --entry presentations/00_intro/slides.md
```

An event file is the single source of truth for which lectures the event uses
and when. It looks like this (`feedback_form` is optional, and is either a
Microsoft Forms ID or a full URL):

```yaml
year: 2026
name: "[MT26] Essential Maths"
enrolment_key: dtc-maths-26
feedback_form: jmJq6KWfMA
sessions:
  - date: "02 Nov"
    slot: "09:30"
    deck: 01_graphs
    week: 1
  - date: "02 Nov"
    slot: "14:00"
    deck: 02_indices_logs
    week: 1
```

Each session's `deck` is the name of its directory in `presentations/`. Its
`topic`, shown on the orientation slide, defaults to the lecture's title as the
landing page shows it (`title` in `presentations/index-metadata.yaml`, else the
deck's own `title`). Set `topic` to show something else, or on its own for a
session without slides, such as a drop-in. `slot` is the start time, as
`HH:MM`. The build fails if a session names a deck that does not exist, or has
neither a `deck` nor a `topic`.

`name` and `enrolment_key` are the event's name and key on train.rse.ox.ac.uk,
shown in the epilogue's enrolment walkthrough. The key appears on the published
slides of an event build.

#### Slides added in an event build

Lectures do not contain any event slides themselves. In an event build, each
lecture that is one of the event's sessions, or has `date: first-session` (the
introduction), gets these from `addon/setup/preparser.ts`:

- after the cover, the orientation slide: the event's timetable, with the
  lecture's own session outlined;
- at the end, a questions slide (the `questions` layout from `addon/layouts/`),
  then the feedback slide (`epilogue/feedback.md`), then the animated
  walkthroughs of train.rse.ox.ac.uk (`epilogue/train-rse.md`).

A lecture leaves any of them out, except the questions slide, with these in
its headmatter:

```yaml
orientation-slide: false
feedback-slide: false
train-rse-walkthrough: false
```

The introduction uses `orientation-slide: false` and places its own timetable
slide after the logistics. A lecture that is not one of the event's sessions,
such as the bonus complex numbers lecture, gets no event slides. Any other
slide can be shown only in an event build by giving it
`training-event-only: true` in its frontmatter.

The orientation slide uses the `orientation-weeks` layout from `addon/layouts`.
It shows one column per `week`, and sessions without a `week` span the full
width above them. A session may also set `background: "#eef2f6"` to shade its row, for example
to group the sessions of one topic. Quote the colour, since `#` starts a YAML
comment.

The deploy workflow reads `TRAINING_EVENT` from the repository variable of the
same name (Settings > Secrets and variables > Actions > Variables). Set it
before the course and delete it afterwards, then re-run the deploy workflow.

## Figures

Plots are drawn in the browser with [Observable Plot](https://observablehq.com/plot/),
so each one is a few lines of JavaScript that are easy to change, and can have
sliders.

Each figure is one file in the deck's `plots/` directory. Its default export is
a function from parameters to Plot options. Data shared by several figures goes
in `plots/data/`. For example, a cut-down `presentations/01_graphs/plots/enzyme-trendline.js`:

```js
import * as Plot from '@observablehq/plot'
import { blue, dot, line, orange } from '#plots/style.js'
import data from './data/enzyme.js'

// One slider per parameter, starting at `value`; `color` is the colour of what it moves
export const controls = {
  m: { min: 2, max: 4, step: 0.05, value: 3, color: orange },
  c: { min: 0, max: 10, step: 0.2, value: 5, color: orange },
}

export default ({ m, c }) => ({
  title: 'Linear Trend with Trendline',
  x: { label: 'X = 1/S' },
  y: { label: 'Y = 1/V' },
  marks: [
    Plot.dot(data, { ...dot, x: d => 1 / d.S, y: d => 1 / d.V, fill: blue }),
    Plot.line([1.25, 5], { ...line, x: X => X, y: X => m * X + c, stroke: orange }),
  ],
})
```

Show it on a slide by name. It fills the width available, and gets a slider
under its axes for each of its `controls` (add `:sliders="false"` to leave them
out):

```md
<PlotFigure name="enzyme-trendline" />
```

The shared pieces are in `addon/plots/`, imported as `#plots/...`:

- `render.js`: the house style, chosen to read from the back of a lecture room.
  Change the look of every figure here, not in individual figures.
- `style.js`: colour-blind-safe colours, and `line`, `dot` and `label` styles to
  spread into marks.
- `marks.js`: ready-made marks, such as a line's live equation.
- `numerics.js` and `random.js`: numpy-like helpers. Random data is seeded, so it
  comes out the same on every build.

CI draws every figure in Node, at its defaults and at both ends of each slider,
and fails on any figure that throws, draws NaN or draws nothing. To run it locally:

```console
npm run check:figures
```

## Slide style

Keep every lecture consistent:

- **Titles** are in sentence case, with no full stop or colon at the end. The
  header bar shows each slide's `#` title, so a slide that continues a section
  names its own topic after a colon, e.g. `# Indices: division`, rather than
  repeating the section and adding a heading in the body. A slide that covers
  several topics keeps the section title and uses `###` for each topic (`####`
  inside those). Keep titles short enough to fit the header bar.
- **Lists** are standard Markdown: `-` for bullets, `1.` `2.` `3.` for numbered
  items, with no letters such as (a) or (b). Where an answer refers back to a
  question, start it with the number in bold, e.g. `**1.**`. Only items that are
  full sentences end with a full stop.
- **Maths** on its own line is display maths, `$$ ... $$`; inline maths, `$...$`,
  is only for maths within a sentence, and must not start with a space. Use
  `\frac`, not `\over`, and `\text{...}`, not `\rm`. Inline fractions are
  squashed, so use `\frac` only in display maths: in a sentence, write a slash
  instead, e.g. $dy/dx$, $1/x^2$ or $-c/m$, or $y'$ for a derivative. Use `\quad` or `\qquad` for
  space, not `~` or `\;`. Write a literal "(c)" as `\(c)`, or it becomes a
  copyright sign.
- **Derivations** of three or more lines go in one `aligned` block, revealed a
  line at a time with cumulative line highlighting:

  ```md
  $$ {1|1-2|1-3}
  \begin{aligned}
  y &= x^3 \\
  y' &= 3x^2 \\
  y'' &= 6x
  \end{aligned}
  $$
  ```

- **Code** is a `python` block, followed by its output in a `text` block with no
  `>>>` prompts. Python blocks get a "Python" tab with the Python logo
  automatically.
- **Reveal on click** (`v-click`, or `v-clicks` for a list): derivations line by
  line, lists that build an argument one item at a time, answers, and a figure
  that follows its lead-in text. Definitions, reference lists, rules and slides
  that are just a figure appear all at once.
- **Figures** are as large as the slide allows. A figure with a line or two of
  text goes under the text, full width; with more text, use `layout: two-cols`
  and put the figure on the right. Drop a figure's title where the slide's title
  already says the same thing.
- **Exercises** for students to do in the lecture use `layout: exercise`, which
  turns the header bar green with a pencil. Leave room on the slide for working
  on the whiteboard.

## Markdown style

CI lints every Markdown file, slides included, with
[markdownlint](https://github.com/DavidAnson/markdownlint). The rules are in
`.markdownlint.json`. The ones you are most likely to trip over:

- Leave a blank line before and after every list, fenced code block and table.
- Give every fenced code block a language, e.g. `python`, `bash` or `console`.
  Use `text` for output or data that should not be highlighted.
- Write italics as `_italic_` and bold as `**bold**`.
- Start and end every table row with a pipe. There is no need to line the
  columns up.
- Leave no trailing spaces.

Some rules are switched off because they clash with how slides are written:
slides may repeat a title, skip heading levels, end a title with punctuation,
show a `$` prompt before a command, and use bare URLs.

### Checking

Run markdownlint from the repository root before you push:

```console
npx markdownlint-cli2 "**/*.md" "!node_modules"
```

Add `--fix` to repair most problems automatically, then review the diff before
committing. Run it from the root, or it will not find `.markdownlint.json`.

## Typography

Slide sources should be plain ASCII. Slidev enables markdown-it's `typographer`,
so ASCII already renders as proper typography and there is no need to paste the
real character:

| Type this            | Renders as                       |
| -------------------- | -------------------------------- |
| `---`                | em dash                          |
| `--`                 | en dash                          |
| `...`                | ellipsis                         |
| `+-`                 | plus-minus sign                  |
| `(c)`, `(tm)`, `(r)` | copyright, trademark, registered |

Slidev also overrides markdown-it's `quotes` so that quotes stay straight. A
pasted curly apostrophe therefore renders _differently_ from every ASCII
apostrophe around it.

These characters almost always arrive by copy-paste from a PDF, Word or a
browser. Avoid the following, and type the ASCII equivalent instead.

### Quotes

| Avoid                       | Codepoint | Type instead |
| --------------------------- | --------- | ------------ |
| Left single quotation mark  | U+2018    | `'`          |
| Right single quotation mark | U+2019    | `'`          |
| Left double quotation mark  | U+201C    | `"`          |
| Right double quotation mark | U+201D    | `"`          |
| Prime                       | U+2032    | `'`          |
| Double prime                | U+2033    | `"`          |

### Dashes and punctuation

| Avoid                             | Codepoint | Type instead |
| --------------------------------- | --------- | ------------ |
| En dash                           | U+2013    | `--`         |
| Em dash                           | U+2014    | `---`        |
| Horizontal ellipsis               | U+2026    | `...`        |
| Minus sign                        | U+2212    | `-`          |
| Hyphen                            | U+2010    | `-`          |
| Non-breaking hyphen               | U+2011    | `-`          |
| Modifier letter circumflex accent | U+02C6    | `^`          |

Note that the minus sign and the two hyphens map to a single `-`, not to `--`.
They are not dashes, and `--` would render as an en dash.

### Invisible characters

| Avoid                 | Codepoint | Type instead   |
| --------------------- | --------- | -------------- |
| No-break space        | U+00A0    | a normal space |
| Zero width space      | U+200B    | delete it      |
| Zero width non-joiner | U+200C    | delete it      |
| Soft hyphen           | U+00AD    | delete it      |
| Byte order mark       | U+FEFF    | delete it      |

### What is not flagged

Characters that carry meaning are deliberately left alone: accented letters in
names, Greek letters, maths symbols, box-drawing characters in `tree` output,
and currency symbols. Only look-alike punctuation with an unambiguous ASCII
equivalent is listed above.

Take particular care inside code spans and fenced blocks. The typographer skips
them, so a pasted en dash in a command such as `snakemake --dag` stays exactly
as pasted and will fail for anyone who copies it.

### Checking

CI checks every pull request, but only the lines that the pull request adds, so
existing text never fails the build. To check locally:

```console
python3 scripts/check-typography.py --all          # every tracked Markdown file
python3 scripts/check-typography.py FILE [FILE...] # specific files
```

A repo-wide scan can also be run on demand from the Actions tab via the
`typography` workflow.

The check only ever reports; it never rewrites files, because several of these
characters are legitimate elsewhere and each replacement wants a human eye.

> This section names characters rather than showing them, so that it passes its
> own check. Please keep it that way.

## Deployment

When the repository is updated, a Github action will use `./build_all.sh` to build all presentations into a `dist/` folder and deploy to github pages.

The generated course landing page at `dist/index.html` now uses a custom template
that pulls presentation titles from each `slides.md`, reuses the OxRSE logo, and
can optionally surface the current training schedule when `TRAINING_EVENT` is set.

### Optional analytics

The landing page includes optional Plausible boilerplate. To enable it during the
build, set:

- `PLAUSIBLE_DOMAIN` to your deployed site domain
- `PLAUSIBLE_SRC` if you need a non-default Plausible script URL
- `PLAUSIBLE_API` if you are proxying or self-hosting the events endpoint
