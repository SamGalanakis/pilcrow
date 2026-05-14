# lead

Sharpen the opening. The first sentence is the only sentence the reader has agreed to read; every following sentence has to earn the next one. If the lede is buried, throat-cleared, or sycophantic, nothing downstream matters — the reader has already left.

This lens looks only at the first 1–2 paragraphs and proposes three alternative openings the writer can choose between.

---

## Source

William Zinsser, *On Writing Well*, chapter on leads: "The most important sentence in any article is the first one. If it doesn't induce the reader to proceed to the second sentence, your article is dead."

Journalism's lede tradition — name the news first, then the context. The wire-service rule: someone reading only the first paragraph should know what happened.

David Ogilvy on headlines: "On the average, five times as many people read the headline as read the body copy."

---

## Procedure

1. Identify the **real lede**: the most surprising, consequential, or specific sentence in the first 3 paragraphs. It's rarely the actual first sentence in an AI draft.
2. Check the first 1–2 paragraphs against the AI-opener tells (below).
3. Propose **three rewrites** of the opening, each landing the real lede in sentence 1 or 2, with a different voice or angle.
4. Annotate each rewrite's trade-offs (what it commits to, what it gives up).

---

## What to prioritize

1. **`buried-lede`** (LLM) — the real news isn't in paragraph 1.
2. **`throat-clearing-openers`** — `It is important to note that`, `In today's fast-paced world`, `When it comes to`.
3. **`sycophant-opener`** — `Great question`, `Absolutely`, `Certainly`, `What a fantastic topic`.
4. **`meta-discourse`** at the opening — `This article will explore`, `In this post we'll discuss`.
5. **`hero-tagline-imperative`** if it's at the top — three imperative fragments don't make a lede.
6. **`copula-dodge`** in the first sentence — `X serves as a Y` is a tell that the writer didn't commit.
7. **`marketing-template-cadence`** (LLM) — imperative-plus-tricolon as the opener is the most flagged opening shape.

---

## The AI opener catalog

If the first sentence matches any of these, the opening needs work:

- **The Setup.** "In today's fast-paced world…" / "As technology evolves…" / "In the realm of …"
- **The Throat-clear.** "It is important to note that…" / "It's worth considering…" / "Before we begin…"
- **The Sycophant.** "Great question!" / "Absolutely." / "What a fascinating topic."
- **The Meta.** "This article explores…" / "In this post, we'll dive into…" / "Let's break this down."
- **The Hero Tagline.** "Ship faster. Build smarter. Scale forever." — imperative fragment + tricolon.
- **The Faux Personal.** "Picture this:" / "Imagine for a moment…" / "What if I told you…"
- **The Stakes Inflation.** "Everything you know about X is wrong." / "The world has changed forever." / "This will fundamentally reshape…"

None of these openers carry information. They warm up. Cut them.

---

## The lede-finder

Scan the first 3 paragraphs and pick the sentence with:
- **The most specific noun.** Names of products, people, places, numbers.
- **The most surprising verb.** Something happened — not "is" or "represents" or "serves as," but a verb that moved.
- **The clearest stake.** Why does this matter? Who acts differently because of it?

That's your lede. Move it to sentence 1.

Example diagnostic:

> **Original opening:** "In today's competitive landscape, businesses must constantly adapt to evolving customer expectations. Our team has been working on a cache rewrite for the past quarter, and we're excited to share what we learned. The work began in Q1 when we noticed elevated p99 latency on our checkout service."
>
> **Real lede:** "p99 latency dropped 42% after the cache rewrite."
> Buried in: paragraph 1, sentence 3 (partially).
> AI tells in current opener: "competitive landscape" (setup), "evolving customer expectations" (filler), "excited to share what we learned" (meta + sycophant).

---

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
- Each option keeps the same paragraph 2 as the current draft <or proposes a new paragraph 2 if the original was setup>.
- Choose A if the audience is technical/skeptical; B if the audience reads for voice; C if the audience needs convincing to read on.
```

Always propose **three** openings. One is not enough — the writer can't choose. Four is too many — decision fatigue. Three is the journalist's standard.

---

## Anti-patterns

- **Cutting context the reader needs.** Some pieces *require* a paragraph of setup before the news (technical posts that name the system before reporting on it). Don't reflexively delete paragraph 1 if it carries necessary context.
- **Promoting a clickbait verb.** "Shocking" and "incredible" and "unbelievable" are not lede verbs. They're crutches.
- **Inventing facts to lede with.** The proposed opening must quote or paraphrase facts already in the piece. If the piece's lede is "p99 latency dropped 42%," the original had to say so somewhere.
- **Identical three options.** If your three proposals differ only in word order, you've only written one. Each must commit to a different angle.
- **Leaving an obviously buried lede in a "stylistic taste-call."** A buried lede is a ship-blocker, not a taste question.

---

## Handoff

- If the writer picks an opening, propose to chain `/pilcrow polish <target>` to finalize.
- If all three proposals feel forced and no fact in the piece is interesting enough to lede with, the issue is the piece, not the opening. Flag: "The lede problem is downstream of a substance problem — what's the most surprising thing you actually learned?"
- If the piece is a deliberate slow build (a meditation, a reportage feature, a personal essay), respect that and propose two-sentence openings rather than wire-service ledes.
