---
slug: cover-letter
parent: personal
description: Single-page application letter.
aloud_default: false
---

# cover-letter

A short letter that the CV cannot write itself: why *this* role at *this* company, with one piece of evidence the CV doesn't already carry. The reader has the CV open in another tab, has thirty seconds, and is testing whether the writer has read the job spec or sent the same letter to forty companies.

## Demands
- a first sentence that proves the letter is not a template: name the role, name something specific about the company or team the writer actually engaged with (a product decision, a public post, a known problem), and the writer's angle on it
- one piece of evidence the CV doesn't carry (a project shipped, a problem solved, a number, a named system), chosen because it answers *this* role, not the writer's greatest hits
- a clear ask: interview, conversation, next step, phrased in plain language, not "I would welcome the opportunity to discuss"
- length: one page at the absolute maximum; three short paragraphs is plenty

## Forbids
- the template opener (`I am writing to apply for the [Position] role at [Company]`, `Please find attached my resume for your consideration`) and the closing fossils (`I look forward to hearing from you at your earliest convenience`)
- adjective-stack self-rating with no proof (`I am a hardworking, passionate, detail-oriented team player who…`); every adjective is a debit; replace with a specific past action
- restating the CV in paragraph form; the reader has the CV, and the letter explains what the CV can't

## Tolerates
- a strong first-person voice, contractions, the writer's actual register; the letter is the one document where the reader hears the writer
- one sentence of opinion or angle on the company's work (the briefcase move: "I noticed the X your team shipped does not handle Y; here is how I'd approach Y")
- formatting plain: salutation, three paragraphs, sign-off; no headers, no bullets, no callout boxes

## Common AI tells
- the four-paragraph generated shape: paragraph 1 announces, paragraph 2 generic-praises, paragraph 3 paraphrases the CV, paragraph 4 thanks; the structure is the tell
- the `I am particularly drawn to your company's mission of empowering users to…` sentence, with the mission lifted verbatim from the careers page
- corporate softeners (`I would be thrilled to`, `It would be an honor to`, `I am incredibly excited about the opportunity to`); register-mismatch with anything said in the rest of the letter

## LLM lint additions

### cover-letter-template-feel
- **name:** Template-feel opener
- **severity:** error
- **description:** The opening sentence reads as a fill-in-the-blank template: `I am writing to apply for the [role] at [company]`, `Please accept this letter as my application for…`, `I came across your job posting and was excited to learn more about…`. The reader has seen a thousand of these and stops.
- **positive:** "Your team's post on the cache rewrite is what convinced me this role is mine to apply for; I shipped the equivalent migration at Acme last year and the failure modes you described are exactly the ones we hit."
- **negative:** "I am writing to express my strong interest in the Senior Engineer position at your company, which I came across on your careers page."

### cover-letter-self-rating
- **name:** Adjective-stack self-rating
- **severity:** warning
- **description:** The letter asserts personal qualities (`hardworking`, `detail-oriented`, `passionate`, `team player`, `excellent communicator`, `proven leader`) without a specific action that proves them. Adjective claims about oneself are negative evidence in this genre; the reader discounts them by default.
- **positive:** "When the payments outage hit Q3, I owned the timeline and the comms; the postmortem is public if you want the artefact."
- **negative:** "I am a hardworking, detail-oriented team player with a passion for building great products and excellent communication skills."

## References
- [Alison Green (Ask a Manager), *cover letters category*](https://www.askamanager.org/category/cover-letters) · [Aline Lerner, *Cold outreach to hiring managers* (interviewing.io)](https://interviewing.io/blog/how-to-get-in-the-door-at-top-companies-cold-out-reach-to-hiring-managers-part-2) · [Patrick McKenzie, *Don't Call Yourself A Programmer*](https://www.kalzumeus.com/2011/10/28/dont-call-yourself-a-programmer/) · [Ramit Sethi, *The Briefcase Technique*](https://www.iwillteachyoutoberich.com/how-to-sell-yourself/)
