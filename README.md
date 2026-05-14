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

Five engine commands:

```
pilcrow audit [paths...] [--ignore-quoted]   Human-readable findings (default)
pilcrow lint  [paths...] [--ignore-quoted]   JSON output for LLM consumption
pilcrow critique [path]                      Print the LLM-critique prompt
pilcrow rules [--json]                       List all rules
pilcrow skills <subcommand>                  Install or update the skill in your AI harness
```

Reads stdin if no paths. Recurses directories, scanning `.md`, `.mdx`, `.markdown`, `.txt`, `.html`, `.htm`.

HTML support strips `<script>`, `<style>`, `<pre>`, and `<code>` content; decodes common entities; treats closing block tags as sentence breaks. Pass `--ignore-quoted` to skip phrases inside straight or curly double quotes — useful when prose discusses AI tells without quoting them in backticks.

## Lenses

Six interpretive lenses sit on top of the engine. Each loads its own reference file with a methodology drawn from a classical style guide. Lenses are invoked through the skill, not the CLI binary: `/pilcrow <lens> <target>` in any AI harness with the skill installed.

| Lens | Anchor | What it does |
|---|---|---|
| `polish` | Strunk & White, Zinsser | Final pre-ship pass; triages findings into ship-blockers, worth-fixing, taste-calls |
| `humanize` | Wikipedia *Signs of AI writing* | Strip AI tells while preserving voice; classifies findings into vocabulary, cadence, template, fossil |
| `tighten` | Williams *Style* | Cut zombie nouns and weak verbs; per-sentence rewrites with the buried action surfaced |
| `clarify` | Pinker *Sense of Style*, Orwell | Reduce reader's working-memory load; per-passage rewrites with mental-model commentary |
| `pace` | King *On Writing*, Strunk | Restore rhythm; cadence histogram plus split/merge proposals |
| `lead` | Zinsser on leads | Sharpen openings; finds the buried lede, proposes three alternative first sentences |
| `verify` | journalism fact-check tradition | Surface load-bearing claims; classify each as unsupported / vague / hedged / unchecked |
| `aloud` | aural reading tradition | Play the prose back via OpenAI TTS in an interactive session; gates on writer response |

A lens is not a rule filter — each defines its own procedure, rubric, and output. See `skill/reference/<lens>.md` for the playbooks.

## Project commands

Four commands act on the repo, not on a single passage. They capture the writer's voice so lens proposals sound like the writer.

| Command | What it does |
|---|---|
| `teach` | Multi-round interview to capture the writer's voice; writes `VOICE.md` |
| `document` | Infer voice from existing prose in the repo; writes `VOICE.md` with citations and open questions |
| `extract` | Mine the corpus for recurring AI tells and personal tics; writes `PILCROW.md` |
| `craft` | End-to-end essay writing with gates: shape → draft → critique → polish; respects `VOICE.md` and `PILCROW.md` |

Each writes to disk only after explicit confirmation. Once `VOICE.md` or `PILCROW.md` exist, every lens reads them on invocation and weights findings accordingly.

`teach` captures four axes the lenses use: **genre** (essay / explainer / report / marketing / memo / fiction), **audience** (a concrete reader, optionally mapped to one of the built-in personas), **stance** (claim / explain / persuade / narrate), and **method** (outliner / discovery / iterative / model-drafter). `craft` reads `method:` and runs one of four phase-2 variants — outliners get an outline-first draft, discovery writers get a free first pass, iterative writers get paragraph-by-paragraph gates, and model-drafter users get the model's draft as raw material to rewrite.

## Cross-cutting references

The skill's `reference/` folder also contains five underscore-prefixed files loaded by multiple commands:

| File | Content |
|---|---|
| `_style-laws.md` | Universal writing laws (voice trumps rule, propose-don't-edit, ship-blockers ≠ taste calls) |
| `_ai-tell-catalog.md` | Exhaustive AI-tell catalog organized by class (vocabulary, cadence, template, fossil) |
| `_readers.md` | Reader personas (skeptical engineer, busy executive, casual blog reader, fellow expert, undergraduate) |
| `_cadence-theory.md` | King and Strunk on rhythm: sentence-length variation, fragment use, parallel triplets in moderation |
| `_genres.md` | Per-genre conventions: what each demands, forbids, tolerates |

These aren't commands; they're content the lens references name explicitly when they need it.

## Pin / unpin

Turn `/pilcrow polish` into `/polish` (and back) for lenses you repeat on every piece:

```
node skill/scripts/pin.mjs pin polish
node skill/scripts/pin.mjs unpin polish
```

The script writes a redirect skill into every harness directory where pilcrow is installed. Pinned shortcuts carry a marker comment, so `unpin` only deletes shortcuts it created — never user-owned skills with the same name.

## aloud and TTS

`aloud` plays prose back to you via OpenAI TTS in an interactive session — walkthrough, full read, targeted (only the paragraphs `pace` flagged), or compare two passages. It depends on the [OpenAI speech skill](https://github.com/openai/skills/tree/main/skills/.curated/speech) (Apache 2.0).

Set up:

```
export OPENAI_API_KEY=...
# python3 + the openai package — install once
python3 -m pip install openai
```

The lens auto-resolves the speech skill — if it's installed in your harness (`.claude/skills/speech/`, `.cursor/skills/speech/`, etc.) it uses that; otherwise it fetches a pinned snapshot into `/tmp/pilcrow/skills/speech/`.

Audio is cached in `/tmp/pilcrow/aloud/<sha256>.mp3`. Replays across sessions are free. A 14-day mtime GC sweep runs on every `aloud` invocation. Per-piece voice and speed live in `VOICE.md` (`aloud-voice:`, `aloud-speed:`, `default-aloud-mode:`).

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

**20 LLM-judged** (surfaced as a prompt the model evaluates):
`buried-lede`, `voice-consistency`, `mixed-metaphor`, `claim-without-support`, `missing-stakes`, `distinctive-vs-generic`, `abstract-without-concrete`, `showing-vs-telling`, `transition-coherence`, `register-mismatch`, `excessive-balance`, `redundant-thesis`, `marketing-template-cadence`, `sycophantic-tone`, `stakes-inflation`, `false-reframe`, `invented-concept-label`, `listicle-disguise`, `one-point-dilution`, `unsupported-claim`.

Deterministic rules cover patterns regex can pin down with low false positives. LLM rules cover semantic and rhetorical judgments — was the move empty, were the stakes inflated, is the passage a list pretending to be prose.

## Fuzzy matching

Phrase rules tokenize and stem before comparing, so `delve` / `delves` / `delving` / `delved` all match one phrase entry. One inserted word is allowed between phrase tokens (`delve deeply into` matches `delve into`). Apostrophes are stripped (`Let's` matches `lets`).

## Layout

```
engine/   the rules engine: 49 deterministic + 20 LLM rules
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
