---
slug: review
parent: argumentative
description: Verdict-plus-evidence assessment of a work or product.
aloud_default: false
---

# review

Verdict-plus-evidence on a specific work for a reader deciding whether to spend money, time, or attention on it. The reader brings curiosity about the work and a wariness about the critic's taste; they want a clear judgment, the textual evidence that earned it, and a voice they can calibrate against.

## Demands
- the verdict lands inside the first scroll: like, dislike, mixed-with-reasons; ambivalence is allowed, evasion is not (Kael, Ebert)
- evidence from the work itself: a specific scene, a quoted line, the brushwork in the third panel; not plot summary, not pull-quotes from the press kit
- the critic's stance is calibrated: what the critic generally likes, distrusts, brings to this work; the reader needs to know how to weight the verdict
- a position on the work's ambition vs. its execution: a fair review judges what the work was trying to do, then whether it did it

## Forbids
- plot recap as a substitute for argument; synopsis is not criticism, and the reader can read the dust jacket
- score-without-stakes (`7/10`, `★★★½`) that the prose doesn't earn back paragraph by paragraph
- bias-by-genre: pre-judging the work because of the category it belongs to (`another superhero movie, naturally…`) before engaging with the specific piece

## Tolerates
- first-person plural, the personal anecdote, the digression into the work's antecedents; Kael, Lane, Mendelsohn all do this
- a sharp adjective, an unkind verdict, a mixed verdict; refusal of the consensus take when the prose earns it

## Common AI tells
- the cataloguing review: three paragraphs each summarizing an act of the film, then a closing line of evaluation
- both-sides-and-the-other-side close (`Whether you'll enjoy it depends on what you're looking for`)
- press-kit register (`a visually stunning meditation on grief and resilience`); copy-shaped sentences indistinguishable from marketing
- generic-merit verbs (`delivers`, `offers`, `showcases`, `boasts`) where the critic's actual reaction belongs

## LLM lint additions

### review-verdict-absent
- **name:** Verdict absent from first scroll
- **severity:** error
- **description:** The review reaches the first scroll without a clear evaluative stance: like, dislike, or named ambivalence with a reason. Plot summary and context-setting are not stances. The reader needs to know what the critic thinks before being asked to keep reading.
- **positive:** "Anora is the best thing Sean Baker has made and also the most exhausting; the relentless first half earns the third act, but only just."
- **negative:** "Anora, the new film from Sean Baker, follows a young Brooklyn sex worker who marries the son of a Russian oligarch. The film premiered at Cannes and won the Palme d'Or."

### review-plot-recap-substitute
- **name:** Plot recap as criticism
- **severity:** warning
- **description:** A paragraph (or more) summarizes the work's plot, premise, or contents without making an evaluative observation about it. Synopsis-as-criticism; cut to the specific moment that earned the verdict instead.
- **positive:** "The setpiece in the second act, Ani's first walk through the oligarch's empty mansion, is where Baker's camera commits: it follows her past the marble, the gold, the wrong-sized furniture, and refuses to make any of it look beautiful."
- **negative:** "Ani is a sex worker in Brighton Beach who meets a young Russian client. They marry impulsively in Las Vegas. When his parents find out, they send three henchmen to bring him home."

## References
- [Roger Ebert, *How to read a movie*](https://www.rogerebert.com/roger-ebert/how-to-read-a-movie) · [Austin Film Society, *Read More Kael: Five of Her Most Notable Reviews*](https://www.austinfilm.org/2020/02/read-more-kael-five-of-her-most-notable-reviews/) · [Lester Bangs at Rock's Backpages](https://www.rocksbackpages.com/Library/Writer/lester-bangs) · [Anthony Lane, *Nobody's Perfect* (Goodreads)](https://www.goodreads.com/en/book/show/54890)
