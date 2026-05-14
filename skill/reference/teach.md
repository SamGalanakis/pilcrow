# teach

A multi-round interview to capture the writer's voice. The output is `VOICE.md` at the project root: a short, opinionated document the lenses read before proposing rewrites so suggestions sound like the writer, not like a generic technical-writing assistant.

`teach` is run once per project, then re-run whenever the writer's voice meaningfully shifts. It's the prose analogue to impeccable's `teach` (which produces `PRODUCT.md`).

---

## Source

Impeccable's `teach` reference, adapted to prose. The structure is the same:
1. Check for existing artifact.
2. Multi-round interview, one decision per round.
3. Write a short, declarative artifact (not a wall of text).

The interview style draws from journalism: short questions, follow up on specifics, never lead the witness.

---

## Procedure

### Step 1 — check for existing VOICE.md

Look for `VOICE.md` at the project root. Variants: `voice.md`, `VOICE.MD`, `docs/VOICE.md`. If one exists:

- Read it.
- Ask: "VOICE.md already exists. Update it (re-interview), or keep it (exit)?"
- If keep, exit.
- If update, read the current file aloud, ask which fields feel wrong now, and only re-interview those.

If none exists, proceed to the interview.

### Step 2 — the interview

Run **5 rounds**, one question at a time. Wait for the answer before the next question. Don't bundle three questions into one paragraph.

**Round 1 — audience and stance.**
> "Who reads what you write? Name them concretely — not 'developers' but 'the kind of engineer who's already in a Slack thread about it.' And what's your stance toward them — do you assume they're with you, ahead of you, or skeptical?"

**Round 2 — register.**
> "Read me one paragraph you're proud of from something you've published. Just paste it."

(Use the paragraph to infer register. Comment back: "I'm seeing X, Y, Z — does that match your sense of your voice?")

**Round 3 — taboos.**
> "What words or moves make you cringe when you see them in your own draft? Anything you've consciously decided to never write?"

**Round 4 — signatures.**
> "What's a habit of yours someone could recognize? A phrase you reach for, a structure you like, a punctuation tic you defend?"

**Round 5 — register exceptions.**
> "Anywhere you break your own rules on purpose? E.g. you avoid exclamation marks except at the end of a piece, or you avoid em-dashes except in dialogue."

### Step 3 — write VOICE.md

Write a short file at the project root. The schema:

```markdown
---
name: VOICE
audience: <one or two sentences naming the reader concretely>
stance: <one phrase: e.g. "skeptical-but-onboard", "expert-to-expert", "guide-and-explain">
updated: YYYY-MM-DD
---

# Voice

## Register
<2-3 sentences. The pace, the formality, the relationship with the reader. Cite back to the paragraph the writer pasted in Round 2.>

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

Keep it under 60 lines. The lenses read it; brevity matters.

### Step 4 — confirm

After writing, show the file to the writer. Ask one question:
> "This is what I heard. Anything wrong?"

If they correct anything, update the file before exiting. Don't re-interview unless asked.

---

## How lenses use VOICE.md

When `polish`, `humanize`, `tighten`, `clarify`, `pace`, or `lead` runs, it should:

1. Check for `VOICE.md` at the project root.
2. If present, load it before proposing any rewrites.
3. Filter findings against the `Taboos` and `Exceptions` lists: if a rule flags something the writer's `Exceptions` list explicitly allows, demote the finding to `info`.
4. Match rewrite proposals to the `Register` and `Signatures` notes.

A lens without VOICE.md can still work; it just won't match the writer's voice as closely.

---

## Output (after teach completes)

```
# Voice profile captured

Wrote: VOICE.md (<line count> lines)

Audience: <audience field>
Stance:   <stance field>
Signatures: <count> tracked
Taboos:    <count> tracked

Next: try `/pilcrow polish <draft>` — it'll now propose rewrites in your voice.
```

---

## Anti-patterns

- **Interviewing in one shot.** Five questions in one prompt produces five generic answers. Run rounds.
- **Inferring register without a sample.** Round 2's paragraph is non-negotiable. Without it you're guessing.
- **Writing a long VOICE.md.** Over 60 lines is over-spec. The lenses read this every invocation; keep it tight.
- **Putting style rules in VOICE.md that already live in the pilcrow catalog.** Don't write "no em-dashes" — that's already a rule. Write *exceptions*: "em-dashes are fine in dialogue."
- **Re-interviewing fields the writer didn't change.** If they say "update register", only ask register questions.

---

## Handoff

After teach completes, suggest:
- `/pilcrow document` if the repo has substantial existing prose — it'll cross-check the inferred voice against the interview.
- `/pilcrow polish <recent draft>` to see the lens with VOICE.md applied.
