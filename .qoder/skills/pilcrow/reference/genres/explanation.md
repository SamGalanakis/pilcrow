---
slug: explanation
parent: documentation
description: Understanding-oriented doc; Diátaxis explanation. The 'why'.
aloud_default: false
---

# explanation

Builds a mental model. The reader already used the thing; maybe followed the tutorial, hit a sharp edge in a how-to, or skimmed the reference and felt the shape but not the reason. They came back to understand *why* it's built this way, what alternatives were rejected, and what the trade-offs cost.

## Demands
- name the mental model the reader is meant to build, near the top: one sentence the reader can paraphrase back ("reactivity is dependency tracking plus reactive effects", from Vue's *Reactivity in Depth*)
- give the historical or design context: what problem this approach solves, what came before, what was tried and rejected (Procida)
- engage at least one real alternative (not strawman, not "of course we picked the right thing"); name where the trade-off bites
- ground abstraction in at least one concrete example per major concept; the reader should be able to point to "this is what that looks like in real code"

## Forbids
- step-by-step instructions; if the reader needs to *do* something, link out to a how-to
- exhaustive parameter or feature lists; that's reference's job, and the reader's working memory is the budget
- false neutrality; the writer has a position, and pretending otherwise reads as evasion

## Tolerates
- long sentences and dense paragraphs the reference page would flag; explanation rewards the patient reader
- digressions that serve the model (the analogy, the brief history, the rejected design); they're not filler if they earn the reader's intuition
- explicit opinion and qualified judgment ("this trade-off is mostly worth it, and here's where it isn't")

## Common AI tells
- the "let's explore" frame that promises understanding but never names the model; the reader finishes with paragraphs but no claim they could repeat
- both-sides hedging on every design choice (`there are pros and cons to each approach`) instead of taking a position
- analogies that don't survive contact with the next paragraph (`think of it like a library, but actually like a factory, well, more of a registry…`)

## LLM lint additions

### explanation-no-mental-model
- **name:** No named mental model
- **severity:** warning
- **description:** The page runs for paragraphs of detail without naming the model the reader is meant to build. The reader should be able to paraphrase the central claim in one sentence after reading the first scroll; if they can't, the explanation is doing reference work instead.
- **positive:** "Reactivity in Vue is two things: tracking which values an effect reads, and re-running that effect when any of those values change."
- **negative:** "Reactivity is one of Vue's most distinctive features. There are many aspects to how it works. Let's explore the different mechanisms involved."

### explanation-no-alternative-engaged
- **name:** No alternative engaged
- **severity:** info
- **description:** The page presents a design choice as if it had no contender. Explanation earns trust by naming at least one real alternative and showing where the chosen approach pays and where it costs. Skipping this reads as marketing.
- **positive:** "Svelte's compile-time reactivity gives sharper syntax at the cost of a build step; Vue's runtime approach trades that for fewer edge cases."
- **negative:** "We use Proxies because they're the right tool for this job."

## References
- [Procida, *Diátaxis: Explanation*](https://diataxis.fr/explanation/) · [Vue.js team, *Reactivity in Depth*](https://vuejs.org/guide/extras/reactivity-in-depth.html) · [Julia Evans, *jvns.ca*](https://jvns.ca/) · [Bret Victor, *worrydream.com*](https://worrydream.com/)
