# extract

Mine the writer's corpus for recurring patterns *to flag*. Not a style guide. Not assets to reuse. A descriptive map of the phrases, cadences, and tics that show up often enough to be either voice or a habit worth interrogating.

Where `document` answers "what's your voice?", `extract` answers "what do you reach for that you might want me to notice?"

The output is `PILCROW.md`: a working document the editor commands cross-reference. Findings that match a recurring pattern get extra weight. The writer turns descriptions into prescriptions via a follow-up `teach`.

## Source

The diagnostic move from `humanize` (catalog AI tells) plus the diagnostic move from `document` (read across a corpus), narrowed to one question: which findings repeat?

Every writer has tics. Hemingway had his short sentences. AI-assisted writers tend to have `delve into`, `tapestry`, `not just X but Y`. `extract` surfaces them; it does not judge them.

## Load before running

- [_ai-tell-catalog.md](_ai-tell-catalog.md) — to recognize which recurring phrases are AI fossils vs writer's voice.
- [_style-laws.md](_style-laws.md) — for the "describe, don't prescribe" discipline.

## Procedure

### Step 1 — find and read the corpus

Same corpus rules as `document`:
1. `posts/`, `blog/`, `essays/`, `writing/`, `drafts/`, `notes/`, then `docs/` and root `*.md`.
2. Require at least 2,000 words. Below that, exit: "Not enough prose to extract patterns from. Try `humanize` on individual files instead."
3. Sample up to 8 representative files if the corpus is large.

### Step 2 — run the engine across the corpus

```
pilcrow lint <corpus-files> --ignore-quoted
```

Aggregate findings by `ruleId`. For each rule:
- Total hits across the corpus.
- Number of files the rule fires in (presence, not just frequency).
- Specific phrases or constructions that triggered the rule, sorted by frequency.

### Step 3 — surface the patterns

A rule firing once across the corpus is noise. A rule firing **3+ times across 2+ files** is a pattern. Mine for:

- **Repeat phrases** — specific n-grams the writer reaches for. If `ai-tell-phrasebank` fires on `navigate the complexities` four times, that's a pattern; four different phrases each once is just AI vocabulary spread.
- **Repeat tics** — `em-dash-density` firing across 5 files. Could be voice (keep) or AI accent (cut). Don't decide.
- **Repeat constructions** — `antithesis-cadence` firing in every other essay's opener = a structural habit.
- **Personal closers** — `cliche-closers` recurring tells you what move the writer reaches for at the end.

### Step 4 — write PILCROW.md (descriptive, not prescriptive)

```markdown
---
name: PILCROW
purpose: Descriptive map of recurring patterns. Editor commands weight matching findings higher; the writer decides via teach which are voice and which are tic.
corpus: <N files, <M> words>
updated: YYYY-MM-DD
---

# Recurring patterns

This file describes what the corpus shows. It does not prescribe what to keep or cut. To convert any of these into a rule, run `/pilcrow teach` and add to VOICE.md's `Signatures` (keep) or `Taboos` (cut).

## Repeat phrases (N)
The writer reaches for these phrases across multiple pieces. Once each is fine; in aggregate they form an accent.

- **`<phrase>`** — N hits across M files. Examples: posts/X.md L12, posts/Y.md L34, posts/Z.md L8.
- **`<phrase>`** — …

## Repeat constructions (N)
Cadences and patterns the writer uses more than baseline.

- **<construction name>** — N hits across M files. One sentence describing when it appears.

## High-frequency, uncertain (N)
Patterns that show up enough to be a tic. Could be intentional voice; could be habit. The writer decides via `teach`.

- **<pattern>** — N hits across M files. (Not a recommendation either way.)

## Once-per-piece tells (N)
Rules that fire exactly once in every piece. Probably habits the writer is unaware of.

- **<rule>** — fires once in N/N files. <Example.>
```

**Discipline:** every section in PILCROW.md describes; none prescribes. No "keep" or "cut" recommendations. No "you should". The writer turns description into prescription through `teach`.

### Step 5 — link to the editor commands

Append:

```markdown
## How the editor commands use this file

When `polish`, `humanize`, `tighten`, `clarify`, `pace`, or `lead` runs:
- Findings that match a **repeat phrase** here get promoted one severity level (the writer is repeating themselves).
- **Repeat constructions** get a "you reach for this often — is this one of the times?" note attached.
- **High-frequency uncertain** patterns are listed but not auto-promoted. They wait for VOICE.md to commit.

This file does not change command severity for **non-matching** findings.
```

### Step 6 — present and propose teach

> "I read N pieces (M words). These are the patterns that repeat. The big question for each High-frequency uncertain item: is it your voice (keep), or a habit you'd like flagged in future? Run `/pilcrow teach` to commit your answers to VOICE.md."

Do *not* walk the writer through the uncertain items in extract. Extract's job is to map. Teach's job is to commit.

## Output

```
# Recurring patterns extracted

Wrote: PILCROW.md (<line count> lines)
Corpus: <N files, <M> words>

Patterns mapped (descriptive only):
  Repeat phrases:        <count>
  Repeat constructions:  <count>
  High-frequency uncertain: <count>  ← needs your call via teach
  Once-per-piece tells:  <count>

Next:
  - Run `/pilcrow teach` to commit which uncertain patterns are voice (Signatures) or tic (Taboos).
  - Run `/pilcrow audit <draft>` — recurring patterns here will now show up bolder in findings.
```

## Anti-patterns

- **Prescribing.** PILCROW.md describes. It never says "keep" or "cut". That's `teach`'s job.
- **Walking the writer through uncertain items inside extract.** Extract maps; teach decides. Keep them separate so the writer can come back to teach when they have time.
- **Flagging single hits.** One `delve into` in 12 essays is not a pattern. The whole point is *repetition*.
- **Outputting a long file.** PILCROW.md is a working document, not a manifesto. Each pattern is one line. If the writer has 80 patterns, the corpus is unusual; investigate before listing them all.
- **Skipping the corpus read.** Stats without paragraphs read for context are blind. Always quote 1–2 example phrases per pattern.
- **Auto-applying to VOICE.md.** PILCROW.md is descriptive; VOICE.md is prescriptive. Don't write voice rules from extract — surface them, then run `teach` to commit.
