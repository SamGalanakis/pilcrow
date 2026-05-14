---
name: pilcrow
description: Make your clanker your editor. A prose linter, a set of editor commands anchored in classical style guides (Strunk, Williams, Zinsser, Pinker, Orwell, King), and project commands for voice capture and drafting. Use when reviewing, polishing, drafting, or auditing markdown, HTML, or plain-text prose. AI-tell detection is one feature among many.
version: 0.11.1
user-invocable: true
argument-hint: "[{{command_hint}}] [paths...]"
allowed-tools:
  - Bash(pilcrow *)
  - Bash(npx pilcrow-ink *)
  - Bash(node *)
  - Bash(python *)
  - Bash(python3 *)
  - Bash(uv *)
  - Bash(afplay *)
  - Bash(mpv *)
  - Bash(mplayer *)
  - Bash(paplay *)
  - Bash(ffplay *)
  - Bash(start *)
  - Bash(git clone *)
  - Bash(gh api *)
license: MIT
---

# pilcrow ¶

Turn the LLM in your harness into the editor it should be. Deterministic checks for the patterns regex can pin down. LLM-judged ones for what regex can't. Editor commands anchored in classical style guides. Project commands that capture your voice and apply it to new drafts. Catches AI tells as one feature among many. Detection-only — the engine never edits.

## Setup

Before any editor or project command runs:

1. Load project context — `VOICE.md` and `PILCROW.md` if present.
2. Apply absolute writing bans (below) regardless of command.
3. Apply the genre-reflex check (below) as part of every command's interpretation.

### Context loading

Every editor or project command begins by loading shared context:

```bash
node {{scripts_path}}/load-context.mjs
```

