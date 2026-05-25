---
slug: project-home
parent: overview
description: Docs-site front page (web README).
aloud_default: false
---

# project-home

The front door to a docs site. Distinct from the GitHub README: the reader has *already decided* to look, otherwise they wouldn't be on docs.example.com. The job is to route, by job-to-be-done, not by topic outline. Most readers arrive looking for a specific section and use this page as a switchboard.

## Demands
- one-line definition at the top, then immediately fork by reader intent: `New here? → Tutorial · Building something? → How-to · Looking up a flag? → Reference` (Tailwind, SvelteKit, Linear)
- prominent search affordance; on a docs site the reader expects `/` or `⌘K`
- visible link to one tutorial, one canonical how-to, and the reference index: the three doorways down to Diátaxis quadrants
- a "what's new" or version-pinned link so the reader knows the docs match the code they're running; flag pre-1.0 status if applicable

## Forbids
- duplicating the GitHub README's marketing copy verbatim; if the reader is here they already converted, and rehashing the pitch wastes the slot
- a homepage that is itself the tutorial; that's a routing failure; link to the tutorial instead
- exhaustive feature taxonomies on the front page; the sidebar carries that

## Tolerates
- a hero card with a code sample as the only above-fold content; the docs site can lean visual where the README can't
- short brand register if the rest of the docs maintain it consistently
- a curated "popular pages" or "start here" list; readers genuinely use these as the entry log

## Common AI tells
- the page is structured as an outline of the docs *site* rather than as a router for the *reader*'s next click
- the lede restates the README's tagline word-for-word: same hero, same tricolon, same emoji
- a "Getting started" section that is neither a tutorial nor a link to one, but three paragraphs of orientation prose that delays the reader's actual click

## LLM lint additions

### project-home-no-routing
- **name:** No routing
- **severity:** warning
- **description:** The front page does not route readers to the three Diátaxis quadrants (tutorial, how-to, reference) within the first scroll. Without explicit links keyed to reader intent, the page becomes a second README; readers must scan a feature list to find their way down.
- **positive:** "New? Start with the tutorial. Building something specific? See the how-to guides. Looking up an option? Browse the reference."
- **negative:** "Welcome to the docs! Below you'll find an overview of features, philosophy, and the project's history."

### project-home-readme-duplication
- **name:** README duplication
- **severity:** info
- **description:** The opening section is the same pitch as the GitHub README: same tagline, same hero copy, same feature bullets. The reader is already on the docs site; reusing the conversion pitch wastes the most valuable slot.
- **positive:** "pilcrow is a prose linter. The CLI handles deterministic checks; this skill handles judgment calls. Below: tutorial, how-to, reference."
- **negative:** Front page hero identical to the README hero, followed by the same bullet list of features.

## References
- [Stripe, *Docs*](https://docs.stripe.com/) · [Tailwind CSS, *Installation*](https://tailwindcss.com/docs/installation) · [Linear, *Docs*](https://linear.app/docs) · [Svelte team, *SvelteKit introduction*](https://svelte.dev/docs/kit/introduction)
