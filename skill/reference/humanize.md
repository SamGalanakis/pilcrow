# humanize

Strip AI tells from prose without sanding off the writer's voice. The goal is not to make every sentence un-AI-like; it's to remove the *signature* — the stock cadences, the template moves, the verbal fossils — while keeping the writer's own quirks (their em-dashes, their rule-of-three habit if they use it consciously, their adjective stacks).

A human can write `delve into` once. A model writes it three times per page because it's a stochastically-favored output.

---

## Source

- Wikipedia, *Signs of AI writing* — canonical, editor-maintained catalog of LLM tells: vocabulary clusters, structural patterns, formatting tics. ([en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing))
- GPTZero "Most common AI vocabulary" — frequency-ranked phrase bank.
- Pilcrow's own AI-fossil rules: `signoff-chatbot`, `sycophant-opener`, `disclaimer-tail`, `citation-artifact`, `copula-dodge`, `marketing-template-cadence`, `hero-tagline-imperative`.

---

## Procedure

1. Run `pilcrow lint <target>`. Filter findings to the humanize ruleset (below).
2. For each AI tell found, classify by type: vocabulary, cadence, template, fossil.
3. For each classification, propose a rewrite that swaps the AI tell for a human counterpart drawn from the writer's existing voice in nearby paragraphs (not a generic substitute).
4. Surface fossil-class findings as deletions, not rewrites — fossils never have a human counterpart.

---

## The four classes

### Vocabulary
**Catches:** `ai-tell-phrasebank`, `overused-words`, `cliche-list`, `corporate-cliche`.

These are phrasebank matches: words a model reaches for because they're high-probability in training data. Rewrites swap for plain words.

Pattern: `delve into` → `look at`, `dig into`, or simply `examine`. `rich tapestry` → name the actual thing. `navigate the complexities` → `work through the trade-offs`. `play a crucial role` → `matter` or `decide outcomes`.

### Cadence
**Catches:** `antithesis-cadence`, `parallel-triplet-density`, `hero-tagline-imperative`, `anaphora-cadence`, `fragment-cadence`, `present-participle-tail`, `from-x-to-y`.

These are *rhythms*, not phrases. One instance is fine; repetition is the tell. Fix by breaking the run — vary openers, vary sentence shape, drop one of the three parallel items, replace the trailing `, highlighting the importance of X` with a full sentence stating the consequence.

Pattern: `Not just X, but Y.` repeated three times → keep one, recast the others as plain statements. `Ship faster. Build smarter. Scale forever.` → "Faster build, smarter scale. (Or: pick one and write the sentence.)"

### Template
**Catches (LLM-judged):** `marketing-template-cadence`, `listicle-disguise`, `redundant-thesis`, `invented-concept-label`, `false-reframe`, `one-point-dilution`.

These are structural shapes. The fix is restructure, not substitution.

Pattern: imperative-fragment-plus-tricolon hero (`Mark up prose before it ships. A skill, a CLI, and forty-four rules…`) → write a normal sentence that states the same thing. Five paragraphs each starting "The first/second/third…" → fold into one prose paragraph or commit to an actual numbered list.

### Fossil
**Catches:** `signoff-chatbot`, `sycophant-opener`, `disclaimer-tail`, `citation-artifact`, `copula-dodge` (in aggregate).

These should never appear in publishable prose. Always delete:
- `As an AI language model` → delete the sentence.
- `Let me know if you have any questions` (in a blog post) → delete.
- `Great question!` (in an essay opening) → delete.
- `turn0search0`, `oaicite`, `contentReference` → delete.

`copula-dodge` is borderline: `serves as` once is fine, but multiple hits cluster around the same passage means the writer or model was reaching for inflated verbs. Rewrite to plain `is/are`.

---

## Preserving voice

After identifying tells, scan the **adjacent paragraphs (within 3-4 sentences) of each finding** for the writer's own pattern:

- If the writer uses contractions elsewhere, swap formal "do not" → "don't" in rewrites.
- If the writer uses em-dashes naturally elsewhere, don't strip them in this passage.
- If the writer's idiom is short sentences, don't propose a long replacement.
- If the writer has a recurring metaphor (cooking, sports, gardening), draw rewrites from that domain.

The rewrite proposal must read like the writer wrote it, not like a different AI wrote it. If you can't find a voice-match nearby, surface the finding without a rewrite and ask: "How would you phrase this?"

---

## Output shape

```
# Humanize report — <file>

## Fossils to delete (N)
1. line:col `<rule-id>` — `<text>`
   → DELETE

## Vocabulary swaps (N)
1. line:col `<rule-id>` — `<current>` → `<proposed>`
   (Voice match: <nearby sentence we drew the alternative from>)

## Cadence breaks (N)
1. lines L1-L3 `<rule-id>` — <pattern description>
   → <proposed restructure, with 1-2 sentence sample>

## Template rewrites (N)
1. line:col `<rule-id>` — <pattern>
   → <full proposed rewrite of the affected passage>

## Voice notes
- The writer uses <observation>. Rewrites preserved it.
- The writer uses <observation>. Watch for AI tells creeping into this.
```

---

## Anti-patterns

- **Generic substitutions.** "delve into" → "explore" is just trading one LLM-favored verb for another. Look for the verb the writer actually uses in nearby prose.
- **Stripping voice as a side-effect.** If the writer's em-dash count is high but they use em-dashes well (contrast, interruption, pacing), don't apply `em-dash-density` mechanically.
- **Treating every parallel-triplet as an AI tell.** Strunk-style parallelism is good writing. The flag fires on *density*, not single instances. Read the surrounding text.
- **Humanizing into invisibility.** A piece can be too plain. After your rewrites, re-read: does the prose still have texture, or did it flatten?
- **Confusing register with AI-ness.** Formal writing is allowed to be formal. The tell is *template* and *fossil*, not *register*.

---

## Handoff

- After humanize, run `/pilcrow audit <target>` to see what's left. AI-fossil rules should now be silent.
- If `pace` or `tighten` issues remain, chain into those.
- If you removed enough tells that the piece feels under-baked, run `/pilcrow critique <target>` to see whether the underlying argument needs more substance.