The script returns JSON with `VOICE.md` (the writer's voice profile) and `PILCROW.md` (their personal anti-pattern catalog) if either exists at the project root, in `.pilcrow/`, or in `docs/`. Cache the result for the session; don't re-run within the same conversation.

If `VOICE.md` is absent, suggest `{{command_prefix}}pilcrow teach` once per session. Don't block the command; just nudge.

## Absolute writing bans

Match-and-refuse. These never ship, regardless of command, regardless of voice. Any command that surfaces these treats them as **ship-blockers**.

- **AI fossils.** "As an AI language model", "I cannot provide", "I do not have personal", "my training data", "my knowledge cutoff", "as of my last update".
- **Chat sign-offs leaked into prose.** "I hope this helps", "Let me know if you have any questions", "Feel free to ask", "Happy to provide more details", "Hope this finds you well".
- **Sycophant openers in standalone prose.** "Great question!", "Absolutely!", "Certainly,", "What a fantastic topic".
- **Citation artifacts.** `turn0search0`, `turn1view2`, `oaicite`, `oai_citation`, `contentReference`, `[+N]`.
- **Marketing-template hero rhythm.** Imperative fragment + tricolon expansion (`Ship faster. Build smarter. Scale forever.`) as the opener. Cannot be redeemed by content specificity.
- **Bullet bold-label monoculture.** A list where every item leads with `**Bold:**` followed by an explanation.

These appear in [reference/_ai-tell-catalog.md](reference/_ai-tell-catalog.md). They're surfaced here too because no command may skip them.

## Genre-reflex check

If a reader could guess your tone from your topic alone, you've fallen into the genre's stock voice. Rework until the topic doesn't determine the angle.

- **Observability postmortem** → wry-self-deprecating "we shipped Tuesday and the team learned a lot". Avoid.
- **AI essay** → wide-eyed future-tense, "imagine a world", "fundamentally reshaping". Avoid.
- **Fintech post** → confident-and-jargon-heavy, navy-and-gold register. Avoid.
- **Cache-rewrite postmortem** → "we noticed elevated p99 latency". Avoid the cliché framing; lead with what was surprising.

Every editor command applies this as part of its interpretation. A finding aligned with the genre cliché gets promoted in severity.

## Routing rules

Process the argument string `$ARG` (everything after `{{command_prefix}}pilcrow`) like this:

1. **`$ARG` is empty, or its first word is `help`, `?`, `-h`, or `--help`**: render the command table below and ask which subcommand the user wants. Don't run anything.
2. **First word is a CLI subcommand** (`audit`, `lint`, `critique`, `rules`, `skills`):
   - If a target/path follows, shell out: `pilcrow <subcommand> <rest>` via Bash.
   - If nothing follows AND no recent prose is in conversation, ask "what should I `<subcommand>`?". Do not shell out with no input.
   - If nothing follows BUT recent prose is in the conversation, pipe that text via `printf '%s' "..." | pilcrow <subcommand>` and report findings.
3. **First word is an editor or project command** (`polish`, `humanize`, `tighten`, `clarify`, `pace`, `lead`, `verify`, `aloud`, `argue`, `teach`, `document`, `extract`, `craft`):
   - Load shared context via `node {{scripts_path}}/load-context.mjs` (skip if already cached this session).
   - Load `reference/<command>.md` from this skill's directory.
   - Also load any cross-cutting reference files that command's playbook names (`reference/_*.md`).
   - Follow the playbook end-to-end. Each command defines its own procedure, rubric, and output shape.
   - Editor commands use `pilcrow lint <target>` and `pilcrow critique <target>` for input; the command interprets the findings through the loaded references.
   - Project commands (teach, document, extract, craft) also read or write project files (`VOICE.md`, `PILCROW.md`, `drafts/`). Follow the reference file's explicit gating; never write to disk without confirmation.
   - Do not produce raw audit output for an editor command — that's what `audit` is for. An editor command that returns the same shape as `audit` has failed.
4. **First word doesn't match anything** — disambiguate by content:
   - If `$ARG` resolves to an existing path on disk: treat as a path and run `pilcrow audit $ARG`.
   - Otherwise: treat the entire `$ARG` as prose and pipe it: `printf '%s' "$ARG" | pilcrow audit`.
5. **Typos**: if the first word looks like a misspelled command (≤2 char edit distance), confirm before running.

Subcommands map 1:1 to the CLI binary. Pass flags through verbatim (`--ignore-quoted`, `--json`, `--rules=id,id`, `--all`, `--provider=.x`).

## Commands

### Utility (run the engine)

| Command | What it does | Common flags |
|---|---|---|
| `audit [paths...]` | Run the 49-rule deterministic catalog, human-readable | `--ignore-quoted` |
| `lint [paths...]` | Same scan, JSON output for piping | `--ignore-quoted` |
| `critique [path]` | Print an LLM-critique prompt for 20 higher-level rules regex can't catch | `--rules=id,id` |
| `rules` | List every rule with id, severity, description | `--json` |
| `skills <install\|update\|check>` | Install or refresh the skill in `.claude/`, `.cursor/`, etc. | `--all`, `--provider=.x` |

### Editor (interpret findings through a tradition)

| Command | Anchor | What it does | Reference |
|---|---|---|---|
| `polish` | Strunk & White, Zinsser | Final pre-ship pass: triages combined audit + critique findings into ship-blockers, worth-fixing, taste-calls | [reference/polish.md](reference/polish.md) |
| `humanize` | Wikipedia *Signs of AI writing* | Strip AI tells while preserving voice; classifies findings into vocabulary, cadence, template, fossil | [reference/humanize.md](reference/humanize.md) |
| `tighten` | Williams *Style* | Cut zombie nouns and weak verbs; per-sentence rewrites with the buried action surfaced | [reference/tighten.md](reference/tighten.md) |
| `clarify` | Pinker *Sense of Style*, Orwell | Reduce reader's working-memory load; per-passage rewrites with mental-model commentary | [reference/clarify.md](reference/clarify.md) |
| `pace` | King *On Writing*, Strunk | Restore rhythm; cadence histogram, aural diagnostic, split/merge proposals | [reference/pace.md](reference/pace.md) |
| `lead` | Zinsser on leads | Sharpen the opening; finds the buried lede and proposes three alternative first sentences | [reference/lead.md](reference/lead.md) |
| `verify` | claim auditing tradition | Surface load-bearing claims; classify each as unsupported / vague / hedged / unchecked | [reference/verify.md](reference/verify.md) |
| `aloud` | aural reading tradition | Play the prose back via OpenAI TTS in an interactive session; gates on writer response | [reference/aloud.md](reference/aloud.md) |
| `argue` | Toulmin / IBIS / Argdown | Map the argument structure; pick the strongest counter; check whether the piece engages it | [reference/argue.md](reference/argue.md) |

### Project (read/write project files)

| Command | What it does | Reference |
|---|---|---|
| `teach` | Multi-round interview to capture the writer's voice; writes `VOICE.md` | [reference/teach.md](reference/teach.md) |
| `document` | Infer voice from existing prose in the repo; writes `VOICE.md` with citations and open questions | [reference/document.md](reference/document.md) |
| `extract` | Pull the writer's recurring moves from their corpus (phrases, cadences, structural habits, punctuation tics); writes `PILCROW.md` as a voice-signature catalog | [reference/extract.md](reference/extract.md) |
| `craft` | Method-aware end-to-end writing (outliner / discovery / iterative / model-drafter); shape → draft → critique → polish | [reference/craft.md](reference/craft.md) |

## Pin / unpin

Turn `{{command_prefix}}pilcrow polish` into `{{command_prefix}}polish` (and back). Useful for commands the writer repeats on every piece.

```bash
node {{scripts_path}}/pin.mjs pin polish
node {{scripts_path}}/pin.mjs unpin polish
```

The script writes a redirect skill into every harness directory where `pilcrow` is installed. Run `unpin` to remove. Pinned skills carry a marker comment, so `unpin` only deletes shortcuts it created — never user-owned skills with the same name.

## Cross-cutting references

These shared files live in `reference/` with a leading underscore. They are **not** commands; they are content loaded by multiple editor commands.

| File | Content | Loaded by |
|---|---|---|
| [reference/_style-laws.md](reference/_style-laws.md) | Universal writing laws | every editor command |
| [reference/_ai-tell-catalog.md](reference/_ai-tell-catalog.md) | Exhaustive AI-tell catalog by class | humanize, polish |
| [reference/_readers.md](reference/_readers.md) | Reader personas | clarify, lead, polish |
| [reference/_cadence-theory.md](reference/_cadence-theory.md) | King + Strunk on rhythm | pace, polish |
| [reference/_genres.md](reference/_genres.md) | Genre conventions | clarify, lead, document, craft |

Commands that need a cross-cutting file say so explicitly in their own reference; don't load every shared file by default.

## External skill dependencies

`aloud` depends on the [OpenAI speech skill](https://github.com/openai/skills/tree/main/skills/.curated/speech) (Apache 2.0) for TTS. The helper script resolves it for you:

```bash
node {{scripts_path}}/resolve-speech.mjs
```

It checks `.claude/skills/speech/`, `.cursor/skills/speech/`, etc. for an installed copy; if none, it fetches the skill at a pinned SHA into `/tmp/pilcrow/skills/speech/`. Either path returns the directory where `scripts/text_to_speech.py` lives.

`aloud` requires `OPENAI_API_KEY` to be set in the environment. The command checks for it at session start and points you at the speech skill's instructions if it's missing.

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

The engine never modifies prose. When a command proposes rewrites, present them to the user and wait for confirmation before editing the file — voice and intent override the rule.
