# teach

A multi-round interview that captures the writer's voice and writing process. The output is `VOICE.md` at the project root: a short, opinionated document the editor commands read before proposing rewrites so suggestions sound like the writer, not like a generic technical-writing assistant.

`teach` runs once per project, then re-runs whenever the writer's voice or method shifts.

## Source

Impeccable's `teach` reference, adapted to prose. Same structure:
1. Check for existing artifact.
2. Multi-round interview, one decision per round.
3. Write a short, declarative artifact (not a wall of text).

Interview style draws from journalism: short questions, follow up on specifics, never lead the witness.

## Load before running

- [_readers.md](_readers.md) — the audience field maps to a reader persona; offer the persona menu as a starting point.
- [_genres.md](_genres.md) — the genre field constrains downstream command behavior; show the writer the genre options before asking.

## Procedure

### Step 1 — check for existing VOICE.md

Look for `VOICE.md` at the project root. Variants: `voice.md`, `VOICE.MD`, `docs/VOICE.md`, `.pilcrow/VOICE.md`. If one exists:

- Read it.
- Ask: "VOICE.md already exists. Update it (re-interview), or keep it (exit)?"
- If keep, exit.
- If update, read the current file aloud, ask which fields feel wrong now, and only re-interview those.

If none exists, proceed.

### Step 2 — the interview

Run **6 rounds**, one question at a time. Wait for each answer before the next question.

**Round 1 — genre.**
> "What kind of piece is this — essay, explainer, report, marketing, memo, or fiction? (Or something else — name it.)"

Match to one of the six in `_genres.md`. If the writer's answer fits none, accept their label and note it as a custom genre.

**Round 2 — audience.**
> "Who's reading this? Be specific — not 'developers' but 'the kind of engineer who's already in a Slack thread about it.' Or pick a persona: skeptical engineer, busy executive, casual blog reader, fellow expert, undergraduate."

Capture a sentence or two. Optionally map to a `_readers.md` persona for downstream use.

**Round 3 — stance.**
> "What's your move with this reader — make a claim, explain something, persuade them, or narrate? Pick one as the primary."

One of: `claim`, `explain`, `persuade`, `narrate`.

**Round 4 — method.**
> "How do you draft? Pick the closest:
> - **outliner** — outline first, then fill in
> - **discovery** — start writing and see what comes out
> - **iterative** — paragraph by paragraph, polishing as you go
> - **model-drafter** — let the model draft, then rewrite it yourself"

The choice shapes how `craft` runs. Default if unsure: `outliner`.

**Round 5 — voice sample.**
> "Paste one paragraph you're proud of from something you've published."

Use the paragraph to infer register. Comment back: "I'm seeing X, Y, Z — does that match your sense of your voice?"

**Round 6 — taboos, signatures, exceptions.**
Three short follow-ups, one at a time:

> "What words or moves make you cringe in your own draft?"
> "What's a habit of yours someone could recognize?"
> "Anywhere you break your own rules on purpose?"

### Step 3 — write VOICE.md

The schema:

```markdown
---
name: VOICE
genre: <essay | explainer | report | marketing | memo | fiction | custom>
audience: <one or two sentences naming the reader concretely>
stance: <claim | explain | persuade | narrate>
method: <outliner | discovery | iterative | model-drafter>
updated: YYYY-MM-DD
---

# Voice

## Register
<2-3 sentences. The pace, the formality, the relationship with the reader. Cite back to the paragraph the writer pasted in Round 5.>

## Signatures
- <habit 1 — one sentence>
- <habit 2 — one sentence>
- <habit 3 — one sentence>

## Taboos
- <word or move 1>
- <word or move 2>

## Exceptions
- <rule the writer breaks on purpose, and when>
```

Keep it under 70 lines. The editor commands read it; brevity matters.

### Step 4 — confirm

Show the file. Ask one question:
> "This is what I heard. Anything wrong?"

If they correct anything, update before exiting. Don't re-interview unless asked.

## How editor commands use VOICE.md

When `polish`, `humanize`, `tighten`, `clarify`, `pace`, or `lead` runs:

1. Load `VOICE.md` via `scripts/load-context.mjs`.
2. Read `genre` and constrain command behavior to genre conventions (see `_genres.md`).
3. Read `audience` and frame proposals around that reader.
4. Filter findings against the `Taboos` and `Exceptions` lists: if a rule flags something the writer's `Exceptions` list explicitly allows, demote the finding to `info`.
5. Match rewrite proposals to the `Register` and `Signatures` notes.

When `craft` runs:
- Read `method` and run the matching phase-2 variant.
- If `method` is unset, ask once and save it back to VOICE.md.

A command without VOICE.md still works; it just won't match the writer's voice as closely.

## Output (after teach completes)

```
# Voice profile captured

Wrote: VOICE.md (<line count> lines)

Genre:    <field>
Audience: <field>
Stance:   <field>
Method:   <field>
Signatures: <count> tracked
Taboos:    <count> tracked

Next: try `/pilcrow polish <draft>` — editor commands will now propose rewrites in your voice.
```

## Anti-patterns

- **Interviewing in one shot.** Six questions in one prompt produces six generic answers. Run rounds.
- **Inferring register without a sample.** Round 5's paragraph is non-negotiable. Without it you're guessing.
- **Writing a long VOICE.md.** Over 70 lines is over-spec. The editor commands read this every invocation; keep it tight.
- **Putting style rules in VOICE.md that already live in the pilcrow catalog.** Don't write "no em-dashes" — that's already a rule. Write *exceptions*: "em-dashes are fine in dialogue."
- **Re-interviewing fields the writer didn't change.** If they say "update register", only ask register questions.
- **Forcing a method choice on someone who genuinely varies.** If the writer says "depends on the piece", note that and skip setting `method:`. `craft` will ask per-session.
