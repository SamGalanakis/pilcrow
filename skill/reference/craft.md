# craft

End-to-end essay or post writing with pilcrow at every gate. Four phases — **shape**, **draft**, **critique**, **polish** — each with an explicit confirmation step.

Different writers draft differently. King writes to discover. Zinsser builds paragraph by paragraph. Some writers outline tightly before a sentence lands. Others let the model produce a first pass and rewrite from there. `craft` runs one of four phase-2 variants based on the writer's method. Phases 1, 3, and 4 are method-agnostic.

## Source

Impeccable's `craft` flow: shape-and-confirm-then-build. Nothing downstream gets produced until the upstream gate has been confirmed by the human.

Stephen King, *On Writing* — discovery: "I don't know what I think until I write it." For some writers, an outline kills the piece.

William Zinsser, *On Writing Well* — iterative: writing improves by what we keep out. Each paragraph confirmed before the next.

The four methods are not a hierarchy. They are kinds of writer.

## Load before running

- `VOICE.md` if present — load via `scripts/load-context.mjs`. Read `method:` to pick the phase-2 variant. Read `genre`, `audience`, `stance`, `Signatures`, `Taboos` to shape every phase.
- [_genres.md](_genres.md) — for phase-1 outline conventions.
- [_readers.md](_readers.md) — for phase-1 audience framing.

## Procedure

`craft` takes a single argument: `/pilcrow craft "<topic or assignment>"`. The flow runs four phases. Each phase ends with a confirmation gate the writer must clear before the next phase starts.

### Pick the method

Before Phase 1:
- If VOICE.md exists and has `method:` set, use it. Don't ask.
- If VOICE.md exists but `method:` is unset, ask once and save the answer back to VOICE.md.
- If no VOICE.md, ask: "How do you draft this kind of piece — outliner, discovery, iterative, or model-drafter? (Default: outliner.)"

The four methods:

- **outliner** — outline before writing. The default.
- **discovery** — start writing and see what comes out. No outline.
- **iterative** — one paragraph at a time, with the writer confirming each before the next.
- **model-drafter** — model produces a first draft from a brief; the writer rewrites it.

### Phase 1 — shape

Run a short discovery interview. **One question at a time.**

**Round 1 — what's the news?**
> "What's the one most surprising or consequential thing you want a reader to know after reading this? Not the topic — the news."

**Round 2 — who's it for?**
> "Who's reading this? Be specific."

**Round 3 — what's the shape?**
> "Is this an argument (claim + support), a story (something happened), an explainer (how X works), or a reflection (what I think about Y)?"

**Round 4 — anti-targets?**
> "What would make this piece feel like AI generated it? Anything you specifically don't want — angle, register, structure?"

Then emit a **brief**:

```markdown
# Brief — <one-line topic>

**News:** <answer 1>
**Audience:** <answer 2>
**Shape:** <answer 3>
**Anti-targets:** <answer 4>
```

**Method-specific Phase 1 addition:**

- `outliner` — append a **Proposed outline** (5–7 bullets). Confirm the outline as part of the gate.
- `discovery` — no outline. Append only **Direction:** "We'll write toward the news and see what the prose discovers."
- `iterative` — append **Lede + direction**: a one-paragraph proposed opener and a one-sentence direction for what follows.
- `model-drafter` — append a **Brief-for-draft**: a tighter 8–12-line outline the model will follow in Phase 2.

**Gate:** "Does this match the piece you wanted? Y / change X / scrap."

If "change", adjust and re-confirm. If "scrap", restart Phase 1 with a new round-1 question.

### Phase 2 — draft (method-specific)

#### Phase 2 — `outliner`

The model writes a first draft following the outline. The writer sees it whole.

The model does not run any pilcrow rules yet. The brief and outline are the only context (plus VOICE.md if present).

After the draft, emit it as-is. **Gate:** "Reads broadly right, or pivot the angle?"

If pivot, return to Phase 1.

#### Phase 2 — `discovery`

No outline to follow. The model writes freely *toward* the news from the brief. The draft may discover its structure as it goes.

After the draft, emit it as-is and add a **Discovery note**: one or two sentences naming the shape that emerged. ("This came out as a chronological account with a turn at paragraph 4.")

