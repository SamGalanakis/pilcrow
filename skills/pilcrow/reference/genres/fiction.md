---
slug: fiction
parent: narrative
description: Narrative prose; consistent narrator, scene-grounded, voice-driven.
aloud_default: false
---

# fiction

Story for a reader who chose this over their phone. They bring imagination and a low tolerance for prose that sounds like prose; they want a world to step into and a voice they trust enough to follow off the path.

## Demands
- show, don't summarize, at every scene's load-bearing moment: the gesture, the object, the line of dialogue that makes the feeling unnecessary to name (Wood on free indirect style)
- free indirect style or first-person voice that lets the reader hear the character think; not the author explaining the character
- specificity that crowds the page: proper nouns, weather, the brand of cigarette, what's on the radio (Le Guin's "crowding")
- dialogue with subtext: characters say what people say, not what the plot needs them to say (McKee)

## Forbids
- adverbial dialogue tags as a habit (`she said quietly`, `he muttered angrily`); King's dandelion rule
- camera-narrator omniscience that floats above and explains motive in flat declarative
- "she felt X" / "he was Y" telling where a beat of action or dialogue would carry the same weight

## Tolerates
- ambiguity, unresolved interiority, withheld information; fiction is allowed to not explain
- registers shifting between narrator and characters; characters can talk like characters

## Common AI tells
- the workshop voice: every scene opens with weather and a sigh; every character has a coffee cup
- summary disguised as scene: paragraph of action with no concrete sensory anchor
- "she didn't know it yet, but…" foreshadowing as narrative shortcut
- emotion explicitly named immediately after it's shown (`her hands shook. she was nervous.`)

## LLM lint additions

### fiction-emotion-double-named
- **name:** Emotion shown then named
- **severity:** info
- **description:** A bodily or behavioral signal of emotion is immediately followed by a sentence that names the same emotion abstractly. The naming makes the showing redundant; cut the label.
- **positive:** "Her hands shook. She set the cup down before she dropped it."
- **negative:** "Her hands shook. She was nervous about what he might say next."

### fiction-adverb-dialogue-tag
- **name:** Adverb-modified dialogue tag
- **severity:** info
- **description:** A dialogue tag carries an `-ly` adverb doing the emotional work the line itself should do (`she said angrily`, `he whispered nervously`). Recast the line so the adverb is unnecessary, or replace the tag with a beat of action.
- **positive:** "\"Get out,\" she said. She did not look up from the paper."
- **negative:** "\"Get out,\" she said angrily, glaring at him furiously."

## References
- [Ursula K. Le Guin, *Steering the Craft* (official page)](https://www.ursulakleguin.com/steering-the-craft) · [George Saunders, *Story Club*](https://georgesaunders.substack.com/) · [James Wood, *How Fiction Works* (Macmillan)](https://us.macmillan.com/books/9781250183927/howfictionworks/) · [Stephen King on adverbs, via *The Marginalian*](https://www.themarginalian.org/2013/03/13/stephen-king-on-adverbs/)
