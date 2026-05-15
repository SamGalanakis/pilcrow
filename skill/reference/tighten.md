# tighten

Cut zombie nouns, weak verbs, and expletive subjects until every sentence has a character who does something. Tighten is not about word count for its own sake — short prose can still be flabby. It's about making subjects name *characters* and verbs name *actions*.

## Source

Joseph M. Williams, *Style: Lessons in Clarity and Grace* — the **character/action principle**: clear sentences put the main character in the subject and the main action in the verb. When subjects are abstract and verbs are some form of *to be*, the real action hides in a noun (the "zombie noun") and the sentence drags.

Steven Pinker, *The Sense of Style* — names these "zombie nouns" and identifies them as the biggest source of opaque prose in academic and corporate writing.

## Load before running

- `VOICE.md` if present — `taboos` may include specific verbs to avoid; `signatures` may include long-sentence rhythms to preserve.

Universal laws, the proposal ritual, and the editor slop test (in the parent `SKILL.md`) apply by default. Per-sentence rewrites run through the proposal ritual.

## The diagnostic

For each sentence with a hit:

1. **Find the buried action.** Look for a nominalization (`-tion`, `-ment`, `-ance`, `-ence`, `-ness`, `-ity`) or a weak verb (`is`, `are`, `was`, `were`, `has`, `have`, `makes`, `does`, `provides`, `enables`).
2. **Name the real character.** Who or what is *doing* the action? May be unnamed in the current sentence — find them in the surrounding sentences, or ask.
3. **Rewrite so the character is the subject and the action is the verb.**

This is mechanical. With practice, the rewrite takes 5–15 seconds per sentence.

## What to prioritize

Rank order:
1. `nominalization-density` — the headline rule.
2. `there-is-there-are` — expletive constructions hide the actor.
3. `expletives` — `it is the case that`, `it is important to note`, `there exists`.
4. `passive-voice` — when the agent matters and can be named.
5. `weasel-hedges` — `it has been suggested`, `experts argue`. Nominalized hedges.
6. `noun-stacking` — three-plus content words in a row is a nominalization chain.
7. `sentence-too-long` — long sentences hide weak structure; after tightening, many shrink under the threshold.
8. `wordy-phrases` — mechanical: `in order to` → `to`, `due to the fact that` → `because`.

`adverb-density` and `boosters` are voice questions, not structure. Skip them.

## Rewrite patterns

### Nominalization swap

| Buried | Surfaced |
|---|---|
| **The team's consideration of the migration** led to a delay. | **The team considered the migration** and delayed it. |
| There was a **discussion** about scope. | The team **discussed** scope. |
| Our **expectation** is that latency will drop. | We **expect** latency to drop. |
| The **decision** was **made** by the steering committee. | The steering committee **decided**. |

### Expletive removal

| Expletive | Direct |
|---|---|
| **There are** three reasons for the rewrite. | The rewrite has three reasons. *(or list them)* |
| **It is** clear that the cache failed. | The cache clearly failed. |
| **It is the case that** users complain about latency. | Users complain about latency. |

### Passive flip

Use only when the agent matters and you can name them. Leave passive when the agent is genuinely unknown, or when the patient is the paragraph's topic.

| Hidden | Named |
|---|---|
| Mistakes **were made**. | The on-call engineer **misconfigured** the cache. |
| The decision **was reached** in October. | The board **decided** in October. |

### Wordy-phrase substitution

Mechanical. Always swap.

| Wordy | Tight |
|---|---|
| in order to | to |
| due to the fact that | because |
| at this point in time | now |
| on a daily basis | daily |
| in the event that | if |
| with the exception of | except |
| has the ability to | can |

## Output shape

```
# Tighten report — <file>

## Per-sentence rewrites (N)

### Line L:C — <rule-id>
<original sentence, quoted in full>

Buried action: **<verb hiding in the nominalization>**
Real character: **<actor>** *(or "unnamed — ask")*

→ <rewrite>

(Word count: 23 → 14, -39%)
```

Show the word-count delta when meaningful. Group rewrites by paragraph, not by rule — tightening one sentence often reshapes the next.

## Anti-patterns

- **Cutting words that carry weight.** "Vigorous writing is concise" doesn't mean every sentence is six words. Some sentences carry rhythm or emphasis.
- **Removing nominalizations the writer means to keep.** Some are technical terms (`mitigation`, `decomposition`). Don't propose `we mitigated` if the noun *is* the topic.
- **Flipping every passive.** Passive is fine when the agent doesn't matter or the patient is the topic.
- **Confusing tight with terse.** Tight prose has rhythm. Terse prose just clips.
- **Mechanically swapping wordy-phrases inside quoted source material.** Flag, don't fix.
