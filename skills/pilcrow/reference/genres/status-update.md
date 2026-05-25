---
slug: status-update
parent: reportorial
description: Internal weekly / standup update. What changed, what's blocked.
aloud_default: false
---

# status-update

Reports a week of work to colleagues and a manager who will spend ninety seconds on it. The reader wants state changes (shipped, decided, blocked), not activity; the update earns its place by making the reader's next decision easier: fund this, unblock that, escalate this thing nobody else can see yet.

## Demands
- outcomes and state changes, not activity verbs; `decision pending owner` beats `met with team to discuss`
- every blocker has a named owner, an explicit ask, and a date the writer needs the answer by; "we're blocked on X" without an ask is a vent, not an update
- last week's predictions reconciled against what actually happened; call out the ones that slipped, by name (5-15 / Larson)
- one explicit confidence statement on the headline item: `on track`, `at risk because X`, `slipping by N days`; never the unmodified green

## Forbids
- the activity log disguised as outcomes (`had three meetings`, `reviewed the doc`, `paired with Y`); these are inputs, not state
- watermelon status: green outside, red inside; an update that lands `on track` on Friday and `we need to slip` on Monday has lied
- the project-name-only bullet (`Project Athena: progress`); name what moved, by how much, since when

## Tolerates
- dense acronyms, dashboard links, ticket IDs, code snippets as evidence; the reader works here
- short bullets without verbs where the structure already supplies them (`Athena: spec landed, build starts Mon`)
- repeated structure week to week (same five headings); the form is supposed to be skim-aligned across weeks

## Common AI tells
- the wrap-up cliché (`overall, the team made solid progress`); say what moved, not how the team felt about moving it
- compliment paragraphs that name no one specifically (`shoutout to engineering for the great work`); flatten to specifics or cut
- the "what's next" section that restates last week's "what's next"; the model recycles the same goals because the actual delta is missing

## LLM lint additions

### status-no-ask
- **name:** Blocker without an ask
- **severity:** warning
- **description:** The update names a blocker, risk, or open question with no named owner, no specific ask, and no date by which an answer is needed. Surfacing a problem without making it actionable is venting; the reader can't help.
- **positive:** "Blocked on the data-platform team for the new replica (owner: Priya). Need a go/no-go by Thu so we don't slip the May 22 launch."
- **negative:** "We're still blocked on the data side, which is making things hard."

### status-activity-not-outcome
- **name:** Activity instead of outcome
- **severity:** warning
- **description:** A bullet or paragraph reports what the team did (meetings held, reviews done, pairing sessions) without naming what changed as a result: decisions, ships, state transitions, numbers moved. If the reader can't tell whether the week mattered, the update is an activity log.
- **positive:** "Shipped the index migration to staging Wed; p99 read latency 180ms → 64ms on the canary."
- **negative:** "Spent the week on the index migration; lots of pairing and discussion with the platform team."

## References
- [Will Larson, *Sending weekly 5-15 updates*](https://lethain.com/weekly-updates/) · [Jason Fried, *What's in a Heartbeat?* (HEY World)](https://world.hey.com/jason/what-s-in-a-heartbeat-4fd72d0e) · [Pat Kua, *Level Up* (engineering leadership)](https://www.patkua.com/) · [GitLab Handbook, *Async communication*](https://handbook.gitlab.com/handbook/company/culture/all-remote/asynchronous/)
