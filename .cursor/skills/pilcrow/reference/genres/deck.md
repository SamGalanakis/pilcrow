---
slug: deck
parent: presentations
description: Slide-shaped prose; pitch deck, internal slides.
aloud_default: false
---

# deck

Slide text seen behind a speaker by an audience that can't pause, scroll, or zoom. The reader has six to fifteen seconds per slide while also listening; they want a visual anchor that confirms what the speaker just said and a phrase they can carry into the next slide, not a paragraph to read in parallel.

## Demands
- a slide title that makes a claim, not names a topic (`Cache misses doubled in Q3` beats `Cache performance`); Duarte's first move
- text sized so the back row reads it; one chart, one diagram, or one short list per slide
- a stake or number on every claim slide; a deck of titles with no numbers is a table of contents

## Forbids
- the slide-as-paragraph: full sentences with conjunctions and subclauses on the slide itself (Tufte: PowerPoint's bullets "dilute thought"; Reynolds: replace lists with images and one-idea slides)
- the feature-list slide: six bullets naming features with no claim about why the audience should care
- dense tables with more than ~12 cells the audience must scan while you talk; export to a handout
- the agenda slide repeated as the section-divider slide repeated as the closing-recap slide; three slides for the same content

## Tolerates
- fragments, dropped articles, telegraphic phrasing (`p99: 42% lower`); slide text is signage
- the same word repeated across consecutive slides if it's the through-line of the talk
- the deliberately blank slide that lets the speaker hold the room without competing visuals

## Common AI tells
- the bulleted feature-list slide (`Robust • Scalable • Seamless • Enterprise-ready`): vocabulary class, slide format
- the colon-headline pattern repeated as the deck's section style (`Caching: A Modern Approach`)
- the marketing-template tricolon as the closer slide (`Ship faster. Build smarter. Scale forever.`): fossil-class on a slide

## LLM lint additions

### deck-slide-paragraph
- **name:** Slide-as-paragraph
- **severity:** warning
- **description:** A slide's body text is a full grammatical paragraph (subject, verb, conjunction, subclause) rather than signage. The audience reads it instead of listening; the slide replaces the speaker.
- **positive:** "Cache misses doubled in Q3.  \ndriven by the staging-replica VPC change"
- **negative:** "In Q3, our cache-miss rate doubled, which was largely driven by changes we made to the staging-replica VPC, and this had downstream effects on p99 latency."

### deck-feature-list-slide
- **name:** Feature-list slide
- **severity:** warning
- **description:** Slide is a vertical list of feature names or capability labels (`Scalable • Robust • Secure`) with no claim about consequence or stake. The audience leaves with a vocabulary, not a point.
- **positive:** "Cut p99 latency 42%; the on-call eng now ships during the on-call."
- **negative:** "• Scalable infrastructure  \n• Robust monitoring  \n• Seamless deployments  \n• Enterprise-ready security"

## References
- [Edward Tufte, *The Cognitive Style of PowerPoint: Pitching Out Corrupts Within*](https://www.edwardtufte.com/book/the-cognitive-style-of-powerpoint-pitching-out-corrupts-within-ebook/) · [Garr Reynolds, *Presentation Zen*](https://presentationzen.com/) · [Nancy Duarte, *Resonate*](https://www.duarte.com/resources/books/resonate/) · [Nancy Duarte, *slide:ology*](https://www.duarte.com/resources/books/slideology/)
