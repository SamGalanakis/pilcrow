---
slug: readme
parent: overview
description: Project README: pitch + quickstart + signposts.
aloud_default: false
---

# readme

First contact with a project. Most readers arrive from a search result, a link in a thread, or a `gh` star feed; they want to know what this is, whether it solves their problem, and how to try it, in under 30 seconds. The README is a doorway, not a manual.

## Demands
- opening sentence answers "what is this" in plain noun-phrase form: `pilcrow is a prose linter for AI-tell detection.` Project name first, category second
- install or try-it command visible without scrolling: `npm install pilcrow` or a hosted demo link; if neither is possible, say why in one line
- one concrete example of input → output, not a feature list (Make a README)
- license and badge row at the top (license, build status, version), terse, no decorative emoji

## Forbids
- philosophy or origin story before the user knows what the project is (`In a world where developers struggle with…`)
- exhaustive feature lists with checkmarks before the example; feature tally is a pitch failure
- screenshots embedded at full width before the install command; they push the load-bearing content below the fold

## Tolerates
- marketing register *if* anchored to a specific claim: `42% faster cold start than Webpack` is fine; `blazingly fast` is not
- duplicated phrasing across name, tagline, and opening sentence; the reader skims and benefits from the repetition
- a "comparison with X" table when the project lives in a known category and the comparison is honest

## Common AI tells
- the marketing-hero opener: imperative tricolon (`Ship faster. Build smarter. Scale forever.`) used as the tagline; this is the canonical AI tell
- "✨ Features" headed by decorative emoji, every bullet leading with **Bold:** then a vague benefit phrase
- the "Why X?" section pitched at no specific competitor: generic-positive prose that names nothing the project actually does differently

## LLM lint additions

### readme-pitch-vague
- **name:** Vague pitch
- **severity:** error
- **description:** The opening sentence doesn't say what the project *is* in concrete terms. The reader should be able to extract `<project> is a <category> for <audience>` from sentence 1. Adjectives like "powerful", "modern", "next-generation" without a noun-phrase identity fail this rule.
- **positive:** "pilcrow is a prose linter that catches AI tells and style-guide violations in markdown."
- **negative:** "pilcrow is a powerful, modern toolkit for elevating your writing workflow."

### readme-quickstart-buried
- **name:** Buried quickstart
- **severity:** warning
- **description:** The install command, try-it link, or first runnable example is not visible in the first scroll (roughly the first 30 lines of rendered markdown, excluding the badge row). Readers bounce before scrolling; the quickstart is the conversion moment.
- **positive:** Badges → one-sentence pitch → `npm install pilcrow` → minimal example, all in the first scroll.
- **negative:** Badges → philosophy paragraph → feature list with 14 emoji bullets → "Why pilcrow" section → finally, in section 6, the install command.

## References
- [Make a README](https://www.makeareadme.com/) · [Singer, *awesome-readme*](https://github.com/matiassingers/awesome-readme) · [Sindre Sorhus, *awesome*](https://github.com/sindresorhus/awesome)
