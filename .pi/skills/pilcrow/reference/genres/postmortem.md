---
slug: postmortem
parent: reportorial
description: Incident retrospective. Blameless framing, contributing-factors structure.
aloud_default: false
---

# postmortem

Reports an incident to colleagues who want to recognize the same conditions next time. The piece is for learning, not adjudication. The reader brings system knowledge and wants the timeline, the conditions that enabled the incident, what changed, and which action items survived triage.

## Demands
- timeline in absolute timestamps with timezone; mark inference (`probably`, `we infer`) where direct evidence is absent
- treat people as characters: name what each responder saw, knew, and thought at decision time; present tense for narrative, past for impact (Hochstein)
- contributing factors *plural*; the structure enforces it; no single "root cause" (Cook §3)
- action items have named owners and a closed state (done / in flight / dropped; not "future work")

## Forbids
- counterfactual framing: `should have`, `could have`, `failed to`, `if only`, `didn't notice X`. Replace with the conditions that made the actual choice make sense at the time
- singular-cause framing: `the root cause was`, `caused by`, `due to` followed by one thing
- agent-of-failure attribution that names a person where the system gave permission (`the on-call pushed a bad config` → `the deploy pipeline accepted a change with no canary`)

## Tolerates
- dense technical paragraphs, acronyms, dashboard links as citations, code and config excerpts
- repetition where the timeline genuinely cycles (alert → respond → revert → re-alert)
- honest hedging where evidence is partial (`we believe X based on Y; Z is unconfirmed`)

## Common AI tells
- the wry-deprecating cliché (`we shipped Tuesday and the team learned a lot`); surface humility, blame-substance underneath
- sycophant praise of responders (`Alex did an excellent job under pressure`); flatten to specifics or cut
- stakes inflation or marketing register on impact (`a critical outage shook the platform`; `luckily`, `thankfully`)

## LLM lint additions

### postmortem-counterfactual
- **name:** Counterfactual framing
- **severity:** warning
- **description:** Sentence uses `should have`, `could have`, `failed to`, `if only`, or similar retrospective-judgment language about what someone did or didn't do. Replace with the conditions that made the actual choice make sense at the time.
- **positive:** "At 02:14 the responder did not check the runbook; the alert had not previously correlated with the runbook's symptoms."
- **negative:** "The responder should have checked the runbook at 02:14."

### postmortem-singular-cause
- **name:** Singular-cause framing
- **severity:** warning
- **description:** The piece names "the root cause" or "the cause" as a single thing. Complex systems fail through interacting conditions; flag the framing.
- **positive:** "Contributing factors: undetected schema drift, an alerting gap on staging, a runbook edited mid-incident the previous week."
- **negative:** "The root cause was a missing database index."

## References
- [Lunney & Lueder, *Postmortem Culture: Learning from Failure*, Google SRE Book Ch 15](https://sre.google/sre-book/postmortem-culture/) · [Allspaw et al., *Etsy's Debriefing Facilitation Guide*](https://www.etsy.com/codeascraft/debriefing-facilitation-guide/) · [Lorin Hochstein, *Surfing Complexity*](https://surfingcomplexity.blog/) · [Richard Cook, *How Complex Systems Fail*](https://how.complexsystems.fail/)
