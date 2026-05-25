---
slug: reference-docs
parent: documentation
description: Information-oriented doc; Diátaxis reference. Facts only.
aloud_default: false
---

# reference-docs

Describes the machinery. The reader knows what they're looking for (a parameter name, a return type, an error code, a flag) and arrives via search, in-app help, or a deep link. They don't read top to bottom; they consult.

## Demands
- structure mirrors the code: one entity per page or per anchored section; the order of headings matches the order of the source (Procida)
- each entry: signature, parameter table (name · type · default · description), return value, errors, one minimal example (Stripe, Vue.js API)
- consistent skeleton across every entry, stable anchors so other docs can deep-link
- short, complete examples: runnable, no `…`, no prose filler around them

## Forbids
- interpretation, recommendation, or opinion; "we recommend", "the best approach", "in most cases" belong in how-to or explanation, not here
- prose paragraphs over ~3 sentences; reference is consulted, not read
- marketing register or persuasive framing; `powerful`, `flexible`, `seamless` describe sales pages, not parameters

## Tolerates
- terse fragments where a complete sentence would dilute (`Returns: a User. Throws: NotFound if id missing.`)
- the same phrasing repeated across hundreds of entries; consistency beats prose variety
- jargon, acronyms, and type signatures with no gloss; the reader brought the vocabulary

## Common AI tells
- conversational throat-clearing inside entries (`This method allows you to…`, `If you want to retrieve a user, you can use…`) instead of `Retrieves a user by id.`
- inconsistent example shapes (different variable names, languages, or import styles across adjacent entries); the model writes each entry fresh instead of holding the skeleton
- inflated descriptions that restate the entry name (`The createUser method creates a new user.`)

## LLM lint additions

### reference-interpretation-creep
- **name:** Interpretation creep
- **severity:** warning
- **description:** A reference entry includes recommendation, opinion, or judgment (`we recommend`, `the best approach`, `prefer X over Y`, `in most cases`). Reference describes the machinery; guidance belongs in how-to or explanation. Move it or cut it.
- **positive:** "`timeout` (number, default 30): request timeout in seconds. Maximum 600."
- **negative:** "`timeout` (number, default 30): request timeout in seconds. We recommend keeping this low for interactive use, but in most cases you should test with your own workload to find the right value."

### reference-prose-creep
- **name:** Prose creep
- **severity:** warning
- **description:** An entry contains a paragraph of >3 sentences of running prose where a parameter list, table, or terse fragment would do. Reference is consulted, not read; every sentence of prose is a sentence the reader has to skim.
- **positive:** "Returns: `User`. Throws: `NotFound` if no user with that id exists. `Forbidden` if the caller lacks `users:read`."
- **negative:** "This method will return a User object representing the user that was retrieved. In the case that no user exists with the specified id, the method will throw a NotFound exception. Additionally, if the calling principal does not have the required permission…"

## References
- [Procida, *Diátaxis: Reference*](https://diataxis.fr/reference/) · [Stripe, *API reference*](https://docs.stripe.com/api) · [Vue.js, *API reference*](https://vuejs.org/api/) · [Tom Christie, *Django REST framework: documenting your API*](https://www.django-rest-framework.org/topics/documenting-your-api/)
