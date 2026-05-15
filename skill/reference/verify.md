# verify

Surface load-bearing claims and check whether each one carries support the reader can audit. LLM drafts hallucinate specifics — a confident number, a real-sounding date, a credible-but-fake citation — and the writer can miss it on re-read. `verify` is the command that makes those claims visible.

A claim is **load-bearing** if removing or weakening it changes the piece's argument. A specific number that anchors a paragraph is load-bearing. A passing-mention number used as colour is not.

## Source

Journalism's fact-check tradition: every load-bearing fact gets a source line in the margin. Wikipedia's [[citation needed]] discipline. The academic norm that extraordinary claims need extraordinary evidence.

Pilcrow's existing `claim-without-support` LLM rule (coarse, surfaced by `polish` and `clarify`) — `verify` is the dedicated command that drives the deeper pass and produces the new `unsupported-claim` finding.

## Load before running

- [_genres.md](_genres.md) — different genres have different evidence conventions. A memo can lean on "as we discussed Tuesday"; a report cannot.

Universal laws and the editor slop test (in the parent `SKILL.md`) apply by default.

## Procedure

1. Load `VOICE.md` via `scripts/load-context.mjs`. Read the `genre` field; it sets the evidence bar.
2. Run `pilcrow critique <target>` against the new `unsupported-claim` rule (plus any other LLM rules the writer wants).
3. Walk the prose. For each sentence, ask: **does this carry a number, date, named entity, comparative, or factual assertion that the piece's argument relies on?**
   - If no, skip it.
   - If yes, treat it as a candidate.
4. For each candidate, run the three-question check (below).
5. Classify each finding into one of four buckets and propose an action.
6. Emit the per-claim table.

## The three-question check

For each load-bearing claim, ask:

**1. Citation.** Does the prose name a source — a publication, a person, a dashboard, a date the writer was there? Or is the claim free-floating?

**2. Specificity.** Is the number / date / fact specific enough that a reader could audit it?
- Specific: "42%", "March 12, 2026", "the Williams cache rewrite", "the Q3 earnings call".
- Hedged into uselessness: "around 40%", "earlier this year", "the recent cache work", "their latest call".

**3. Plausibility.** Does the number or claim pass a basic sanity check against common knowledge? (LLM judgment, fallible — flag uncertain ones for the writer to verify, don't reject them outright.)

## Classification

| Bucket | When it fires | Severity |
|---|---|---|
| `unsupported` | Load-bearing, no citation, not common knowledge | **error** |
| `vague` | Citation gestured at but not specific ("studies have shown", "experts say", "data suggests") | warning |
| `hedged` | Number or date softened into unfalsifiability ("around 40%", "in recent months") | warning |
| `unchecked` | Citation specific and plausibility uncertain — writer needs to verify externally | info |

## Genre conventions

The bar for "load-bearing" shifts by genre:

- **Report / memo.** Specific numbers, dated events, named decisions are all load-bearing. Strict.
- **Essay.** Anchor claims and counter-evidence are load-bearing; rhetorical comparisons and metaphors are not.
- **Explainer.** Numbers used to illustrate ("a typical request takes ~50ms") are pedagogical; flag only if the number is the *point* of the section.
- **Marketing.** Comparatives ("twice as fast", "the leader in X") are always load-bearing. They carry the claim.
- **Fiction.** Skip. The command does not apply.

If `VOICE.md` `genre` is unset, default to the essay bar.

## What `verify` does NOT flag

- **Rhetorical claims.** The thing the piece *argues*, not facts the piece *relies* on. "I think X" is the writer's job, not pilcrow's.
- **Common knowledge.** "Water is wet"; "Python is a programming language"; "GPT was released by OpenAI". The reader doesn't need a citation.
- **Author opinion** marked as opinion. "I prefer Y over Z because…" is the writer's stance, not an unsupported claim.
- **Hedged claims that are honest about uncertainty.** "We didn't measure exactly, but the latency improvement felt substantial" tells the reader the basis is anecdotal. That's a valid move, not a hedge to flag.

## Output shape

```
# Verify report — <file>
Genre: <from VOICE.md, or "essay (default)">

## Summary
- Load-bearing claims found: <N>
- Unsupported (error):  <count>
- Vague:                <count>
- Hedged:               <count>
- Unchecked:            <count>

## Per-claim findings

### L:C — unsupported
**Claim:** "<verbatim quote>"
**Carries:** <number | date | comparative | attribution | factual assertion>
**Question:** Citation? — no. Specificity? — yes. Plausibility? — uncertain.
**Action:** Name the source or drop the specificity. ("In the Q1 retro" / "around 40% — without a source, drop the percentage").

### L:C — vague
**Claim:** "<verbatim quote>"
**Carries:** <attribution>
**Question:** Citation? — gestured ("studies have shown"). Specificity? — no. Plausibility? — n/a.
**Action:** Name the study, or drop the citation gesture.

### L:C — hedged
...

### L:C — unchecked
**Claim:** "<verbatim quote>"
**Note:** Citation is specific. Verify externally before publishing.

## Notes
- <count> rhetorical claims passed through unflagged (these are arguments, not facts).
- <count> common-knowledge claims passed through unflagged.
```

## Anti-patterns

- **Flagging every number.** Only load-bearing ones. A passing-mention "in the late 2010s" inside a colour paragraph isn't the same as a `42% latency drop` that anchors a section.
- **Inventing citations.** Never suggest a specific source the writer didn't name. Propose "name the source" or "drop the specificity" — let the writer supply the citation.
- **Treating rhetorical claims as load-bearing.** "AI is changing how we write" is the piece's argument, not a fact it relies on. Different command (try `claim-without-support` via `polish`).
- **Demanding citations for common knowledge.** Reader fatigue compounds; over-citation reads as defensive.
- **Confusing hedge-as-honesty with hedge-as-evasion.** "We didn't measure exactly" is honest. "Studies have shown" is evasive. Different findings.
- **Producing a `critique`-shaped report.** `verify` returns a per-claim audit, not a list of rule hits. The output looks different on purpose.
