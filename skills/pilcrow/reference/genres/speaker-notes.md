---
slug: speaker-notes
parent: presentations
description: Prose underneath each slide; closer to aural.
aloud_default: true
---

# speaker-notes

Cues a human who is about to say this aloud, not text the audience will read. The "reader" is the speaker themselves at rehearsal and again two minutes before going on; they want a phrase that triggers the right beat, the transition into the next slide, and a few load-bearing numbers; they don't want a script to recite (Anderson distinguishes scripted from unprepared).

## Demands
- speaker-facing, not audience-facing: written in the cues and stage directions of the spoken talk, not the prose of the article version
- one beat per slide, written as the *bridge* into the next slide as well as the point of this one (Duarte's contrast structure: what is, what could be)
- numbers, names, and quotations spelled out for the mouth (`forty-two percent`, not `42%`); units pronounced (`p-ninety-nine`)
- explicit time cues for opener, closer, and any STAR-moment beat the speaker wants memorized verbatim (Anderson: memorize opening and closing)

## Forbids
- the verbatim script: paragraph prose under every slide that mirrors the slide, with the speaker tempted to read it aloud
- repeating the slide text in the notes (the slide is already on screen); the notes earn their space by saying what the slide can't
- audience-register marketing copy in the notes (`Our revolutionary platform unlocks …`); the notes leak into the talk

## Tolerates
- fragments, dashes, ALL-CAPS for emphasis the speaker should hit (`SLOW HERE`, `PAUSE: let the chart land`)
- second-person addressed to the speaker (`take a breath; check the back row`)
- stage directions in brackets (`[click to next slide]`, `[pause for laugh]`, `[if running long, skip the Aurora anecdote]`)
- inside-baseball that the speaker won't say aloud but needs as a hook (`Q3 retro: the one Alex ran`)

## Common AI tells
- the verbatim-script note that reads like a polished article paragraph: the form defeated; the assistant defaulted to prose
- present-participle tails (`, highlighting the importance of caching strategies`); written for an audience, not a speaker
- the from-X-to-Y sweep in the opener cue (`From healthcare to finance, every industry is being reshaped`); survey tone in talking points
- audience-flattering sycophancy in the opener (`What a fantastic audience, what a privilege to be here`)

## LLM lint additions

### speaker-notes-script-creep
- **name:** Script creep
- **severity:** warning
- **description:** Notes drift from cues into verbatim sentences the speaker will be tempted to read aloud. The form is the tell: three or more complete sentences in formal register under a single slide.
- **positive:** "[click] cache misses doubled, Q3. landed the staging-VPC change. PAUSE. → next: what we did"
- **negative:** "In the third quarter of last year, our cache-miss rate doubled. This was largely the result of changes to our staging-replica VPC, and it had significant downstream effects on user-facing latency."

## References
- [Chris Anderson, *TED Talks: The Official TED Guide to Public Speaking*](https://www.amazon.com/TED-Talks-Official-Public-Speaking/dp/1328710289) · [TEDx Speaker Guide (official)](https://storage.ted.com/tedx/manuals/tedx_speaker_guide.pdf) · [Nancy Duarte, *Resonate*: STAR moments and contrast structure](https://www.duarte.com/resources/books/resonate/)
