---
slug: empty-state
parent: microcopy
description: Zero-data UI text; first-run, no-results.
aloud_default: false
---

# empty-state

The screen a user sees when there's nothing yet: a fresh inbox, an unwritten project, a search with no results. The reader is one of two people: a brand-new user who needs the first step named, or an experienced user whose query missed and who needs a path back to something useful. Either way, the screen is an onboarding moment disguised as a blank.

## Demands
- name the absence in one specific phrase (`No invoices yet`, `No results for "p99 latency"`); never just `Nothing here` or an illustrated shrug
- give one concrete next action with a button or link the reader can click immediately (`Create your first invoice`, `Clear filters`, `Import a CSV`)
- distinguish the *first-run* empty (the user hasn't done it yet) from the *no-results* empty (they did something, it returned nothing); the copy and the action differ
- if the action requires preconditions (connect an integration, invite a teammate), name them; never hand the user a button that opens another empty state

## Forbids
- decorative illustration with copy that explains the illustration (`Looks like your inbox is feeling lonely!`); fills space, does no work
- "Get started" or "Learn more" buttons that point at a marketing page when the user is already inside the product
- empty states that hide as zero-result tables (just headers, no message); that's not an empty state, that's a bug the design didn't catch

## Tolerates
- a single playful line of voice when the brand earns it (`No issues, quiet shift`); Slack's principle: jokes are fine when the user isn't blocked
- a short hint about what the populated state will look like (`Once you add a project, you'll see status, owner, and last update here`)
- a secondary link to docs *below* the primary action, never replacing it

## Common AI tells
- the upbeat-encouragement opener (`Welcome! Looks like you're just getting started.`): chat-assistant warmth where a specific action belongs
- empty-state-as-mission-statement: the blank screen explains what the *feature* is rather than what to do next
- "It's quiet in here" / "Crickets" / "Nothing to see here": the stock-empty-state cliché trio, all of them substitutes for naming the action

## LLM lint additions

### empty-state-no-action
- **name:** Empty state with no first action
- **severity:** error
- **description:** Empty-state copy describes the absence but offers no clickable next step, or the step is a generic `Learn more` that points away from the product. The user reads the screen and has nowhere to go.
- **positive:** "No invoices yet. **Create your first invoice**, or import from Stripe."
- **negative:** "It's quiet in here! You'll see invoices once they're created."

### empty-state-decoration-only
- **name:** Decorative empty state
- **severity:** warning
- **description:** Empty-state content is mostly a stock illustration plus a sentence that comments on the illustration or the blankness (`Crickets!`, `It's quiet here`). The copy does not name the absence specifically or supply a path forward.
- **positive:** "No results for 'p99 latency in March'. Try a shorter query or **clear the date filter**."
- **negative:** "🦗 Crickets! Looks like there's nothing here yet."

## References
- [Nielsen Norman Group, *Empty States in UX Design*](https://www.nngroup.com/articles/empty-state-interface-design/) · [GOV.UK Design System, *Empty states*](https://design-system.service.gov.uk/patterns/empty-pages/) · [Kinneret Yifrah, *Microcopy: The Complete Guide*](https://microcopybook.com) · [Cap Watkins on design writing](https://capwatkins.com)
