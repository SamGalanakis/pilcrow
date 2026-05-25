---
slug: explainer
parent: informational
description: General non-software 'how X works'. Reader leaves understanding.
aloud_default: false
---

# explainer

A "how X works" piece for a general-curious reader. Not docs; software docs use the Diátaxis four. This is the long-form *Wait But Why* / *Vox* shape: a question the reader can't quite answer ("how does a vaccine actually work?", "why is the rent so high?"), unpacked with patience, analogy, and arc until they could explain it to a friend.

## Demands
- the question stated explicitly near the top: what specifically the reader will be able to answer after reading
- a controlling analogy or scaffolding image, named once and threaded through the piece; the reader should remember the image a week later (Urban; Evans)
- mechanism before consequence: show how the thing works before claiming what follows from it
- a takeaway the reader can paraphrase in one sentence; if they can't, the piece was inventory not explanation

## Forbids
- "let's explore" / "in this article we'll examine" framings that promise a journey but never name the question
- jargon as load-bearing without definition on first use; the reader is general-interest, not the writer's colleague
- comprehensive coverage; an explainer cuts hard to the *one* thread the reader came for

## Tolerates
- digressions that earn their place (the historical note, the surprising analogue, the rejected hypothesis); these are why long-form explainers exist
- voice: opinions, jokes, a recurring narrator stance; the reader stays for the writer as much as the topic
- a single anchoring example carried across the whole piece rather than a parade of new ones

## Common AI tells
- the encyclopedic-overview structure ("section 1: definition · section 2: history · section 3: types · section 4: examples · section 5: conclusion"); Wikipedia register applied to a question that wanted a *take*
- analogies that drift across the piece: opens as "imagine a library", becomes "more like a factory", ends as "essentially a marketplace"; no single image holds
- a closing paragraph that lists what was covered instead of leaving the reader with the takeaway

## LLM lint additions

### explainer-no-controlling-analogy
- **name:** No controlling analogy
- **severity:** warning
- **description:** The piece runs for paragraphs without a named scaffolding image, metaphor, or mental model that holds across the whole explainer. The reader needs one image to compress the mechanism; without it, the explainer becomes a list of facts.
- **positive:** "Think of the immune system as a library of templates. The first time a pathogen visits, the library has to make a new card; the second time, the card is already there."
- **negative:** Eight paragraphs on antibody response, with no carrying image; just a sequence of mechanisms named in order.

### explainer-encyclopedic-structure
- **name:** Encyclopedic structure
- **severity:** info
- **description:** Section headings read as the topic's taxonomic outline (`Definition · History · Types · Applications · Conclusion`) rather than the arc of the question being answered. Wikipedia is the foil; an explainer follows curiosity, not taxonomy.
- **positive:** Sections shaped as story beats: "The puzzle · what changed · the mechanism · what this lets us predict".
- **negative:** "1. What is X · 2. The history of X · 3. Types of X · 4. Applications of X · 5. Conclusion."

## References
- [Tim Urban, *The AI Revolution* (Wait But Why)](https://waitbutwhy.com/2015/01/artificial-intelligence-revolution-1.html) · [Julia Evans, *jvns.ca*](https://jvns.ca/) · [Maciej Cegłowski, *Talks*](https://idlewords.com/talks/) · [Bret Victor, *worrydream.com*](https://worrydream.com/)
