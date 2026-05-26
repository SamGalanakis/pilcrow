---
slug: memoir
parent: narrative
description: First-person retrospective narrative.
aloud_default: false
---

# memoir

A self looking back at an earlier self. The reader brings curiosity about how the writer became the writer and wants a persona honest enough to be unsparing on the version of itself that was wrong.

## Demands
- the situation *and* the story: what happened, and the wisdom the writer has come to about what happened; both load-bearing (Gornick)
- carnal detail: taste, smell, the weight of the room, the body's record of the moment (Karr)
- the persona is constructed and consistent: the looking-back self has a voice the reader recognizes by page two
- show the earlier self with the limits and stupidities intact; the retrospective self may comment but never rescues

## Forbids
- present-tense moral conclusions tacked on as the paragraph closer (`I realize now that…`, `looking back, I see…`) without earned reflection
- score-settling rendered as memoir; the writer who is always right in the scene is the writer the reader stops trusting
- composite characters or merged scenes presented without a note; truth-contract is the genre's load

## Tolerates
- a narrator whose memory is admitted to be partial; "I think she said" beats invented quotation
- digression into research, history, the writer's reading; memoir is allowed to think

## Common AI tells
- generic-childhood beats (`the smell of grandma's kitchen`, `the long summer afternoons`) with no specific object
- universalizing close (`and isn't that what we all carry?`); flattens the particular into the inspirational
- redemption-arc framing imposed on material that didn't earn it; trauma resolved in the last paragraph
- the persona absent: events happen, no voice metabolizes them

## LLM lint additions

### memoir-retrospective-overlay
- **name:** Retrospective-overlay sentence
- **severity:** warning
- **description:** A scene's emotional content is replaced by the older narrator's tidy interpretation (`I realize now…`, `what I didn't understand then was…`) without the scene first carrying the weight. The reflection is fine when the scene has earned it; flag when the line stands in for the scene.
- **positive:** "I lit the cigarette anyway. Years later I would learn what that gesture cost her; in the kitchen I only saw her hands go still."
- **negative:** "Looking back, I realize that this moment was when I began to understand the depth of my mother's quiet sacrifice."

### memoir-persona-absent
- **name:** Persona absent from the scene
- **severity:** warning
- **description:** A paragraph of memoir reads as third-person reportage of events the narrator was present for, with no interior register, no judgment, no voice; the constructed self has gone missing. Restore the persona's stance.
- **positive:** "He was drunk, of course; we'd built our week around his being drunk. I watched him try the door three times before I let him in."
- **negative:** "My father arrived home at 11pm. He had been drinking. He had difficulty with the door. Eventually he entered the house."

## References
- [Mary Karr, *The Art of Memoir* (Internet Archive)](https://archive.org/details/artofmemoir0000karr) · [Vivian Gornick, *The Situation and the Story* (Macmillan)](https://us.macmillan.com/books/9780374528584/thesituationandthestory/) · [Joan Didion, *Why I Write* (Literary Hub)](https://lithub.com/joan-didion-why-i-write/)
