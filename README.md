# OxRSE essential maths slides

[sli.dev](https://sli.dev/) slideshows for the Oxford DTC essential maths course, published at <https://maths.rse.ox.ac.uk>.
Each lecture is a single `presentations/<slug>/slides.md`.
Shared pieces live alongside:

- `addon/`: a local Slidev addon loaded by every lecture. It holds the
  `training-event-only` hook and shared components such as `FeedbackQr`.
- `epilogue/`: slides appended to every lecture in an event build.
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
  YAML file in `events/`. Slides marked `training-event-only: true` (the
  orientation slide and the feedback / epilogue slides) are included, using the
  dates and feedback form from that file.
- **Generic build**, for the rest of the year. Leave `TRAINING_EVENT` unset and
  those slides are dropped.

```console
TRAINING_EVENT='michaelmas-2026' npx slidev --open --entry presentations/00_intro/slides.md
```

An event file looks like this (`feedback_form` is optional, and is either a
Microsoft Forms ID or a full URL):

```yaml
year: 2026
name: "[MT26] Essential Maths"
enrolment_key: dtc-maths-26
feedback_form: jmJq6KWfMA
sessions:
  - date: "02 Nov"
    slot: morning
    topic: Introduction
  - date: "02 Nov"
    slot: morning
    topic: Graphs
    week: 1
```

`name` and `enrolment_key` are the event's name and key on train.rse.ox.ac.uk,
shown in the epilogue's enrolment walkthrough. The key appears on the published
slides of an event build.

The orientation slide uses the `orientation-weeks` layout from `addon/layouts`.
It shows one column per `week`, and sessions without a `week` span the full
width above them. Each lecture's `highlight` must exactly match a `topic`.
A session may also set `background: "#eef2f6"` to shade its row, for example
to group the sessions of one topic. Quote the colour, since `#` starts a YAML
comment.

The deploy workflow reads `TRAINING_EVENT` from the repository variable of the
same name (Settings > Secrets and variables > Actions > Variables). Set it
before the course and delete it afterwards, then re-run the deploy workflow.

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
