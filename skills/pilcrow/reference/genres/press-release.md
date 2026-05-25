---
slug: press-release
parent: marketing
description: Announcement formatted for journalists to lift from.
aloud_default: false
---

# press-release

A 250–500-word announcement written so a tired reporter can paste the lede and the third paragraph into a story before lunch. The reader is the journalist, not the customer; they want a verifiable fact, a quotable line, and a contact who picks up, not the brand's mood board.

## Demands
- inverted pyramid: who, what, when, where, why in the first sentence; the rest is supporting paragraphs ranked by what survives a cut from the bottom
- dateline (`SAN FRANCISCO, May 15, 2026 –`) and an embargo line if applicable; both are signals to the journalist that the writer knows the form
- one or two specific numbers in the first three paragraphs (customers, ARR, percentage gain, hire count) that the reporter can quote with confidence
- contact block at the bottom with a human name, role, email, and phone; no `media@company.com` black hole

## Forbids
- the Bezos-failure mode: a release that reads like a strategy memo instead of a customer-visible product launch; if no one outside the company can describe what shipped, the release isn't ready
- internal-quote soup: the CEO, the CTO, and the head of product all quoted on the same announcement, each saying a variant of "we are excited"
- adjective-stacked product names (`our revolutionary, next-generation, AI-first platform`); the journalist will cut every adjective on first edit

## Tolerates
- a marketing-register quote *if* it carries one fact a journalist would otherwise have to ask for ("we crossed 10,000 paying teams in April")
- formulaic boilerplate paragraph at the end (`About $COMPANY:`); convention, not a tell
- `###` or `-30-` end-mark; convention, not a tell

## Common AI tells
- the empty CEO quote: `"We are thrilled to announce…"`; the model's default, carries no fact and reads as a stage cue
- stakes-inflation in the lede (`transforming the way humanity X`s`) attached to a routine product update: the genre-cliché version of fintech-confident voice
- the from-X-to-Y industry-sweep paragraph (`From startups to Fortune 500s, every team needs Y`) used as the second paragraph

## LLM lint additions

### press-release-internal-quote-soup
- **name:** Internal-quote soup
- **severity:** warning
- **description:** Two or more executive quotes in one release, none carrying a fact a reporter would otherwise have to dig for. The quotes mostly express enthusiasm or restate the headline.
- **positive:** "'We crossed 10,000 paying teams in April, up from 4,000 in January,' said CFO Maya Chen."
- **negative:** "'We are thrilled to deliver this transformative capability,' said CEO. 'This represents the next chapter,' added CTO. 'Our customers will love it,' said head of product."

### press-release-empty-lede
- **name:** Empty lede
- **severity:** error
- **description:** The first sentence names a company action but no concrete result, comparison, or quantity. A reporter cannot lift the sentence as the first line of their story.
- **positive:** "Stripe today announced support for instant payouts in 14 new markets, bringing same-day settlement to merchants in 47 countries."
- **negative:** "Stripe today announced a transformative new initiative to empower the future of global commerce."

## References
- [AP Stylebook on press releases](https://www.apstylebook.com) · [Colin Bryar & Bill Carr, *Working Backwards* (Amazon PR/FAQ)](https://workingbackwards.com/concepts/working-backwards-pr-faq-process/) · [Nieman Foundation, *Nieman Lab* on news writing form](https://www.niemanlab.org)
