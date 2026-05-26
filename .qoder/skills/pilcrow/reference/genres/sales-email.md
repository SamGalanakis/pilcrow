---
slug: sales-email
parent: marketing
description: Outreach email shaped to a single response.
aloud_default: false
---

# sales-email

A cold or warm message designed to earn one reply: not a meeting, not a demo, a reply. The reader's inbox already has 40 like it this week; they will decide in three seconds whether to archive, and the decision is made on the preview pane (subject + first line + sender).

## Demands
- subject reads like a colleague wrote it, not a campaign: lowercase if your inbox is lowercase, no `[CASE STUDY]` brackets, no emoji
- first line is not about the sender; it is a specific observable thing about the recipient (a shipped feature, a hire, a public number) the sender can defend in a follow-up
- one ask, phrased so a one-word reply ("sure" / "send it" / "next week") closes the loop
- signature is a person with a job title, not a brand; McKenzie's "specific person at specific company" test

## Forbids
- the "Hope this finds you well" / "Hope you're having a great week" preamble; the reader archives the moment they see it
- fake-warm personalization (`I saw you're a big fan of X` from a scrape); the reader knows the scrape and resents it more than no personalization
- the multi-paragraph value-prop dump before the ask; sales emails are not landing pages

## Tolerates
- a P.S. that does real work (a specific concession, a deferred ask, a relevant link); P.S. is read more than the body
- a deliberately short body (≤ 75 words); Efti and McKenzie both endorse this; the reader counts paragraphs before reading words
- direct mention of price, scope, or timing in the first email; vague openers ("would love to chat") signal nothing to commit to

## Common AI tells
- the chatgpt-cold-email template: hook ("I noticed…") + bridge ("which made me think…") + soft ask ("would you be open to a 15-min chat?")
- compliment-then-pivot opener (`Loved your recent post on X, it really resonated`): the model's idea of warmth, the reader's idea of slop
- the false-specific personalization that names a public fact and adds nothing: `Saw you raised a Series B, congrats!`

## LLM lint additions

### sales-email-personalization-fake
- **name:** Fake-warm personalization
- **severity:** warning
- **description:** Opener references a public fact about the recipient (post, hire, raise, talk) but does not use it to do work in the email; no specific question, no relevant offer downstream. The reader recognizes the scrape.
- **positive:** "Your post on cache invalidation in monorepos lined up with a problem we just shipped a fix for at $COMPANY; happy to share the write-up if useful."
- **negative:** "I really enjoyed your recent post on engineering culture! It made me think about how $PRODUCT could help your team."

### sales-email-buried-ask
- **name:** Buried or absent ask
- **severity:** warning
- **description:** Email runs past three short paragraphs before naming what the sender wants, or names it so softly ("would love to chat sometime") that no one-word reply closes the loop.
- **positive:** "Worth a 20-minute call next Tuesday or Wednesday to see if it fits? Yes / no is fine."
- **negative:** "We'd love to explore opportunities to potentially collaborate and would welcome the chance to discuss further at your convenience."

## References
- [Patrick McKenzie, *Salary Negotiation*](https://www.kalzumeus.com/2012/01/23/salary-negotiation/) · [Patrick McKenzie, *Standing Invitation*](https://www.kalzumeus.com/standing-invitation/) · [Harry Dry, *Marketing Examples*](https://marketingexamples.com/copywriting) · [Steli Efti, Close.com cold-email archive](https://www.close.com/blog/cold-email)
