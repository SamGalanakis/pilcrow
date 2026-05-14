# polish

Final pre-ship pass. The piece is structurally done; what remains is the line-by-line work of cutting, sharpening, and deciding which findings actually merit a change. Don't ask "is this wrong" — ask "would a reader notice the difference between the current line and the rewrite, and is the difference worth the change?"

## Source

Strunk & White, *The Elements of Style* — "Omit needless words. Vigorous writing is concise."

Zinsser, *On Writing Well* — "Writing is rewriting." Polish is the explicit rewrite pass, not a copy-edit.

Polish is the meta-lens. It runs everything and ranks.

## Load before running

- [_style-laws.md](_style-laws.md) — universal laws every lens respects.
- [_ai-tell-catalog.md](_ai-tell-catalog.md) — for ship-blocker classification.
- [_readers.md](_readers.md) — to rank findings by reader-impact.
- [_cadence-theory.md](_cadence-theory.md) — for rhythmic findings.
- `VOICE.md` if present — to filter findings the writer's exceptions allow.

## Procedure

1. Run `pilcrow lint <target> --ignore-quoted` and capture JSON.
2. Run `pilcrow critique <target>` and ask the conversation model to evaluate against the 20 LLM rules. Capture the findings.
3. Merge both finding sets, sort by `range.start`, dedupe overlapping ranges.
4. Triage each finding into one of three buckets (below).
5. Emit one report. Do NOT propose edits for stylistic taste-calls — surface them and let the writer decide.

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

## Ship-blockers (N)
1. line:col `<rule-id>` — <one-line message>
   <quote of the offending span>
   → <proposed rewrite>

## Worth fixing (N)
<grouped by issue type>
1. **<issue heading>** — N hits at lines L1, L2, L3.
   <one-paragraph diagnosis>
   → <proposed approach + 1-2 example rewrites>

## Stylistic taste-calls (N)
- line:col `<rule-id>` — <one-line message>. Keep if intentional.

## Summary
- N ship-blockers (must fix before publish)
- N worth fixing (fix unless deliberately keeping)
- N taste-calls (your voice, your call)
```

Lead the report with **"Ready to ship after taste-calls."** if zero ship-blockers, or **"Not ready — N blocker(s)."** otherwise.

## Anti-patterns

- **Treating all findings as ship-blockers.** Polish is triage; if everything is critical, nothing is.
- **Proposing rewrites for taste-calls.** Voice is not the lens's problem.
- **Polishing past the lede.** If `buried-lede` fires, fix the lede first; many downstream findings will dissolve.
- **Cutting sentences the reader is meant to dwell on.** Short, lyrical end-of-paragraph sentences are deliberate slowdowns.
- **Grinding past two polish passes.** Endless polish creates glossy uniformity — its own AI tell.

After polish ships clean, the piece is publish-ready.
