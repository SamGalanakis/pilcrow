# pace

Restore rhythm. Prose has a beat — sentence length, paragraph weight, the alternation of long-explained-thought and short-punchy-aside. AI-generated prose tends toward uniform sentence length (15–22 words, every sentence) and uniform paragraph weight (3–4 sentences each). The reader stops noticing the prose and starts skimming.

Pace is the command that hears the writing.

## Source

Stephen King, *On Writing* — short sentences hit; long sentences carry. Mix them.

Strunk & White on parallelism — parallel structures are good in moderation; in volume, they're a metronome.

Gary Provost's much-quoted variation paragraph.

## Load before running

- [_cadence-theory.md](_cadence-theory.md) — the foundational theory.
- `VOICE.md` if present — `signatures` may legitimize patterns the rules flag (a writer who's *committed* to long sentences).

## Procedure

1. Compute per-sentence word counts.
2. Compute per-paragraph word counts.
3. Identify runs of similar-length sentences (5+ within ±3 words) and similar-weight paragraphs (3+ within ±15% of mean).
4. Run the **aural diagnostic** (below).
5. Propose splits, merges, fragments, opener variations to restore variation.
6. Surface the diagnostic visually so the writer can see the shape.

## What to prioritize

Rank order:
1. `sentence-length-monotony` — stdev < 4 across 5+ sentences.
2. `paragraph-monotony` — three paragraphs of similar word count in a row.
3. `parallel-triplet-density` — "A, B, and C" as the dominant rhythm.
4. `em-dash-density` — em-dashes as default pause character.
5. `anaphora-cadence` — three sentences in a row with same opener word.
6. `fragment-cadence` — three short single-sentence paragraphs in a row.
7. `transition-stacking` — three consecutive "Moreover / First / Second" starters.
8. `hero-tagline-imperative` — also a humanize concern, but here it's the most extreme rhythmic uniformity.

## Cadence diagnostic

Emit a small ASCII visual at the top of the report. One row per sentence, length proportional to word count, grouped by paragraph (blank line between):

```
P1 ████████████████ 21
P1 ███████████████  18
P1 ██████████████   17

P2 ███████████████  18
P2 ████████████████ 21
P2 █████████████    16
P2 ███████████████  18
```

A healthy rhythm has spikes and valleys. A monotonous rhythm is a wall.

For paragraph weight, a parallel chart per paragraph:
```
P1: 56 words ████████████████
P2: 73 words █████████████████████
P3: 14 words ████
P4: 67 words ███████████████████
```

## Aural diagnostic

Word count is a proxy. The real measure is sound. Run these deterministic checks on the prose body (after `pilcrow lint` strips code blocks):

- **Tongue-twisters.** 3+ consecutive words starting with the same consonant: `big bold brand`, `serious software solutions`. Flag.
- **Word-boundary stumbles.** Repeated short function words within 3 words of each other: `the the`, `to to`, `is is`, `in in`. These are typos in 80% of cases — flag for the writer.
- **Awkward consonant clusters.** Word ending + word starting with the same hard consonant: `it tests`, `that test`, `fact checked`. Read aloud to confirm.
- **Unintentional rhyme.** End-of-sentence words that rhyme across adjacent sentences. Flag for the writer to decide whether intentional.
- **Heavy syllabic stretches.** 3+ consecutive words with 4+ syllables each: `methodological consideration prolonged`, `infrastructure orchestration mechanism`. Suggests the passage needs shorter words.

These are detected by reading the prose, not by the engine. The output adds an "Aural" section to the report:

```
## Aural
- L4 — tongue-twister: "serious software solutions"
- L17 — word repeat: "the the"
- L22 — heavy syllabic stretch: "comprehensive infrastructure orchestration"
```

## Rewrite patterns

### Split a long sentence

Find a natural pivot — `, and`, `; `, `because`. Replace with a period.

| Long | Split |
|---|---|
| The cache rewrite landed Tuesday, and within the first week read latency dropped by 42% and tail latency followed a few days after that. | The cache rewrite landed Tuesday. Within the first week read latency dropped 42%. Tail latency followed. |

### Merge two short sentences

Reserve for when rhythm has been short-short-short for too long.

| Choppy | Merged |
|---|---|
| The team shipped Tuesday. Latency dropped 40ms. The on-call slept through the weekend. | The team shipped Tuesday; latency dropped 40ms, and the on-call slept through the weekend. |

### Insert a fragment

After a long, complex sentence, a deliberate fragment lands.

> The cache rewrite touched 14 services, three regions, and a database the on-call hadn't logged into in a year. It held.

Use sparingly. A page of fragments is the failure mode `fragment-cadence` catches.

### Vary the opener

| Anaphora | Varied |
|---|---|
| Performance matters here. Performance is what users notice. Performance shapes every decision. | Performance matters here. Users notice it first. Every other decision follows. |

### Break the triplet

| Triplet pile | Broken |
|---|---|
| The plan was bold, ambitious, and risky. The team was small, talented, and committed. The challenges were many, varied, and significant. | The plan was bold, ambitious, and risky. The team had talent but not size. Most challenges were the kind that don't show up on a roadmap. |

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
2. **Paragraphs P3-P5** — 3 consecutive paragraphs of ~60 words each. Recommend: merge P4 into P3.

## Aural (N)
- <line:col — observation>

## Proposed rewrites
<concrete before/after for each run>
```

## Anti-patterns

- **Imposing variation that wasn't earned.** Some passages are uniform on purpose — a list as prose, a steady walkthrough.
- **Hitting Provost.** Don't write a paragraph that demonstrates variation by literally varying sentence by sentence — that's its own cliché.
- **Counting words like syllables.** Word count is a proxy. The real measure is how it sounds.
- **Splitting a sentence whose length was its point.** Long sentences that build to a release shouldn't be cut.
- **Adding fragments to seem punchy.** Fragments are seasoning, not the meal.
