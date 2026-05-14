# polish

Final pre-ship pass. The piece is structurally done; what remains is the line-by-line work of cutting, sharpening, and deciding which findings actually merit a change. Don't ask "is this wrong" — ask "would a reader notice the difference between the current line and the rewrite, and is the difference worth the change?"

---

## Source

Strunk & White, *The Elements of Style* — "Omit needless words. Vigorous writing is concise." Each finding is a candidate for cutting; the lens decides which cuts survive a re-read.

Zinsser, *On Writing Well* — "Writing is rewriting." Polish is the explicit rewrite pass, not a copy-edit.

Polish is the meta-lens. It runs everything and ranks.

---

## Procedure

1. Run `pilcrow lint <target> --ignore-quoted` and capture the JSON.
2. Run `pilcrow critique <target>` and ask the conversation model to evaluate against the 19 LLM rules. Capture the findings.
3. Merge both finding sets, sort by `range.start`, dedupe overlapping ranges.
4. Triage each finding into one of three buckets (below).
5. Emit one report. Do NOT propose edits for stylistic taste-calls — surface them and let the writer decide.

---

## Triage rubric

Every finding lands in exactly one bucket:

### Ship-blockers
- `severity: "error"` from any rule.
- Citation artifacts (`turn0search0`, `oaicite`, etc.) — these prove the prose came out of a model and never got read.
- Chatbot sign-offs (`I hope this helps`, `Let me know if`) leaked into prose.
- AI disclaimer fossils (`As an AI language model`).
- Sycophant openers (`Great question`, `Absolutely`).
- Hero-tagline imperative cadence (`Ship faster. Build smarter. Scale forever.`) — three or more imperative fragments in a row.
- LLM-judged: `claim-without-support` if the claim is load-bearing, `buried-lede`, `redundant-thesis`, `marketing-template-cadence`.

These ship as proposed rewrites with one specific edit each.

### Worth fixing
- `severity: "warning"` from rules that don't already appear under ship-blockers.
- AI phrasebank single hits (one `delve into` is fixable; three is a ship-blocker).
- Em-dash density above the threshold, parallel-triplet density, anaphora-cadence runs.
- Wordy phrases, redundant pairs, weasel hedges above their density thresholds.
- LLM-judged: `mixed-metaphor`, `distinctive-vs-generic`, `excessive-balance`, `false-reframe`.

These ship as proposed rewrites grouped by issue, with rationale.

### Stylistic taste-call
- `severity: "info"` from rules where one reasonable writer keeps the construction and another cuts it.
- Title-Case headers (some publications insist on them).
- Decorative emoji (fine in some contexts, fatal in others).
- Single overused-word hits (one `harness` is fine; six is not).
- Sentence-length-monotony when the monotony is intentional (technical reference material, lists rendered as prose).
- Repeated-words-window when the word is the unavoidable subject.

Surface these as one-liners. Do not propose rewrites. The writer decides.

---

## Output shape

A single report in this order:

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

If there are zero ship-blockers, lead the report with: **"Ready to ship after taste-calls."** If there are ship-blockers, lead with: **"Not ready — N blocker(s)."**

---

## Anti-patterns

- **Treating all findings as ship-blockers.** Polish is triage; if everything is critical, nothing is.
- **Proposing rewrites for taste-calls.** The writer's voice is not the lens's problem.
- **Cutting a sentence the reader is meant to dwell on.** Strunk's "omit needless words" assumes a needed sentence; some words and sentences are deliberate slowdowns. If a sentence is short, lyrical, and ends a paragraph, do not propose to cut it.
- **Polishing past the lede.** If `buried-lede` fires, fix the lede first; many downstream findings will dissolve once the opening is right. Don't propose to fix paragraph 7 before paragraph 1.
- **Ignoring the writer's intent.** A finding flagged "AI tell" might be a parody. Re-read the surrounding context before proposing the cut.

---

## Handoff

- If `humanize` findings dominate ship-blockers, suggest running `/pilcrow humanize <target>` first for the AI-fossil scrub, then re-run `polish`.
- If `pace` findings dominate (length-monotony, paragraph-monotony, cadence rules), suggest `/pilcrow pace <target>` first.
- After polish ships clean, the piece is publish-ready. Stop.
