---
name: pilcrow
description: Detect AI tells and writing-quality issues in prose. Use when reviewing, polishing, or auditing markdown / prose files. Wraps the `pilcrow` CLI for invocation from inside an AI harness.
version: 0.4.0
---

# pilcrow ¶

A prose linter that flags AI tells and writing-quality issues. 49 deterministic rules plus 19 LLM-judged ones. Detection-only — the engine never edits.

## When to use this skill

Invoke when the user asks to:
- audit / lint / review prose for AI tells
- polish or tighten a draft
- critique an essay, blog post, README, or marketing copy
- check writing for things like AI phrasebank phrases, em-dash overuse, throat-clearing openers, the antithesis cadence, hero-tagline cadence

## Commands

Each command shells out to the bundled CLI. The binary is `pilcrow`.
Install via `npm install -g pilcrow`, or use `npx pilcrow`.

| Command | What it does |
|---|---|
| `pilcrow audit [paths...]` | Run the deterministic catalog (49 rules), human-readable output |
| `pilcrow lint [paths...]` | Same scan, JSON output. Pipe into another tool or back to me. |
| `pilcrow critique [path]` | Print an LLM-critique prompt for 19 higher-level patterns regex can't catch |
| `pilcrow rules [--json]` | List every rule with id, severity, description |

Stdin works when no path is given.

## How I use this

1. Run `pilcrow audit <file>` and read the findings.
2. For higher-level critique (buried lede, voice drift, mixed metaphor, marketing-template cadence, stakes inflation, listicle-in-prose, …) run `pilcrow critique <file>` to get the prompt, then evaluate the prose against it.
3. Suggest edits. Re-run audit after.

## What it catches

Deterministic rules split into four jobs:

- AI-vocabulary and phrasebank: `ai-tell-phrasebank`, `overused-words`, `antithesis-cadence`, `throat-clearing-openers`, `cliche-closers`, `meta-discourse`, `copula-dodge`, `corporate-cliche`, `cliche-list`, `wordy-phrases`, `redundant-pairs`, `weasel-hedges`, `vague-quantifiers`
- AI fossils (delete on sight): `signoff-chatbot`, `sycophant-opener`, `disclaimer-tail`, `citation-artifact`
- Density and cadence: `em-dash-density`, `adverb-density`, `nominalization-density`, `boosters`, `passive-voice`, `pronoun-density-low`, `parenthetical-aside-density`, `inline-bold-emphasis`, `sentence-length-monotony`, `sentence-too-long`, `paragraph-monotony`, `parallel-triplet-density`, `transition-stacking`, `repeated-words-window`, `noun-stacking`, `anaphora-cadence`, `fragment-cadence`, `hero-tagline-imperative`, `from-x-to-y`, `present-participle-tail`
- Consistency and weak constructions: `dash-style-inconsistency`, `quote-style-inconsistency`, `oxford-comma-inconsistency`, `there-is-there-are`, `expletives`, `negation-of-negation`, `pronoun-it-vague`
- Markdown shape: `bullet-bold-lead`, `title-case-headers`, `colon-headline`, `decorative-emoji`, `false-precision-headline`

LLM-judged rules — semantic and rhetorical judgments regex can't make:
`buried-lede`, `voice-consistency`, `mixed-metaphor`, `claim-without-support`, `missing-stakes`, `distinctive-vs-generic`, `abstract-without-concrete`, `showing-vs-telling`, `transition-coherence`, `register-mismatch`, `excessive-balance`, `redundant-thesis`, `marketing-template-cadence`, `sycophantic-tone`, `stakes-inflation`, `false-reframe`, `invented-concept-label`, `listicle-disguise`, `one-point-dilution`.

For the complete catalog, run `pilcrow rules` or visit the docs.

## Output shape (for LLM piping)

`pilcrow lint` returns JSON like:

```json
{
  "files": [
    {
      "file": "drafts/post.md",
      "findings": [
        {
          "ruleId": "ai-tell-phrasebank",
          "ruleName": "AI-tell phrasebank",
          "severity": "error",
          "message": "AI phrasebank match: \"delve into\". Rewrite with concrete specifics.",
          "line": 12,
          "column": 8,
          "range": { "start": 234, "end": 244 },
          "excerpt": "…me delve into the rich tapestry…",
          "suggestion": "(optional replacement text)"
        }
      ]
    }
  ]
}
```

`pilcrow critique` emits a single prompt the model evaluates; the model returns findings in the same `Finding` shape.

## Don't auto-apply suggestions

The `suggestion` field is informational. The engine never modifies prose. When fixing a finding, propose a rewrite to the user and wait for confirmation before editing the file — voice and intent override the rule.
