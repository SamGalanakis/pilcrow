---
slug: essay
parent: argumentative
description: Personal-or-argumentative prose with a thesis the writer believes.
aloud_default: false
---

# essay

A writer thinking on the page in front of a reader who came for the thinking. The reader brings time, intelligence, and a question of their own; they want to leave with the writer's mind, not a summary of the topic.

## Demands
- the essay *discovers*: the close lands somewhere the opener didn't already know; if the conclusion is the thesis word-for-word, the essay didn't happen (Didion: writing to find out what I think)
- a recognizable narrator with a stance: first-person where the genre allows, but always a distinguishable mind; no view-from-nowhere
- specific instances do the argument's work: the anecdote, the named figure, the dated event the abstraction emerged from (Graham's "useful" writing)
- the strongest version of the counter-position is named in the writer's own words, not strawmanned

## Forbids
- five-paragraph-essay shape: intro-thesis, three supporting paragraphs, conclusion-thesis-restated; the academic template AI defaults to
- thesis-by-list (three reasons, four implications, five takeaways) when the form is argument, not enumeration
- generic-anyone ("we live in a world where…") framing that could have opened any essay on any topic

## Tolerates
- digression that earns its way back; an essay is allowed to walk in the woods if the walk changes the argument
- contradiction-with-itself; an essay may notice it disagrees with its own opening, and that's the form working

## Common AI tells
- "in this essay I will argue that…" opener; the meta-promise instead of the argument
- balanced-on-both-sides without the writer's stake: every paragraph reaches for `however`, no commitment lands
- the survey of viewpoints in place of the writer's view (`Some argue X. Others argue Y. Still others contend Z.`)
- invented academic-sounding categories capitalized as if real (`the Attention Economy`, `the Productivity Paradox`)

## LLM lint additions

### essay-thesis-promised-not-argued
- **name:** Promised thesis instead of argued thesis
- **severity:** warning
- **description:** The opening announces what the essay will do (`In this essay I'll argue…`, `This piece explores…`) instead of doing it. The promise is the AI structure-by-template tell; replace with the argument itself.
- **positive:** "Half of what software engineers call 'experience' is the memory of having seen this exact bug before."
- **negative:** "In this essay, I will explore the role of pattern-matching in what we call engineering experience and argue that experience is largely memory."

### essay-survey-without-stake
- **name:** Survey-of-views without a stake
- **severity:** warning
- **description:** A passage presents two or three positions in parallel (`some argue…`, `others contend…`, `still others suggest…`) without the writer committing to one. Essays are not lit reviews; flag when the survey replaces the argument.
- **positive:** "Cowen calls this stagnation; Thiel calls it the great stagnation; I think they're both describing what happens when a field runs out of cheap experiments. Here's why."
- **negative:** "Some economists argue we are stagnating. Others contend we are in a new phase of growth. Still others suggest the truth lies somewhere in between."

## References
- [Paul Graham, *Writing, Briefly*](https://paulgraham.com/writing44.html) · [Joan Didion, *Why I Write* (Literary Hub)](https://lithub.com/joan-didion-why-i-write/) · [Visakan Veerasamy, *Smart Writing*](https://www.visakanv.com/blog/smart-writing/)
