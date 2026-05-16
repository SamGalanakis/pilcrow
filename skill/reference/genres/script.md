---
slug: script
parent: narrative
description: Dramatic dialogue, scene-headed prose for performance.
aloud_default: true
---

# script

Prose meant to be performed: staged for an actor's mouth and a camera's eye, not a reader's silence. The reader (editor, actor, director) brings genre literacy and is scanning for *what someone wants right now*; anything that isn't action or speech in service of that want is dead weight.

## Demands
- every scene has a protagonist with a pressing need, a present-tense obstacle, and a turn; Mamet's *who wants what, what happens if they don't get it, why now*
- subtext over text: characters pursue a goal sideways and the audience reads the goal through the friction (McKee on on-the-nose)
- action lines in present tense, third-person, only what the camera sees; no interior reportage (`she remembers her mother` is uncameraable)
- format conventions hold: scene headings (`INT. KITCHEN - NIGHT`), CHARACTER name centered above the line, parentheticals only where direction is otherwise ambiguous

## Forbids
- on-the-nose dialogue where the character states feeling, intent, or backstory the scene is meant to dramatize (`I'm angry because my father left when I was six`)
- two characters discussing an absent third for the audience's benefit; Mamet's expository scene tell
- novelistic action lines that report unfilmable interior states (`he felt the old fear return`)

## Tolerates
- white space: action paragraphs of one or two lines; scenes that end on a beat with no closing summary
- repetition of a charged phrase across scenes when the repetition itself is the dramatic structure

## Common AI tells
- monologue speeches where two pages of one character's eloquence stand in for a scene
- evenly distributed dialogue: every character speaks in the same register, no accent of want
- as-you-know-Bob exposition between intimates (`As you know, our mother died in 1997…`)
- weather-and-establishing opener that has no scene work in it; pure atmosphere

## LLM lint additions

### script-on-the-nose-dialogue
- **name:** On-the-nose dialogue
- **severity:** warning
- **description:** A character speaks the scene's emotional or thematic content directly: naming the feeling, stating the want, or summarizing the backstory the scene is supposed to dramatize. Rewrite so the want is pursued sideways and the audience infers it from the friction.
- **positive:** "MAYA: You said seven. (beat) DAD: I said I'd try for seven."
- **negative:** "MAYA: I'm angry that you're late again, Dad, because it makes me feel like I'm not a priority in your life."

### script-uncameraable-action
- **name:** Uncameraable action line
- **severity:** warning
- **description:** Action lines describe interior states, memories, or knowledge the camera cannot photograph (`she remembers`, `he knows`, `she has always feared`). Translate to a visible behavior or cut.
- **positive:** "She stops at the door. Looks at the photograph. Turns the frame face-down."
- **negative:** "She remembers the summer her father left, and a familiar dread rises in her chest."

## References
- [David Mamet's memo to *The Unit* writers (No Film School)](https://nofilmschool.com/2010/10/david-mamet-drama-a-memo-the-unit-writers) · [Robert McKee, *How to Bring Subtext to the Surface Without Writing on the Nose*](https://mckeestory.com/how-to-bring-subtext-to-the-surface-without-writing-on-the-nose/) · [John Yorke, *Into the Woods* (author site)](https://www.johnyorkestory.com/five-act-structure/)
