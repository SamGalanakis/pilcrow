---
slug: ui-label
parent: microcopy
description: Buttons, form labels, menu items, tooltips.
aloud_default: false
---

# ui-label

The smallest unit of product copy: a button, a form field label, a menu item, a tooltip. The reader is mid-task; they are not reading prose, they are scanning for the verb that completes the action they came to do. Every word is competing with the user's existing mental model of "what should this button say?"

## Demands
- the label names the action from the user's point of view as a verb-object (`Save changes`, `Cancel subscription`, `Download invoice`); never a state, never a sentence
- form-field labels match the data the field collects (`Work email`, not `Please enter your email address below`); the label is the noun, not a request
- destructive actions named with the verb that matches the consequence (`Delete account`, `Discard draft`); never softened to `Continue` or `OK`
- consistent capitalization and tense across the surface: sentence case or title case, picked once, applied everywhere

## Forbids
- passive or stateful labels where an action is happening (`Page is loading…` instead of `Loading…`; `Your changes are being saved` instead of `Saving…`)
- the chirpy preamble (`Oops!`, `Let's get started!`, `Woo-hoo!`); corporate-cute is friction, not warmth
- ambiguous dual-action confirmations (`OK` / `Cancel` on "discard your draft?") where the destructive verb should be on the button

## Tolerates
- one-word commands where context is unambiguous (`Save`, `Send`, `Done`)
- "now" or other time words *if* they distinguish from a deferred option (`Apply now` vs `Apply later`); otherwise drop them per GOV.UK
- truncation glyphs (`…`) on labels that open a longer flow (`Move to…`, `Share with…`)

## Common AI tells
- the full-sentence button (`Click here to save your changes`): model defaulting to instruction prose where a verb belongs
- politeness inflation (`Please enter your email`, `Kindly confirm`): corporate-helpful tone imported to a label that should be a noun
- the "Let's" prefix on action labels (`Let's get started`, `Let's connect your account`): chat-assistant voice on a button

## LLM lint additions

### ui-label-passive-voice
- **name:** Passive or stateful label
- **severity:** warning
- **description:** A button, label, or status string describes a state instead of an action, or uses passive construction where the agent matters. The user reads more words to extract less information.
- **positive:** "Loading…" / "Saving changes" / "Delete account"
- **negative:** "Page is being loaded…" / "Your changes are now being saved" / "The account will be deleted"

### ui-label-preamble
- **name:** Label preamble
- **severity:** info
- **description:** Label opens with throat-clearing or politeness inflation (`Please`, `Kindly`, `Let's`, `Click here to`, `Tap to`) before the actual verb. The first words of the label do no work; the user's eye skips them anyway.
- **positive:** "Save changes" / "Connect account" / "Email address"
- **negative:** "Please save your changes" / "Let's connect your account" / "Click here to enter your email address"

## References
- [GOV.UK Service Manual, *Writing for user interfaces*](https://www.gov.uk/service-manual/design/writing-for-user-interfaces) · [Apple HIG, *Writing*](https://developer.apple.com/design/human-interface-guidelines/writing) · [Kinneret Yifrah, *Microcopy: The Complete Guide*](https://microcopybook.com) · [Slack API, *Voice and tone*](https://api.slack.com/start/designing/voice-tone)
