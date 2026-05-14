# pace

Restore rhythm. Prose has a beat — sentence length, paragraph weight, the alternation of long-explained-thought and short-punchy-aside. AI-generated prose tends toward uniform sentence length (usually 15–22 words, every sentence) and uniform paragraph weight (3–4 sentences, every paragraph). The reader stops noticing the prose and starts skimming.

Pace is the lens that hears the writing.

---

## Source

Stephen King, *On Writing* — short sentences hit; long sentences carry. Mix them.

Strunk & White on parallelism — parallel structures are good in moderation; in volume, they're a metronome.

Gary Provost's much-quoted paragraph: *"This sentence has five words. Here are five more words. Five-word sentences are fine. But several together become monotonous…"* — the founding text of the cadence diagnostic.

---

## Procedure

1. Compute per-sentence word counts. Plot the distribution mentally (or as a small histogram).
2. Compute per-paragraph word counts.
3. Identify runs of similar-length sentences (5+ in a row within ±3 words) and runs of similar-weight paragraphs (3+ in a row within ±15% of mean).
4. Propose splits, merges, and inserted fragments to restore variation.
5. Surface the cadence diagnostic visually so the writer can see the shape.

---

## What to prioritize

In rank order:

1. **`sentence-length-monotony`** — the headline finding. The threshold is sentence-length stdev < 4 across 5+ sentences.
2. **`paragraph-monotony`** — three paragraphs of similar word count in a row.
3. **`parallel-triplet-density`** — "A, B, and C" structures used as the dominant rhythm.
4. **`em-dash-density`** — em-dashes as a default pause character. Vary with commas, semicolons, periods.
5. **`anaphora-cadence`** — three sentences in a row with the same opener word.
6. **`fragment-cadence`** — three short single-sentence paragraphs in a row. The punchy-marketing rhythm.
7. **`transition-stacking`** — three consecutive "Moreover / Furthermore / First / Second" starters.
8. **`hero-tagline-imperative`** — covered by `humanize` too, but it's also a pace issue: it's the most extreme rhythmic uniformity.

---

## The cadence diagnostic

Emit a small ASCII visual at the top of the report. One row per sentence, length proportional to word count, grouped by paragraph (blank line between paragraphs):

```
P1 ████████████████ 21
P1 ███████████████  18
P1 ██████████████   17

P2 ███████████████  18
P2 ████████████████ 21
P2 █████████████    16
P2 ███████████████  18

P3 ███████████████  18
```

A healthy rhythm has spikes and valleys. A monotonous rhythm is a wall.

For paragraph weight, a parallel chart per paragraph:
```
P1: 56 words ████████████████
P2: 73 words █████████████████████
P3: 14 words ████
P4: 67 words ███████████████████
```

---

## Rewrite patterns

### Split a long sentence

Find a natural pivot — a `, and`, a `; `, a `because`. Replace with a period. Capitalize the next word. Don't worry about losing the connective — the period implies it.

| Long | Split |
|---|---|
| The cache rewrite landed Tuesday, and within the first week read latency dropped by 42% and tail latency followed a few days after that. | The cache rewrite landed Tuesday. Within the first week read latency dropped 42%. Tail latency followed. |

### Merge two short sentences

When two adjacent sentences share a subject and a thought, merge with a comma + conjunction or a semicolon. Reserve for when the rhythm has been short-short-short for too long.

| Choppy | Merged |
|---|---|
| The team shipped Tuesday. Latency dropped 40ms. The on-call slept through the weekend. | The team shipped Tuesday; latency dropped 40ms, and the on-call slept through the weekend. |

### Insert a fragment

After a long, complex sentence, a deliberate fragment lands.

> The cache rewrite touched 14 services, three regions, and a database the on-call hadn't logged into in a year. It held.

The fragment ("It held.") is the punctuation.

Use sparingly. A page of fragments is the failure mode this lens catches in `fragment-cadence`.

### Vary the opener

| Anaphora | Varied |
|---|---|
| Performance matters here. Performance is what users notice. Performance shapes every decision. | Performance matters here. Users notice it first. Every other decision follows. |

Drop the repeated subject; pronoun the second sentence; promote the consequence in the third.

### Break the triplet

Three is fine; many threes are AI rhythm.

| Triplet pile | Broken |
|---|---|
| The plan was bold, ambitious, and risky. The team was small, talented, and committed. The challenges were many, varied, and significant. | The plan was bold, ambitious, and risky. The team had talent but not size. Most challenges were the kind that don't show up on a roadmap. |

---

## Output shape

```
# Pace report — <file>

## Sentence-length diagnostic
<ASCII histogram, one row per sentence>

Stdev: <number>  (healthy: ≥ 4)
Long sentences (≥30 words): <count>
Short sentences (≤8 words): <count>

## Paragraph-weight diagnostic
<ASCII chart, one row per paragraph>

Mean: <number>  Stdev: <number>

## Cadence runs (N)
1. **Sentences L1-L5** — 5 consecutive sentences within ±2 words. Recommend: split L3 in half.
2. **Paragraphs P3-P5** — 3 consecutive paragraphs of ~60 words each. Recommend: merge P4 into P3, leaving P5 short.
3. **Anaphora at L8-L10** — three openers of "Performance". Recommend: pronoun L9; recast L10.

## Proposed rewrites
<concrete before/after for each run>
```

---

## Anti-patterns

- **Imposing variation that wasn't earned.** Some passages are uniform on purpose — a list rendered as prose, a steady walkthrough, a meditation. Pacing changes need a reason.
- **Hitting Gary Provost.** Don't write a passage that demonstrates variation by literally varying sentence by sentence — that's its own cliché.
- **Counting words like syllables.** Word count is a proxy for cadence; the real measure is how the sentence sounds. If a 9-word sentence and a 12-word sentence read the same length aloud, they're the same length for pacing purposes.
- **Splitting a sentence whose length was its point.** Long sentences that build, accumulate, and then release at the end (a Cicero move) shouldn't be cut. They're the *spike*, not the wall.
- **Adding fragments to seem punchy.** Fragments are seasoning; they're not the meal.

---

## Handoff

- If pace surfaces structural issues (the piece is monotonous because it's a wall of explanation), suggest `/pilcrow clarify <target>` for the reader-load pass.
- If after pace the prose still feels uniform but findings are clean, the issue may be voice. Run `/pilcrow critique <target>` against `voice-consistency` and `distinctive-vs-generic`.
- After pace, re-read aloud. The lens's success criterion is: does the piece *sound* now?
