---
slug: bio
parent: personal
description: About-me prose: one-line, paragraph, or longer.
aloud_default: false
---

# bio

A short self-description for a website, a conference program, a podcast intro, a Twitter sidebar, or a book jacket. The reader is mid-decision (read the post? book the talk? follow the account?) and is testing whether this person is worth more of their attention; the bio either lands one specific, surprising, or load-bearing thing or it gets skimmed past.

## Demands
- a concrete fact a stranger can verify (a specific project, a company, a publication, a place, a number); the bio is anchored to one piece of public evidence
- third person if the surface demands it (speaker program, book jacket, masthead), first person if the surface tolerates it (personal site, Twitter); pick one and stay
- length sized to the surface: one line for a profile, two–three sentences for a site, one short paragraph for a jacket; never longer
- one element that no other person could have written: a specific past role, an unusual pairing of fields, a recurring topic, a town, a hobby that means something

## Forbids
- the credential pile with no work named (`engineer, writer, speaker, advisor, mentor, builder, thinker`); a list of nouns is not a bio
- abstract self-positioning (`passionate about technology and helping people`, `at the intersection of X and Y`); the X-and-Y phrase is the AI fingerprint of the form
- mission-statement register (`on a mission to empower builders to unlock their potential`); marketing-speak imported to a personal surface

## Tolerates
- humor, oddity, a single specific hobby ("plays bad chess", "keeps bees", "from a town no one has heard of"); voice is the whole point
- a one-line bio that is just a fact (`programmer. wrote X. lives in Berlin.`); fragments are correct here
- a confessional or self-deprecating note where the writer's other prose reads that way; the bio is a sample, so match the sample

## Common AI tells
- the X-and-Y intersection sentence (`writer, engineer, and educator working at the intersection of technology and storytelling`): generic credential-stack with the intersection cliché closing it
- title-case Capitalized Compounds as identity (`Engineer. Builder. Storyteller.`): three-noun fragment cadence imported from marketing
- the journey arc compressed to a sentence (`Her journey took her from finance to founding her own company`): narrative cliché where one specific role would do the work

## LLM lint additions

### bio-credential-pile
- **name:** Credential pile
- **severity:** warning
- **description:** The bio is a stack of credentials, role nouns, or self-positioning adjectives (`engineer, writer, speaker, advisor, mentor, builder`) with no specific project, company, place, or fact named. The reader cannot picture what the person actually does.
- **positive:** "Patrick McKenzie sells software to small businesses, writes long-form about software businesses at Kalzumeus, and works on infrastructure at Stripe."
- **negative:** "Patrick is an entrepreneur, writer, advisor, and builder passionate about software, business, and helping others succeed."

### bio-intersection-cliche
- **name:** Intersection-of-X-and-Y cliché
- **severity:** warning
- **description:** The bio positions the writer "at the intersection of X and Y", "where X meets Y", or as "a bridge between X and Y" with no specific work named. The framing is the AI bio fingerprint; replace with a project, a company, or a sentence about what the person actually did.
- **positive:** "She runs the security team at Acme; before that she wrote the Rust crate everyone uses for OAuth."
- **negative:** "She works at the intersection of security, engineering, and human-centered design."

## References
- [Paul Graham, *Bio*](https://paulgraham.com/bio.html) · [Maciej Cegłowski, *Pinboard: About*](https://pinboard.in/about) · [Patrick McKenzie, *About* (kalzumeus)](https://www.kalzumeus.com/about/) · [Visakan Veerasamy, *visakanv.com* (front page bio)](https://visakanv.com/)
