---
slug: changelog
parent: reportorial
description: Release notes. User-facing list of shipped changes.
aloud_default: false
---

# changelog

Reports a release to a user who wants to know whether to upgrade, what will break, and what they can now do that they couldn't before. The reader scans; the entry that doesn't tell them what changed for *them* is wasted ink.

## Demands
- each entry leads with the change in user-visible terms: what now works, what changed shape, what's gone (Keep a Changelog)
- breaking changes flagged in their own section or with an unmissable marker, before the "added" section; migration link or inline note attached
- a version header with an ISO date and a comparison link to the previous version; readers triangulate releases by date as often as by number
- semver-honest version numbers: a breaking change in a minor bump is a bug in the release, not a marketing choice

## Forbids
- the vague-improvement bullet (`improved performance`, `various fixes`, `general stability`); name what got faster, by how much, on what workload, or omit
- internal-only changes mixed into the user-facing list (`refactored the auth module`, `migrated CI to bazel`); these belong in a commits log, not the changelog
- the "and more!" closer; if the entry isn't worth naming, it isn't worth including

## Tolerates
- terse bullet fragments, parallel shape across an entire section; the form is a list and reads like one
- the same verb opening every bullet within a category (`Added`, `Added`, `Added`); that's the category, not anaphora
- code fences, command-line snippets, and exact path references as the body of an entry; readers came to copy-paste

## Common AI tells
- the marketing-register bullet (`We're excited to introduce…`); changelog is for users mid-upgrade, not the launch post
- parallel-shape filler that pads a small release into a long one: five bullets that each rephrase the same fix
- the speculative-future bullet (`lays the groundwork for upcoming X`) included as if it were shipped; if it doesn't work today, it isn't in this release

## LLM lint additions

### changelog-vague-improvement
- **name:** Vague-improvement bullet
- **severity:** warning
- **description:** An entry uses words like `improved`, `enhanced`, `optimized`, `better`, or `general fixes` without a measurable claim, a named subsystem, or a before/after the reader can verify. Either name the workload and the delta, name the bug fixed, or cut.
- **positive:** "Cold-start time for the CLI dropped from 480ms to 110ms on Node 22 (issue #1842)."
- **negative:** "Improved performance and general stability."

### changelog-feature-parade-density
- **name:** Feature-parade density
- **severity:** warning
- **description:** A release section stacks five or more bullets in identical parallel shape (`Added X.` / `Added Y.` / `Added Z.`) where most items are minor and the rhythm is doing the work of importance. The shape inflates a small release; collapse small items into a single line or move them under a subhead.
- **positive:** "Added: webhook retry on 5xx (configurable via `retry.max`). Other small additions: `--quiet` flag on `init`, ESM export for `pilcrow/rules`, prettier error on missing `VOICE.md`."
- **negative:** "Added a new feature. Added another new feature. Added a helpful new flag. Added improved error messaging. Added more polish to the CLI."

## References
- [*Keep a Changelog* 1.1.0](https://keepachangelog.com/en/1.1.0/) · [*Semantic Versioning* 2.0.0](https://semver.org/) · [Stripe API changelog](https://docs.stripe.com/changelog) · [Tailwind CSS CHANGELOG.md (tailwindlabs/tailwindcss)](https://github.com/tailwindlabs/tailwindcss/blob/main/CHANGELOG.md)
