---
slug: notification
parent: microcopy
description: Push, toast, banner; interrupting messages.
aloud_default: false
---

# notification

An unrequested message that interrupts the user: push, toast, banner, badge. The reader is in the middle of something else; the notification gets one glance and one decision (tap, dismiss, mute). Every notification is auditioning for its right to fire next time; fail to be worth the interruption and the user mutes the channel.

## Demands
- the notification names a specific event with the noun a human would use (`Maya replied to your PR`, `Build #482 failed: linter`, `Ride 4 min away`); not the system's name for the event
- the user can act on the consequence from the surface (open the conversation, retry the build, watch the car approach), or the notification shouldn't fire
- timing is part of the copy: if the notification is time-sensitive, it says when (`Order arriving in 12 min`); if not, it shouldn't have fired urgently
- character budget respected: title ≤ 25 chars, body ≤ 65 chars for the lock-screen-truncation surface

## Forbids
- "You have a new notification" / "New activity" / "Something happened": the generic stand-in for the specific event the system actually knows
- urgency inflation on routine updates (`URGENT: your weekly digest is ready`): the boy-who-cried-wolf failure; once it fires, the channel is dead
- marketing register on transactional notifications (`Get ready to fall in love with your new dashboard!`); wrong surface for the brand voice

## Tolerates
- truncation glyphs and clipped sentences when the surface enforces the limit; better truncated specific than full-length generic
- a deliberately quiet, dry tone for high-volume notifications (CI, monitoring, queue items); the user reads dozens, voice is friction
- emoji *when* it does work the words can't (a status glyph at the start: `✅ Deploy succeeded`, `⚠ Build failed`); never as decoration

## Common AI tells
- the chirpy nudge (`Hey there! Don't forget to check your dashboard 👋`): re-engagement template imported to a notification surface
- the generic-event title (`Update available`) where the specific event (`v0.15.0 released: security fix`) is known to the sender
- the dual-clause "engagement" body that doubles length to halve clarity (`Maya replied! Tap to see what she said.`); the second clause is throat-clearing

## LLM lint additions

### notification-no-stake
- **name:** Notification with no consequence
- **severity:** warning
- **description:** Notification fires with no event the user can act on: generic activity ping (`New activity`, `Something happened`, `Update available`) instead of the specific noun-and-verb the system actually knows. The user cannot decide whether to tap.
- **positive:** "Maya replied: 'looks good, merging Monday'"
- **negative:** "You have new activity in your workspace."

### notification-urgency-inflation
- **name:** Urgency inflation
- **severity:** warning
- **description:** Routine or low-stakes notification borrows urgent-channel language (`URGENT`, `ACTION REQUIRED`, `Don't miss out!`, capitalized priority words, exclamation points on transactional events). The channel's signal-to-noise collapses; the next real urgent message gets dismissed too.
- **positive:** "Weekly digest: 3 PRs need review"
- **negative:** "URGENT: Your weekly digest is ready! Don't miss out!"

## References
- [Apple HIG, *Managing notifications*](https://developer.apple.com/design/human-interface-guidelines/managing-notifications) · [Material Design, *Notifications*](https://m3.material.io/styles/notifications) · [Phiture, *Mobile Growth Stack*](https://phiture.com/mobilegrowthstack/) · [Nielsen Norman Group, *Push Notifications*](https://www.nngroup.com/articles/push-notification/)
