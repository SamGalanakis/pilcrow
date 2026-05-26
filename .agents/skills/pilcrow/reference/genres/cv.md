---
slug: cv
parent: personal
description: Résumé / CV: achievement-led fragments, parallel structure.
aloud_default: false
---

# cv

A skim-scan document a hiring manager reads in 20–40 seconds to decide whether to keep reading. The reader brings a role spec, a stack of other CVs, and a checklist; they want named scope, named impact, and proof, not narrative.

## Demands
- bullets open with a strong past-tense verb (`shipped`, `cut`, `migrated`, `owned`, `negotiated`); not `responsible for`, not `worked on`, not `helped`
- every load-bearing bullet carries a number, a scope, or a named system (`cut p99 latency 42% across the payments path`; `migrated 14 services off Aurora to Postgres 16`); vague verbs without a unit don't survive triage
- parallel structure within a role: every bullet same tense, same shape, same punctuation, same capitalization
- chronology unambiguous: every role dated to the month, gaps named (not hidden); current role in present tense if any tense is present

## Forbids
- first-person pronouns and full sentences (`I led a team that…`, `I am responsible for…`); the form drops `I` and trims to fragments
- adjective-stack self-rating (`hardworking team player`, `detail-oriented`, `passionate about X`); claims without proof on a document whose entire job is proof
- skill-soup paragraphs and "objective" / "summary" blocks longer than two sentences; the bullets do the work; voice lives in the verb choice and the metric, not in punctuation

## Tolerates
- fragments (the dominant unit), missing articles, dropped subjects; fragment-cadence rules don't apply here
- dense verb-led parallelism every bullet, every section; parallel-triplet density is the form, not a tell
- acronyms and stack names without expansion if the role's reader knows them; the audience is technical, not general

## Common AI tells
- the corporate-verb pool (`leveraged`, `spearheaded`, `orchestrated`, `championed`, `pioneered`, `unlocked`, `optimized`) in place of the specific verb that describes what happened
- the bullet expanded into a narrative sentence with subordinate clauses (`Led a cross-functional team of engineers to deliver a critical migration that enabled the platform to scale`); the genre wants the verb, the object, the number, full stop
- soft-skill clichés (`strong communicator`, `proven leader`, `cross-functional collaborator`); assertions a CV cannot prove and a reader has already dismissed

## LLM lint additions

### cv-vague-impact
- **name:** Vague impact bullet
- **severity:** warning
- **description:** A bullet claims impact (`drove growth`, `improved performance`, `significant impact`, `owned the strategy`, `delivered results`) without a number, percentage, scope, named system, or comparable. The bullet either gets a unit or it gets cut.
- **positive:** "Cut p99 latency 42% across the payments path (Q3 2024); shipped the cache rewrite that took the on-call from 6 pages/week to 1."
- **negative:** "Drove significant performance improvements across the platform and delivered key results for the business."

### cv-narrative-creep
- **name:** Narrative creep in CV bullet
- **severity:** warning
- **description:** A bullet has become a sentence with `I`, subordinate clauses, or explanatory prose. CV bullets open with a verb and stay fragmentary; full sentences belong in the cover letter.
- **positive:** "Migrated 14 services from Aurora to Postgres 16; led the dual-write window and the cutover (zero downtime, March 2024)."
- **negative:** "I was responsible for leading the team that migrated our services to a new database, which was a critical initiative for the business."

## References
- [Patrick McKenzie, *Don't Call Yourself A Programmer, And Other Career Advice*](https://www.kalzumeus.com/2011/10/28/dont-call-yourself-a-programmer/) · [Will Larson, *Some career advice*](https://lethain.com/career-advice/) · [Yossi Kreinin, *yosefk.com* (engineer-bio source)](https://yosefk.com/) · [Maciej Cegłowski, *Pinboard: About* (anti-marketing register)](https://pinboard.in/about)
