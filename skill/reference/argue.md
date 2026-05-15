# argue

Map the piece's argument structure and stress-test it. Four phases: confirm the thesis with the writer, surface the supports and objections that hang off it, generate the strongest counter, then check whether the piece engages or dodges that counter.

`argue` is for argumentative prose — essays, op-eds, memos, technical posts that take a position. For narrative or descriptive prose, this command doesn't apply.

The session is one round-trip per piece. It's slower than the line-level commands; run it once the draft has settled, not every revision.

## Source

Stephen Toulmin, *The Uses of Argument* — claim / data / warrant / qualifier / rebuttal as the canonical argument shape. Pilcrow simplifies to claim / supports / objections / unstated-premises.

IBIS (Issue-Based Information System) by Horst Rittel and Conklin's *Dialogue Mapping* — issues, positions, supporting and opposing arguments.

[Argdown](https://argdown.org) by Christian Voigt (MIT) — markdown-like DSL for argument structures with a renderable graph view. `argue` borrows the marker conventions (`+` supports, `-` objections, `?` premises) and offers an opt-in `.argdown` export.

The steelman discipline: paraphrase the opponent's strongest case before responding. Anatol Rapoport's first rule of charitable argument.

## Load before running

- [_genres.md](_genres.md) — different genres have different stock objections. A hostile-engineer skeptic raises different concerns than a hostile-marketer one.

Universal laws and the editor slop test (in the parent `SKILL.md`) apply by default.

## Procedure

### Phase 1 — confirm the thesis (gate)

The LLM extracts **2–4 candidate thesis statements** from the prose:

- **A** — the most-likely literal lift (a single sentence from the piece that reads like a thesis).
- **B** — a paraphrase of what the lede sets up.
- **C** — a paraphrase of what the close lands on.
- **D** (optional) — a reframe: "the piece appears to argue X, but actually argues Y."

Present these to the writer using a single-select question. **Prefer the harness's native question UI** when available:

- Claude Code: invoke `AskUserQuestion` with the candidates as options plus "Other (paste yours)".
- Cursor, Gemini, OpenCode, others: detect the equivalent question tool, or fall back to a numbered text prompt.

If the writer picks **Other**, take their pasted sentence verbatim and use that as the thesis.

**Why this gate matters:** LLMs misidentify the central claim often enough that inferring it silently produces a confidently wrong map. The whole rest of the command depends on this answer being right.

### Phase 2 — map the structure

Given the confirmed thesis, walk the prose and surface what attaches to it.

**Four marker types:**

- `[+]` **Support** — a claim, fact, example, or argument that backs the thesis.
- `[-]` **Objection** — a counter-claim the piece raises (and presumably refutes or qualifies).
- `[?]` **Unstated premise** — an assumption the argument *requires* to hold, but the prose doesn't state.
- `[!]` **Qualifier** — a "but" / "in cases where" / "assuming X" that softens the claim.

**Premise discipline.** Only flag premises that are **load-bearing for the central claim** — if the assumption's falsity would collapse the argument, flag it. Don't list every implicit assumption. (Same rule as `verify`'s load-bearing test.)

**Output: an indented ASCII tree.** Up to three levels deep.

```
THESIS: <verbatim or paraphrase the writer confirmed>

[+] <support 1> (L:12)
    [+] <sub-support: an example>     (L:14)
    [?] <load-bearing premise>         (L:12, unstated)
[+] <support 2> (L:23)
    [-] <objection the piece raises>   (L:25)
        [+] <how the piece refutes it> (L:27)
[+] <support 3> (L:41)
    [!] <qualifier the piece offers>   (L:43)
[?] <load-bearing premise> (unstated)
```

Cite line numbers for every node tied to the prose. Premises that are unstated get `(unstated)`.

### Phase 3 — generate the strongest counter (steelman)

Generate exactly **one** counter — the objection a hostile expert would raise first. Not a strawman, not the easiest one to refute, not three medium ones.

**Discipline for the steelman:**

- Charitable. Phrase the counter as its proponent would.
- Specific. Tied to the thesis's actual claims, not a generic objection.
- Genre-aware. Consult `_genres.md`:
  - **Essay / op-ed:** the strongest contrary view from the discourse.
  - **Report:** the methodological objection a reviewer would raise.
  - **Memo:** the cost / timing / opportunity-cost concern.
  - **Marketing:** the comparative claim from a competitor.
  - **Explainer / technical:** the operational concern (won't scale, won't work in production, doesn't match what real users do).

Output:

```
STEELMAN: <one paragraph stating the counter charitably and specifically>
```

### Phase 4 — coverage check

For each support and each premise from Phase 2, ask: does the steelman undermine this? For the steelman as a whole, ask: does the piece engage it?

**Three verdicts:**

- `engaged` — the piece raises this counter (or one substantively equivalent) and addresses it.
- `acknowledged-but-dodged` — the piece mentions the counter but waves it away rather than answering.
- `missing` — the counter isn't raised at all.

Output as a two-column view (or a labeled list, if the harness doesn't render columns well):

```
COVERAGE:

Counter (steelman)              | What the piece says
--------------------------------|------------------------------------------
<verbatim steelman>             | engaged / dodged / missing
                                | (quote the engagement, or note its absence)

Affected supports/premises:
- [+] support at L:23 — <weakened? still holds? not affected?>
- [?] premise at L:12 — <weakened? still holds?>
```

If the verdict is `missing`, the command proposes an action: "Consider addressing the counter in section X, or qualify the thesis to exclude the cases the counter covers."

## Argdown export

Opt-in via `--argdown`. If passed, emit `<input>.argdown` next to the input file (or in `/tmp/pilcrow/argue/` if the input is stdin). Format follows the Argdown syntax:

```
# <Thesis>

[Thesis]: <verbatim thesis>

<+ [Support1]: <support sentence>
   <+ [SubSupport]: <example>
   <- [Premise1]: <load-bearing premise that, if false, breaks Support1>
<+ [Support2]: <support sentence>
   <- [Objection]: <objection the piece raises>
      <+ [Refutation]: <how the piece refutes it>

<- [Steelman]: <the strongest counter>
```

The writer can paste the file into [argdown.org](https://argdown.org)'s online sandbox or run a local Argdown renderer.

## Output shape

```
# Argue report — <file>

## Thesis (confirmed)
> <verbatim quote of the option the writer picked>

## Argument map
<ASCII tree from Phase 2>

## Steelman
<one-paragraph strongest counter>

## Coverage
<two-column view from Phase 4>

## Verdict
- Thesis is **<well-supported | thinly-supported | unsupported>**.
- Strongest counter is **<engaged | dodged | missing>**.
- <N> load-bearing premises are unstated; <N> should be made explicit because <reason>.

## Proposed next steps
1. <specific edit suggestion tied to the coverage gap>
2. <if any premise is unstated and the reader would not assume it, propose adding it>
```

Do not propose rewrites for individual sentences — that's `polish` or `clarify`. `argue` proposes structural moves: address the counter, surface the premise, drop the claim.

## When `argue` does not apply

- **Narrative or descriptive prose.** Stories don't have theses; descriptions don't have arguments. Exit politely: "This piece doesn't have an argumentative shape; try `pace` or `clarify` instead."
- **Multi-thesis pieces** (essays that argue several things). Phase 1 surfaces all the candidates; if the writer picks "Other" with multiple claims, run `argue` once per thesis or ask which one matters most.
- **First drafts.** `argue` is for settled drafts. Running it on a first draft produces "your argument has gaps" findings that the writer hasn't gotten to yet. Wait for the second or third pass.

## Anti-patterns

- **Inferring the thesis silently.** Phase 1's multi-choice gate is non-negotiable. Without it, the rest of the command is built on a guess.
- **Generating a weak steelman.** A counter the writer can dismiss in one sentence is not a steelman; it's a strawman. If you can't generate a strong one, flag: "I can't find a strong counter to this thesis — the piece may be unfalsifiable, or I'm missing genre context."
- **Three medium counters instead of one strong one.** The steelman discipline is *the strongest*, singular. Three counters dilute the test.
- **Flagging every implicit assumption.** Only load-bearing ones. A trivially-implied assumption ("the reader knows what a database is") is not load-bearing.
- **Treating rhetorical claims as supports.** "AI is changing everything" is the thesis, not a support for itself.
- **Running `argue` on every revision.** Once per draft. The command is slow and the answer doesn't move paragraph-by-paragraph.
- **Editing the file.** `argue` proposes structural moves — "address the counter in section X" — never line-level rewrites.
