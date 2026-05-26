---
slug: op-ed
parent: argumentative
description: Short, current-events-hooked argument with a single claim.
aloud_default: false
---

# op-ed

650–800 words for a reader who is skimming the page next to a coffee. The reader brings five minutes of attention and the day's news; they want one sharp claim, hooked to a fresh event, defended fast.

## Demands
- a news peg in the first two sentences: the dated event, ruling, study, or moment that makes the argument timely now
- exactly one thesis, stated explicitly inside the first scroll; op-eds with two arguments lose both (OpEd Project)
- the writer has standing the reader can audit: the credential, the experience, the dataset that makes this writer the right one to argue this
- a concrete recommendation, prediction, or stake; the piece ends with something *to do*, *to believe*, or *to expect*, not a vibe

## Forbids
- two-handed economist close (`but at the end of the day, both sides have a point`); the form is argument, not balance
- thesis withheld for narrative effect; op-ed is not essay, and the lede *is* the claim
- 1,200-word drift; the genre's editor will cut for length and the cut will be your weakest paragraph

## Tolerates
- a single rhetorical question if it carries weight; one anecdote opening if it pegs to the news
- pointed first-person where the writer's standing is the credential; sharp adjectives the op-ed page would otherwise blunt

## Common AI tells
- the timeless-hook opener (`Throughout history, debates over X have shaped societies`) with no current event
- the false-balance close: argument throughout, then a final paragraph that gives the opposition its due and dilutes everything before it
- generic civic-voice register (`We must come together as a nation to…`) that could have been any column on any topic
- evergreen-hedge language (`many would argue`, `it could be said`); op-eds commit; this voice doesn't

## LLM lint additions

### op-ed-news-peg-missing
- **name:** Missing news peg
- **severity:** error
- **description:** The opening does not anchor to a specific, recent, dated event: ruling, election, study, statement, anniversary. Op-ed editors reject for absence of news peg; flag any opener that could have run six months ago or six months from now unchanged.
- **positive:** "Last Tuesday's Supreme Court ruling in *Carter v. Vance* changes who pays for water in the West, and the West isn't ready."
- **negative:** "Throughout American history, the question of water rights has been a contentious one with significant implications for communities."

### op-ed-double-thesis
- **name:** Double thesis
- **severity:** warning
- **description:** The piece argues two distinct claims that can't be collapsed into one (e.g., "X policy is wrong" *and* "the media misreported X."). Op-eds win one argument; flag any draft whose conclusion has to defend two.
- **positive:** "The school-board recall is not about books. It's a campaign by a single donor to take control of a $400m budget."
- **negative:** "The school-board recall is not really about books, and also the coverage by local media has badly misrepresented the financial picture of the district."

## References
- [The OpEd Project, *Op-Ed Writing: The Basics*](https://www.theopedproject.org/resources) · [Christopher Hitchens, *Letters to a Young Contrarian* (Hachette)](https://www.hachettebookgroup.com/titles/christopher-hitchens/letters-to-a-young-contrarian/9780465030330/) · [Harvard Kennedy School, *How to Write an Op-Ed or Column* (Seglin)](https://projects.iq.harvard.edu/files/hks-communications-program/files/new_seglin_how_to_write_an_oped_1_25_17_7.pdf)
