---
slug: email
parent: correspondence
description: Longer-form correspondence.
aloud_default: false
---

# email

Reaches a busy individual whose inbox is already at 800. The reader scans the first three lines on a phone, decides whether to engage, and acts; they want to know what is being asked, by when, and why they specifically are the right person to receive this.

## Demands
- subject line is the lede, not a category (`Need your call on the Aurora migration date by Thu` beats `Aurora migration`)
- the ask in the first three lines and answerable without scrolling; deadline named in calendar form (`by Thu Apr 30 EOD PT`), not "ASAP"
- one ask per email; if there are two, send two
- a single closing line that names what happens next (`I'll proceed unless I hear back by Thursday`); not a chat sign-off

## Forbids
- throat-clearing openers (`Hope you're well`, `Hope this finds you`, `Just wanted to check in`, `Quick question` followed by a slow one)
- buried ask: the actual request beneath context the reader could have read after acting
- `circling back`, `following up on my last email`, `per my last email`, `bumping this` as the lede; if you must nudge, nudge with new information

## Tolerates
- a one-line context preface where the recipient genuinely needs the frame (`Context: you owned the staging VPC last quarter.`); explicit, not preamble
- long technical paragraphs *below* the ask; the reader has already decided whether to read them
- dropping greeting and signature in ongoing threads with someone you write to weekly

## Common AI tells
- the wellness opener (`I hope this email finds you well`): fossil-class throat-clearing
- chat sign-offs leaked from training data (`Let me know if you have any questions!`, `Happy to provide more details!`)
- generic compliments before the ask (`Loved your recent post on …`); sycophant warm-up; cut or make specific

## LLM lint additions

### email-throat-clearing
- **name:** Throat-clearing opener
- **severity:** error
- **description:** Email opens with a wellness or check-in formula (`Hope you're well`, `Hope this finds you well`, `Just wanted to check in`, `Quick question`, `Sorry to bother you`) instead of the ask.
- **positive:** "Can you sign off on the Aurora migration date (Thu Apr 30)? I'll proceed unless I hear back."
- **negative:** "Hope this finds you well! I just wanted to quickly check in about the Aurora migration when you get a chance."

### email-buried-ask
- **name:** Buried ask
- **severity:** warning
- **description:** The actual request sits below the first three lines, after context or pleasantries. A reader scanning on a phone closes the email before reaching it.
- **positive:** "Ask: can you approve the staging Aurora VPC change for Thu Apr 30?  \nContext below."
- **negative:** "I wanted to give some background on our staging setup, our recent reliability work, and where things stand before getting to a small ask at the end."

## References
- [Patrick McKenzie, *Salary Negotiation: Make More Money, Be More Valued*](https://www.kalzumeus.com/2012/01/23/salary-negotiation/) · [Patrick McKenzie, *You Should Probably Send More Email Than You Do*](https://www.kalzumeus.com/2012/05/31/can-i-get-your-email/) · [William Zinsser, *On Writing Well*, letters chapter](https://www.harpercollins.com/products/on-writing-well-william-zinsser)
