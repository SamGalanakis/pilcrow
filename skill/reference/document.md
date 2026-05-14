# document

Scan the writer's existing prose and produce a draft `VOICE.md` — what the prose actually does, measured empirically, with explicit open questions for the things stats can't answer.

`document` is the corpus pass. `teach` is the refinement pass that runs after.

## Source

Stylometric tradition: sentence-length distribution, function-word ratios, punctuation patterns, lexical density. Same features used to *detect* model output (e.g. [PMC ChatGPT-detection paper](https://pmc.ncbi.nlm.nih.gov/articles/PMC11231544/)), used here to *describe* a human voice.

The honest caveat: stats can tell you what a writer does. They cannot tell you why or whether the writer would do it again. That's `teach`'s job.

## Load before running

- [_genres.md](_genres.md) — to map observed conventions back to a likely genre.
- [_readers.md](_readers.md) — to propose an audience persona for the writer to confirm in `teach`.
- [_ai-tell-catalog.md](_ai-tell-catalog.md) — to flag overlap between the writer's recurring moves and known AI tells (a side note for the writer to decide in `teach`).

## Procedure

### Step 1 — find the corpus

Search candidate directories in order:
1. `posts/`, `blog/`, `essays/`, `writing/`
2. `drafts/`, `notes/`
3. `docs/` (skipping autogen / api-reference content)
4. `README.md` and root-level `*.md` files

Filter to substantive prose — skip code blocks, tables of contents, headings-only files, machine-generated content. Corpus must total **at least 2,000 words**. If less, exit: "Not enough prose to scan. Run `/pilcrow teach` instead."

If the corpus exceeds 20,000 words, sample 5–8 representative files spanning the date range. Bias toward recent.

### Step 2 — run the engine

```
pilcrow lint <corpus-files> --ignore-quoted
```

Capture every finding, every file. The next steps interpret the aggregate.

### Step 3 — compute stylometric features

From the lint output plus a fresh read of the prose:

- Sentence-length distribution (mean, stdev, p10, p90).
- Paragraph-length distribution.
- Em-dash frequency per 100 words.
- Parenthetical aside frequency per 100 words.
- Top 20 content words (excluding the writer's domain vocabulary).
- Frequency of contractions (`don't`, `it's`, `we're`).
- First-person ratio (`I`, `we`).
- Question marks per 1,000 words.
- Anaphora and parallel-triplet incidence.

### Step 4 — surface recurring moves

A move counts as a **signature** if it fires **3+ times across 2+ files**. Group them:

- **Phrases the writer reaches for.** Specific n-grams: `navigate the complexities` four times across three essays = a phrase signature.
- **Cadences they use.** Sentence-length patterns, parallel-triplet density, em-dash rhythm. The shape of how they write.
- **Structural moves.** How they open paragraphs, how they close them, how they bridge between sections.
- **Punctuation tics.** Em-dashes, parentheticals, semicolons, ellipses. The writer's punctuation hand.

For each move, note whether it overlaps with the [_ai-tell-catalog.md](_ai-tell-catalog.md). Overlap is a flag for the writer to consider in `teach`, not a verdict.

### Step 5 — read for register

Beyond stats and recurring moves, read three random paragraphs from each sampled file. Describe:

- Sentence rhythm.
- Idioms or metaphors that recur (cooking, sports, infrastructure, etc.).
- Where the writer hedges and where they commit.
- Whether the writer addresses the reader directly.

### Step 6 — separate surface from intent

| Confident from stats | Needs the writer to confirm |
|---|---|
| Sentence-length distribution | Audience (who they're writing for) |
| Punctuation tics | Stance (claim / explain / persuade / narrate) |
| Lexical avoidance (zero `delve`) | Method (outliner / discovery / iterative / model-drafter) |
| Recurring transition words | Genre, when ambiguous |
| Recurring moves (at 60%+ consistency) | Whether a recurring move is voice (Signature) or tic (Taboo) |

The left column populates VOICE.md confidently. The right column becomes the **Open questions** section.

### Step 7 — write VOICE.md

```markdown
---
name: VOICE
genre: <best-guess from _genres.md mapping; flagged if uncertain>
audience: <inferred from framing; flagged as best-guess>
stance: <inferred; flagged as best-guess>
method: <unset — open question for teach>
updated: YYYY-MM-DD
source: document
corpus: <N files, M words sampled>
---

# Voice (drafted by document)

## Register
<2–3 sentences. Cite specifics: "Sentences run long (mean 22, stdev 8) with a steady cadence. The writer prefers a semicolon to a period (posts/cache-rewrite.md L42)."

## Signatures (proposed)

Recurring moves observed across the corpus. The writer confirms or rejects each via `teach`.

- **`<phrase>`** — N hits across M files. Examples: posts/X.md L12, posts/Y.md L34.
- **<cadence name>** — N hits across M files. (Overlaps AI-tell `<rule-id>`; decide in teach.)
- **<structural move>** — describes the move; locations.
- **<punctuation tic>** — N hits, frequency / 100 words.

## Taboos (proposed)

Zero-occurrence patterns the corpus avoids. The writer confirms via `teach`.

- `delve into` — 0 occurrences across corpus.
- `let's dive in` — 0 occurrences.

## Open questions

These are the fields stats cannot answer. Run `/pilcrow teach` to lock them — or answer them in conversation and I'll update the file.

1. **Audience.** Stats show <observation>. Best-guess: <persona>. Right?
2. **Stance.** Stats show <observation>. Best-guess: <claim | explain | persuade | narrate>. Right?
3. **Method.** Stats can't see this. How do you draft — outliner, discovery, iterative, model-drafter?
4. **Signature vs tic.** I observed <pattern> in <N> files. Voice or habit to flag?
```

The **Open questions** section is the headline output, not a footnote. The writer is meant to read it.

### Step 8 — show and confirm

Show the file. Ask:
> "Here's what the corpus shows. The Open questions are what I can't see from stats. Run `/pilcrow teach` to answer them, or answer them in chat now and I'll update the file."

## Output

```
# Voice drafted from corpus

Wrote: VOICE.md (<line count> lines, source: document)
Corpus: <N files, <M> words sampled from <date range>

Confident from stats:
  Register notes:     <count>
  Signatures proposed: <count>
  Taboos proposed:     <count>

Open for the writer (resolve via teach):
  Audience            (best-guess: <persona>)
  Stance              (best-guess: <stance>)
  Method              (unset)
  <N> signature-vs-tic calls

Next:
  - Run `/pilcrow teach` to refine, or
  - Answer the open questions in chat (I'll update VOICE.md), or
  - Try `/pilcrow polish <recent draft>` — editor commands use the draft profile.
```

## Anti-patterns

- **Inferring voice from too small a sample.** Below 2,000 words, statistical patterns are noise. Don't pretend to extract a voice from one essay.
- **Burying the Open questions.** They are the headline. A writer who reads only the first half of VOICE.md should still see what `document` couldn't answer.
- **Asserting intent.** "The writer is persuading skeptical engineers" is a claim about intent. Mark as best-guess and put it in Open questions, not Register.
- **Citing every claim with a noisy file:line list.** One or two locations per signature; more is bureaucracy.
- **Skipping the engine pass.** The stats are the point. A document call that doesn't run `pilcrow lint` is just freeform impression — that belongs in `teach`.
- **Over-claiming signatures.** A move that appears in 30% of paragraphs isn't a signature; it's an average tic. Flag at 60%+ consistency.
- **Pre-classifying AI-tell-overlap moves as Taboos.** They go in Signatures with the overlap noted. The writer decides via `teach`.
- **Treating Signatures as final.** They're proposed. `teach` is where they get confirmed.
