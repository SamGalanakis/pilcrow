# clarify

Make the reader's job easier. Clarify is the empathy pass: at each sentence, what does the reader have to hold in working memory, and is the cost paid back? If a sentence forces the reader to track three abstract subjects, two embedded clauses, and a referent that lives two paragraphs back, it has failed — no matter how technically correct.

This command is for prose that is *accurate* but *opaque*. Tighten cuts; clarify connects.

## Source

Steven Pinker, *The Sense of Style* — the **curse of knowledge**: experts forget that readers don't share their context. Concrete examples and clear referents are the antidote.

George Orwell, *Politics and the English Language* — "Never use a long word where a short one will do." Concrete over abstract, plain over fancy.

Joseph Williams' Coherence chapter in *Style* — readers expect old information at the start of a sentence and new information at the end.

## Load before running

- [_readers.md](_readers.md) — clarity is *for* someone. Use the persona in `VOICE.md` `audience` if set, else default to the skeptical engineer.
- [_genres.md](_genres.md) — explainers need definitions on first use; memos can assume context; fiction sets its own rules.

Universal laws, the proposal ritual, and the editor slop test (in the parent `SKILL.md`) apply by default. Per-passage rewrites run through the proposal ritual.

## Procedure

1. Read the piece aloud (or simulate). Stop at every sentence and ask: **what does the reader need to hold in working memory to follow this?**
2. List the open referents, implied background, suspended clauses.
3. Flag sentences where the working-memory load exceeds the payoff.
4. Propose rewrites that:
   - Move concrete examples earlier.
   - Resolve referents on first appearance.
   - Replace abstract chains with named instances.
   - Front-load known information; tail-load new information.

## What to prioritize

Rank order:
1. `sentence-too-long` — 40+ words is usually too much working memory.
2. `noun-stacking` — `production-ready scalable cloud-native infrastructure platform` forces a reread.
3. `nominalization-density` — opacity from chains (different focus than tighten's structural fix).
4. `pronoun-it-vague` — what does this `it` refer to?
5. `weasel-hedges` — vague attribution is hard to evaluate.
6. `abstract-without-concrete` (LLM) — three paragraphs of theory without an example.
7. `transition-coherence` (LLM) — paragraphs that don't link to the previous one.
8. `distinctive-vs-generic` (LLM) — anyone-could-have-written-this prose is also nobody-can-act-on-this prose.

## The mental-model diagnostic

Before each rewrite, write:
- **One sentence of what the reader is meant to know after this passage.** If you can't write it cleanly, the passage isn't clear yet.
- **One sentence of what the reader has to remember from earlier.** If that load is more than two referents, the passage assumes too much.

Then propose the rewrite.

## Rewrite patterns

### Front-load the topic

| Opaque | Clear |
|---|---|
| Despite considerable methodological variation, the consensus across these studies, taken in aggregate and weighted appropriately, suggests an effect. | These studies disagree on method but agree on the effect. |
| In examining the cache layer's behavior under load conditions that approximated production, anomalies emerged. | Under production-like load, the cache layer misbehaved. |

### Resolve pronouns

| Vague | Resolved |
|---|---|
| **It** matters because the team will read **this** before the meeting. | **The change** matters because the team will read **the doc** before the meeting. |

### Concrete after abstract

| Abstract chain | Grounded |
|---|---|
| Effective leadership requires alignment of expectations across stakeholders. | The product manager and the tech lead must agree what "done" means — and write it down. |
| Our platform delivers transformative outcomes for enterprise clients. | Salesforce uses us; their support volume fell 40% in the first quarter. |

If you can't supply a concrete example, the abstract claim is a *suspect claim*. Flag as `claim-without-support` rather than rewriting.

### Transition bridge

| Floating | Bridged |
|---|---|
| Caching was failing. The on-call team rebuilt the deployment pipeline. | Caching was failing. **To fix it,** the on-call team rebuilt the deployment pipeline. |

## Output shape

```
# Clarify report — <file>

## Reader-load issues (N)

### Paragraph at line L
**What the reader is meant to learn:** <one sentence>
**What the reader must remember from earlier:** <one sentence, with line refs>
**Held-in-memory cost:** <list of open referents, suspended clauses>
**Verdict:** [load > payoff | load ~ payoff | load < payoff]

If load > payoff:
→ <proposed rewrite of the whole paragraph>

## Missing concretes (N)
- line:col — Abstract claim "<quote>" needs an example. Ask the writer for the specific case.

## Floating transitions (N)
- line:col — Paragraph starts without a bridge to the previous one. Suggested bridge: <word>.

## Vague pronouns (N)
- line:col — "<pronoun>" could refer to <X> or <Y>. Resolve to: <noun>.
```

## Anti-patterns

- **Dumbing down.** Clarity is not simplification. Difficult ideas can be presented clearly; that does not require making them simple.
- **Inventing examples.** A made-up example is worse than no example. Flag the gap.
- **Over-bridging.** Not every paragraph needs an explicit transition. Sometimes the topic continues silently.
- **Resolving every pronoun.** `It` can be fine when the antecedent is unmistakable.
- **Confusing clarity with friendliness.** Clear prose can be cold.
