---
slug: feature
parent: reportorial
description: Longform journalism. Narrative-driven reportage.
aloud_default: false
---

# feature

Reports a subject to a reader who has the time and wants the texture: scene, character, status detail, the writer's earned point of view. The piece earns its length by showing what the news version had to compress out: the room, the silence between answers, the contradiction the subject hasn't noticed about himself.

## Demands
- a load-bearing scene in the first scroll: sensory, dated, located; not a stage-set abstract (Wolfe's "scene by scene construction")
- a central tension named before the reader is asked to care: a subject in conflict with himself, with another party, with the institution around him
- reporting that names what the writer saw vs. what the writer was told vs. what the writer infers; separate registers, never collapsed
- status detail (what the subject wears, owns, surrounds himself with) used to characterize, not to decorate (Talese on Sinatra's grey hairpiece)

## Forbids
- composite scenes presented as a single witnessed moment; if the moment is stitched from three visits, the piece says so
- dialogue reconstructed from memory or notes presented in quotation marks without a sourcing note
- the "I asked, he said, I followed up" register that turns a feature into a transcript; the writer is a narrator, not a stenographer

## Tolerates
- a 60-word opening sentence that performs the scene's pacing; cadence rules cede to scene-craft here
- long stretches without attribution where the writer's reporting is doing the seeing; sources cluster in a later passage
- a subject the writer plainly likes or dislikes, where the stance is earned by reporting and the writer says so

## Common AI tells
- panoramic openers (`On a crisp October morning…`) substituted for a specific moment; the model knows the shape of a scene without the scene
- universal-truth closers that promote the subject into a stand-in for an Era; the feature is about one person, not the human condition
- decorative status detail that doesn't characterize; `his sleek black laptop` reads like prop direction, not observation

## LLM lint additions

### feature-scene-without-stakes
- **name:** Scene without stakes
- **severity:** warning
- **description:** A scene runs for more than a paragraph (sensory detail, blocking, dialogue) with no consequence anchored to it; nobody loses, gains, decides, or reveals anything the reader can carry forward. Scene that doesn't move the piece is set-dressing.
- **positive:** "The senator unfolded the napkin twice before answering. When he did, the staffer in the corner stopped typing; the campaign had a new line, and she would have to fit it to the schedule before midnight."
- **negative:** "Sunlight slanted through the cafe windows. The senator stirred his coffee. The waiter refilled the water glass. Outside, a bus passed."

### feature-universal-truth-closer
- **name:** Universal-truth closer
- **severity:** warning
- **description:** The final paragraph generalizes the subject into a parable about an era, a generation, or the human condition. Close on the specific (a return to the opening scene, a remaining question, an image), not the takeaway.
- **positive:** "He locked the back door and pulled the shade. The light over the sign would stay on another week."
- **negative:** "In the end, his story is the story of every American who came of age in the long shadow of the postwar dream."

## References
- [Gay Talese, *Frank Sinatra Has a Cold* (Esquire, 1966)](https://classic.esquire.com/article/1966/4/1/frank-sinatra-has-a-cold) · [Tom Wolfe, *The New Journalism* (1973, Princeton archive PDF)](https://commons.princeton.edu/hum583-f25/wp-content/uploads/sites/461/2025/09/wolfe-newjournalism.pdf) · [Janet Malcolm, *The Journalist and the Murderer*](https://en.wikipedia.org/wiki/The_Journalist_and_the_Murderer) · [Ta-Nehisi Coates, *The Case for Reparations* (The Atlantic, 2014)](https://www.theatlantic.com/magazine/archive/2014/06/the-case-for-reparations/361631/)
