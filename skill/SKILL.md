---
name: pilcrow
description: Detect AI tells and writing-quality issues in prose. Use when reviewing, polishing, or auditing markdown, HTML, or plain-text prose. Wraps the `pilcrow` CLI for invocation from inside an AI harness.
version: 0.5.2
user-invocable: true
argument-hint: "[audit|lint|critique|rules|skills] [paths...]"
allowed-tools:
  - Bash(pilcrow *)
  - Bash(npx pilcrow-ink *)
license: MIT
---

# pilcrow ¶

A prose linter that flags AI tells and writing-quality issues. 49 deterministic rules plus 19 LLM-judged ones. Detection-only — the engine never edits.

## Routing rules

Process the argument string `$ARG` (everything after `/pilcrow`) like this:

1. **`$ARG` is empty, or its first word is `help`, `?`, `-h`, or `--help`**: render the command table below and ask which subcommand the user wants. Don't run anything.
2. **First word of `$ARG` matches a subcommand** (`audit`, `lint`, `critique`, `rules`, `skills`):
   - If a target/path follows, shell out: `pilcrow <subcommand> <rest>` via Bash.
   - If nothing follows AND no recent prose is in conversation, ask "what should I `<subcommand>`? (a file path, a directory, or text I should pipe to stdin)". Do not shell out with no input.
   - If nothing follows BUT a recent draft/quote/paragraph is in the conversation, pipe that text via `printf '%s' "..." | pilcrow <subcommand>` and report findings.
3. **First word doesn't match any subcommand** — disambiguate by content:
   - If `$ARG` resolves to an existing path on disk (file or directory): treat as a path and run `pilcrow audit $ARG`.
   - Otherwise: treat the entire `$ARG` as prose and pipe it: `printf '%s' "$ARG" | pilcrow audit`.
4. **Typos**: if the first word looks like a misspelled subcommand (≤2 char edit distance), confirm the intended subcommand before running.

Subcommands map 1:1 to the CLI binary. Don't re-implement them inline; always shell out. Pass flags through verbatim (`--ignore-quoted`, `--json`, `--rules=id,id`, `--all`, `--provider=.x`).

## Commands

| Subcommand | What it does | Hint |
|---|---|---|
| `audit [paths...]` | Run the 49-rule deterministic catalog, human-readable | `--ignore-quoted` |
| `lint [paths...]` | Same scan, JSON output for piping | `--ignore-quoted` |
| `critique [path]` | Print an LLM-critique prompt for 19 higher-level rules regex can't catch | `--rules=id,id` |
| `rules` | List every rule with id, severity, description | `--json` |
| `skills <install\|update\|check>` | Install or refresh the skill in `.claude/`, `.cursor/`, etc. | `--all`, `--provider=.x` |

The CLI scans `.md`, `.mdx`, `.markdown`, `.txt`, `.html`, `.htm`. Stdin works when no path is given. `--ignore-quoted` masks content inside double quotes so prose discussing AI tells doesn't trigger its own rules.

Install once: `npm install -g pilcrow-ink` (the binary is `pilcrow`). Or use `npx pilcrow-ink ...`.

## How I use this

1. Run `pilcrow audit <file>` and read the findings.
2. For higher-level critique (buried lede, voice drift, marketing-template cadence, stakes inflation, listicle-in-prose, …) run `pilcrow critique <file>` to get the prompt, then evaluate the prose against it.
3. Propose edits. Re-run audit after.

## What audit catches

Deterministic rules in five families:

- **AI phrasebank**: `ai-tell-phrasebank`, `overused-words`, `antithesis-cadence`, `throat-clearing-openers`, `cliche-closers`, `meta-discourse`, `copula-dodge`, `corporate-cliche`, `cliche-list`, `wordy-phrases`, `redundant-pairs`, `weasel-hedges`, `vague-quantifiers`
- **AI fossils (delete on sight)**: `signoff-chatbot`, `sycophant-opener`, `disclaimer-tail`, `citation-artifact`
- **Density and cadence**: `em-dash-density`, `adverb-density`, `nominalization-density`, `boosters`, `passive-voice`, `pronoun-density-low`, `parenthetical-aside-density`, `inline-bold-emphasis`, `sentence-length-monotony`, `sentence-too-long`, `paragraph-monotony`, `parallel-triplet-density`, `transition-stacking`, `repeated-words-window`, `noun-stacking`, `anaphora-cadence`, `fragment-cadence`, `hero-tagline-imperative`, `from-x-to-y`, `present-participle-tail`
- **Consistency and weak constructions**: `dash-style-inconsistency`, `quote-style-inconsistency`, `oxford-comma-inconsistency`, `there-is-there-are`, `expletives`, `negation-of-negation`, `pronoun-it-vague`
- **Markdown shape**: `bullet-bold-lead`, `title-case-headers`, `colon-headline`, `decorative-emoji`, `false-precision-headline`

## What critique catches

LLM-judged rules — semantic and rhetorical judgments regex can't make:
`buried-lede`, `voice-consistency`, `mixed-metaphor`, `claim-without-support`, `missing-stakes`, `distinctive-vs-generic`, `abstract-without-concrete`, `showing-vs-telling`, `transition-coherence`, `register-mismatch`, `excessive-balance`, `redundant-thesis`, `marketing-template-cadence`, `sycophantic-tone`, `stakes-inflation`, `false-reframe`, `invented-concept-label`, `listicle-disguise`, `one-point-dilution`.

For the complete catalog with every phrase, run `pilcrow rules` or visit the docs.

## Output shape (for piping)

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
