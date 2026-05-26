---
slug: message
parent: correspondence
description: Slack / chat short-form.
aloud_default: false
---

# message

A line or two dropped into someone's notification stream. The reader sees a banner, decides in under a second whether to switch contexts, and either replies, reacts, or moves on; they want the point and a reason to care, in the space where a sentence used to live.

## Demands
- one or two sentences; if it needs three, it's a doc; link, don't paste
- the ask, status, or update lands in the first eight words (Fried: "writing solidifies, chat dissolves")
- thread the follow-ups; the top-level message is the headline, the thread is the substance
- @mention only the people you genuinely need from; broadcast pings are interruptions billed to a stranger

## Forbids
- the no-hello hello (`hey`, `quick q`, `you there?`, and then nothing) that asks for attention without spending it
- pasting a five-paragraph wall into the channel; the channel is not a doc store
- `bumping this`, `^^`, `@here ping` as the sole content of a follow-up message; nudging without information
- the chat-essay: a single sentence stretched over four lines with conjunctions and parentheticals (`So I was thinking, and this might be wrong, but maybe we …`)

## Tolerates
- fragments, lowercase starts, missing periods, emoji as punctuation if the room speaks that way
- a deliberate split across two messages where the second carries the ask the first set up (`re the Aurora replica:` ↵ `can you take the migration window Thursday?`)
- :+1: / :eyes: / :ack: reactions as acknowledgment in place of a reply
- code blocks, links, and screenshots that the room's audience already knows how to parse

## Common AI tells
- the essay-drift message: a paragraph in chat, often opening `So, just thinking out loud here, …`
- chat sign-offs imported to chat (`Let me know if you have any questions!`) where the room would never say them
- formal connectives (`Furthermore`, `Moreover`, `Additionally`) inside a one-line message
- the assistant's mid-thread thesis sentence (`To summarize, …`) when the thread is six lines long

## LLM lint additions

### message-essay-drift
- **name:** Essay drift in chat
- **severity:** warning
- **description:** Message reads as a paragraph (three or more sentences, formal connectives, no fragments) where the room's register is one or two lines. Move it to a thread, a doc, or rewrite as a one-line ask.
- **positive:** "Can you take the Aurora migration window Thursday? Details in :thread:"
- **negative:** "So I've been thinking about the Aurora migration. There are a few things to consider. First, the staging replica. Second, the VPC. Furthermore, the on-call schedule."

## References
- [Jason Fried & DHH, *REMOTE: Office Not Required*](https://basecamp.com/books/remote) · [37signals, *The Guide to Internal Communication*](https://basecamp.com/guides/how-we-communicate) · [Tom Critchlow, *Writing Cultures & Work*](https://notes.tomcritchlow.com/2021/12/01/writing-cultures-work.html)
