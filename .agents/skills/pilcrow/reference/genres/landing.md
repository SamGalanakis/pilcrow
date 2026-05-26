---
slug: landing
parent: marketing
description: Hero page that sells. Reader is skeptical.
aloud_default: false
---

# landing

Sells a product to a visitor who arrived with intent but no patience; they will leave inside seven seconds unless the hero answers what this is and what it changes for them. The reader is the buyer or the buyer's deputy, scanning for a fit signal before they commit to reading the second scroll.

## Demands
- the hero names the product and the change in one line; a reader who reads only that line knows what is sold and who it's for (Shapiro's litmus)
- every benefit claim grounded in a feature or proof point on the same screen: number, screenshot, customer name, before/after
- the page declares its audience early; if "for X" cannot be substituted with a specific role or job, the page targets nobody
- one primary CTA per scroll, action-verbed, no parallel "or also" CTA competing for the click

## Forbids
- aspiration substituted for product description (`reimagine your workflow`, `unlock your potential`); name the thing it does
- comparator-less superlatives (`the fastest`, `the easiest`, `the most powerful`) without a named what-than
- testimonial soup: three quotes saying "great product" with no specific outcome named

## Tolerates
- short, hammered sentences when the page has earned them with a specific claim
- fragments and one-line paragraphs as visual rhythm (the page is read in scroll-units, not paragraphs)
- repetition of the product name across sections; SEO and recall both want it

## Common AI tells
- hero-tagline tricolon as the headline (`Ship faster. Build smarter. Scale forever.`): the marketing-template signature in its purest form
- abstract-noun stacking in the subhead (`a platform for productivity, collaboration, and growth`) where nothing is named
- value-prop trio of `Powerful. Simple. Scalable.` adjectives below the hero, in the bento card grid

## LLM lint additions

### landing-feature-without-benefit
- **name:** Feature without benefit
- **severity:** warning
- **description:** Hero or feature-card copy names a capability (`real-time sync`, `AI-powered search`) but not what changes for the reader using it. The buyer cannot translate the capability into their own day.
- **positive:** "Real-time sync: your designer sees the comment the moment you leave it; no more refresh-and-ask."
- **negative:** "Real-time sync. AI-powered search. Enterprise-grade security."

### landing-superlative-pile
- **name:** Superlative pile without comparator
- **severity:** warning
- **description:** Hero stacks superlatives (`fastest`, `easiest`, `most powerful`, `simplest`) without naming what is being beaten or by how much. The claim is unfalsifiable, so the skeptical reader discounts the whole page.
- **positive:** "Builds in 90 seconds, down from 11 minutes on our previous CI."
- **negative:** "The fastest, easiest, most powerful build system on the market."

## References
- [Julian Shapiro, *Startup Handbook: Landing Page Copywriting*](https://www.julian.com/guide/startup/landing-pages) · [Harry Dry, *Marketing Examples*](https://marketingexamples.com) · [Basecamp](https://basecamp.com) · [Stripe homepage](https://stripe.com)
