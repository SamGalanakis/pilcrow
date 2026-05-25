---
slug: error-message
parent: microcopy
description: Failure-state UI text.
aloud_default: false
---

# error-message

A line of UI text that fires when the system can't do what the user asked. The reader is interrupted, often stressed, frequently confused; they need three things in order: what happened, why it's not their fault, and what to try next. Nothing else belongs on the screen.

## Demands
- first clause names the failure in plain language (`Card declined`, `Couldn't reach the server`); not the technology, not the validator
- the next clause names a recovery path the user can act on now (`Try a different card`, `Check your connection and retry`); if no path exists, the message says who's working on it and when to come back
- the system, not the user, owns the failure; describe the state of the system, not the user's mistake
- consistent grammar across messages on the same surface; pick `Couldn't…` or `Unable to…`, pick periods or no periods, hold the line

## Forbids
- blame words (`invalid`, `illegal`, `forbidden`, `you forgot`); GOV.UK's veto list, they re-trigger the stress the message should defuse
- apology fossils (`Sorry, something went wrong`, `Oops!`) without specific recovery; apology costs the user time and supplies nothing
- developer-language leakage (`Error 503: upstream connection refused`, `null is not an object`) on a user-facing surface

## Tolerates
- an error code or correlation ID *below* the human message, for the user to send to support; never *as* the message
- terse single-line messages with no recovery path *when* the failure is fully self-explanatory (`Wrong password`) and the surface offers an obvious retry
- the system-state opener even when the user did mis-type (`We couldn't find that email`); the goal is to keep the user moving, not to score correctness

## Common AI tells
- the chirpy-apology hybrid (`Oops! Looks like something went wrong on our end, we're so sorry!`): sycophantic-tone fossil compressed into 12 words
- generic catch-all (`Something went wrong. Please try again.`) where the actual failure is known and could be named
- the over-helpful explanation paragraph attached to a one-line error; error messages should not have second paragraphs

## LLM lint additions

### error-message-blame-user
- **name:** Blame-the-user framing
- **severity:** error
- **description:** Error message names what the user did wrong (`You entered an invalid email`, `You forgot to fill in a field`) instead of describing the system state and the recovery. Carries the GOV.UK veto words (`invalid`, `illegal`, `forbidden`, `you forgot`, `you must`).
- **positive:** "We couldn't recognize that email format; double-check for typos."
- **negative:** "You entered an invalid email address. Please correct it before proceeding."

### error-message-stack-trace-creep
- **name:** Developer-language leakage
- **severity:** error
- **description:** A user-facing error string surfaces internal language (status codes as the headline, exception class names, internal field IDs, system jargon like `null reference`, `upstream`, `gateway`, `deserialization`) instead of a human description of the failure.
- **positive:** "We couldn't reach the payment processor. Try again in a minute; we'll keep your cart."
- **negative:** "Error 502: upstream connection refused at /api/v2/checkout/session. Internal correlation ID: e7c2-…"

## References
- [Jakob Nielsen, *Error Message Guidelines*](https://www.nngroup.com/articles/error-message-guidelines/) · [GOV.UK Design System, *Error message*](https://design-system.service.gov.uk/components/error-message/) · [GitLab Handbook, *Error messages*](https://handbook.gitlab.com/handbook/product/ux/product-design/ux-guide/error-messages/) · [Kinneret Yifrah, *Microcopy*](https://microcopybook.com)
