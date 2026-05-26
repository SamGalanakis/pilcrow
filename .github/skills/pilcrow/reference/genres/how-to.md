---
slug: how-to
parent: documentation
description: Task-oriented doc; Diátaxis how-to. Assumes competence.
aloud_default: false
---

# how-to

Walks a competent user through a specific task they came to do. The reader already knows the tool's basics and the vocabulary; they searched a verb-phrase title (`how to rotate the signing key`) and want the answer fast. Unlike a tutorial, they may skim; write so they can.

## Demands
- title is a literal task (`How to <verb> <noun>`) and the page does exactly that, no more (Procida)
- prereqs in a short list at the top so the reader bounces before they're 60% through and missing a binary
- numbered steps when order matters, unordered when it doesn't; one outcome per step
- end on a verifiable success state (`the new key is now active in /etc/ssl/`) so the reader knows they're done; link alternates for forks (OS, version) rather than branching mid-page

## Forbids
- background sections, motivation paragraphs, "why this matters" framing; the reader brought their own motivation
- exhaustive flag/option enumeration; that's reference-docs territory and the reader will leave
- screenshots used in place of the exact command; they go stale, the command does not

## Tolerates
- abrupt openings with no lede ("Run `kubectl apply -f keys.yaml`."); the title was the lede
- omitted explanation of intermediate state; the audience is competent
- a closing "see also" linking to the explanation page if the reader wants the *why*

## Common AI tells
- bloated preamble paragraph re-introducing the tool ("Kubernetes is a container orchestration platform…") before the steps
- exhaustive "you might also want to…" sections that pad the page and dilute the task
- closing summary that restates the steps as bullets; the steps were already bullets

## LLM lint additions

### how-to-not-task-shaped
- **name:** Not task-shaped
- **severity:** warning
- **description:** The page drifts from "do X" into conceptual prose: paragraphs explaining how the system works, why this approach was chosen, or what trade-offs exist. That content belongs in an explanation page. A how-to is action-only.
- **positive:** "1. Generate the key: `openssl genrsa -out new.key 4096`. 2. Replace the existing key on each node…"
- **negative:** "Before rotating the key, it's worth understanding how the signing infrastructure works. The signer service was designed to support hot rotation because…"

### how-to-multi-task-page
- **name:** Multi-task page
- **severity:** info
- **description:** One how-to page covers two or more distinct tasks (`How to rotate the key and configure the new signer`). Split into separate pages; each task is a separate search query and a separate page.
- **positive:** "How to rotate the signing key": one task, one page; linked from "How to configure a new signer".
- **negative:** "How to rotate the signing key, also covers signer configuration, key revocation, and audit logging."

## References
- [Procida, *Diátaxis: How-to guides*](https://diataxis.fr/how-to-guides/) · [GitLab, *Documentation style guide*](https://docs.gitlab.com/development/documentation/styleguide/) · [Tom Johnson, *Documenting APIs: task topics*](https://idratherbewriting.com/learnapidoc/)
