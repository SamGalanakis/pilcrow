# craft

End-to-end essay or post writing with pilcrow at every gate. Four phases — **shape**, **draft**, **critique**, **polish** — each with an explicit confirmation step. The writer never gets a 2,000-word draft to react to cold; they confirm the outline, the angle, and the lede before the body lands.

`craft` is for new pieces. For revising existing prose, use the lens commands directly.

---

## Source

Impeccable's `craft` flow: shape-and-confirm-then-build. The discipline is that nothing downstream gets produced until the upstream gate has been confirmed by the human.

Zinsser, *On Writing Well*, on the writing process: "Writing improves in direct ratio to the number of things we can keep out of it that shouldn't be there." `craft` keeps junk out by inserting gates.

Stephen King's three-draft model from *On Writing*: closed-door draft (just write it), open-door draft (revise for the reader), polish (sentence work). `craft` maps to the latter two; the closed-door first draft is the LLM's job, gated by the writer's outline.

---

## Procedure

`craft` is a single argument: `/pilcrow craft "<topic or assignment>"`. The flow runs four phases. Each phase ends with a confirmation gate the writer must clear before the next phase starts.

### Phase 1 — shape (5 minutes)

Run a short discovery interview. **One question at a time**, not bundled.

**Round 1 — what's the news?**
> "What's the one most surprising or consequential thing you want a reader to know after reading this? Not the topic — the news."

**Round 2 — who's it for?**
> "Who's reading this? Be specific."

**Round 3 — what's the shape?**
> "Is this an argument (claim + support), a story (something happened), an explainer (how X works), or a reflection (what I think about Y)?"

**Round 4 — anti-targets?**
> "What would make this piece feel like AI generated it? Anything you specifically don't want — angle, register, structure?"

After the four answers, emit a **brief**:

```markdown
# Brief — <one-line topic>

**News:** <answer 1>
**Audience:** <answer 2>
**Shape:** <answer 3>
**Anti-targets:** <answer 4>

**Proposed outline:**
1. <lede paragraph: states the news>
2. <how we got here / setup>
3. <the body: 2-4 paragraphs covering the substance>
4. <implication or stake>
5. <close: lands a different beat from the lede>
```

Show the brief. **Gate:** "Does this outline match the piece you wanted? Y / change X / scrap."

If "change", adjust the brief and re-confirm. If "scrap", start over with a new round-1 question.

### Phase 2 — draft (LLM writes)

Now the LLM writes a first draft. The brief is the only context; the LLM does not run any pilcrow rules yet. The writer asked for a draft, not a polished essay.

**Important:** if VOICE.md or PILCROW.md exist at the project root, load them. The draft must respect the writer's register, signatures, and taboos.

After the draft, emit it as-is. **Gate:** "Here's the draft. Reads broadly right, or pivot the angle?"

If pivot, go back to Phase 1 and rerun shape with the writer's feedback. Don't accumulate drafts; replace.

### Phase 3 — critique (pilcrow + LLM)

Run the full pilcrow stack on the draft:

```
pilcrow lint /tmp/craft-draft.md --ignore-quoted
pilcrow critique /tmp/craft-draft.md
```

Evaluate against both rule sets. Apply the `polish` lens's triage rubric: ship-blockers, worth-fixing, taste-calls.

Emit the polish-style triage report. **Gate:** "These are the issues. Apply suggested fixes, skip some, or reshape the piece?"

If reshape, return to Phase 1 with the lessons. If apply, proceed to Phase 4.

### Phase 4 — polish (apply lens guidance)

Apply the proposed rewrites for ship-blockers and worth-fixing items. Leave taste-calls flagged but un-rewritten. Re-emit the draft with changes marked (diff-style, not just the final version).

Then re-run:

```
pilcrow lint /tmp/craft-draft-v2.md --ignore-quoted
```

If new findings emerged from the rewrites, run one more pass — but cap it at two polish passes total. After two, any remaining findings are taste calls or genuine prose limitations; don't grind.

Emit the final draft. **Gate:** "This is what I'd ship. Take it, edit it, or start over?"

---

## Writing the draft to disk

After Phase 4 confirms, ask: "Save where?"

Default location: `drafts/<slug>.md`. Slug is the first 4-6 words of the brief's `News` field, lowercased, dashed. Confirm before writing.

Do **not** auto-write any file during the flow. The writer authorizes the save explicitly at the end.

---

## Output (a complete craft run)

```
# Craft session — <topic>

## Phase 1: Shape ✓
Brief locked. (4-round interview, 1 revision)

## Phase 2: Draft ✓
First draft generated. (Reads broadly right per writer.)

## Phase 3: Critique
Findings:
  Ship-blockers: <count>
  Worth fixing:  <count>
  Taste-calls:   <count>

## Phase 4: Polish ✓
Applied <N> rewrites across 2 passes. <M> taste-calls left for the writer.

## Final draft
<the prose>

## Saved to
drafts/<slug>.md
```

---

## Anti-patterns

- **Skipping the shape gate to "just write something quick."** The whole point of `craft` is that the LLM doesn't draft until the writer has confirmed what's being drafted. If they want a quick first stab without an outline, that's `pilcrow audit` after the fact, not `craft`.
- **Bundling the four shape questions into one prompt.** "What's the news, who's it for, what's the shape, what are the anti-targets?" produces four perfunctory answers and a brief that fits no piece. Run rounds.
- **Drafting longer than the brief implies.** A brief for a 600-word post should not produce a 2,500-word draft. Match the brief.
- **Grinding through more than two polish passes.** Endless polish is its own AI tell — sentences gain a glossy uniformity. Two passes, then stop.
- **Ignoring VOICE.md / PILCROW.md.** The whole point of those files is to make `craft`'s draft sound like the writer. If they exist and the draft ignores them, the flow has failed.
- **Auto-writing to disk.** `craft` never writes a file without explicit confirmation. The writer might want to copy-paste; assume nothing.

---

## Handoff

- After `craft` ships a draft, suggest `/pilcrow polish <file>` for any final pre-publish sweep.
- If the writer rejects the brief twice in Phase 1, suggest: "The topic might not be one piece yet — want to spend a few minutes shaping it without writing anything?" Run a longer interview.
- After multiple `craft` sessions, the writer may notice patterns in their own pivots. Suggest `/pilcrow extract` to mine those.
