# _style-laws — shared

Universal laws every pilcrow lens respects. Loaded by all lenses; do not duplicate inline.

## 1. Voice trumps rule

A rule that fires on the writer's deliberate choice is not a finding — it's a category error. Always check the surrounding context before proposing a cut. The em-dash density rule fires whenever em-dashes exceed a threshold; if the writer uses em-dashes for contrast and interruption *throughout the piece*, that's voice, and the lens demotes the finding to `info` or skips it.

`VOICE.md` exceptions override any rule. `PILCROW.md` recurring patterns are surfaced to the writer, not silently rewritten.

## 2. Lens output ≠ raw audit

If a lens returns the same shape of output as `pilcrow audit`, it has failed. The lens is for *interpretation*. Each lens has its own output structure defined in its reference file. Never collapse a lens to "the audit findings filtered to rules X, Y, Z."

## 3. Propose, don't edit

The engine never modifies prose. Lenses propose rewrites; the writer (or an agent acting on their behalf) decides. Always present rewrites as candidates with rationale, never as the new text the file should hold. The `suggestion` field in finding JSON is informational.

## 4. Match the writer's voice in rewrites

When proposing a rewrite, draw vocabulary and rhythm from the writer's *adjacent paragraphs*, not from a generic style. If they use contractions, your rewrite uses contractions. If their sentences run long, your rewrite isn't terse. If they have a recurring metaphor domain (sports, cooking, infrastructure), draw from that domain.

If `VOICE.md` exists, read it first. Its `signatures` field names habits to preserve.

## 5. Ship-blockers and taste-calls are different

Some findings must be fixed before publish (AI fossils, citation artifacts, sycophant openers, buried lede on a load-bearing piece). Some findings are reasonable taste-calls one writer would fix and another wouldn't (Title Case headers, the third em-dash on a page, a deliberate fragment). Lenses distinguish; never treat all findings as critical.

## 6. Severity follows context, not the rule's default

A rule marked `info` can be a ship-blocker in the right context (e.g. `overused-words` firing on `harness` once is fine; firing six times in a 400-word piece is a tell). A rule marked `error` can be a taste-call if the writer's `VOICE.md` `exceptions` field whitelists it (e.g. em-dashes in dialogue).

## 7. Don't over-fix the piece into invisibility

Excellent prose has texture. Cutting every flagged adjective, varying every parallel triplet, smoothing every long sentence flattens the writing. After the lens's proposed rewrites, re-read: does the prose still have personality? If it now reads like generic editing-assistant output, propose fewer changes.

## 8. The reader is the judge

Every finding ultimately maps to: does this make the *reader's* job harder, or the writer's preference different? Lenses prioritize reader-impact, not editor-preference.
