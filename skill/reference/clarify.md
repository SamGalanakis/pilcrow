# clarify

Make the reader's job easier. Clarify is the empathy pass: at each sentence, what does the reader have to hold in working memory, and is the cost paid back? If a sentence forces the reader to track three abstract subjects, two embedded clauses, and a referent that lives two paragraphs back, it has failed — no matter how technically correct.

This lens is for prose that is *accurate* but *opaque*. Tighten cuts; clarify connects.

---

## Source

Steven Pinker, *The Sense of Style* — the **curse of knowledge**: experts forget that readers don't share their context. Concrete examples and clear referents are the antidote.

George Orwell, *Politics and the English Language* — "Never use a long word where a short one will do." Concrete over abstract, plain over fancy, image over jargon.

Joseph Williams' Coherence chapter in *Style* — readers expect old information at the start of a sentence and new information at the end. Sentences that bury the topic confuse.

---

## Procedure

1. Read the piece aloud (or have the model simulate reading aloud) at the speed of an interested but non-expert reader.
2. At every sentence, ask: **what does the reader need to hold in working memory to follow this?** List the open referents, the implied background, the held-suspense clauses.
3. Flag sentences where the working-memory load exceeds the payoff.
4. Propose rewrites that:
   - Move concrete examples earlier ("the cache rewrite, for instance, dropped p99 latency by 42%").
   - Resolve referents on first appearance.
   - Replace abstract chains with named instances.
   - Front-load known information; tail-load new information.

---

## What to prioritize

In rank order:

1. **`sentence-too-long`** — 40+ words is usually too much working memory.
2. **`noun-stacking`** — `production-ready scalable cloud-native infrastructure platform` is six adjectives stacked. Each forces a reread.
3. **`nominalization-density`** — covered by `tighten` too, but here the focus is on the *opacity* a chain creates, not the structural fix.
4. **`pronoun-it-vague`** — what does this `it` refer to? If the reader has to scan backward, you've lost them.
5. **`weasel-hedges`** — vague attribution (`experts argue`, `studies show`) is hard to evaluate.
6. **`abstract-without-concrete`** (LLM) — three paragraphs of theory without a single grounded example.
7. **`transition-coherence`** (LLM) — paragraphs that don't link to the previous one.
8. **`distinctive-vs-generic`** (LLM) — anyone-could-have-written-this prose is also nobody-can-act-on-this prose.

---

## The mental-model diagnostic

Before proposing a rewrite, write **one sentence of what the reader is meant to know after this passage**. If you can't write it cleanly, the passage isn't clear yet.

Then write **one sentence of what the reader has to remember from earlier in the piece** to follow it. If that load is more than two referents, the passage assumes too much.

Then propose the rewrite. The rewrite should:
- Reduce the held-in-memory list.
- Surface the new information explicitly.
- Connect to the previous paragraph with a visible bridge (a repeated key noun, a "because of X, …" link, a return to a named character).

---

## Rewrite patterns

### Front-load the topic

| Opaque | Clear |
|---|---|
| Despite considerable methodological variation, the consensus across these studies, taken in aggregate and weighted appropriately, suggests an effect. | These studies disagree on method but agree on the effect. |
| In examining the cache layer's behavior under load conditions that approximated production, anomalies emerged. | Under production-like load, the cache layer misbehaved. |

The topic-sentence move: name the subject first, name the action second, qualify last.

### Resolve pronouns on first sight

| Vague | Resolved |
|---|---|
| **It** matters because the team will read **this** before the meeting. | **The change** matters because the team will read **the doc** before the meeting. |

When `it` has multiple possible antecedents, name the noun. Two `it`s in a sentence are a tell.

### Concrete after abstract

| Abstract chain | Grounded |
|---|---|
| Effective leadership requires alignment of expectations across stakeholders. | The product manager and the tech lead must agree what "done" means — and write it down. |
| Our platform delivers transformative outcomes for enterprise clients. | Salesforce uses us; their support volume fell 40% in the first quarter. |

If you can't supply a concrete example, the abstract claim is a *suspect claim*. Flag it as `claim-without-support` rather than rewriting.

### The transition bridge

| Floating | Bridged |
|---|---|
| Caching was failing. The on-call team rebuilt the deployment pipeline. | Caching was failing. **To fix it,** the on-call team rebuilt the deployment pipeline. |

Bridge words: *because*, *to fix that*, *as a result*, *but*, *which meant*. They cost one or two words and save the reader the inference.

---

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

---

## Anti-patterns

- **Dumbing down.** Clarity is not simplification. Difficult ideas can be presented clearly; that does not require making them simple. Don't propose to replace technical vocabulary with everyday words when the technical vocabulary is the topic.
- **Inserting concrete examples that don't fit.** A made-up example is worse than no example. If the writer can't supply one, flag the gap; don't invent.
- **Over-bridging.** Not every paragraph needs an explicit transition. Sometimes the topic continues silently and a bridge would be redundant. Trust the writer's pacing.
- **Confusing clarity with friendliness.** Clear prose can be cold. The lens improves the reader's job, not the writer's persona.
- **Resolving every pronoun.** "It" can be fine when the antecedent is unmistakable. The flag fires when the antecedent is ambiguous, not just present.

---

## Handoff

- If clarify surfaces missing examples (concretes), the next step is the writer's, not the lens's: ask, don't invent.
- If clarify finds reader-load issues that are really structural (the wrong section comes first), suggest `/pilcrow lead <target>` to reconsider the opening.
- After clarify, run `/pilcrow pace <target>` if the prose is now uniformly explanatory.
