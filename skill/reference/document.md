# document

Stats describe surface. Intent has to be confirmed.

`document` reads the writer's existing prose, computes what it can measure mechanically, and produces a *draft* `VOICE.md` with citations and explicit open questions. The output is honest: claims about surface features are confident; claims about intent are flagged for the writer to lock in via `teach`.

Where `teach` asks, `document` reads. Neither replaces the other — they're paired.

## Source

The stylometric tradition: sentence-length distribution, function-word ratios, punctuation patterns, lexical density. Same features used to *detect* model output (e.g. [PMC ChatGPT-detection paper](https://pmc.ncbi.nlm.nih.gov/articles/PMC11231544/)), used here to *describe* a human voice.

The honest caveat: stats can tell you what a writer does. They cannot tell you why or whether the writer would do it again.

## Load before running

- [_genres.md](_genres.md) — to map observed conventions back to a likely genre.
- [_readers.md](_readers.md) — to propose an audience persona for the writer to confirm.

## Procedure

### Step 1 — find the corpus

Search candidate directories in order:
1. `posts/`, `blog/`, `essays/`, `writing/`
2. `drafts/`, `notes/`
3. `docs/` (skipping autogen / api-reference content)
4. `README.md` and root-level `*.md` files

Filter to substantive prose — skip code blocks, tables of contents, headings-only files, machine-generated content. Corpus must total **at least 2,000 words**. If less, exit: "Not enough prose to infer voice. Run `/pilcrow teach` instead."

If the corpus exceeds 20,000 words, sample 5–8 representative files spanning the date range. Bias toward recent.

### Step 2 — run the engine

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

### Step 4 — separate surface from intent

| Confident from stats | Needs writer to confirm |
|---|---|
| Sentence-length distribution | Audience |
| Punctuation tics | Stance |
| Lexical avoidance (zero `delve`) | Method |
| Recurring transition words | Genre, when ambiguous |
| Voice signatures (constructions at 60%+ consistency) | Whether a signature is voice or tic |

The surface column populates VOICE.md confidently. The intent column populates the **Open questions** section.

### Step 5 — write VOICE.md

```markdown
---
name: VOICE
genre: <best-guess from _genres.md mapping, flagged if uncertain>
audience: <inferred from framing — flagged as best-guess>
stance: <inferred — flagged as best-guess>
method: <unset — open question for teach>
updated: YYYY-MM-DD
source: document
corpus: <N files, M words sampled>
---

# Voice (inferred)

## Register
<2-3 sentences. Cite specifics: "Sentences run long (mean 22, stdev 8) with a steady cadence. The writer prefers a semicolon to a period (posts/cache-rewrite.md L42).">

## Signatures
- <habit 1 — with file:line citation, e.g. "Em-dash interruptions for asides (posts/teamwork.md L18, L24, L51)">
- <habit 2>
- <habit 3>

## Taboos
- <word or move — "0 occurrences in corpus" note>
- <word or move>

## Open questions

These are the fields stats cannot answer. Run `/pilcrow teach` to lock them — or answer them in conversation and I'll update the file.

1. **Audience.** Stats show <observation>. My best-guess: <persona>. Is that right?
2. **Stance.** Stats show <observation>. My best-guess: <claim | explain | persuade | narrate>. Is that right?
3. **Method.** Stats can't see this. How do you draft — outliner, discovery, iterative, model-drafter?
4. **Signature vs tic.** I see <pattern> in <N> files. Is that your voice, or a habit you'd want flagged?
```

The **Open questions** section is the headline output, not a footnote. The writer is meant to read it.

### Step 6 — show and confirm

Show the file. Ask:
> "Here's what the prose tells me. The Open questions are what I can't see from stats — want to answer them now, or run `/pilcrow teach` later?"

If they answer in conversation, update the file in place. Don't quietly demote answers to "maybe".

## Output

```
# Voice inferred from corpus

Wrote: VOICE.md (<line count> lines, source: document)
Corpus: <N files, <words> words sampled from <date range>

Confident from stats:
  Register notes:     <count>
  Signatures:         <count>
  Taboos:             <count>

Open for the writer:
  Audience            (best-guess: <persona>)
  Stance              (best-guess: <stance>)
  Method              (unset)
  <N> signature-vs-tic calls

Next:
  - Answer the open questions now (I'll update the file), or
  - Run `/pilcrow teach` later to lock them, or
  - Try `/pilcrow polish <recent draft>` — lenses use the inferred profile.
```

## Anti-patterns

- **Inferring voice from too small a sample.** Below 2,000 words, statistical patterns are noise. Don't pretend to extract a voice from one essay.
- **Burying the Open questions.** They are the headline. A writer who reads only the first half of VOICE.md should still see what `document` couldn't answer.
- **Asserting intent.** "The writer is persuading skeptical engineers" is a claim about intent. Mark as best-guess and put it in Open questions, not Register.
- **Citing every claim with a noisy file:line list.** One or two locations per signature; more is bureaucracy.
- **Skipping the engine pass.** The stats are the point. A document call that doesn't run `pilcrow lint` is just freeform impression — that belongs in `teach`.
- **Over-claiming signatures.** A move that appears in 30% of paragraphs isn't a signature; it's an average tic. Flag at 60%+ consistency.
