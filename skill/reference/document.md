# document

Infer the writer's voice from existing prose in the repo and write `VOICE.md` without an interview. Use when the writer has a substantial body of published work and would rather skip the questions.

`document` is the empirical counterpart to `teach`. `teach` asks; `document` reads.

---

## Source

The voice-from-corpus inference pattern: large language models can characterize style from a sample. We're not training a model; we're producing a short summary file the lenses can read.

Anchors: the same stylometric features that the [PMC ChatGPT-detection paper](https://pmc.ncbi.nlm.nih.gov/articles/PMC11231544/) measures (sentence-length distribution, function-word ratios, punctuation patterns), but used to describe a *human* voice rather than detect a model.

---

## Procedure

### Step 1 — find the corpus

Search the repo for prose files in these candidate directories, in order:

1. `posts/`, `blog/`, `essays/`, `writing/`
2. `drafts/`, `notes/`
3. `docs/` (skipping autogen / api-reference content)
4. `README.md` and root-level `*.md` files

Filter to substantive prose — skip code blocks, tables of contents, headings-only files, and machine-generated content. The corpus must total **at least 2,000 words**. If less, exit with: "Not enough prose to infer voice. Run `/pilcrow teach` instead."

Sample the corpus: if it exceeds 20,000 words, take 5–8 representative files spanning the date range (oldest, middle, newest). Bias toward recent.

### Step 2 — run the engine on the corpus

```
pilcrow lint <corpus-files> --ignore-quoted
```

Compute aggregate stats:
- Sentence-length distribution (mean, stdev, p10, p90).
- Paragraph-length distribution.
- Em-dash frequency per 100 words.
- Parenthetical aside frequency per 100 words.
- Top 20 content words (excluding the writer's domain vocabulary).
- Frequency of contractions (`don't`, `it's`, `we're`).
- First-person ratio (`I`, `we`).
- Question marks per 1,000 words.
- Anaphora and parallel-triplet incidence.

### Step 3 — read for register

Beyond stats, read three random paragraphs from each sampled file. Describe:
- Sentence rhythm.
- Idioms or metaphors that recur (cooking, sports, infrastructure, etc.).
- Where the writer hedges and where they commit.
- Whether the writer addresses the reader directly.

### Step 4 — infer signatures and taboos

From the data:

- **Signatures** are constructions the writer uses *more than baseline*. If stats show em-dashes at 2x typical density but the writer uses them consistently across files, that's a signature. If parallel-triplet density is 3x typical, that's a signature.
- **Taboos** are constructions the writer uses *less than baseline*. If `delve` / `tapestry` / `crucial` are zero across the corpus, the writer's avoiding them; mark as taboo.
- **Voice rules** appear from contrasts: if all `however` shows up in transitions but `nevertheless` is absent, the writer prefers one and avoids the other.

### Step 5 — write VOICE.md

Same schema as `teach`'s output, but every claim cites a file path:

```markdown
---
name: VOICE
audience: <inferred — note "inferred from <file>'s framing"; mark as best-guess>
stance: <inferred — same caveat>
updated: YYYY-MM-DD
source: document
corpus: <N files, M words sampled>
---

# Voice (inferred)

## Register
<2-3 sentences. Cite specifics, e.g. "Sentences run long (mean 22, stdev 8) with a steady cadence. The writer prefers a semicolon to a period (see posts/cache-rewrite.md L42).">

## Signatures
- <habit 1 — with a 1-2 word file citation, e.g. "Em-dash interruptions for asides (posts/teamwork.md L18, L24, L51)">
- <habit 2>
- <habit 3>

## Taboos
- <word or move 1 — with "0 occurrences in corpus" note>
- <word or move 2>

## Open questions
- <audience inference uncertain? note it>
- <stance ambiguous? note it>
```

The **Open questions** section is the key difference from `teach`'s output. `document` can describe form but rarely intent; flag the gaps explicitly so the writer can fill them with a follow-up `/pilcrow teach` if they want.

### Step 6 — show and confirm

Show the file. Ask:
> "I read N files (M words). This is what I heard. Anything wrong, or should I leave the open questions for you to answer?"

If wrong, ask which inference; correct only that field.

---

## Output

```
# Voice inferred from corpus

Wrote: VOICE.md (<line count> lines)
Source: document
Corpus: <N files, <words> words sampled from <date range>

Inferred:
  Audience: <field> (open question: <yes/no>)
  Stance:   <field> (open question: <yes/no>)
  Signatures: <count>
  Taboos:    <count>
  Open questions: <count>

Next:
  - Run `/pilcrow teach` to lock the open questions, or
  - Try `/pilcrow polish <recent draft>` — lenses will use this profile.
```

---

## Anti-patterns

- **Inferring voice from too small a sample.** Below 2,000 words, statistical patterns are noise. Don't pretend to extract a voice from one essay.
- **Citing every claim with a noisy file:line list.** Cite one or two locations per signature; more is bureaucracy.
- **Inferring intent.** You can describe what the writer does, not why. Audience and stance are best-guesses with caveats; don't assert.
- **Skipping the engine pass.** The stats are the point. A document call that doesn't run `pilcrow lint` is just freeform impression — that belongs in `teach`.
- **Over-claiming signatures.** A move that appears in 30% of paragraphs isn't a signature; it's an average tic. Flag at 60%+ consistency.

---

## Handoff

- After `document`, the writer can run `/pilcrow teach` to lock the open questions and turn inferences into commitments.
- The output of `document` is sufficient for lenses to start applying voice — `teach` is upgrade, not requirement.
