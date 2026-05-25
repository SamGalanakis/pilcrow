---
slug: product-copy
parent: marketing
description: Feature pages and product descriptions.
aloud_default: false
---

# product-copy

Describes a single feature or product surface to a reader who is past the hero, considering whether to adopt; they want the shape of the thing, not the brand pitch. They bring a job to be done and a vague memory of three competing tools; the page either translates the feature into their workflow or loses them.

## Demands
- one user noun on the page that the reader recognizes from their own week (`the on-call eng`, `the procurement lead`, `the trial-balance reviewer`) before any technical noun
- every feature stated as `does X so the user can Y`: the second clause is load-bearing; if it can be cut without losing meaning, the feature isn't a benefit yet
- one screenshot, code snippet, or before/after per section the way a sales engineer would demo it
- pricing, limits, and integration surface named on the page or one click from it; adoption decisions need shape, not vibes

## Forbids
- noun-stacks of technical jargon read as a buzzword string (`AI-powered observability platform with cloud-native telemetry pipelines`) with no concrete user noun
- inflated category framing (`the future of work`, `the operating system for X`) on a feature page; the hero may earn this, the feature page does not
- "trusted by industry leaders" without naming three

## Tolerates
- jargon native to the buyer's role; a developer page can say `idempotent`, `webhook`, `OAuth scopes` without explaining them
- dense parameter tables and config snippets; the product is technical, the copy can be
- repeated product name and verb-noun pairs across feature cards; searchability and parallelism both want them

## Common AI tells
- the empty-positioning paragraph: three sentences explaining what category the product belongs to without saying what it does
- benefit adjectives doing the work that benefit clauses should do (`a powerful, intuitive, scalable solution`); Ogilvy's first rule, broken
- the joel-spolsky failure mode: feature list reads like a spec sheet without naming who wins from each item

## LLM lint additions

### product-copy-jargon-stack
- **name:** Jargon stack without user noun
- **severity:** warning
- **description:** A noun phrase stacks three or more technical or category modifiers without a concrete user noun in the same paragraph. The reader cannot recover whose job changes.
- **positive:** "Cuts the on-call eng's first-response time: alerts route to the right runbook in under five seconds."
- **negative:** "An AI-powered, cloud-native observability platform with real-time telemetry pipelines for the modern enterprise."

### product-copy-benefitless-feature-list
- **name:** Benefitless feature list
- **severity:** warning
- **description:** Three or more consecutive feature names or bullets with no `so that` clause naming the user outcome. The page lists capabilities a competitor could also list.
- **positive:** "Branch protection: main can't be force-pushed, so the on-call doesn't get paged at 2 a.m. by a rebase."
- **negative:** "Branch protection. Required reviewers. Status checks. Merge queues."

## References
- [Joel Spolsky, *Camels and Rubber Duckies*](https://www.joelonsoftware.com/2004/12/15/camels-and-rubber-duckies/) · [David Ogilvy, *Confessions of an Advertising Man*](https://archive.org/details/confessionsadvertisingman) · [Patrick McKenzie, *Salary Negotiation*](https://www.kalzumeus.com/2012/01/23/salary-negotiation/) · [Stripe Docs as product-copy benchmark](https://stripe.com/docs)
