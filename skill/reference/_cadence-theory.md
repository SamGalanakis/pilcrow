# _cadence-theory — shared

Rhythm in prose. Loaded by `pace` and `polish`. Anchored in Stephen King's *On Writing*, Strunk & White on parallelism, and Gary Provost's much-quoted variation paragraph.

---

## The core observation

Prose has a beat. Sentence-by-sentence length alternation, paragraph weight, the use of fragments and runs, the placement of long sentences against short ones — these are how the prose *sounds* even when read silently. Readers don't notice rhythm consciously; they notice when it's missing.

AI prose tends toward uniform sentence length (mean ~18 words, low variance) and uniform paragraph weight (3–4 sentences each). The result is wallpaper.

## Provost's variation

> *"This sentence has five words. Here are five more words. Five-word sentences are fine. But several together become monotonous. Listen to what is happening. The writing is getting boring. The sound of it drones. It's like a stuck record. The ear demands some variety."*

The point isn't to write the way Provost does in that demo — the demo itself becomes monotonous in the opposite direction (every sentence short). The point is that *similar-length runs deaden the prose*. Mix.

---

## Variation targets

| Metric | Healthy | Failure mode |
|---|---|---|
| Sentence-length stdev | ≥ 4 across any 5-sentence window | < 4 — monotonous |
| Longest sentence | At least one ≥ 25 words per page | All sentences 15–22 — flat |
| Shortest sentence | At least one ≤ 8 words per page | No spikes — droning |
| Paragraph weight stdev | Healthy variation | Three+ paragraphs within ±15% of mean — wall-of-text |
| Fragments | 0–2 per page, deliberate | None (flat) or >5 (marketing punchy) |
| Parallel triplets | 1–3 per page | >5 — the AI rhythm |
| Em-dashes | <1.5 / 100 words OR characteristic of writer's voice | Default pause character |

## King on rhythm

> "*Short sentences hit. Long sentences carry.*"

A short sentence after three long ones lands. A long sentence after three short ones carries thought. The structure encodes emphasis.

**Convert a long sentence to a punctuation moment** by replacing a `, and` or `; ` with a period. The reader's eye and the reader's ear both pick up the pause.

**Insert a fragment** after a complex passage to seal it. Use sparingly — fragments compound.

> The cache rewrite touched 14 services, three regions, and a database the on-call hadn't logged into in a year. It held.

The fragment ("It held.") is the punctuation. A page of fragments is the failure mode.

---

## Strunk on parallelism

Parallel structures (`A, B, and C`; `She X-ed, she Y-ed, she Z-ed`) are *good in moderation*. They create rhythm, they group items, they emphasize completeness.

The AI rhythm comes from *unbroken* parallel structures: every paragraph has its triplet. Strunk would approve of the parallelism; he would also notice the rhythm becoming a metronome.

**The fix is not to remove parallelism.** It's to break runs of parallel structures. Keep the first triplet; recast the second; restructure the third.

---

## Anaphora — same-opener repetition

Three sentences in a row opening with the same word is a rhetorical device. Used once in a piece, it lands. Used twice, it's a habit. The command flags anaphora at MIN_RUN = 3 because that's the threshold where the device becomes audible.

Fix: drop the repeated subject in the second sentence (pronoun it); promote the consequence in the third; or recast entirely.

> **Before:** Performance matters here. Performance is what users notice. Performance shapes every decision.
> **After:** Performance matters here. Users notice it first. Every other decision follows.

---

## Aural rhythm (beyond word count)

Word count is a proxy. The real measure is sound. Two sentences of 14 words can read at very different speeds depending on:

- **Syllable count.** "The cache rewrite landed Tuesday" (8 syllables) ≠ "The methodological consideration was prolonged" (14 syllables).
- **Consonant clusters at word boundaries.** "Big strict tests" trips; "Big rigorous tests" doesn't.
- **Repeated initial sounds.** Alliteration in moderation is rhythm; in volume it's tongue-twister.
- **End-of-sentence rhyme.** Unintentional rhyme is distracting; sentences shouldn't rhyme unless the writer means them to.

The `pace` command runs an aural diagnostic pass for these.

---

## How editor commands use this file

- `pace` reads it as foundational theory; its rule-prioritization and rewrite-pattern decisions cite back here.
- `polish` consults it when triaging cadence findings (`sentence-length-monotony`, `paragraph-monotony`, `parallel-triplet-density`, `anaphora-cadence`, `fragment-cadence`).

Other editor commands don't load this file. Cadence is `pace`'s job.
