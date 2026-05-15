# lead

Sharpen the opening. The first sentence is the only sentence the reader has agreed to read; every following sentence has to earn the next one. If the lede is buried, throat-cleared, or sycophantic, nothing downstream matters — the reader has already left.

This command looks only at the first 1–2 paragraphs and proposes three alternative openings the writer can choose between.

## Source

William Zinsser, *On Writing Well*, chapter on leads: "The most important sentence in any article is the first one. If it doesn't induce the reader to proceed to the second sentence, your article is dead."

Journalism's lede tradition — name the news first, then the context.

## Load before running

- [_readers.md](_readers.md) — different leads work for different audiences. Use the persona from `VOICE.md` `audience` if set.
- [_genres.md](_genres.md) — a memo lede differs from an essay lede differs from a fiction opening.

Universal laws, the proposal ritual, and the editor slop test (in the parent `SKILL.md`) apply by default. The three proposed openings are the canonical example of the proposal ritual — each must survive all four gates.

## Procedure

1. Identify the **real lede**: the most surprising, consequential, or specific sentence in the first 3 paragraphs. Rarely the actual first sentence in an AI draft.
2. Check the first 1–2 paragraphs against the AI-opener catalog (below).
3. Propose **three rewrites** of the opening, each landing the real lede in sentence 1 or 2, with a different voice or angle.
4. Annotate each rewrite's trade-offs (what it commits to, what it gives up).

## What to prioritize

1. `buried-lede` (LLM) — the real news isn't in paragraph 1.
2. `throat-clearing-openers` — `In today's fast-paced world`, `When it comes to`.
3. `sycophant-opener` — `Great question`, `Absolutely`.
4. `meta-discourse` at the opening — `This article will explore`.
5. `hero-tagline-imperative` at the top — three imperative fragments don't make a lede.
6. `copula-dodge` in the first sentence — `X serves as a Y` is a tell that the writer didn't commit.
7. `marketing-template-cadence` (LLM) — imperative-plus-tricolon as opener is the most-flagged opening shape.

## AI opener catalog

If the first sentence matches any of these, the opening needs work:

- **The Setup.** "In today's fast-paced world…" / "As technology evolves…" / "In the realm of…"
- **The Throat-clear.** "It is important to note that…" / "Before we begin…"
- **The Sycophant.** "Great question!" / "Absolutely." / "What a fascinating topic."
- **The Meta.** "This article explores…" / "In this post, we'll dive into…"
- **The Hero Tagline.** Three imperative fragments in a row.
- **The Faux Personal.** "Picture this:" / "Imagine for a moment…" / "What if I told you…"
- **The Stakes Inflation.** "Everything you know about X is wrong." / "This will fundamentally reshape…"

None carry information. They warm up. Cut them.

## Lede-finder

Scan the first 3 paragraphs for the sentence with:
- **The most specific noun.** Names of products, people, places, numbers.
- **The most surprising verb.** Something happened — not `is`, `represents`, `serves as`, but a verb that moved.
- **The clearest stake.** Why does this matter? Who acts differently because of it?

That's your lede. Move it to sentence 1.

## Output shape

```
# Lead report — <file>

## Current opening (lines L:1-L:N)
> <quote of the first 1-2 paragraphs verbatim>

## Diagnostic
- **Real lede:** "<the sentence that should open>" (currently buried at line L:M)
- **AI tells in current opener:** <list>
- **First-sentence verdict:** [reader will continue | reader will skim | reader will leave]

## Three proposed openings

### Option A — The news lede
> <opening that puts the most specific fact in sentence 1>

Commits to: <what>
Gives up: <what>

### Option B — The scene lede
> <opening that drops the reader into a moment>

Commits to: <what>
Gives up: <what>

### Option C — The stakes lede
> <opening that names what the reader gains or loses>

Commits to: <what>
Gives up: <what>

## Notes
- Choose A if the audience is technical/skeptical; B if the audience reads for voice; C if the audience needs convincing to read on.
```

Always propose **three** openings. One isn't enough. Four is too many. Three is the journalist's standard.

## Anti-patterns

- **Cutting context the reader needs.** Some pieces require a paragraph of setup before the news. Don't reflexively delete paragraph 1 if it carries necessary context.
- **Promoting a clickbait verb.** `Shocking`, `incredible`, `unbelievable` are crutches.
- **Inventing facts to lede with.** The proposed opening must quote or paraphrase facts already in the piece.
- **Three identical options.** If they differ only in word order, you've written one. Each must commit to a different angle.
- **Leaving a buried lede in "stylistic taste-call."** A buried lede is a ship-blocker, not taste.

If all three proposals feel forced and no fact in the piece is interesting enough to lede with, the issue is the piece, not the opening. Flag: "The lede problem is downstream of a substance problem — what's the most surprising thing you actually learned?"
