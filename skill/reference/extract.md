# extract

Pull the writer's recurring moves out of their corpus. Phrases they reach for, cadences they use, structural habits, punctuation tics, the things that make a paragraph recognizably theirs. The output is `PILCROW.md`: a descriptive catalog of the writer's editorial fingerprint that the editor commands cross-reference when proposing rewrites.

Where `document` describes the voice in general terms (register, sentence rhythm, audience inference), `extract` zooms in on the specific recurring constructions. Where `teach` asks the writer to name their signatures, `extract` finds them empirically.

## Source

Stylometric observation: writers have signatures even when they don't know it. Hemingway had his short sentences. Pinker has his em-dashes. The signature isn't a single instance — it's a pattern that repeats across pieces.

## Load before running

- [_ai-tell-catalog.md](_ai-tell-catalog.md) — to flag overlap between the writer's signatures and known AI tells. Overlap is a *side note*, not a verdict.
- [_style-laws.md](_style-laws.md) — voice trumps rule.

## Procedure

### Step 1 — find and read the corpus

Same rules as `document`:
1. `posts/`, `blog/`, `essays/`, `writing/`, `drafts/`, `notes/`, then `docs/` and root `*.md`.
2. Require at least 2,000 words. Below that, exit: "Not enough prose to extract patterns from. Try `humanize` on individual files instead."
3. Sample up to 8 representative files if the corpus is large.

### Step 2 — run the engine across the corpus

```
pilcrow lint <corpus-files> --ignore-quoted
```

Aggregate findings by `ruleId`. For each rule:
- Total hits across the corpus.
- Number of files the rule fires in.
- The specific phrases or constructions that triggered the rule, sorted by frequency.

### Step 3 — surface the recurring moves

A pattern is anything that fires **3+ times across 2+ files**. Group them into four kinds:

- **Phrases the writer reaches for.** Specific n-grams they use across pieces. (`navigate the complexities` four times across three essays = a phrase signature.)
- **Cadences they use.** Sentence-length patterns, parallel-triplet density, em-dash rhythm. The shape of how they write.
- **Structural moves.** How they open paragraphs, how they close them, how they bridge between sections. The piece-level patterns.
- **Punctuation tics.** Em-dashes, parentheticals, semicolons, ellipses. The writer's punctuation hand.

### Step 4 — write PILCROW.md (descriptive)

```markdown
---
name: PILCROW
purpose: Recurring moves extracted from the corpus. The writer's editorial fingerprint. Editor commands cross-reference this when proposing rewrites so suggestions sound like the writer.
corpus: <N files, <M> words>
updated: YYYY-MM-DD
---

# Recurring moves

The patterns in this file are descriptive: things the writer *does*, observed empirically across the corpus. Not judgements. Some of these are voice the writer should defend; some are tics they may want to flag. The classification lives in `VOICE.md`'s `Signatures` and `Taboos` sections. Run `/pilcrow teach` to commit which is which.

## Phrases (N)

Specific words and short phrases that show up across pieces.

- **`<phrase>`** — N hits across M files. Examples: posts/X.md L12, posts/Y.md L34.
- **`<phrase>`** — …

## Cadences (N)

Sentence-shape and rhythm patterns that recur.

- **<cadence name>** — N hits across M files. One sentence describing when it appears.

## Structural moves (N)

Paragraph- and piece-level patterns.

- **<move name>** — describes the move. Locations.

## Punctuation tics (N)

The writer's punctuation hand.

- **<tic>** — N hits, frequency / 100 words. One sentence.

## Also in the AI-tell catalog (N)

These recurring moves overlap with patterns the AI-tell catalog flags. That doesn't make them *bad*; it means the writer's voice happens to share territory with a current AI tell. Worth deciding, in `teach`, whether to keep or cut.

- **<move>** — appears N times across M files; matches AI-tell `<rule-id>`.
```

**Discipline:** PILCROW.md describes; it does not prescribe. No "you should keep this" or "you should cut this." Those decisions live in `teach`.

### Step 5 — link to the editor commands

Append:

```markdown
## How the editor commands use this file

When `polish`, `humanize`, `tighten`, `clarify`, `pace`, or `lead` runs:
- Phrases and cadences listed here are read as the writer's voice. Proposed rewrites preserve them unless `VOICE.md`'s `Taboos` overrides.
- Moves flagged in **Also in the AI-tell catalog** get a *"this is one of your signatures — keep, or cut as AI accent?"* note attached to matching findings. The writer decides per piece.
```

### Step 6 — present and propose teach

> "I read N pieces (M words). These are the moves that repeat in your writing. The next step: run `/pilcrow teach` to commit which are voice (Signatures) and which are tic (Taboos). Until then, the editor commands treat them all as voice by default."

Do *not* walk the writer through the moves inside extract. Extract maps; teach commits.

## Output

```
# Recurring moves extracted

Wrote: PILCROW.md (<line count> lines)
Corpus: <N files, <M> words>

Moves catalogued:
  Phrases:                <count>
  Cadences:               <count>
  Structural moves:       <count>
  Punctuation tics:       <count>
  AI-tell overlap:        <count>  ← decide in teach

Next:
  - Run `/pilcrow teach` to lock the moves into Signatures or Taboos.
  - Run `/pilcrow audit <draft>` — editor commands now read your signatures.
```

## Anti-patterns

- **Framing the output as anti-patterns.** PILCROW.md is the writer's voice profile, not their slop list. Even AI-tell-overlapping moves get neutral framing.
- **Flagging single hits.** One `delve into` in 12 essays is not a signature. The whole point is *repetition*.
- **Deciding for the writer.** Don't pre-classify moves as keep-or-cut. That's `teach`.
- **Outputting a long file.** PILCROW.md is a working document, not a manifesto. Each move is one line. Eighty patterns means the corpus is unusual; investigate.
- **Skipping the corpus read.** Stats without paragraphs read for context are blind. Quote one or two example phrases per move.
- **Writing to VOICE.md.** PILCROW.md is descriptive; VOICE.md is prescriptive. The pipeline is: extract → review → teach → VOICE.md.
