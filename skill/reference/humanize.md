# humanize

Strip AI tells from prose without sanding off the writer's voice. The goal is not to make every sentence un-AI-like; it's to remove the *signature* — stock cadences, template moves, verbal fossils — while keeping the writer's own quirks (their em-dashes, their rule-of-three habit if they use it consciously, their adjective stacks).

A human can write `delve into` once. A model writes it three times per page because it's stochastically favored output.

## Source

Wikipedia, *Signs of AI writing* — the canonical editor-maintained catalog of LLM tells. GPTZero's phrase corpus. Tropes.fyi on rhetorical patterns. Our own AI-fossil rules. All consolidated in [_ai-tell-catalog.md](_ai-tell-catalog.md).

## Load before running

- [_ai-tell-catalog.md](_ai-tell-catalog.md) — primary input. Read this end-to-end.
- `VOICE.md` if present — its `signatures` and `exceptions` fields name habits to keep.

Universal laws, the proposal ritual, and the editor slop test (in the parent `SKILL.md`) apply by default; don't load.

## Procedure

1. Run `pilcrow lint <target>`. Filter findings to those that match a class in [_ai-tell-catalog.md](_ai-tell-catalog.md).
2. For each AI tell, classify by class (vocabulary, cadence, template, fossil).
3. Read the writer's adjacent paragraphs (3–4 sentences before and after each finding) to find their voice. Cite the location of the voice-match in your proposal.
4. Propose a rewrite tailored to the class, running each proposed rewrite through the **proposal ritual** in `SKILL.md` (list first three → reject reflexes → cross-check genre → anchor in voice → ship what survives).
5. Apply the **editor slop test** to the finished report before emitting.

## Rewrite shape per class

### Vocabulary — swap
Find a plain word the writer already uses. `delve into` → the writer's preferred verb (`examine`, `look at`, `dig into`). If the writer doesn't use any nearby alternative, propose the plainest option and flag for confirmation.

### Cadence — break the run
Three parallel triplets in a paragraph: keep one, recast the others. Three sentences in a row opening with the same word: drop the subject from the second, pronoun the third. Three imperative fragments: rewrite two as full sentences.

### Template — restructure
The whole-passage shape changes. A bullet list where every item is `**Bold:** descriptor` becomes prose, or a bare list, or a paragraph with the bolded terms inline. An imperative-fragment-plus-tricolon opener becomes a normal sentence that states the same thing.

### Fossil — delete
No rewrite. Always delete. Class 4 tells in [_ai-tell-catalog.md](_ai-tell-catalog.md) never appear in publishable prose.

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

## Anti-patterns

- **Generic substitutions.** `delve into` → `explore` trades one LLM verb for another. Look for the writer's actual verb in nearby prose.
- **Stripping voice as a side-effect.** If the writer's em-dash count is high but they use em-dashes well, leave them.
- **Mechanical parallel-triplet removal.** Strunk-style parallelism is good writing in moderation. The flag fires on density, not single instances.
- **Humanizing into invisibility.** After rewrites, re-read: does the prose still have texture, or did it flatten?
- **Confusing register with AI-ness.** Formal writing is allowed to be formal. The tell is template and fossil, not register.
