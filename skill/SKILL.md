---
name: pilcrow
description: Detect AI tells and writing-quality issues in prose. Use when reviewing, polishing, or auditing markdown, HTML, or plain-text prose. Wraps the `pilcrow` CLI plus six interpretive lenses (polish, humanize, tighten, clarify, pace, lead) and four project-level commands (teach, document, extract, craft).
version: 0.7.0
user-invocable: true
argument-hint: "[audit|lint|critique · polish|humanize|tighten|clarify|pace|lead · teach|document|extract|craft · rules|skills] [paths...]"
allowed-tools:
  - Bash(pilcrow *)
  - Bash(npx pilcrow-ink *)
license: MIT
---

# pilcrow ¶

A prose linter that flags AI tells and writing-quality issues. 49 deterministic rules plus 19 LLM-judged ones, plus six interpretive lenses anchored in classical style guides, plus four project-level commands for voice capture and drafting. Detection-only — the engine never edits.

## Routing rules

Process the argument string `$ARG` (everything after `/pilcrow`) like this:

1. **`$ARG` is empty, or its first word is `help`, `?`, `-h`, or `--help`**: render the command table below and ask which subcommand the user wants. Don't run anything.
2. **First word is a CLI subcommand** (`audit`, `lint`, `critique`, `rules`, `skills`):
   - If a target/path follows, shell out: `pilcrow <subcommand> <rest>` via Bash.
   - If nothing follows AND no recent prose is in conversation, ask "what should I `<subcommand>`? (a file path, a directory, or text I should pipe to stdin)". Do not shell out with no input.
   - If nothing follows BUT a recent draft/quote/paragraph is in the conversation, pipe that text via `printf '%s' "..." | pilcrow <subcommand>` and report findings.
3. **First word is a lens or project command** (`polish`, `humanize`, `tighten`, `clarify`, `pace`, `lead`, `teach`, `document`, `extract`, `craft`):
   - Load `reference/<command>.md` from this skill's directory.
   - Follow that file's playbook end-to-end. Each command defines its own procedure, rubric, and output shape.
   - Lenses use `pilcrow lint <target>` and `pilcrow critique <target>` for input; the lens interprets the findings.
   - Project commands (teach, document, extract, craft) also read or write project files (VOICE.md, PILCROW.md, drafts/). Follow the reference file's explicit gating; never write to disk without confirmation.
   - Do not produce raw audit output for a lens command — that's what `audit` is for. A lens that returns the same output as `audit` has failed.
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
| `critique [path]` | Print an LLM-critique prompt for 19 higher-level rules regex can't catch | `--rules=id,id` |
| `rules` | List every rule with id, severity, description | `--json` |
| `skills <install\|update\|check>` | Install or refresh the skill in `.claude/`, `.cursor/`, etc. | `--all`, `--provider=.x` |

### Lenses (interpret findings through a tradition)

Each lens loads its own reference file with a distinct methodology — not a rule filter. The output shape differs per lens.

| Lens | Anchor | What it does | Reference |
|---|---|---|---|
| `polish` | Strunk & White, Zinsser | Final pre-ship pass: bundles audit + critique, triages into ship-blockers, worth-fixing, taste-calls | [reference/polish.md](reference/polish.md) |
| `humanize` | Wikipedia *Signs of AI writing* | Strip AI tells while preserving voice; classifies findings into vocabulary, cadence, template, fossil | [reference/humanize.md](reference/humanize.md) |
| `tighten` | Williams *Style* | Cut zombie nouns and weak verbs; per-sentence rewrites with the buried action surfaced | [reference/tighten.md](reference/tighten.md) |
| `clarify` | Pinker *Sense of Style*, Orwell | Reduce reader's working-memory load; per-passage rewrites with mental-model commentary | [reference/clarify.md](reference/clarify.md) |
| `pace` | King *On Writing*, Strunk | Restore rhythm; emits a cadence histogram plus split/merge proposals | [reference/pace.md](reference/pace.md) |
| `lead` | Zinsser on leads | Sharpen openings; finds the buried lede and proposes three alternative first sentences | [reference/lead.md](reference/lead.md) |

### Project (read/write project files)

These commands act on the repo, not on a single passage. They establish or use voice context that the lenses then read on every invocation.

| Command | What it does | Reference |
|---|---|---|
| `teach` | Multi-round interview to capture the writer's voice; writes `VOICE.md` | [reference/teach.md](reference/teach.md) |
| `document` | Infer the writer's voice from existing prose in the repo; writes `VOICE.md` with citations and open questions | [reference/document.md](reference/document.md) |
| `extract` | Mine the writer's corpus for recurring AI tells and personal tics; writes `PILCROW.md` | [reference/extract.md](reference/extract.md) |
| `craft` | End-to-end essay writing with gates: shape → draft → critique → polish; respects `VOICE.md` and `PILCROW.md` if present | [reference/craft.md](reference/craft.md) |

Each project command writes to disk only after explicit confirmation. The flow is gated, not autonomous.

The CLI scans `.md`, `.mdx`, `.markdown`, `.txt`, `.html`, `.htm`. Stdin works when no path is given. `--ignore-quoted` masks content inside double quotes so prose discussing AI tells doesn't trigger its own rules.

Install once: `npm install -g pilcrow-ink` (the binary is `pilcrow`). Or use `npx pilcrow-ink ...`.

## How a lens works

The pattern is the same for every lens:

1. Load `reference/<lens>.md` for the playbook.
2. If `VOICE.md` exists at the project root, load it — rewrite proposals must respect the writer's register, signatures, and taboos.
3. If `PILCROW.md` exists at the project root, load it — recurring patterns in the writer's corpus get extra weight.
4. Run `pilcrow lint <target> --ignore-quoted` to get JSON findings.
5. For LLM-judged rules where the lens cares, also run `pilcrow critique <target>` and evaluate.
6. Apply the lens's interpretation rubric: which findings matter most under this lens, how to read them, what rewrite shape to propose.
7. Emit the lens-specific output shape (defined in each reference file).
8. Suggest the next lens if the playbook recommends a handoff.

A lens is the **how**; the engine is the **what**. Never skip the reference file — the rule subset is incidental; the methodology is the substance.

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

The `suggestion` field is informational. The engine never modifies prose. When a lens proposes rewrites, present them to the user and wait for confirmation before editing the file — voice and intent override the rule.
