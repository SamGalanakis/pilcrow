---
name: pilcrow
description: Make your clanker your editor. A prose linter, a set of editor commands anchored in classical style guides (Strunk, Williams, Zinsser, Pinker, Orwell, King), and project commands for voice capture and drafting. Use when reviewing, polishing, drafting, or auditing markdown, HTML, or plain-text prose. AI-tell detection is one feature among many.
version: 0.16.0
user-invocable: true
argument-hint: "[audit|lint|critique|rules|skills|polish|humanize|tighten|clarify|pace|lead|verify|aloud|argue|teach|document|craft] [paths...]"
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

Turn the LLM in your harness into the editor it should be. Deterministic checks for the patterns regex can pin down. LLM-judged ones for what regex can't. Editor commands anchored in classical style guides. Project commands that capture your voice and apply it to new drafts. Catches AI tells as one feature among many. Detection-only; the engine never edits.

## Setup

Before any editor or project command runs:

1. Load project context, including `VOICE.md` if present.
2. Apply absolute writing bans (below) regardless of command.
3. Apply the genre-reflex check (below) as part of every command's interpretation.

### Context loading

Every editor or project command begins by loading shared context:

```bash
node scripts/load-context.mjs
```

The script returns JSON with `VOICE.md` (the writer's voice profile) if it exists at the project root, in `.pilcrow/`, or in `docs/`. Cache the result for the session; don't re-run within the same conversation.

### Voice-aware vs voice-neutral commands

Not every command needs a voice profile. The split:

| Class | Commands | Behavior without `VOICE.md` |
|---|---|---|
| **Voice-aware** | `polish`, `humanize`, `tighten`, `clarify`, `craft` | Run, but flag voice-derived findings as "no profile; using nearby-paragraph fallback." Nudge `teach` once per session. |
| **Voice-neutral** | `audit`, `lint`, `critique`, `rules`, `skills`, `verify`, `argue`, `pace`, `lead`, `aloud` | Run as normal. Voice isn't load-bearing for these. |
| **Voice-producing** | `teach`, `document` | These create or refine `VOICE.md`. Don't suggest themselves. |

If a voice-aware command runs without `VOICE.md`, the nudge is single-line, once per session: "Running without VOICE.md; proposals will use nearby-paragraph fallback. `/pilcrow teach` to set up a voice profile." Don't repeat.

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

## Universal laws

Every editor and project command applies these without loading a reference. They override any single-rule finding.

1. **Voice trumps rule.** A rule firing on the writer's deliberate, repeated choice is not a finding; it's a category error. The em-dash density rule on a writer who uses em-dashes throughout is voice. Demote to `info` or skip; `VOICE.md` `exceptions` whitelists explicitly.
2. **Command output ≠ raw audit.** A command that returns the same shape as `pilcrow audit` has failed. Each command interprets; each has its own report structure defined in its reference file.
3. **Propose, don't edit.** Findings and rewrites are candidates. The writer (or an agent acting for them) decides. The engine never modifies prose.
4. **Match the writer's voice in rewrites.** Draw vocabulary and rhythm from adjacent paragraphs; contractions if they contract, long sentences if they run long, their recurring metaphor domain (sports, cooking, infrastructure). `VOICE.md` `signatures` names habits to preserve.
5. **Ship-blockers and taste-calls are different.** Some findings must be fixed before publish (AI fossils, citation artifacts, sycophant openers, buried lede). Some are reasonable taste a different writer would keep. Editor commands triage; they never treat all findings as critical.
6. **Severity follows context, not the rule's default.** An `info` rule can be a ship-blocker in aggregate (six `overused-words` hits in 400 words is a tell). An `error` rule can be a taste-call if `VOICE.md` whitelists it.
7. **Don't over-fix into invisibility.** Cutting every flagged adjective, varying every parallel triplet, smoothing every long sentence flattens the writing into editing-assistant output; its own AI tell. After rewrites, re-read; if texture is gone, propose fewer changes.
8. **The reader is the judge.** Every finding ultimately maps to: does this make the *reader's* job harder, or just the editor's preference different? Reader-impact wins.

## Editor reflexes to reject

These are the patterns the model reaches for when *playing editor*, not patterns in the writer's prose. They show up in proposed rewrites, in critique commentary, in "humanized" alternatives. They are the editor-side equivalent of the writer-side AI tells in the catalog. Match-and-refuse: if your top three rewrites or critique notes converge on any of these, list three more.

### Reflex rewrites

Stock LLM "improvement" cadences. None should appear in proposed rewrites.

- **`Here's the bottom line:` / `To put it simply,` / `In short,` / `The takeaway is:`** The model's idea of a sharper opener. Lands on the same one every time.
- **`Let me unpack this.` / `Let's dig in.` / `Cut to:`** The model's idea of an active verb.
- **`X, not Y.` as a closing sentence.** Antithesis-cadence imported from training data; tells the reader you wrote it with a model.
- **Imperative tricolon as rewrite.** `Ship faster. Build smarter. Scale forever.` Never the right rewrite, regardless of the original.
- **Em-dash drop.** Replacing the writer's em-dash with a comma or period "for cleanness." If they used the dash, they used the dash. Voice trumps polish.
- **The colon-summary.** Rewriting `X means Y` into `X: Y`. Looks tighter, reads telegraphic, loses cadence.
- **The "in other words" hedge.** Inserting `in other words,` before paraphrasing a sentence you've already given. Doubles the length to halve the trust.
- **Generic verbs as "stronger."** Swapping a flagged verb for `leverage`, `drive`, `enable`, `unlock`, `harness`. Not stronger, just the AI corporate-verb pool.

### Reflex critiques

Stock LLM "feedback" moves. None should appear in critique commentary.

- **`Consider tightening this for clarity.`** Name what specifically. Vague advice is editor-slop.
- **`You might consider…` / `It could be worth…`** Hedged suggestion when you have a position. Take a position, let the writer disagree.
- **`This is a great point, but…`** Sycophant opener for editor commentary. Cut the great-point.
- **`The piece would benefit from…`** Agentless passive; you're the agent. `Cut paragraph 3` beats `the piece would benefit from cutting paragraph 3.`
- **Generic-positive close.** `Strong piece overall; minor polish only.` The critique equivalent of "great post!" Doesn't carry information.
- **Scoring everything 3/4.** Picking the middle score out of charity hides the work the writer still has to do. If you can't say what a 4 would look like, the score is 2.

## The proposal ritual

Every editor command that proposes a rewrite or alternative opening follows this procedure. It forces the model to surface its default before acting on it.

1. **List your first three.** Without filtering, write down the three rewrites or openers you'd reach for given the original.
2. **Reject reflexes.** Cross-check each against [Editor reflexes to reject](#editor-reflexes-to-reject) above and the [Absolute writing bans](#absolute-writing-bans). Strike any that match.
3. **Cross-check genre.** Load the genre leaf at `reference/genres/<slug>.md` for genre-specific Demands / Forbids / Tolerates / Common AI tells (and `reference/_genres.md` for the parent-family "Cross-genre conventions"). Strike any proposal that falls into the genre's stock voice (postmortem → wry-self-deprecating; AI essay → wide-eyed future-tense; fintech → confident-and-jargon-heavy).
4. **Anchor in voice.** Find the writer's signature in adjacent paragraphs or in `VOICE.md` `signatures`. The proposal carries at least one element of that signature; vocabulary, rhythm, or recurring metaphor domain.
5. **Ship what survives.** If all three reflexes failed, repeat with a fourth, fifth, sixth until at least one option clears every gate.

If steps 1–4 strip every option, the problem is the piece, not the phrasing. Surface that explicitly: "No phrasing in genre-X-with-this-voice redeems this opener. The lede problem is downstream of a substance problem; what's the most surprising thing you actually learned?"

`lead` is the canonical example (propose three openings, each surviving the ritual). `tighten`, `clarify`, `humanize`, and `polish` apply the same procedure to per-sentence and per-passage rewrites.

## The editor slop test

After producing your report (rewrites, critique commentary, scorecard, anything), ask one question:

> If a reader saw this output and was told an LLM wrote it, would they believe it?

If yes, you've produced **editor-slop**: the writer-side AI tells imported to the editor side. The fingerprints transfer.

Symptoms:

- Critique commentary that hedges every suggestion (`you might consider`).
- Rewrites that all sound like the same voice (the model's voice, not the writer's).
- A scorecard that lands every dimension at 3/4 ("good enough across the board").
- A report that opens `Here's a thorough analysis of your draft:`. Meta-discourse opener imported to editorial work.
- Bullet-bold-lead in the report itself (`**Tightness:** The piece is reasonably tight.`).
- Closing summary that restates what was already triaged (`Overall, focus on lede and concision.`).

If the test fails, the fix is the same as for the prose: cut the hedges, take a position, name the specific change. The editor's voice has the same disciplines as the writer's.

## Routing rules

Process the argument string `$ARG` (everything after `/pilcrow`) like this:

1. **`$ARG` is empty (bare invocation)**: enter triage mode. Don't render the menu; don't shell out to `pilcrow` yet. Instead:
   - **Find the prose.** In priority order: a file the user has open or has read recently in the conversation, prose pasted directly into the conversation, a path or URL the user has named. If you can't identify a target with reasonable confidence, ask "what should I take a look at?". If the user has no target in mind, fall through to the `help` path below.
   - **Take stock.** Load shared context via `node scripts/load-context.mjs` (apply `VOICE.md` if present). Run `pilcrow lint <target>` for a deterministic baseline. Read enough of the prose to also notice things lint can't see: a buried lede, a flat opener, an argument with no counter, the wrong genre register, no stakes in the middle.
   - **Identify the genre.** Use `VOICE.md` `genre` if present, else infer from filename/path; see the full inference table in `reference/_genres.md`. Common patterns: `posts/`/`essays/` → essay, `docs/tutorials/` → tutorial, `docs/reference/` → reference-docs, `docs/how-to/` → how-to, `docs/explanation/` → explanation, `README.md` → readme, `postmortems/` → postmortem, `changelog.md` → changelog, `memos/`/`rfcs/` → memo, `marketing/landing/` → landing, `press/` → press-release, `about*.md` → about-page, `errors/` → error-message, `cv.md`/`resume.md` → cv, `tweets/`/`social/` → social-post, `decks/` → deck, `fiction/`/`stories/` → fiction. Genre is the strongest signal for which commands to suggest.
   - **Propose an ordered plan.** Pick 2–4 commands from the table below, in the order they should run. Give one line of rationale per step, anchored in what you actually noticed, not generic advice. Example: "`lead` → the hero is scope-before-claim and the real thesis is in paragraph 3; `tighten` → middle is heavy with copula-dodge and zombie nouns; `polish` → triage what remains."

   | Genre family | Leaf examples | Default sequence | Why this order |
   |---|---|---|---|
   | **argumentative/** | essay, op-ed, review | `lead` → `argue` → `tighten` → `polish` | Ledes carry argumentative prose; the argument is load-bearing; tighten before final triage. |
   | **reportorial/** | news, feature, postmortem, status-update, changelog | `lead` → `verify` → `tighten` → `polish` | The news is the news; claims must check; concision matters in stakeholder reading. |
   | **marketing/** | landing, product-copy, sales-email, press-release, about-page | `humanize` → `lead` → `polish` | This family is where AI tells cluster densest; strip the signature first. |
   | **documentation/** | tutorial, how-to, reference-docs, explanation | `clarify` → `tighten` → `polish` | Reader is non-expert; working-memory load and Diátaxis mode-discipline dominate. |
   | **overview/** | readme, project-home, one-pager | `humanize` → `lead` → `clarify` → `polish` | Doorway docs borrow marketing rhythm; strip first, then sharpen pitch and quickstart. |
   | **correspondence/** | memo, email, message | `lead` → `tighten` → `verify` | Recommendation in sentence 1; cut preamble; check load-bearing claims. |
   | **microcopy/** | ui-label, error-message, empty-state, notification | `clarify` → `tighten` → `polish` | Every word audited; voice helpful-not-chirpy; one idea per string. |
   | **social/** | social-post, social-thread | `lead` → `tighten` → `polish` | First 7 words decide; cut hooks that don't deliver. |
   | **personal/** | cv, cover-letter, bio | `tighten` → `verify` → `polish` | Terse; auditable claims; specifics over adjectives. |
   | **presentations/** | deck, speaker-notes | `clarify` → `tighten` → `polish` | One idea per slide; signage not paragraph. |
   | **narrative/** | fiction, memoir, script | `pace` → `humanize` (if AI tells dominate); else light hand | Many pilcrow rules fire on intentional craft here; tread carefully. |

   The defaults are a starting point. If `pilcrow lint` shows a different dominant problem (e.g., `buried-lede` in a memo, `claim-without-support` in an essay), promote that command earlier in the sequence.

   - **Gate on confirmation.** End with "run the first one?" and wait for approval before executing the sequence. The plan is a proposal; the writer can reorder, skip, or substitute.

2. **First word is `help`, `?`, `-h`, or `--help`**: render the command table below and ask which subcommand the user wants. Don't run anything.
3. **First word is a CLI subcommand** (`audit`, `lint`, `critique`, `rules`, `skills`):
   - If a target/path follows, shell out: `pilcrow <subcommand> <rest>` via Bash.
   - If nothing follows AND no recent prose is in conversation, ask "what should I `<subcommand>`?". Do not shell out with no input.
   - If nothing follows BUT recent prose is in the conversation, pipe that text via `printf '%s' "..." | pilcrow <subcommand>` and report findings.
4. **First word is an editor or project command** (`polish`, `humanize`, `tighten`, `clarify`, `pace`, `lead`, `verify`, `aloud`, `argue`, `teach`, `document`, `craft`):
   - Load shared context via `node scripts/load-context.mjs` (skip if already cached this session).
   - Load `reference/<command>.md` from this skill's directory.
   - Also load any cross-cutting reference files that command's playbook names (`reference/_*.md`).
   - **Identify the active genre and surface it.** Read `VOICE.md` `genre:` if present; otherwise infer from filename/path via the table in `reference/_genres.md`. If the genre was *inferred* (not authored in `VOICE.md`), tell the writer one line before proceeding (e.g., `Treating this as [<slug>], push back if wrong.`) and wait for confirmation. If they correct, use the corrected slug for everything downstream. Don't re-prompt within the same file in this session, and don't surface for `VOICE.md`-authoritative genres.
   - **Load the genre leaf.** Read `reference/genres/<slug>.md` for genre-specific Demands / Forbids / Tolerates / Common AI tells / LLM lint additions. These flow into the command's reasoning; proposal-ritual gates, finding triage, rewrite voice.
   - **Pass `--genre <slug>` to `critique`.** When shelling out to `pilcrow critique <target>`, pass `--genre <slug>` so genre-specific LLM rules merge into the prompt alongside the 22 base rules.
   - Follow the playbook end-to-end. Each command defines its own procedure, rubric, and output shape.
   - Editor commands use `pilcrow lint <target>` and `pilcrow critique <target> --genre <slug>` for input; the command interprets the findings through the loaded references.
   - Project commands (teach, document, craft) also read or write project files (`VOICE.md`, `drafts/`). Follow the reference file's explicit gating; never write to disk without confirmation.
   - Do not produce raw audit output for an editor command; that's what `audit` is for. An editor command that returns the same shape as `audit` has failed.
5. **First word doesn't match anything**: disambiguate by content:
   - If `$ARG` resolves to an existing path on disk: treat as a path and run `pilcrow audit $ARG`.
   - Otherwise: treat the entire `$ARG` as prose and pipe it: `printf '%s' "$ARG" | pilcrow audit`.
6. **Typos**: if the first word looks like a misspelled command (≤2 char edit distance), confirm before running.

Subcommands map 1:1 to the CLI binary. Pass flags through verbatim (`--ignore-quoted`, `--json`, `--rules=id,id`, `--all`, `--provider=.x`).

## Commands

### Utility (run the engine)

| Command | What it does | Common flags |
|---|---|---|
| `audit [paths...]` | Run the 50-rule deterministic catalog, human-readable | `--ignore-quoted` |
| `lint [paths...]` | Same scan, JSON output for piping | `--ignore-quoted` |
| `critique [path]` | Print an LLM-critique prompt for the 22 base rules regex can't catch; merges genre-specific rules when `--genre` is passed | `--rules=id,id`, `--genre=<slug>` |
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
| `teach` | Interview the writer to create or refine `VOICE.md`. Used after `document` to lock open questions, or standalone if there's no existing corpus | [reference/teach.md](reference/teach.md) |
| `document` | Scan existing prose. Computes stylometric features, surfaces recurring moves, drafts `VOICE.md` with citations and open questions for `teach` to resolve | [reference/document.md](reference/document.md) |
| `craft` | Method-aware end-to-end writing (outliner / discovery / iterative / model-drafter); shape → draft → critique → polish | [reference/craft.md](reference/craft.md) |

## Pin / unpin

Turn `/pilcrow polish` into `/polish` (and back). Useful for commands the writer repeats on every piece.

```bash
node scripts/pin.mjs pin polish
node scripts/pin.mjs unpin polish
```

The script writes a redirect skill into every harness directory where `pilcrow` is installed. Run `unpin` to remove. Pinned skills carry a marker comment, so `unpin` only deletes shortcuts it created; never user-owned skills with the same name.

## Cross-cutting references

These shared files live in `reference/` with a leading underscore. They are **not** commands; they are content loaded by multiple editor commands.

| File | Content | Loaded by |
|---|---|---|
| [reference/_ai-tell-catalog.md](reference/_ai-tell-catalog.md) | Exhaustive AI-tell catalog by class | humanize, polish |
| [reference/_readers.md](reference/_readers.md) | Reader personas | clarify, lead, polish |
| [reference/_cadence-theory.md](reference/_cadence-theory.md) | King + Strunk on rhythm | pace, polish |
| [reference/_genres.md](reference/_genres.md) | Genre conventions | clarify, lead, document, craft; also routing rule 1 (bare triage) |

Universal writing laws and the editor reflexes / proposal ritual / slop test are inlined in this file above; they apply to every command without an explicit load. Commands that need a cross-cutting file say so explicitly in their own reference; don't load every shared file by default.

## External skill dependencies

`aloud` depends on the [OpenAI speech skill](https://github.com/openai/skills/tree/main/skills/.curated/speech) (Apache 2.0) for TTS. The helper script resolves it for you:

```bash
node scripts/resolve-speech.mjs
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

The engine never modifies prose. When a command proposes rewrites, present them to the user and wait for confirmation before editing the file; voice and intent override the rule.
