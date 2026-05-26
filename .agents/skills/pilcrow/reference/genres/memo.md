---
slug: memo
parent: correspondence
description: Decision document; RFC / ADR shape. Recommendation in sentence 1.
aloud_default: false
---

# memo

Proposes a decision to colleagues who will accept it, push back, or kill it. The reader is busy, technical, and reading on the way to a meeting where the memo is the agenda; they want the recommendation, the forces that produced it, the alternatives considered, and the consequences they'll be living with.

## Demands
- recommendation as the first sentence, written `We will …` in active voice (Nygard); title and TL;DR resolve to the same call
- Context names the forces (technical, organizational, financial) in value-neutral language; alternatives listed with the reason each was rejected
- Consequences include the *negative* ones the writer is signing up for, not only the upside
- status is explicit (proposed / accepted / superseded by ADR-N) and dated; superseded memos are linked, not deleted
- two-pages for routine ADRs (Nygard); the 6-pager (Bryar) is for strategic narrative; pick the form that fits

## Forbids
- preamble that previews the memo (`This memo will outline …`, `In this document we explore …`); the recommendation is the preview
- bullets used to dodge full sentences in the Decision section; Nygard's rule, "Bullets are acceptable only for visual style, not as an excuse for writing sentence fragments"
- single-sided Consequences (only the upside listed); if you can't name the cost you're paying, you haven't decided

## Tolerates
- acronyms, internal system names, link-only citations to dashboards or PRs
- a coined name for the pattern (`the staging-replica drift problem`) once defined; repeat use is fine

## Common AI tells
- preamble openers (`I'm writing to propose …`, `This memo will examine …`); meta-discourse instead of the call
- both-sides Consequences read as a pros/cons listicle with no choice carried
- recommendation written `It is recommended that …`: agentless passive where Nygard demands `We will`

## LLM lint additions

### memo-no-recommendation
- **name:** Missing recommendation
- **severity:** error
- **description:** First paragraph has no sentence of the form `We will X` (or equivalent active-voice decision). A memo without a recommendation in the first scroll is a status update.
- **positive:** "We will move the staging Aurora replica to its own VPC by April 30."
- **negative:** "There are several options we have been considering for the staging replica, and this memo reviews them."

### memo-preamble
- **name:** Preamble opener
- **severity:** warning
- **description:** Memo opens with meta-discourse (`I'm writing to`, `wanted to`, `This memo will`, `In this document`) rather than the recommendation.
- **positive:** "We will adopt RFC-style ADRs for every architectural change touching more than one service."
- **negative:** "This memo will walk through our options for documenting architectural decisions and propose a path forward."

## References
- [Michael Nygard, *Documenting Architecture Decisions*](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) · [Will Larson, *Write five, then synthesize*](https://lethain.com/good-engineering-strategy-is-boring/) · [Colin Bryar & Bill Carr, *Working Backwards*; the 6-page narrative memo](https://www.workingbackwards.com/) · [Jeff Bezos, 2017 shareholder letter on six-pagers](https://www.aboutamazon.com/news/company-news/2017-letter-to-shareholders)
