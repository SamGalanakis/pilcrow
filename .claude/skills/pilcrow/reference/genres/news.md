---
slug: news
parent: reportorial
description: External report of an event. Inverted pyramid, lede-first.
aloud_default: false
---

# news

Reports an event to a reader who hasn't heard it yet and may quit after the first paragraph. The lede carries the five Ws plus the freshest fact; the rest descends in importance so an editor can cut from the bottom without losing the story.

## Demands
- the new development in the first sentence: what changed today, not what's been true for months (inverted pyramid; AP)
- attribution on every non-trivial claim: who said it, when, in what setting (`per a Tuesday filing`, `said in a Wednesday press call`)
- numbers, dates, and proper nouns in the lede paragraph; vague antecedents (`the company`, `officials`) only after the named referent appears once
- a nut graf within the first three paragraphs naming why this matters now: the news peg, not the topic's general importance

## Forbids
- editorial verbs in the news section (`slammed`, `blasted`, `revealed` for ordinary statements); reserve evaluative verbs for analysis pieces
- single-source claims on contested facts presented as settled; `said` with no second voice on anything one party disputes
- "in a statement" attribution without the statement's date or channel; readers can't audit a quote dated `recently`

## Tolerates
- short paragraphs, even one-sentence ones; the form wants scanability
- repetition of the principal's full name and title after long quote blocks (radio-clean attribution)
- the kicker-quote close that lands an aside; anti-pyramid by design, fine when the piece earns it

## Common AI tells
- the explainer lede that opens with context (`Amid growing concerns over X, the company on Tuesday…`) instead of the action; context belongs after the verb
- balance-by-formula (`Some say X. Others say Y.`) without naming either side or weighting evidence
- omniscient sourcing (`reports indicate`, `sources familiar with the matter`) where the model is laundering a guess as attribution

## LLM lint additions

### news-context-before-action
- **name:** Context-before-action lede
- **severity:** warning
- **description:** First sentence opens with a participial or prepositional setup (`Amid`, `As`, `Following`, `In a move that`) before the actor and the verb. The new development should be the first independent clause; context follows.
- **positive:** "The FAA grounded all 737 MAX 9 aircraft on Tuesday, citing the door-plug failure on Alaska 1282."
- **negative:** "Amid growing concerns over aircraft safety, the FAA on Tuesday took action against Boeing's 737 MAX 9 fleet."

### news-unnamed-source-laundering
- **name:** Unnamed-source laundering
- **severity:** warning
- **description:** Attribution to `sources`, `reports`, `observers`, or `analysts` with no count, no relationship to the matter, and no reason for anonymity. Either name the source, name the count and proximity, or cut the claim.
- **positive:** "Two officials with direct knowledge of the negotiations, speaking on condition of anonymity because the talks are ongoing, said the deadline slipped to Friday."
- **negative:** "Sources say the deadline has slipped to Friday."

## References
- [Reuters, *Handbook of Journalism*](https://handbookreuters.com/) · [Roy Peter Clark, *Writing Tools* (Poynter)](https://www.poynter.org/author/rclark/) · [*The Inverted Pyramid* (Pressbooks/CCCOnline)](https://pressbooks.ccconline.org/medianewsandreporting/chapter/writing-a-news-story-style-tone-ledes-and-the-inverted-pyramid/) · [AP Stylebook overview (Miami U Libraries)](https://libguides.lib.miamioh.edu/journalism/apstyleguide)