**Gate:** "Did the prose find something? Keep this shape, reshape, or start over with what we just learned?"

If reshape, go back to Phase 1 with the discovered direction as input.

#### Phase 2 — `iterative`

One paragraph at a time. The model writes the next paragraph, the writer confirms or revises, then the next paragraph.

Loop:
1. Model writes paragraph N.
2. Writer confirms / requests revision.
3. Model writes paragraph N+1, given what's already locked.

End when the writer says "done" or the piece reaches the brief's implied length.

**Gate:** at every paragraph. No bulk draft is shown.

This is the slowest variant. The writer chose it on purpose.

#### Phase 2 — `model-drafter`

The model writes a full draft from the Brief-for-draft. The writer's job is to **rewrite** the draft, not accept it.

After the draft, emit it with a header:
> "Here's the model's draft. Treat it as raw material. The next step is for you to rewrite — what's first?"

**Gate:** the writer pastes or describes their rewrite (whole, or paragraph by paragraph). The flow only advances to Phase 3 once the writer's rewrite is in hand.

### Phase 3 — critique (pilcrow + LLM)

Method-agnostic. Run the full pilcrow stack on the draft (whoever wrote it):

```
pilcrow lint /tmp/craft-draft.md --ignore-quoted
pilcrow critique /tmp/craft-draft.md
```

Evaluate against both rule sets. Apply the `polish` command's triage rubric: ship-blockers, worth-fixing, taste-calls.

Emit the polish-style triage report. **Gate:** "These are the issues. Apply suggested fixes, skip some, or reshape the piece?"

If reshape, return to Phase 1 with the lessons.

### Phase 4 — polish

Method-agnostic. Apply the proposed rewrites for ship-blockers and worth-fixing items. Leave taste-calls flagged but un-rewritten. Re-emit the draft with changes marked (diff-style, not just the final version).

Then re-run:

```
pilcrow lint /tmp/craft-draft-v2.md --ignore-quoted
```

If new findings emerged from the rewrites, run one more pass — cap at two polish passes total. After two, any remaining findings are taste calls or genuine prose limitations; don't grind.

Emit the final draft. **Gate:** "This is what I'd ship. Take it, edit it, or start over?"

## Writing the draft to disk

After Phase 4 confirms, ask: "Save where?"

Default location: `drafts/<slug>.md`. Slug is the first 4–6 words of the brief's `News` field, lowercased, dashed. Confirm before writing.

Do **not** auto-write any file during the flow. The writer authorizes the save explicitly at the end.

## Output

```
# Craft session — <topic>
Method: <outliner | discovery | iterative | model-drafter>

## Phase 1: Shape ✓
Brief locked. (4-round interview, N revisions)

## Phase 2: Draft ✓
<method-appropriate one-line summary>

## Phase 3: Critique
Findings:
  Ship-blockers: <count>
  Worth fixing:  <count>
  Taste-calls:   <count>

## Phase 4: Polish ✓
Applied <N> rewrites across <K> passes. <M> taste-calls left for the writer.

## Final draft
<the prose>

## Saved to
drafts/<slug>.md
```

## Anti-patterns

- **Forcing the outliner method on a discovery writer.** If the writer says "I don't know what I think until I write it," do not coerce them into a 7-bullet outline. Discovery method exists for them.
- **Bundling the four shape questions into one prompt.** Run rounds, even in discovery mode.
- **In iterative mode, dumping multiple paragraphs at once.** The gate is per-paragraph. One. Then wait.
- **In model-drafter mode, treating the model draft as the answer.** The model draft is raw material. The writer must rewrite. Skipping that step defeats the method's purpose.
- **Drafting longer than the brief implies.** A brief for a 600-word post should not produce a 2,500-word draft.
- **Grinding through more than two polish passes.** Endless polish is its own AI tell — sentences gain a glossy uniformity.
- **Ignoring VOICE.md.** The whole point of the file is to make `craft`'s draft sound like the writer.
- **Auto-writing to disk.** `craft` never writes a file without explicit confirmation.
- **Saving `method:` to VOICE.md without asking.** If VOICE.md exists but `method:` is unset, ask once and confirm the answer before writing.
