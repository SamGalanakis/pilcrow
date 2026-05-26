---
slug: social-post
parent: social
description: Single tweet / LinkedIn / Instagram post.
aloud_default: false
---

# social-post

A single self-contained post: tweet, LI status, IG caption. The reader is mid-scroll, owes nothing, gives the post one second to earn the next; the post delivers a complete beat in one screen or loses them.

## Demands
- the post stands alone: a stranger landing cold gets the whole point without a referent, a continuation, or a "context in replies"
- one observation, one image, one number, or one judgment; never two halves of an idea sharing the screen
- concrete unit attached to any claim (`saved ~20 tickets/week`, `cut p99 by 42%`); abstract claims die in this format
- a closing beat that actually closes: landing the joke, the verdict, or the surprise; no `…` cliffhanger pretending to be one

## Forbids
- thread-bait openers on what is structurally a single post (`a 🧵`, `here's why`, `(1/x)`) with no thread following
- engagement-farming framing (`RT if you agree`, `like for part 2`, `who else?`) written for the algorithm not the reader
- screenshot-of-paragraph dressed as a tweet; if it's an essay, link the essay

## Tolerates
- fragments, no-cap, one-line paragraphs, asymmetric punctuation; the format rewards compression
- direct address, "you", second person; the writer is in the room
- profanity, dry irony, slang where the writer's other posts read that way; voice is the product

## Common AI tells
- the bland-aphorism shape (`great writing is just thinking clearly`): true, generic, defendable by anyone, owned by no one
- the LinkedIn parable: short-line paragraphs, faux-vulnerability lede, single-word emphasis lines (`Listen.`), and a bullet-list inside the post
- the antithesis closer the model loves (`it's not about X. it's about Y.`) when X and Y are paraphrases

## LLM lint additions

### social-post-thread-bait
- **name:** Thread-bait on single post
- **severity:** warning
- **description:** The post opens like a thread (`a 🧵`, `here's why`, `(1/X)`, `let me explain`) but is structurally a single post with no continuation. The reader was promised a payload that never lands.
- **positive:** "We shipped the cache rewrite last night. p99 dropped from 1.4s to 380ms."
- **negative:** "Why your team's caching strategy is broken: a thread 🧵"

### social-post-engagement-farm
- **name:** Engagement-farm framing
- **severity:** warning
- **description:** The post asks for retweets, likes, or replies as the mechanic (`RT if you agree`, `like for part 2`, `who else has experienced this?`) rather than offering something the reader chooses to engage with. The shape is written for the feed algorithm, not the reader.
- **positive:** "The deploy pipeline accepted a config change with no canary at 02:14. Here's the timeline."
- **negative:** "RT if your team has ever shipped a Friday deploy 👇 Like for the postmortem in part 2."

## References
- [Visakan Veerasamy, *twitter threads solve the fragmentation problem*](https://www.visakanv.com/blog/threading/) · [Paul Graham, *Writing, Briefly*](https://paulgraham.com/writing44.html) · [Patrick McKenzie, *Greatest Hits* (kalzumeus)](https://www.kalzumeus.com/greatest-hits/) · [Maciej Cegłowski, *Pinboard: About*](https://pinboard.in/about)
