---
slug: faq
parent: informational
description: Question-grouped reference for predictable user confusion.
aloud_default: false
---

# faq

A page grouped by questions the reader is actually asking. The reader arrived confused about *one specific thing* and scans headings for their question phrased the way they'd phrase it. The format only earns its place when the questions are real, drawn from tickets, threads, or search logs. Otherwise it's a content dump pretending to be a structure (which is why GOV.UK argues against it; worth engaging that argument before reaching for the format).

## Demands
- each heading is a complete interrogative sentence, phrased the way the reader would type it into search: `Why was I charged twice?` not `Billing discrepancies`
- questions sourced from real signal: ticket categories, search queries, repeated thread replies; not invented
- answer first, context second; the reader scanned to this heading, so lead with the answer in sentence 1, then add necessary context
- if a question recurs because the product is confusing, link to the fix being shipped; the FAQ entry is an admission, not a substitute

## Forbids
- invented questions; "What makes X the best in its category?" is marketing, not FAQ
- yes/no questions answered with a paragraph; if the answer is "yes" or "no", lead with the word
- the entry that begins "Great question!" or any sycophant opener; this is a fossil

## Tolerates
- terse fragments in answers, even one-word answers (`Q: Can I cancel anytime? A: Yes.`)
- duplicated phrasing across answers when the same constraint applies; consistency helps scanners
- a "still need help?" link at the bottom rather than per-entry; the page is a router, not a support channel

## Common AI tells
- invented questions phrased in marketing voice (`What makes our platform stand out?`): the model fabricates plausible-looking questions when real ones weren't provided
- every answer the same length and shape: three sentences, opening with "Great question," middle restating the question, close on a generic invitation to learn more
- questions ordered by topical taxonomy rather than frequency or reader-search-intent

## LLM lint additions

### faq-non-question
- **name:** Non-question heading
- **severity:** warning
- **description:** A heading is not a real interrogative sentence the reader would type: a noun phrase (`Billing`), a fragment (`About cancellation`), or a marketing line (`Why customers love X`). FAQ headings are search bait: phrased the way the reader asks, ending with a question mark.
- **positive:** "Why was I charged twice in the same month?"
- **negative:** "Billing discrepancies and account adjustments."

### faq-invented-question
- **name:** Invented question
- **severity:** warning
- **description:** The question has no evidence of being *frequently asked*: no ticket signal, no thread, no search query. It reads like a writer guessing what users *might* ask, often in marketing register. Real FAQs cite the source of the question (or are obviously built from one); fabricated ones don't.
- **positive:** "Why is my export missing rows? (most common ticket category, Q1 2026)"
- **negative:** "What makes pilcrow different from other linters?"

## References
- [GOV.UK, *Writing for GOV.UK: do not use FAQs*](https://www.gov.uk/guidance/content-design/writing-for-gov-uk) · [Working Backwards, *PR/FAQ template*](https://workingbackwards.com/resources/working-backwards-pr-faq/) · [Procida, *Diátaxis*](https://diataxis.fr/) (for the question of when an FAQ is masking a missing tutorial / how-to / reference page)
