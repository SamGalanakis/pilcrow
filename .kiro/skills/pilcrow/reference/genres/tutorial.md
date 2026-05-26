---
slug: tutorial
parent: documentation
description: Step-by-step learning-oriented doc; Diátaxis tutorial.
aloud_default: false
---

# tutorial

Teaches a beginner by doing. The reader arrives with hands on the keyboard; they don't need the *why* yet, they need to type the next command and see the expected result.

## Demands
- show the destination in the first scroll: "by the end you'll have X running locally" with a screenshot or sample output (Procida)
- each step ends in observable output the reader can compare against (`you should see → ...`); no run of >3 commands without a checkpoint
- every command runnable verbatim, including version pins and prereqs at the top; broken or assumed-installed paths are the failure mode (Procida §10)
- one happy path only; alternatives, edge cases, and configuration variants get cut or sent elsewhere
## Forbids
- mid-tutorial explanation drift; when the writer pauses to teach the *why*, the reader loses momentum and the page becomes an explanation
- decision branching ("if you're on Windows, see…"); collapse to one OS or write three tutorials
- "for advanced users" asides; the audience is beginners by definition

## Tolerates
- repetition the experienced reader finds tedious (`run npm install again`); beginners need the reassurance
- dense prereq blocks at the top; readers expect them
- a closing "what you just did" recap that names the steps in past tense, then signposts to the explanation page

## Common AI tells
- "comprehensive" tutorials that cover the full feature surface: the AI default; real tutorials cut ruthlessly to one happy path
- preamble paragraphs framing what the reader will learn before any step appears (`In this tutorial, we'll explore…`)
- skipped intermediate steps the model assumes are obvious (`now configure the database` with no command)

## LLM lint additions

### tutorial-no-checkpoint
- **name:** Missing checkpoint
- **severity:** warning
- **description:** A run of 3+ commands or actions with no observable-output checkpoint (`you should see`, expected output, screenshot reference). Beginners lose orientation; one wrong character three steps back becomes unrecoverable.
- **positive:** "Run `npm run dev`. You should see `Listening on http://localhost:3000` in the terminal."
- **negative:** "Run `npm install`. Then run `npm run build`. Then run `npm run dev`. Then open your browser."

### tutorial-explanation-drift
- **name:** Explanation drift
- **severity:** warning
- **description:** The tutorial pauses to teach why a concept works (>2 sentences of conceptual prose between actions). Tutorials are learning-by-doing; the *why* belongs in the explanation page linked at the end.
- **positive:** "Run `pilcrow audit README.md`. You should see findings listed by file."
- **negative:** "Run `pilcrow audit README.md`. Audit works by combining deterministic regex rules with LLM-judged checks; this hybrid approach allows pilcrow to catch patterns that pure pattern matching would miss, while staying fast on the common case."

## References
- [Procida, *Diátaxis: Tutorials*](https://diataxis.fr/tutorials/) · [Django, *Writing your first Django app, Part 1*](https://docs.djangoproject.com/en/stable/intro/tutorial01/) · [Svelte team, *Svelte interactive tutorial*](https://svelte.dev/tutorial)
