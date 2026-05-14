# Notice

pilcrow is MIT-licensed (see [LICENSE](LICENSE)).

## Acknowledgements

The skill architecture, routing rules, pin/unpin shortcut mechanism, and command-metadata templating pattern are inspired by [impeccable](https://github.com/pbakaus/impeccable) by Paul Bakaus, which is itself based on Anthropic's frontend-design skill. impeccable is Apache-2.0 licensed.

Specifically, the following structural patterns are adapted from impeccable:

- **Skill SKILL.md layout** — frontmatter (`user-invocable`, `argument-hint`, `allowed-tools`), routing rules section, absolute-bans inheritance to every subcommand, category-reflex (in pilcrow: genre-reflex) check applied across lenses.
- **`reference/` directory pattern** — one playbook file per subcommand, plus `_*.md` cross-cutting topic files loaded by multiple commands.
- **`scripts/load-context.mjs`** — walk-up loader that locates project context files (`VOICE.md` and `PILCROW.md` in pilcrow's case, `BRAND.md` and `PRODUCT.md` in impeccable's).
- **`scripts/pin.mjs`** — pin/unpin shortcut mechanism that writes lightweight redirect skill files into each detected harness directory, with a marker comment so `unpin` only deletes shortcuts it created.
- **`scripts/command-metadata.json`** — single-source-of-truth command list with `description`, `argumentHint`, and `category` per command. Used to drive the `{{command_hint}}` template substitution during `pilcrow skills install`.

The substance of pilcrow's commands — the 49 deterministic rules, the 19 LLM-judged rules, the six interpretive lenses (`polish`, `humanize`, `tighten`, `clarify`, `pace`, `lead`), and the four project commands (`teach`, `document`, `extract`, `craft`) — is original to pilcrow and anchored in classical style guides (Strunk & White, Zinsser, Williams, Pinker, Orwell, King).

## OpenAI speech skill (used by `aloud`)

The `aloud` lens depends on the [OpenAI speech skill](https://github.com/openai/skills/tree/main/skills/.curated/speech) (Apache 2.0) for text-to-speech generation. Pilcrow does not redistribute the skill; it detects an installed copy in the project's harness directories, and if absent, fetches a pinned snapshot into `/tmp/pilcrow/skills/speech/`.

- Repository: `github.com/openai/skills`
- Pinned SHA: `c25113bf4c64c8dba6bfe61acf06051d79aa43f6` (recorded 2026-05-12)
- License: Apache License 2.0

The pinned SHA is bumped deliberately in `skill/scripts/resolve-speech.mjs` and re-recorded here on each bump.

## Style-guide anchors

The interpretive lenses cite specific style guides as their theoretical anchor. Those works are not redistributed; pilcrow's references summarize and apply principles from:

- William Strunk Jr. and E. B. White, *The Elements of Style*
- William Zinsser, *On Writing Well*
- Joseph M. Williams, *Style: Lessons in Clarity and Grace*
- Steven Pinker, *The Sense of Style*
- George Orwell, *Politics and the English Language*
- Stephen King, *On Writing: A Memoir of the Craft*

The Wikipedia article *Signs of AI writing* is the canonical editor-maintained catalog drawn on for `humanize` and `_ai-tell-catalog.md`.
