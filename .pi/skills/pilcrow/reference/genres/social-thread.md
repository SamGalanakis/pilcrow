---
slug: social-thread
parent: social
description: Multi-post sequence on one topic.
aloud_default: false
---

# social-thread

A numbered sequence of posts advancing one argument or story across a feed. The reader arrived because the first post delivered its own beat; each subsequent post earns the tap, and the thread pays off in the final post or doesn't get reshared.

## Demands
- the first post is a complete idea by itself: strong enough to be quoted without the rest, and good enough that someone who never reads post 2 still got value
- each post in the run advances the argument: new fact, new turn, new objection, new beat; never a paraphrase of the previous post
- the close lands somewhere different from the open: a verdict, a number, a surprise, a call, not "those are my thoughts, follow for more"
- length is auditioned: every post that could collapse into the previous one without loss is one post too many

## Forbids
- (1/X) numbering attached to a thread that didn't need numbers; the form is a tell when the content is three posts dressed as twelve
- the "bookmark this thread" / "follow me for more threads like this" closer; the engagement-bait closing move
- screenshot-of-essay broken into posts; threads pace for the feed, not the page

## Tolerates
- repetition where the thread genuinely returns to a hook (callback in post 8 to the question in post 1)
- one-line posts, dropped subjects, fragments; the form rewards tight beats
- a single image / chart per beat, used as evidence not decoration

## Common AI tells
- explainer-thread shape: post 1 "here's why X matters", post 2 "first, some context", post 3 generic definition, real point at post 9 (buried-lede in thread form)
- parallel-anaphora run where every post opens identically (`1/ The thing about X…  2/ The thing about Y…  3/ The thing about Z…`)
- listicle-as-thread: each post `Lesson N: <generic abstraction>` with no scene, no number, no named person

## LLM lint additions

### social-thread-spread-thin
- **name:** Thread spread thin
- **severity:** warning
- **description:** The thread runs 8+ posts but the substance compresses to ~4 sentences. Each post adds framing, transition, or rephrase rather than a new fact, turn, objection, or beat. Collapse adjacent posts whose information is identical.
- **positive:** "Post 4 names the specific config change. Post 5 shows the dashboard. Post 6 names the responder's mental model at the moment the alert fired. Each post moves."
- **negative:** "Post 4: This is where it gets interesting. Post 5: Stick with me. Post 6: The thing is, the system was complex. Post 7: Really complex. (Four posts, one sentence of content.)"

### social-thread-hollow-hook
- **name:** Hollow hook
- **severity:** warning
- **description:** Post 1 promises a payoff the thread doesn't deliver: `here's what I learned`, `the answer surprised me`, `most people get this wrong`. The hook is engagement framing, not a load-bearing claim the rest of the thread defends.
- **positive:** "p99 dropped 42% the week we removed the cache. Counterintuitive: here's the trace that explains it."
- **negative:** "Most engineers get caching wrong. Here's what I've learned after 10 years building systems. 🧵 (1/14)"

## References
- [Visakan Veerasamy, *twitter threads solve the fragmentation problem*](https://www.visakanv.com/blog/threading/) · [Patrick McKenzie, *Salary Negotiation* (greatest-hits)](https://www.kalzumeus.com/greatest-hits/) · [Paul Graham, *Writing, Briefly*](https://paulgraham.com/writing44.html)
