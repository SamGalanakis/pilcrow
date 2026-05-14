# _ai-tell-catalog — shared

Exhaustive catalog of AI tells in prose. Loaded by `humanize` and `polish`. Drawn from Wikipedia *Signs of AI writing*, GPTZero's phrase corpus, our own 49+19 rule catalog, and contemporary write-ups on AI slop.

Organize tells by **class**, not by severity. Class determines the rewrite shape.

---

## Class 1 — vocabulary

Single words and short phrases an LLM reaches for because they're high-probability in training data. Fix: swap for a plain word.

**Phrasebank.** `delve into`, `dive into`, `navigate the complexities`, `navigate the landscape`, `in the realm of`, `rich tapestry`, `intricate dance`, `vibrant tapestry`, `at the heart of`, `treasure trove`, `stands as a testament`, `plays a crucial role`, `ever-evolving`, `ever-changing`, `multifaceted`, `paramount importance`, `valuable insights`, `indelible mark`, `setting the stage`, `imagine a world`, `look no further`, `at its core`, `in essence`.

**Time-and-place setups.** `In today's fast-paced world`, `In today's digital age`, `In the ever-evolving landscape`, `As technology continues to evolve`, `In an era of`.

**Overused single words.** `transformative`, `groundbreaking`, `revolutionary`, `unleash`, `harness`, `elevate`, `demystify`, `myriad`, `plethora`, `seamless`, `cutting-edge`, `scalable`, `underscore`, `foster`, `ignite`, `empower`, `vibrant`, `beacon`, `symphony`, `showcase`, `boast`, `meticulous`, `nuanced`, `enduring`, `bolster`, `streamline`, `encompass`, `robust`, `pivotal`, `vital`, `crucial`, `realm`, `paradigm`, `landscape`, `tapestry`, `endeavor`, `labyrinth`, `kaleidoscope`.

Single hits are fine. Multiple hits in a short piece form an accent. The command reports density, not isolated matches.

---

## Class 2 — cadence

Rhythms the model produces when it reaches for stock structure. Fix: break the run.

**Antithesis cadence.** `Not just X, but Y`. `It's not X, it's Y`. `X isn't just a Y — it's a Z`. `More than just X, it's Y`. `X goes beyond Y`. One instance is rhetoric; three in a piece is a fingerprint.

**Hero-tagline imperative.** Three or more short imperative sentences in a row: `Ship faster. Build smarter. Scale forever.` The signature SaaS-marketing rhythm.

**Parallel-triplet density.** `A, B, and C` constructions used as the dominant rhythm — every paragraph has one.

**Anaphora.** Three or more consecutive sentences opening with the same content word.

**From-X-to-Y sweep.** `From healthcare to finance, every industry is being reshaped.` Manufactures survey-of-the-field tone.

**Present-participle tail.** Sentences ending in `, highlighting the importance of X.` / `, demonstrating the value of Y.` / `, underscoring the need for Z.` Tacks on faux-analysis.

**Transition stacking.** `Moreover, … Furthermore, … Additionally, …` or the enumerated form `First, … Second, … Finally, …` in three consecutive sentences.

**Fragment cadence.** Three or more short single-sentence paragraphs in a row. The punchy-marketing rhythm.

---

## Class 3 — template

Whole-passage shapes. Fix: restructure.

**Marketing-template cadence.** Imperative fragment + tricolon expansion: `Mark up prose before it ships. A skill, a CLI, and forty-four rules for catching AI tells.` Cannot be rescued by content specificity — the template is the tell.

**Bullet bold-label.** Bullet lists where most items lead with `**Bold:**` followed by an explanation. AI-assistant markdown signature.

**Listicle in prose.** Five paragraphs each starting "The first / second / third thing is…" — a numbered list flowed into prose without the numbers.

**Colon headline.** Most headings shaped `Topic: Descriptor`. `Caching: A Modern Approach` repeated as the doc's section style.

**Faux-precision headline.** `5 Reasons Your Team Needs This`. `10x Faster Builds`. Listicle clickbait.

**Decorative emoji.** Emoji at the start of headings or bullets (🚀 ✨ 💡 🎯 📌). AI-marketing tic.

**Redundant thesis.** Opening and closing restate the same line in different words.

**False reframe.** The antithesis move performed without semantic content: `This isn't just about efficiency. It's about transformation.` (Y is a paraphrase of X.)

---

## Class 4 — fossil (always delete)

Verbatim output that should never appear in publishable prose. No rewrite — delete.

**Disclaimer fossils.** `As an AI language model`, `I cannot provide`, `I do not have personal experience`, `my training data`, `my knowledge cutoff`.

**Chat sign-offs.** `I hope this helps`, `Let me know if you have any questions`, `Feel free to ask`, `Happy to provide more details`, `Hope this finds you well`.

**Sycophant openers.** `Great question!`, `Absolutely!`, `Certainly,`, `What a fantastic topic`, `Wonderful question`.

**Citation artifacts.** `turn0search0`, `turn1view2`, `oaicite`, `oai_citation`, `contentReference`, `[+1]`, `attached_file`, `grok_card`.

**Meta-discourse leaked into prose.** `Let me break this down`, `Let me walk you through`, `Before we dive in`, `Without further ado`, `This article will explore`.

---

## How editor commands use this catalog

- `humanize` reads this file end-to-end. Its job is classifying every finding into one of the four classes, then proposing rewrites accordingly: vocabulary → swap, cadence → break the run, template → restructure, fossil → delete.
- `polish` reads it to populate the **Ship-blockers** bucket. Class 4 (fossils) is always a ship-blocker. Class 3 (template) in the opener or closer is a ship-blocker. Classes 1–2 in moderation are worth-fixing.
- Other editor commands (`tighten`, `clarify`, `pace`, `lead`) reference it only when a finding overlaps. Most don't need it.

---

## Per-class severity defaults

These are baselines; actual severity in any piece is contextual.

| Class | Default in a polished piece | In a draft |
|---|---|---|
| 1. Vocabulary | `info` per hit, `warning` if ≥3 across a paragraph | `info` |
| 2. Cadence | `warning` (the rule itself fires on density) | `warning` |
| 3. Template | `warning`, `error` if the template *is* the opener or closer | `warning` |
| 4. Fossil | `error` always | `error` |
