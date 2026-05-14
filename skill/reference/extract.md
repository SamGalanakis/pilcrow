# extract

Mine the writer's own corpus for *recurring* AI tells, phrase-bank-style cliches, and personal verbal tics. Produces `PILCROW.md`: a personal anti-pattern catalog the lenses cross-reference so the writer's *specific* habits get flagged with extra weight on future runs.

Where `document` answers "what's your voice?", `extract` answers "what do you reach for that you wish you didn't?"

---

## Source

The diagnostic move from `humanize` (catalog AI tells) plus the diagnostic move from `document` (read across a corpus), narrowed to one question: which findings repeat?

Anchored in:
- The "personal tics" tradition: every writer has them. Hemingway had his short sentences; Pinker has his em-dashes; AI-assisted writers tend to have `delve into`, `tapestry`, `not just X but Y`.
- Tropes.fyi: AI tells are *patterns*, not single hits. Personal tells are patterns too — they just belong to one person.

---

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
- The specific phrases or constructions that triggered the rule, sorted by frequency.

### Step 3 — surface the patterns

A rule firing once across the corpus is noise. A rule firing **3+ times across 2+ files** is a pattern. Mine for:

- **Repeat phrases** — specific n-grams the writer reaches for. If `ai-tell-phrasebank` fires on `navigate the complexities` four times, that's a pattern; if it fires once each on four different phrases, that's just AI vocabulary spread.
- **Repeat tics** — `em-dash-density` firing across 5 files = the writer leans on em-dashes. Could be voice (keep) or AI tell (cut). Flag for the writer to decide.
- **Repeat constructions** — `antithesis-cadence` firing in every other essay's opener = a structural habit.
- **Personal closers** — `cliche-closers` recurring tells you what move the writer reaches for at the end.

### Step 4 — write PILCROW.md

```markdown
---
name: PILCROW
purpose: Personal anti-pattern catalog. Future audits will weight these findings higher.
corpus: <N files, <M> words>
updated: YYYY-MM-DD
---

# Personal anti-patterns

## Repeat phrases (N)
The writer reaches for these phrases across multiple pieces. Each one is fine once; in aggregate they form an accent.

- **`<phrase>`** — N hits across M files. (Examples: posts/X.md L12, posts/Y.md L34, posts/Z.md L8.)
- **`<phrase>`** — …

## Repeat constructions (N)
Cadences and patterns the writer uses more than baseline.

- **<construction name>** — N hits across M files. <One sentence: when it's the writer's voice, when it's AI rhythm.>

## Possible voice signatures (N)
Patterns that show up enough to be a tic. Could be intentional voice; the writer should decide.

- **<pattern>** — N hits across M files. **Keep** or **cut**? (Flag for `teach` follow-up.)

## Once-per-piece tells (N)
Rules that fire exactly once in every piece. Probably habits the writer is unaware of.

- **<rule>** — fires once in N/N files. <Example.>
```

The **Possible voice signatures** section is critical. Don't decide for the writer whether `em-dash-density` at 1.8/100 words is voice or AI tic — surface it and ask.

### Step 5 — link to the lenses

Append to `PILCROW.md`:

```markdown
## How the lenses use this file

When `polish`, `humanize`, `tighten`, `clarify`, `pace`, or `lead` runs:
- Findings that match a **repeat phrase** here get promoted one severity level.
- **Repeat constructions** get a "you reach for this often — is this one of the times?" note.
- **Possible voice signatures** get demoted to `info` unless the writer says otherwise via VOICE.md exceptions.
```

### Step 6 — present and confirm

> "I read N pieces (M words). These are the patterns that repeat. The big question: which are your voice (keep), and which are habits you'd like flagged in future?"

Walk the writer through "Possible voice signatures" one at a time. Their answer for each goes into VOICE.md's `Signatures` or `Taboos` field (run a quick `teach` flow if VOICE.md doesn't exist yet).

---

## Output

```
# Personal patterns extracted

Wrote: PILCROW.md (<line count> lines)
Corpus: <N files, <M> words>

Patterns found:
  Repeat phrases:      <count>
  Repeat constructions: <count>
  Possible signatures:  <count>  ← need your call
  Once-per-piece tells: <count>

Next:
  - Walk through "Possible signatures" with me to mark keep/cut.
  - Run `/pilcrow audit <draft>` — recurring phrases here will now show up bolder.
```

---

## Anti-patterns

- **Flagging single hits.** One `delve into` in a corpus of 12 essays is not a pattern. The whole point of this lens is *repetition*.
- **Pretending to know whether a pattern is voice or tic.** Three em-dashes per 100 words *could* be the writer's signature or *could* be an AI accent. Surface both readings; let the writer decide.
- **Outputting a long file.** PILCROW.md is a working document, not a manifesto. Each pattern is one line. If the writer has 80 patterns, the corpus is unusual; investigate before listing them all.
- **Skipping the corpus read.** Stats without paragraphs read for context are blind. Always quote 1-2 example phrases per pattern.
- **Auto-applying to VOICE.md.** PILCROW.md is descriptive; VOICE.md is prescriptive. Don't write voice rules from extract — surface them, then run `teach` to commit.

---

## Handoff

- After `extract`, propose: "Want to walk through the possible signatures now?" If yes, run a focused `/pilcrow teach` covering just those.
- The next `/pilcrow audit` will read `PILCROW.md` if present and weight findings accordingly.
