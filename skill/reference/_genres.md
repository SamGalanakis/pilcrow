# _genres — shared

Genre conventions. Loaded by `clarify`, `lead`, `document`, and `craft`. Different genres reward different prose; a finding that's a ship-blocker in a report is fine in fiction.

`VOICE.md`'s `genre` field names which set of conventions apply. If unset, default to **essay** — the most common pilcrow use case.

---

## essay

Personal-or-argumentative prose. Has a thesis the writer believes. The reader gives the piece 4–12 minutes.

**Demands:** distinctive voice; a real claim, not a survey; a lede that earns the next paragraph; a close that doesn't restate the opening; concrete examples grounding every abstraction.

**Forbids:** sycophant openers, throat-clearing setup, marketing-template cadence, listicle-disguise structure.

**Tolerates:** longer sentences, deliberate fragments, em-dashes as voice, parenthetical asides if intentional, the writer breaking their own rules on purpose.

**Common AI tells in this genre:** stakes inflation ("this will fundamentally reshape…"), invented-concept labels ("The Engagement Doom Loop"), redundant thesis between opening and close.

---

## explainer

Teaches a concept. Reader is non-expert in this specific topic and wants to leave understanding it.

**Demands:** definitions on first use of terms; concrete examples after every abstract claim; a clear arc (`here's the puzzle → here's how it works → here's the takeaway`); transitions that connect paragraphs causally.

**Forbids:** assuming prior knowledge silently; nominalization chains (zombie nouns); jargon as if it were plain English; sentence-length monotony.

**Tolerates:** numbered lists, headings, deliberate repetition for emphasis.

**Common AI tells:** abstract-without-concrete, noun-stacking, transition-stacking ("Moreover…Furthermore…"), the "imagine for a moment" opener.

---

## report

Reports an outcome, a postmortem, a status, a finding. Audience is colleagues or stakeholders. The news is the news.

**Demands:** lede that names the outcome in the first sentence; specific numbers and named people; structure (often headed sections: context / what happened / why / what we changed); honest assessment of stakes.

**Forbids:** weasel hedges on facts; buried lede; sycophant tone toward stakeholders; faux-precision headlines; marketing register.

**Tolerates:** tables, bulleted findings (if not bullet-bold-lead), formal register, technical vocabulary.

**Common AI tells:** copula-dodge (`X serves as evidence`), passive-voice hiding the agent of a failure, vague attribution (`studies suggest`).

---

## marketing

Sells something. Knows it's selling. Reader is skeptical; tolerance is short.

**Demands:** specific benefit; named features; social proof when available; clear call-to-action.

**Forbids:** AI marketing rhythm (every form of it — imperative tricolon, bullet-bold-lead, faux-precision, decorative emoji); empty superlatives; stakes inflation.

**Tolerates:** confident tone, hero-line typography, short paragraphs.

**Common AI tells:** *all of them*. Marketing is the genre where AI tells cluster densest. The `humanize` command is the most-used command for this genre.

---

## memo

Internal communication, decision document, RFC, ADR. Audience is colleagues with context. Brevity is virtue.

**Demands:** the recommendation in the first sentence; the reasoning that supports it; the cost of the alternatives; clear next-steps.

**Forbids:** preamble; "before we begin"; meta-discourse; over-explaining shared context.

**Tolerates:** acronyms, jargon, dense paragraphs, structured headings.

**Common AI tells:** throat-clearing openers, abstract-without-concrete (memos can't afford this), meta-discourse ("this memo will explore"), false-reframe.

---

## fiction

Narrative prose. Different rules entirely. Pilcrow's deterministic catalog often fires on intentional craft.

**Demands:** consistent narrator, scene grounded in sensory specifics, dialogue that distinguishes speakers, pacing that varies by tension.

**Forbids:** the same AI tells (fossil class, sycophant tone, marketing rhythm) — those break narrative voice.

**Tolerates:** repetition for emphasis; deliberate sentence-length monotony in trance passages; em-dashes everywhere if voice; fragments freely; clichés if the narrator is the kind who uses them.

**Common AI tells in fiction:** stilted dialogue (every line is grammatical), copula-dodge in description (`The river served as a boundary`), absence of sensory specifics.

Editor commands run with caution. Many findings are voice; the `VOICE.md` `exceptions` field should be aggressive.

---

## How editor commands use this file

- `clarify` reads the relevant genre section before triaging findings. A long sentence in fiction is rarely a clarify finding; in a report, it is.
- `lead` consults the genre when proposing alternative openings — a memo lede is different from an essay lede.
- `document` uses these conventions when inferring `genre:` from existing prose.
- `craft` uses these as the brief context for the LLM during drafting.

If `VOICE.md` doesn't name a genre, the command infers from filename / directory: `posts/` and `essays/` → essay; `docs/` → explainer; `postmortems/` → report; `marketing/` and root-level landing pages → marketing.
