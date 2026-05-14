# tighten

Cut zombie nouns, weak verbs, and expletive subjects until every sentence has a character who does something. Tighten is not about word count for its own sake — short prose can still be flabby. It's about making subjects name *characters* and verbs name *actions*.

---

## Source

Joseph M. Williams, *Style: Lessons in Clarity and Grace* — the **Character / Action principle**: clear sentences put the main character in the subject and the main action in the verb. When subjects are abstract and verbs are some form of *to be*, the real action is hiding in a noun (the "zombie noun") and the sentence drags.

Steven Pinker, *The Sense of Style* — names these "zombie nouns" (nominalizations) and identifies them as the single biggest source of opaque prose in academic and corporate writing.

---

## The diagnostic

For each sentence with a hit:

1. **Find the buried action.** Look for a nominalization (`-tion`, `-ment`, `-ance`, `-ence`, `-ness`, `-ity`) or a weak verb (`is`, `are`, `was`, `were`, `has`, `have`, `makes`, `does`, `provides`, `enables`).
2. **Name the real character.** Who or what is *doing* the action? The character may be unnamed in the current sentence ("a decision was made") — find them in the surrounding sentences or ask.
3. **Rewrite so the character is the subject and the action is the verb.**

This is mechanical. With practice, the rewrite takes 5–15 seconds per sentence.

---

## What to prioritize

In rank order:

1. **`nominalization-density`** — the headline rule for this lens. Every flagged nominalization is a candidate for rewriting.
2. **`there-is-there-are`** — expletive constructions hide the actor.
3. **`expletives`** — `it is the case that`, `it is important to note`, `there exists`. Same problem as `there-is`.
4. **`passive-voice`** — passives often hide the character. (Not always; passive is fine when the agent doesn't matter or the patient is the topic.)
5. **`weasel-hedges`** — `it has been suggested`, `it is widely believed`, `experts argue`. These are nominalized hedges; rewrite with a named source or drop the hedge.
6. **`noun-stacking`** — three-plus content words in a row is a nominalization chain. Break with a preposition or verb.
7. **`sentence-too-long`** — long sentences hide weak structure. After tightening, many will shrink to the point where they don't trigger.
8. **`wordy-phrases`** — phrasebank-style cuts: `in order to` → `to`, `due to the fact that` → `because`, `at this point in time` → `now`.

`adverb-density` and `boosters` are not tighten's target — those are voice questions, not structure. Skip them.

---

## Rewrite patterns

### The nominalization swap

| Buried | Surfaced |
|---|---|
| **The team's consideration of the migration** led to a delay. | **The team considered the migration** and delayed it. |
| There was a **discussion** about scope. | The team **discussed** scope. |
| Our **expectation** is that latency will drop. | We **expect** latency to drop. |
| The **decision** was **made** by the steering committee. | The steering committee **decided**. |
| **Implementation** of the cache **occurred** in Q2. | We **implemented** the cache in Q2. |

The pattern: noun ending in `-tion`/`-ment`/`-ance`/`-ence`/`-ity` + a weak verb → verb form of the noun + the real subject.

### The expletive removal

| Expletive | Direct |
|---|---|
| **There are** three reasons for the rewrite. | The rewrite has three reasons. *(Or: list them.)* |
| **It is** clear that the cache failed. | The cache clearly failed. |
| **It is the case that** users complain about latency. | Users complain about latency. |

### The passive flip

Use only when the agent matters and you can name them.

| Hidden | Named |
|---|---|
| Mistakes **were made**. | The on-call engineer **misconfigured** the cache. |
| The decision **was reached** in October. | The board **decided** in October. |
| The bug **was discovered** by the QA team. | QA **found** the bug. |

Leave passive when the agent is genuinely unknown ("the cache was deployed in 2019") or when the patient is the topic of the paragraph ("the migration was reviewed twice — first by infra, then by security").

### The wordy-phrase substitution

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

---

## Output shape

```
# Tighten report — <file>

## Per-sentence rewrites (N)

### Line L:C — <rule-id>
<original sentence, quoted in full>

Buried action: **<the action verb hiding in the nominalization or expletive>**
Real character: **<the actor>** *(or "unnamed — ask")*

→ <rewrite>

(Word count: 23 → 14, -39%)
```

Show the word count delta when meaningful — it's both rhetorical and useful.

Group rewrites by paragraph, not by rule. Tightening one sentence often reshapes the next.

---

## Anti-patterns

- **Cutting words that carry weight.** "Vigorous writing is concise" doesn't mean every sentence is six words. Some sentences carry rhythm or emphasis; cutting them flat is worse than leaving them long.
- **Removing nominalizations the writer means to keep.** Some nominalizations are technical terms (`mitigation`, `decomposition`). Don't propose `we mitigated` if the noun *is* the topic.
- **Flipping every passive.** Passive is fine when the agent doesn't matter or the patient is the topic. Williams' own example: "Three professors of computer science have been promoted to full professor" is fine. The flip — "The university promoted three professors" — buries the news (promotion of CS professors).
- **Confusing tight with terse.** Tight prose has rhythm. Terse prose is just short. After your rewrites, read aloud: does the sentence sing, or does it clip?
- **Mechanically swapping the wordy-phrase table without context.** "Due to the fact that the system was old" can become "Because the system was old," which is correct. But "due to the fact that" inside a quoted source must not be silently rewritten — flag, don't fix.

---

## Handoff

- If `clarify` rules (noun-stacking, abstract-without-concrete) remain after tighten, chain into `/pilcrow clarify <target>` next.
- If sentences are now short but identical in length, run `/pilcrow pace <target>` to vary rhythm.
- If the piece reads tightened-but-cold, leave a note: "Tighten can flatten voice. Consider whether some longer sentences carried the personality."
