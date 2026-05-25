---
slug: one-pager
parent: overview
description: Single-sheet executive summary of a project or proposal.
aloud_default: false
---

# one-pager

A single-sheet decision document. The reader is a busy stakeholder (an exec, a cross-functional partner, a sponsor) being asked to greenlight, fund, or align on something. They'll read once, scan, and decide. The format is a forcing function: if it doesn't fit on a page, the thinking isn't done.

## Demands
- the ask, the recommendation, or the headline outcome lands in the first paragraph: what changes if this is approved, in one sentence (Rachitsky; Amazon PR/FAQ)
- a "problem / proposal / why now" spine: the proposal exists because of a specific problem, and the timing has a reason
- success metric named: what number will tell us this worked, by when, measured how (Andy Grove; Working Backwards)
- the cost (budget, headcount, scope) and one rejected alternative with the reason: "we considered X, didn't pick it because…"

## Forbids
- second page; if it spills, cut something; the constraint is the discipline
- bullet lists where the bullets are the whole content; the reader needs prose connective tissue to follow the argument
- appendix links the decision genuinely depends on; if load-bearing, the one-pager isn't done

## Tolerates
- small fonts, tight margins, sidebars; this is a designed artifact, not a blog post
- terse fragments in scannable rows (`Cost: $480k Y1 · Owner: Maya · Decision needed: 2026-06-01`)
- explicit confidence levels and hedges where the evidence is partial (`we're ~70% on the revenue model`)

## Common AI tells
- the "context" paragraph that warms up before the ask: three sentences of background where the recommendation should be
- both-sides framing of the recommendation (`there are compelling arguments on each side`); the one-pager is for taking a position
- success metric written as a verb-phrase aspiration (`improve customer satisfaction`) instead of a number with a date

## LLM lint additions

### one-pager-no-ask
- **name:** No explicit ask
- **severity:** error
- **description:** The first paragraph doesn't contain the recommendation, decision-requested, or headline outcome. The reader should know what they're being asked to approve or align on by the end of sentence 2. If the ask is in the middle or end, the one-pager has failed its first job.
- **positive:** "Recommendation: ship the cache rewrite in Q3. Cost: 4 eng-quarters; expected p99 drop 35%; decision needed by 2026-06-01."
- **negative:** "Over the past two quarters, our team has been investigating performance bottlenecks across the system. We've identified several areas of concern…"

### one-pager-success-metric-vague
- **name:** Vague success metric
- **severity:** warning
- **description:** The success metric is a verb-phrase aspiration (`improve onboarding`, `drive engagement`, `enhance reliability`) instead of a measurable number with a deadline and a source. Reviewers can't approve what they can't audit later.
- **positive:** "Success: median activation time drops from 11 to 5 days by EOQ3, measured via the activation dashboard."
- **negative:** "Success: improved user activation and a smoother onboarding experience."

## References
- [Working Backwards, *PR/FAQ template*](https://workingbackwards.com/resources/working-backwards-pr-faq/) · [Lenny Rachitsky, *Examples and templates of 1-Pagers and PRDs*](https://www.lennysnewsletter.com/p/prds-1-pagers-examples) · [Bryar & Carr, *Working Backwards* (Amazon PR/FAQ tradition, summarized)](https://workingbackwards.com/concepts/working-backwards-pr-faq-process/)
