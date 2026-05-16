# teach

Refine `VOICE.md` through a short interview. The typical flow: `document` drafts the file from the writer's corpus and leaves Open questions; `teach` answers them and locks the inferred Signatures and Taboos as the writer's call. For new projects with no corpus to scan, `teach` builds the file from scratch.

`teach` runs whenever the writer's voice or method shifts: after a new body of work, a deliberate register change, or a `document` re-run.

## Source

Impeccable's `teach` reference, adapted to prose. Interview style draws from journalism: short questions, one per round, follow up on specifics, never lead the witness.

## Load before running

- [_readers.md](_readers.md): the audience field maps to a reader persona; offer the persona menu as a starting point.
- [_genres.md](_genres.md): the genre field constrains downstream command behavior; show the writer the genre options before asking.

## Decision tree

Load context first:

```bash
node {{scripts_path}}/load-context.mjs
```

Then branch:

- **VOICE.md exists with Open questions** (the typical case after `document`). Run **refine mode**: answer the Open questions, confirm or reject inferred Signatures, edit Taboos.
- **VOICE.md exists without Open questions** (already refined; the writer's voice shifted). Ask: "VOICE.md is already locked. Update which field: genre, audience, stance, method, Signatures, Taboos, exceptions?" Re-interview only the named fields.
- **VOICE.md doesn't exist.** Run **fresh mode**: full interview from scratch.

## Refine mode (typical)

The writer already has a `document`-drafted VOICE.md. Open questions are listed in the file.

### Step 1 — walk the Open questions

For each open question, ask the writer. Use the harness's structured question tool when available; otherwise ask in chat, one question per round.

**Open question: audience.**
> "From the corpus, my best-guess for who you're writing for is: `<persona>`. Right, or different?"

If different, ask them to be specific. Capture as one or two sentences.

**Open question: stance.**
> "Best-guess for your move with the reader: `<stance>` (claim / explain / persuade / narrate). Right?"

**Open question: method.**
> "Stats can't see how you draft. Pick one:
> - **outliner**: outline first, then fill in
> - **discovery**: start writing and see what comes out
> - **iterative**: paragraph by paragraph, polishing as you go
> - **model-drafter**: let the model draft, then rewrite it yourself
>
> Or skip if it depends on the piece; `craft` will ask per-session."

### Step 2 — confirm Signatures, edit Taboos

For each proposed Signature in the drafted VOICE.md:

> "Signature: `<phrase | cadence | move>`, appears N times across M files. Keep as your voice, move to Taboos, or drop entirely?"

Walk through one at a time. For overlap-flagged moves (those that match the AI-tell catalog), surface the overlap and let the writer decide.

For Taboos: confirm the zero-occurrence patterns the writer wants flagged in future drafts. Add any the writer names explicitly.

### Step 3 — add exceptions

Ask once:
> "Any rules you break on purpose? E.g. you avoid exclamation marks except at the end of a piece, or you avoid em-dashes except in dialogue."

### Step 4 — rewrite VOICE.md

Replace the draft with a locked version: no Open questions section, Signatures and Taboos confirmed, exceptions captured. Use the schema in *Fresh mode* below.

## Fresh mode (no corpus)

The writer has no existing prose to scan. Run six interview rounds, one question at a time.

**Round 1: genre.**
> "What kind of piece is this? Common slugs: `essay`, `op-ed`, `review`, `tutorial`, `how-to`, `reference-docs`, `explanation`, `readme`, `explainer`, `news`, `feature`, `postmortem`, `status-update`, `changelog`, `memo`, `email`, `landing`, `product-copy`, `press-release`, `about-page`, `error-message`, `ui-label`, `cv`, `cover-letter`, `bio`, `social-post`, `deck`, `fiction`, `memoir`. See `skill/reference/_genres.md` for the full tree and what each leaf demands."

**Round 2: audience.**
> "Who's reading this? Be specific. Not 'developers' but 'the kind of engineer who's already in a Slack thread about it.' Or pick a persona: skeptical engineer, busy executive, casual blog reader, fellow expert, undergraduate."

**Round 3: stance.**
> "Your move with this reader: make a claim, explain something, persuade them, or narrate? Pick one as the primary."

**Round 4: method.**
> "How do you draft? Pick the closest:
> - **outliner**: outline first, then fill in
> - **discovery**: start writing and see what comes out
> - **iterative**: paragraph by paragraph, polishing as you go
> - **model-drafter**: let the model draft, then rewrite it yourself"

**Round 5: voice sample.**
> "Paste one paragraph you're proud of from something you've published."

Use the paragraph to infer register. Comment back: "I'm seeing X, Y, Z. Does that match?"

**Round 6: Signatures, Taboos, exceptions.**
Three short follow-ups, one at a time:

> "What's a habit of yours someone could recognize?"
> "What words or moves make you cringe in your own draft?"
> "Anywhere you break your own rules on purpose?"

## VOICE.md schema

Both refine mode and fresh mode produce the same shape:

```markdown
---
name: VOICE
genre: <slug from skill/reference/_genres.md tree — e.g., essay, tutorial, readme, postmortem, cv, fiction, landing, error-message>
audience: <one or two sentences naming the reader concretely>
stance: <claim | explain | persuade | narrate>
method: <outliner | discovery | iterative | model-drafter>
updated: YYYY-MM-DD
---

# Voice

## Register
<2–3 sentences. The pace, the formality, the relationship with the reader. Cite back to the voice sample.>

## Signatures
- <move 1 — one sentence>
- <move 2 — one sentence>
- <move 3 — one sentence>

## Taboos
- <word or move 1>
- <word or move 2>

## Exceptions
- <rule the writer breaks on purpose, and when>
```

Keep it under 70 lines. The editor commands read it every invocation; brevity matters.

## How editor commands use VOICE.md

When `polish`, `humanize`, `tighten`, `clarify`, `pace`, `lead`, `verify`, `aloud`, or `argue` runs:

1. Load `VOICE.md` via `scripts/load-context.mjs`.
2. Read `genre` and constrain command behavior to genre conventions (see `_genres.md`).
3. Read `audience` and frame proposals around that reader.
4. Filter findings against the `Taboos` and `Exceptions` lists: if a rule flags something the writer's `Exceptions` list explicitly allows, demote the finding to `info`.
5. Match rewrite proposals to the `Register` and `Signatures` notes.

When `craft` runs:
- Read `method` and run the matching phase-2 variant.
- If `method` is unset, ask once and save the answer back to VOICE.md.

A command without VOICE.md still works; it just won't match the writer's voice as closely.

## Output (after teach completes)

```
# VOICE.md locked

Wrote: VOICE.md (<line count> lines)

Genre:    <field>
Audience: <field>
Stance:   <field>
Method:   <field>
Signatures: <count>
Taboos:     <count>

Next: try `/pilcrow polish <draft>` — editor commands will now propose rewrites in your voice.
```

## Anti-patterns

- **Interviewing in one shot.** Six questions in one prompt produces six generic answers. Run rounds.
- **Re-interviewing fields the writer didn't change.** If they say "just update register", only ask register questions.
- **Inferring register without a sample.** In fresh mode, Round 5's paragraph is non-negotiable. In refine mode, the `document` pass already provided the Register draft.
- **Writing a long VOICE.md.** Over 70 lines is over-spec. The editor commands read this every invocation; keep it tight.
- **Putting style rules in VOICE.md that already live in the pilcrow catalog.** Don't write "no em-dashes"; that's already a rule. Write *exceptions*: "em-dashes are fine in dialogue."
- **Forcing a method choice on someone who genuinely varies.** If the writer says "depends on the piece", note that and skip setting `method:`. `craft` will ask per-session.
- **Auto-locking inferred Signatures.** Every proposed Signature from `document` needs the writer's confirmation. The writer's "yes/no/move-to-Taboos" call is the lock.
