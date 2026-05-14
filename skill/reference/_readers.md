# _readers — shared

Concrete reader personas to evaluate prose against. Loaded by `clarify`, `lead`, and `polish`. When a finding asks "is this clear?", the test is: clear *to whom*?

Each persona names what they bring to the page, what trips them up, and what makes them quit.

---

## The skeptical engineer

**Brings:** Domain expertise. Has already seen three of these posts this month. Reads on a phone while waiting for a build.

**Trusts:** Specific numbers (`p99 latency dropped 42%`), named systems (`the staging Aurora replica`), named people (`the on-call eng`), code that compiles.

**Quits on:** Throat-clearing openers, abstract claims without a concrete example by paragraph 3, marketing template cadence, sycophant tone, anything that smells like "AI wrote this for me."

**Friction points:** sentences over 35 words; >2 nominalizations in a row; passive constructions where the agent matters; weasel hedges on technical claims.

**What they skim:** anything between the lede and the first concrete result.

---

## The busy executive

**Brings:** Time pressure. Reading 6 docs before a meeting. Wants the conclusion in the first paragraph.

**Trusts:** Confident assertions, ranked lists, headers that promise specific information.

**Quits on:** Buried ledes, "in this article we'll explore," any opening that doesn't land the news.

**Friction points:** Long paragraphs (≥80 words) without a topic sentence; transitions that don't link causally; abstract chains.

**What they skim:** Everything. They read the first sentence of each paragraph and decide whether to engage.

---

## The casual blog reader

**Brings:** Curiosity, no obligation, half-attention. Reading on a couch.

**Trusts:** Voice — does this writer sound like a person, or like a content engine? A clear angle. A specific moment that grounds the piece.

**Quits on:** Generic openings, listicle disguise, faux-precision headlines, prose that could have been written by anyone.

**Friction points:** Anaphora (boring), excessive parentheticals (try-hard), bullet-bold-lead lists in prose (corporate), too much "we" with no named person behind it.

**What they skim:** Anything that smells like SEO. They're often on the page by accident.

---

## The fellow expert

**Brings:** Knowledge close to the writer's. Reads to learn what's *new*, what's *contested*, or what the writer thinks about a specific recent thing.

**Trusts:** Specificity beyond the standard takes. Acknowledgement of counterarguments. Explicit confidence levels ("I'm 60% sure that…").

**Quits on:** Anything restated from a popular post. The marketing-template cadence (fellow experts can spot it instantly). Faux-novelty ("here's a counterintuitive take" that's the standard take).

**Friction points:** Vague attribution ("studies show"), abstract-without-concrete chains, claims without support, hand-waving on a claim where the technical detail is the interesting part.

**What they skim:** Background sections. They already know the setup.

---

## The undergraduate

**Brings:** Reading to learn. Not yet fluent in the field's jargon. Wants the topic explained, not defended.

**Trusts:** Definitions on first use of terms, examples that ground abstractions, a clear arc (here's what we're going to figure out → here's how → here's what we found).

**Quits on:** Long unbroken paragraphs of theory, jargon used as if it were plain English, sentence-length monotony.

**Friction points:** Nominalization chains (zombie nouns); noun-stacking; assumed prior knowledge.

**What they skim:** Footnotes, caveats, asides that take them off the main thread.

---

## How editor commands use personas

- `clarify` runs the passage against the persona named in `VOICE.md` (`audience` field). If multiple personas plausibly match, it runs against the most demanding one. The command reports working-memory load *from that persona's perspective*.
- `lead` uses personas to evaluate the opening: would the skeptical engineer click away here? Would the executive stop reading? The proposed alternative openings are tailored to who's actually reading.
- `polish` uses personas to rank ship-blockers vs. taste-calls: anything that would lose the named audience is a ship-blocker.

If `VOICE.md` has no `audience` field, default to the skeptical engineer — most pilcrow users write for technical readers.

---

## Persona-finding mapping

| If the persona is… | Most-weighted command findings |
|---|---|
| Skeptical engineer | `claim-without-support`, `abstract-without-concrete`, `marketing-template-cadence`, `weasel-hedges`, fossil class |
| Busy executive | `buried-lede`, `sentence-too-long`, `transition-coherence`, throat-clearing openers |
| Casual blog reader | `distinctive-vs-generic`, `parenthetical-aside-density`, vocabulary class, template class |
| Fellow expert | `redundant-thesis`, `one-point-dilution`, vague-attribution, template class |
| Undergraduate | `nominalization-density`, `noun-stacking`, `sentence-length-monotony`, abstract chains |
