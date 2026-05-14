# pilcrow ¶

A prose linter that flags AI tells and writing-quality issues. Inspired by [impeccable.style](https://impeccable.style/), applied to writing.

Detection-only. Findings carry line, column, excerpt, and an optional suggestion. The engine never edits.

## Install

Global, recommended:

```
npm install -g pilcrow-ink
```

The package on npm is `pilcrow-ink`; the binary it installs is `pilcrow`.

Or per-project without installing:

```
npx pilcrow-ink audit drafts/
```

Add the skill to your AI harness (Claude Code, Cursor, Gemini CLI, Codex/Agents, OpenCode, Kiro, Pi, Qoder, Trae, GitHub Copilot):

```
cd your-project
pilcrow skills install            # auto-detects which harness dirs exist
pilcrow skills install --all      # install into every supported provider
pilcrow skills update             # re-sync after `npm update -g pilcrow-ink`
pilcrow skills check              # show installed vs package version
```

## CLI

```
pilcrow audit [paths...] [--ignore-quoted]   Human-readable findings (default)
pilcrow lint  [paths...] [--ignore-quoted]   JSON output for LLM consumption
pilcrow critique [path]                      Print the LLM-critique prompt
pilcrow rules [--json]                       List all rules
pilcrow skills <subcommand>                  Install or update the skill in your AI harness
```

Reads stdin if no paths. Recurses directories, scanning `.md`, `.mdx`, `.markdown`, `.txt`, `.html`, `.htm`.

HTML support strips `<script>`, `<style>`, `<pre>`, and `<code>` content; decodes common entities; treats closing block tags as sentence breaks. Pass `--ignore-quoted` to skip phrases inside straight or curly double quotes — useful when prose discusses AI tells without quoting them in backticks.

## Rules

**49 deterministic** (regex + fuzzy stem matching, no LLM):

| Group | Rules |
|---|---|
| AI phrasebank | `ai-tell-phrasebank`, `overused-words`, `antithesis-cadence`, `throat-clearing-openers`, `cliche-closers`, `meta-discourse`, `copula-dodge` |
| AI fossils | `signoff-chatbot`, `sycophant-opener`, `disclaimer-tail`, `citation-artifact` |
| Phrase | `corporate-cliche`, `cliche-list`, `wordy-phrases`, `redundant-pairs`, `weasel-hedges`, `vague-quantifiers` |
| Density | `em-dash-density`, `adverb-density`, `nominalization-density`, `boosters`, `passive-voice`, `pronoun-density-low`, `parenthetical-aside-density`, `inline-bold-emphasis` |
| Cadence | `sentence-length-monotony`, `sentence-too-long`, `paragraph-monotony`, `parallel-triplet-density`, `transition-stacking`, `repeated-words-window`, `noun-stacking`, `anaphora-cadence`, `fragment-cadence`, `hero-tagline-imperative`, `from-x-to-y`, `present-participle-tail` |
| Consistency | `dash-style-inconsistency`, `quote-style-inconsistency`, `oxford-comma-inconsistency` |
| Weak constructions | `there-is-there-are`, `expletives`, `negation-of-negation`, `pronoun-it-vague` |
| Markdown shape | `bullet-bold-lead`, `title-case-headers`, `colon-headline`, `decorative-emoji`, `false-precision-headline` |

**19 LLM-judged** (surfaced as a prompt the model evaluates):
`buried-lede`, `voice-consistency`, `mixed-metaphor`, `claim-without-support`, `missing-stakes`, `distinctive-vs-generic`, `abstract-without-concrete`, `showing-vs-telling`, `transition-coherence`, `register-mismatch`, `excessive-balance`, `redundant-thesis`, `marketing-template-cadence`, `sycophantic-tone`, `stakes-inflation`, `false-reframe`, `invented-concept-label`, `listicle-disguise`, `one-point-dilution`.

Deterministic rules cover patterns regex can pin down with low false positives. LLM rules cover semantic and rhetorical judgments — was the move empty, were the stakes inflated, is the passage a list pretending to be prose.

## Fuzzy matching

Phrase rules tokenize and stem before comparing, so `delve` / `delves` / `delving` / `delved` all match one phrase entry. One inserted word is allowed between phrase tokens (`delve deeply into` matches `delve into`). Apostrophes are stripped (`Let's` matches `lets`).

## Layout

```
engine/   the rules engine: 49 deterministic + 19 LLM rules
cli/      the pilcrow binary and the skills subcommand
skill/    the SKILL.md that pilcrow skills install copies into provider dirs
docs/     the GitHub Pages site
```

## Develop

```
npm install
npm run build
npm test
node cli/dist/index.js audit README.md
```

## Release

Trunk-based. Everything ships from `main`. To cut a release:

```
npm run release -- --bump patch --dry-run    # rehearse
npm run release -- --bump patch              # bump + tag + GitHub release
npm publish                                  # separate, manual
```

The script bumps `package.json`, syncs `skill/SKILL.md` and `docs/index.html`, commits, pushes, tags `v<version>`, and creates a GitHub release with auto-extracted commit notes. The Pages workflow redeploys `pilcrow.ink` from the bump commit. `npm publish` stays manual so npm credentials never leave your machine.

Use `--bump major|minor|patch` to bump in one step, or omit `--bump` if you already edited the version yourself.

## License

MIT — see [LICENSE](./LICENSE).
