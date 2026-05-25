---
slug: about-page
parent: marketing
description: Brand-voice About / Mission page.
aloud_default: false
---

# about-page

The page a reader lands on when they want to know who's behind the product, usually after they like the product enough to vet the company. They are looking for evidence that real people are accountable, that the company has an opinion, and that the story behind the product is more than a content-strategy artifact.

## Demands
- a founding moment grounded in a specific year, place, and irritation: Fried's "what is this?" or Mailchimp's "the alternative to expensive email software of the early 2000s"
- at least one named human, in their own voice or attributed to them, with a job that sounds like a job (`Jason, co-founder` not `our visionary leadership`)
- a position the company holds that a competitor wouldn't: opinions about how work should be done, who they won't sell to, what they refuse to build
- numbers where they exist (year founded, headcount band, customer count, money raised); they ground every abstract claim above

## Forbids
- mission-statement abstractions interchangeable with any company in the category (`empowering people to do their best work`)
- founder-mythology cliché (`a sticky-note on a napkin`, `building from a dorm room`) without the specific scene attached
- the corporate-citizenship paragraph as substitute for a position (`we believe in diversity, sustainability, and innovation`): convictions, not vibes

## Tolerates
- first-person and first-person-plural, freely; this is one of the few marketing pages where `we` and `I` belong on the page
- a long, narrative paragraph in the middle; the about page can carry one block of real prose where the rest of the site is scannable
- mild self-deprecation and admitted mess (`we dropped balls`, `we still aren't sure`); Basecamp-style honesty beats polished mythology

## Common AI tells
- the mailchimp-knockoff voice without the substance: "plainspoken" and "human" as adjectives without the actual prose to back them
- the `From X to Y, we've always believed Z` sweep: survey-of-the-field cadence on a page that should be specific to one company
- the values bullet list (`Curiosity. Craft. Customer obsession.`) doing the work that lived examples should do

## LLM lint additions

### about-page-mission-soup
- **name:** Mission-statement soup
- **severity:** warning
- **description:** Mission, vision, or "we believe" paragraph reads as interchangeable abstractions; could appear on any competitor's About page with the company name swapped. No specific year, person, customer, or refusal anchors the claim.
- **positive:** "We started Basecamp in 2004 because our consulting clients kept asking what we used to manage their projects. The answer was an internal tool. We sold the tool."
- **negative:** "Our mission is to empower people and organizations to do their best work and unlock their full potential in an ever-evolving world."

### about-page-values-bullets
- **name:** Values bullets as substitute for position
- **severity:** info
- **description:** A `Our values` or `What we believe` section is a bulleted list of one- or two-word abstractions (`Curiosity. Craft. Trust.`) with no specific consequence or trade-off named. The reader cannot guess what the company would refuse to do.
- **positive:** "We won't sell to ad-tech, even when they pay above list; we built the product to keep user data private, and that means saying no."
- **negative:** "Our values: Curiosity. Craft. Customer Obsession. Diversity. Sustainability. Innovation."

## References
- [Mailchimp, *About*](https://mailchimp.com/about/) · [Basecamp, *About*](https://basecamp.com/about) · [Mailchimp, *Voice and Tone*](https://styleguide.mailchimp.com/voice-and-tone/) · [37signals, *Getting Real*](https://basecamp.com/gettingreal)
