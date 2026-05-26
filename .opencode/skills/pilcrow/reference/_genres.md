# _genres: taxonomy index

Genre conventions. Different genres reward different prose; a finding that's a ship-blocker in a report is fine in fiction. Editor commands consult this file to know which findings to promote, demote, or skip.

`VOICE.md` `genre:` names which leaf applies (e.g., `tutorial`, `readme`, `cv`). If unset, infer from path; see the inference table at the bottom. Leaves inherit from parents; rules cascade.

> **Change note.** The genre taxonomy has been rebuilt. If your existing `VOICE.md` references a slug that no longer exists (`report`, the parent-only `marketing`), update it. `explainer` is now narrower (general non-software only); software docs use one of the Diátaxis four: `tutorial`, `how-to`, `reference-docs`, `explanation`.

## Tree

```
narrative/
├── fiction               narrative prose, consistent narrator, voice-driven
├── memoir                first-person retrospective
└── script                dramatic dialogue, scene-headed (for performance)

argumentative/
├── essay                 personal/argumentative prose with a thesis
├── op-ed                 short, current-events hook, single claim
└── review                verdict-plus-evidence assessment of a work

documentation/            Diátaxis four; never mix modes within one page
├── tutorial              learning-oriented, step-by-step
├── how-to                task-oriented, assumes competence
├── reference-docs        information-oriented, facts only, no interpretation
└── explanation           understanding-oriented, the "why"

overview/                 composite / doorway docs
├── readme                project README; pitch + quickstart + signposts
├── project-home          docs-site front page (web README)
└── one-pager             single-sheet executive summary

informational/
├── explainer             general non-software "how X works"
└── faq                   question-grouped reference

reportorial/
├── news                  external, inverted pyramid
├── feature               longform narrative journalism
├── postmortem            incident retrospective, blameless
├── status-update         internal weekly / standup
└── changelog             release notes

correspondence/
├── memo                  RFC / ADR shape; recommendation first
├── email                 longer-form correspondence
└── message               Slack / chat short-form

marketing/
├── landing               hero page that sells
├── product-copy          feature pages, descriptions
├── sales-email           single-response outreach
├── press-release         journalist-liftable announcement
└── about-page            brand-voice About / Mission

microcopy/
├── ui-label              buttons, form labels, menu items, tooltips
├── error-message         failure-state UI text
├── empty-state           zero-data UI text
└── notification          push, toast, banner

social/
├── social-post           single tweet / LI / IG
└── social-thread         multi-post sequence on one topic

personal/
├── cv                    résumé / CV; achievement-led fragments
├── cover-letter          single-page application letter
└── bio                   about-me prose

presentations/
├── deck                  slide-shaped prose
└── speaker-notes         under-slide prose (aural-shaped)

academic                  (stub) papers, theses, lecture notes
```

## Cross-genre conventions (parent rules)

Rules at parent level apply to every child leaf. Leaves never restate these; they add only what's specific to that leaf.

### narrative/
- consistent narrator and POV across the piece
- scene grounded in sensory specifics (sight, sound, texture, breath)
- pacing varies with tension; sentence and paragraph length follow the scene's pulse
- many pilcrow rules fire on intentional craft here (em-dash density, fragments, repetition); `VOICE.md exceptions` should be aggressive

### argumentative/
- one thesis the writer believes, named in the first scroll
- every abstract claim earns a concrete instance somewhere in the piece
- the strongest counter-position acknowledged before the close
- close lands somewhere different from the opening; no thesis-restatement

### documentation/
- **never mix Diátaxis modes inside one page** (a tutorial does not become a reference mid-stream)
- present tense, second person, imperative for actions
- code and command examples runnable as written; no unannotated placeholders
- no marketing register ("delight", "seamless", "powerful")

### overview/
- one-sentence pitch on the first line; install or try-it within the first scroll
- code example before philosophy
- signposts down to deeper docs; don't try to be the deep docs
- marketing tone is fine *if* earned by specifics; vague enthusiasm is not

### informational/
- definitions on first use of any term the reader doesn't already know
- examples that anchor abstractions
- arc: puzzle → mechanism → takeaway (or QA shape for FAQ)

