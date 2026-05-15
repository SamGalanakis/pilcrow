# polish

Final pre-ship pass. The piece is structurally done; what remains is the line-by-line work of cutting, sharpening, and deciding which findings actually merit a change. Don't ask "is this wrong" — ask "would a reader notice the difference between the current line and the rewrite, and is the difference worth the change?"

## Source

Strunk & White, *The Elements of Style* — "Omit needless words. Vigorous writing is concise."

Zinsser, *On Writing Well* — "Writing is rewriting." Polish is the explicit rewrite pass, not a copy-edit.

Polish is the meta-command. It runs everything and ranks.

## Load before running

- [_ai-tell-catalog.md](_ai-tell-catalog.md) — for ship-blocker classification.
- [_readers.md](_readers.md) — to rank findings by reader-impact.
- [_cadence-theory.md](_cadence-theory.md) — for rhythmic findings.
- `VOICE.md` if present — to filter findings the writer's exceptions allow.

Universal laws, the proposal ritual, and the editor slop test (in the parent `SKILL.md`) apply by default. Ship-blocker rewrites run through the proposal ritual; the slop test gates the final report.

## Procedure

1. Run `pilcrow lint <target> --ignore-quoted` and capture JSON.
2. Run `pilcrow critique <target>` and ask the conversation model to evaluate against the LLM rules. Capture the findings.
3. Merge both finding sets, sort by `range.start`, dedupe overlapping ranges.
4. Triage each finding into one of three buckets (below).
5. Score the piece on the nine-dimension rubric (below). One total score, one verdict.
6. Emit one report: scorecard at the top, then triage, then taste-calls. Do NOT propose edits for stylistic taste-calls — surface them and let the writer decide.

## Scorecard

Nine dimensions, one per command. Each scored 0–4 honestly: a 4 means *genuinely excellent*, not "good enough." The dimensions cover the same ground each command specializes in.

| Dimension | Command anchor | What a 4 looks like | What a 0 looks like |
|---|---|---|---|
| **Distinctiveness** | humanize | No AI tells; voice is recognizable | Multiple AI-fossil hits; reads like any model could've written it |
| **Concision** | tighten | Strong verbs, named characters; no zombie nouns | Nominalization chains; weak copulas throughout |
| **Clarity** | clarify | Working-memory load matches payoff; referents resolved | Reader has to reread paragraphs to track pronouns and topics |
| **Pace** | pace | Sentence-length variation; aural cleanness | Monotone walls of 18-word sentences, or choppy fragments stacked |
| **Lede** | lead | First sentence carries the real news | Throat-clearing for several paragraphs before the point |
| **Verifiability** | verify | Every load-bearing claim cites or is checkable | Unsupported numbers, vague attributions, hedged-into-meaninglessness facts |
| **Aural quality** | aloud | Reads aloud cleanly — no tongue-twisters, no sing-song | Awkward consonant clusters, unintentional rhymes, parallel-triplet rhythm |
| **Argument** | argue | Thesis clear; strongest counter engaged | Thesis buried or thesis dodges the obvious counter |
| **Polish** | polish | No ship-blockers; minimal worth-fixing items | Multiple ship-blockers; voice drift; broken transitions |

**Total possible: 36 points** (9 dimensions × 4 max).

### Verdict

| Range | Verdict | What it means |
|---|---|---|
| 32–36 | Excellent | Minor polish only; ship it. |
| 25–31 | Good | Address weak axes (those scoring 0–2); solid foundation. |
| 17–24 | Acceptable | Significant work needed before publish. |
| 9–16 | Poor | Multi-command rewrite required; structural issues. |
| 0–8 | Critical | Restart from outline; the piece isn't there yet. |

Lead the report with the score, verdict, and the two or three lowest-scoring dimensions. Those are the editor commands the writer should run next.

### Issue priority (P0–P3)

Tag each individual finding with a priority. Maps from `severity` plus bucket:

| Priority | Bucket | Severity | Action |
|---|---|---|---|
| **P0** | Ship-blocker | error | Fix before publish. |
| **P1** | Worth fixing | warning | Fix unless deliberately keeping. |
| **P2** | Worth fixing | info-with-impact | Fix in next pass. |
| **P3** | Taste-call | info | Polish if time permits. |

**Tip:** If you're unsure between P0 and P1, ask: "Would the reader I imagine give up on the piece because of this?" If yes, P0.

## Triage rubric

Every finding lands in exactly one bucket.

### Ship-blockers
- Anything in the **absolute writing bans** section of the parent SKILL.md.
- All Class 4 (fossil) tells from [_ai-tell-catalog.md](_ai-tell-catalog.md).
- Class 3 (template) tells when they appear in the opener or closer.
- LLM-judged: `claim-without-support` on a load-bearing claim, `buried-lede`, `redundant-thesis`, `marketing-template-cadence`.
- Anything the reader persona from [_readers.md](_readers.md) named in `VOICE.md` would quit on.

Ship-blockers ship as proposed rewrites with one specific edit each.

### Worth fixing
- `severity: warning` findings outside the ship-blocker categories.
- Class 1–2 tells (vocabulary, cadence) in moderation.
- LLM-judged: `mixed-metaphor`, `distinctive-vs-generic`, `excessive-balance`, `false-reframe`, `one-point-dilution`.

Worth-fixing findings ship as proposed rewrites grouped by issue type, with rationale.

### Stylistic taste-calls
- `severity: info` findings.
- Things `VOICE.md` `exceptions` explicitly allows.
- Title-Case headers, decorative emoji, single overused-word hits, intentional sentence-length monotony.

Surface as one-liners. Do not propose rewrites. The writer decides.

## Output shape

```
# Polish report — <file>

## Score: <total>/36 — <verdict>
<one-sentence summary of the verdict>

| Dimension | Score |
|---|---|
| Distinctiveness | 3 |
| Concision      | 2 |
| Clarity        | 4 |
| Pace           | 3 |
| Lede           | 2 |
| Verifiability  | 4 |
| Aural quality  | 3 |
| Argument       | 3 |
| Polish         | 3 |

**Lowest scores:** lede (2), concision (2). Run `/pilcrow lead` and `/pilcrow tighten` next.

## Ship-blockers (P0, N)
1. line:col `<rule-id>` — <one-line message>
   <quote of the offending span>
   → <proposed rewrite>

## Worth fixing (P1–P2, N)
<grouped by issue type>
1. **<issue heading>** — N hits at lines L1, L2, L3.
   <one-paragraph diagnosis>
   → <proposed approach + 1-2 example rewrites>

## Stylistic taste-calls (P3, N)
- line:col `<rule-id>` — <one-line message>. Keep if intentional.
```

Lead with the score and verdict. Then the lowest-scoring dimensions and which command to run for each. Then triage.

## Anti-patterns

- **Treating all findings as ship-blockers.** Polish is triage; if everything is critical, nothing is.
- **Proposing rewrites for taste-calls.** Voice is not the command's problem.
- **Polishing past the lede.** If `buried-lede` fires, fix the lede first; many downstream findings will dissolve.
- **Cutting sentences the reader is meant to dwell on.** Short, lyrical end-of-paragraph sentences are deliberate slowdowns.
- **Grinding past two polish passes.** Endless polish creates glossy uniformity — its own AI tell.
- **Inflating the score.** A 4 means genuinely excellent on that dimension. If you're picking 4s out of charity, you're hiding the work the writer still has to do. When in doubt between two scores, pick the lower one.
- **Treating the score as a verdict on the writer.** It's a verdict on this draft. The command points to the dimensions to work on; the dimensions don't define the writer's ability.

After polish ships clean, the piece is publish-ready.