### reportorial/
- the news is the news; outcome in the first sentence
- specific numbers, named people, dated events
- no marketing register; no faux-precision ("approximately 47.3%")
- honest assessment of stakes

### correspondence/
- recommendation, ask, or decision in the first sentence
- no preamble ("Hope this finds you well", "Wanted to circle back")
- assume shared context; don't re-explain what the reader already knows
- dense paragraphs and acronyms are fine

### marketing/
- benefit before feature
- skeptical reader; tolerance is short
- specific claim beats superlative; named feature beats abstract benefit
- this is the genre where AI tells cluster densest; every editor reflex applies

### microcopy/
- one idea, ≤ 8 words where possible
- voice: helpful, not chirpy
- action-led; button verbs, error first-clause names the failure
- never punish the user for what they did; never "Oops!" or "Something went wrong"

### social/
- the first 7 words decide whether the rest is read
- one idea per post
- specific beats general; stakes-clear beats stakes-implied
- no thread-bait ("a 🧵"); no engagement-farming

### personal/
- terse; every line is auditioned
- parallel structure within sections (verb tense, capitalization, punctuation)
- "I" is implicit; rarely written
- claims are auditable; numbers, scope, dates

### presentations/
- one idea per slide / per beat
- text is signage, not paragraph
- presenter is the medium; slide is the scaffolding

## Path inference

If `VOICE.md` `genre:` is unset, infer from filename / directory:

| Path pattern | Inferred slug |
|---|---|
| `posts/`, `essays/`, `blog/` | `essay` |
| `op-eds/`, `opinion/` | `op-ed` |
| `reviews/` | `review` |
| `docs/tutorials/`, `getting-started/` | `tutorial` |
| `docs/how-to/`, `guides/` | `how-to` |
| `docs/reference/`, `api/` | `reference-docs` |
| `docs/explanation/`, `concepts/` | `explanation` |
| `README.md`, `readme.md` | `readme` |
| `docs/index.md` (project home) | `project-home` |
| `postmortems/`, `incidents/` | `postmortem` |
| `changelog.md`, `CHANGELOG.md` | `changelog` |
| `status/`, `weekly/` | `status-update` |
| `news/` | `news` |
| `memos/`, `rfcs/`, `adrs/` | `memo` |
| `marketing/landing/`, root `index.html` | `landing` |
| `marketing/email/`, sales sequences | `sales-email` |
| `press/` | `press-release` |
| `about/`, `about.md` | `about-page` |
| `microcopy/`, `ui-strings/`, i18n files | `ui-label` |
| `errors/` | `error-message` |
| `tweets/`, `social/` | `social-post` |
| `cv.md`, `resume.md` | `cv` |
| `cover-letter*` | `cover-letter` |
| `bio.md`, `about-me.md` | `bio` |
| `decks/`, `*.slides.md` | `deck` |
| `fiction/`, `stories/` | `fiction` |

## How editor commands use this file

`clarify`, `lead`, `document`, `craft`, `argue`, `verify`, `aloud`, `humanize`, `polish` consult genre. The walk: leaf → parent → universal pilcrow (cadence theory, ai-tell catalog, readers). A finding promoted by the genre's cliché check (see `SKILL.md` "Genre-reflex check") gets surfaced first.

Per-leaf detail lives in `skill/reference/genres/<slug>.md`. Each leaf carries its own Demands / Forbids / Tolerates / Common AI tells / LLM lint additions. **Universal pilcrow is never restated** in a leaf; if a rule lives in `_ai-tell-catalog.md`, `_cadence-theory.md`, `_readers.md`, or in the parent's "Cross-genre conventions" section above, leaves don't repeat it.

### What every editor command must do

1. **Load the active leaf** at `genres/<slug>.md` so the genre-specific Demands / Forbids / Tolerates / Common AI tells / LLM lint additions flow into the command's reasoning.
2. **Pass `--genre <slug>`** when shelling out to `pilcrow critique` so the leaf's LLM lint additions merge into the critique prompt alongside the 21 base rules.
3. **Surface the genre to the writer** if it was *inferred* (not authored in `VOICE.md`): one line, `Treating this as [<slug>], push back if wrong.` Wait for confirmation. The writer is the authority; this hands them the steering wheel before the command spends tokens on the wrong frame. Don't re-prompt within the same file in this session.
