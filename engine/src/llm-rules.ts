import type { Severity } from "./types.js";

export interface LlmRule {
  id: string;
  name: string;
  severity: Severity;
  description: string;
  positiveExample: string;
  negativeExample: string;
}

export const llmRules: LlmRule[] = [
  {
    id: "buried-lede",
    name: "Buried lede",
    severity: "error",
    description:
      "The piece's most important claim or finding is not in the first paragraph. The opening warms up instead of starting.",
    positiveExample:
      "Our migration cut p99 latency by 42%. Here's how. (Lede first.)",
    negativeExample:
      "In today's fast-paced world, systems face many demands. Teams must consider many factors. We undertook a migration. (Real news buried four paragraphs in.)",
  },
  {
    id: "voice-consistency",
    name: "Voice consistency",
    severity: "warning",
    description:
      "Voice/persona drifts between sections — formal opening, conversational middle, technical closing — with no narrative reason.",
    positiveExample:
      "A piece that maintains the same register from start to finish, or shifts register only at clear narrative beats.",
    negativeExample:
      "Section 1 opens with academic-detached prose; section 2 reads like a Slack message; section 3 switches to corporate-marketing voice. No structural reason for the shifts.",
  },
  {
    id: "mixed-metaphor",
    name: "Mixed metaphor",
    severity: "warning",
    description:
      "Two or more incompatible metaphors used together — picture-bending images that collide rather than reinforce.",
    positiveExample:
      "The plan was a tightrope: one wrong step and the whole team fell.",
    negativeExample:
      "The plan was a tightrope, and we had to keep all the plates spinning while pushing the ball down the field.",
  },
  {
    id: "claim-without-support",
    name: "Claim without support",
    severity: "error",
    description:
      "A non-trivial factual or evaluative claim is asserted without evidence, reasoning, citation, or example.",
    positiveExample:
      "Our cache hit ratio jumped from 71% to 94% (Grafana, week of March 12).",
    negativeExample:
      "This is the best architecture for scale. (No data, no comparison, no reasoning.)",
  },
  {
    id: "missing-stakes",
    name: "Missing stakes",
    severity: "warning",
    description:
      "The reader cannot answer 'so what / who cares / what changes' after reading. The piece describes without naming consequence.",
    positiveExample:
      "If we miss this deadline, the holiday launch slips and we lose the Q4 revenue we already booked.",
    negativeExample:
      "We discussed the trade-offs and reviewed the options thoroughly. (Reader has no idea what was at stake.)",
  },
  {
    id: "distinctive-vs-generic",
    name: "Distinctive vs generic",
    severity: "warning",
    description:
      "Prose could have been written by anyone (or any model). No specific detail, no authorial fingerprint, no opinion the writer would defend.",
    positiveExample:
      "Specific names, dates, numbers, judgments, and a recognizable narrator stance.",
    negativeExample:
      "Abstract claims about 'organizations', 'solutions', and 'best practices' without anyone, any date, or any number.",
  },
  {
    id: "abstract-without-concrete",
    name: "Abstract without concrete",
    severity: "warning",
    description:
      "Extended abstract reasoning runs for paragraphs without a grounding example, scene, number, or sensory detail.",
    positiveExample:
      "After three paragraphs of theory, an example: 'Here's what this looked like for the payments team last quarter.'",
    negativeExample:
      "Six paragraphs of 'systems', 'processes', and 'frameworks' with no concrete instance.",
  },
  {
    id: "showing-vs-telling",
    name: "Showing vs telling",
    severity: "info",
    description:
      "Narrative tells the reader what to feel or conclude instead of showing the evidence that produces the feeling/conclusion.",
    positiveExample:
      "She left the meeting without speaking and the door clicked behind her.",
    negativeExample:
      "She was furious and everyone could feel the tension.",
  },
  {
    id: "transition-coherence",
    name: "Transition coherence",
    severity: "warning",
    description:
      "Paragraphs do not logically connect — abrupt topic jumps, missing causal/temporal links, or 'list of points' structure where prose should flow.",
    positiveExample:
      "Each paragraph picks up a thread from the previous one and advances it.",
    negativeExample:
      "Paragraph 1 about caching. Paragraph 2 about team morale. Paragraph 3 about cost. No connective tissue.",
  },
  {
    id: "register-mismatch",
    name: "Register mismatch",
    severity: "info",
    description:
      "Formal and casual constructions sit side-by-side without intent — signals an untuned voice or AI-generated mash-up.",
    positiveExample:
      "Voice is consistently casual or consistently formal, with deliberate shifts.",
    negativeExample:
      "'Furthermore, the implementation leverages a robust caching layer (it's basically just Redis, lol).' — two registers smashed together.",
  },
  {
    id: "excessive-balance",
    name: "Excessive balance",
    severity: "warning",
    description:
      "Every claim earns a 'but' / 'however' / 'on the other hand'. Faux-balance flattens the piece's point and signals AI hedging.",
    positiveExample:
      "The writer takes a position and sticks with it, naming real counterarguments where they bite.",
    negativeExample:
      "Each paragraph proposes a view, then immediately walks it back with 'however'. By the end the reader has no idea what the writer thinks.",
  },
  {
    id: "redundant-thesis",
    name: "Redundant thesis restatement",
    severity: "info",
    description:
      "The opening and closing restate the same thesis in nearly identical words — a hallmark of AI structure-by-template.",
    positiveExample:
      "The opening sets a hook; the closing lands a different beat (a surprise, a stake, a call to action).",
    negativeExample:
      "Opening: 'AI is changing how we write.' Closing: 'In conclusion, AI is changing how we write.'",
  },
  {
    id: "marketing-template-cadence",
    name: "Marketing-template cadence",
    severity: "warning",
    description:
      "Stock AI hero-line shape: imperative fragment then tricolon expansion (\"Ship X. A Y, a Z, and N things for Q.\"). The template is the tell — content specificity doesn't redeem it.",
    positiveExample:
      "A prose linter. 49 deterministic rules, 19 LLM-judged ones. Detection-only.",
    negativeExample:
      "Mark up prose before it ships. A skill, a CLI, and forty-four rules for catching AI tells and writing-quality issues.",
  },
  {
    id: "sycophantic-tone",
    name: "Sycophantic tone",
    severity: "warning",
    description:
      "Whole-passage flattery: praising the reader, the prompt, the topic, or itself before delivering. Distinct from a single opener.",
    positiveExample:
      "Here's what we tried, what worked, and what didn't.",
    negativeExample:
      "What a fantastic topic — this is going to be such a rich and rewarding exploration of an area that truly matters.",
  },
  {
    id: "stakes-inflation",
    name: "Stakes inflation",
    severity: "warning",
    description:
      "World-historical or paradigm-shifting stakes attached to small features or routine changes. Inverse of missing-stakes.",
    positiveExample:
      "The new filter saved support ~20 tickets/week.",
    negativeExample:
      "This new sort filter is fundamentally reshaping how humanity interacts with information.",
  },
  {
    id: "false-reframe",
    name: "False reframe",
    severity: "warning",
    description:
      "The 'It's not X, it's Y' move performed without semantic content — Y is a paraphrase of X, or both are empty. Catches the rhetoric even when antithesis-cadence misses the surface form.",
    positiveExample:
      "Cutting build time from 11 min to 90 sec changed who shipped — the on-call eng now ships during the on-call.",
    negativeExample:
      "This isn't just about efficiency. It's about transformation.",
  },
  {
    id: "invented-concept-label",
    name: "Invented concept label",
    severity: "info",
    description:
      "A Capitalized Compound (\"The Engagement Doom Loop\", \"The Velocity Trap\") referred to as if established, without rigorous definition or citation.",
    positiveExample:
      "A coined term defined precisely on first use, then used consistently and supported with evidence.",
    negativeExample:
      "This is what I call the Engagement Doom Loop. The Engagement Doom Loop happens whenever teams …",
  },
  {
    id: "listicle-disguise",
    name: "Listicle in prose disguise",
    severity: "info",
    description:
      "Structurally a numbered list but flowed into paragraphs — each paragraph one item, all parallel shape, thin connective veneer.",
    positiveExample:
      "Argument paragraphs that build on each other and advance a position.",
    negativeExample:
      "The first thing is X. The second thing is Y. The third thing is Z. Each as a separate one-sentence paragraph.",
  },
  {
    id: "one-point-dilution",
    name: "One-point dilution",
    severity: "info",
    description:
      "A single idea restated under multiple framings instead of advancing the argument or supplying evidence.",
    positiveExample:
      "Each paragraph either adds evidence, raises an objection, or moves to the next claim.",
    negativeExample:
      "Five paragraphs that each say 'X is important' with different metaphors and no new fact.",
  },
  {
    id: "unsupported-claim",
    name: "Unsupported load-bearing claim",
    severity: "error",
    description:
      "A specific number, date, comparative, or named attribution that the argument relies on, with no citation and no way for the reader to audit it. Stricter than claim-without-support, which flags any unsupported claim; this fires only on claims the piece's argument actually depends on.",
    positiveExample:
      "Read latency dropped 42% (Grafana dashboard, week of March 12); the cache rewrite shipped April 3.",
    negativeExample:
      "Read latency dropped 42% after the cache rewrite. (No source, no date — the number carries the paragraph.)",
  },
];

export function buildCritiquePrompt(text: string, ruleIds?: string[]): string {
  const selected = ruleIds
    ? llmRules.filter((r) => ruleIds.includes(r.id))
    : llmRules;
  const ruleSpec = selected
    .map(
      (r, i) =>
        `${i + 1}. **${r.id}** (severity: ${r.severity}) — ${r.name}\n   ${r.description}\n   Good: ${r.positiveExample}\n   Bad: ${r.negativeExample}`,
    )
    .join("\n\n");
  return [
    "You are a tough editor. Critique the prose below against each of the listed patterns.",
    "Return ONLY valid JSON of shape: {\"findings\": [{\"ruleId\": string, \"severity\": \"error\"|\"warning\"|\"info\", \"line\": number, \"excerpt\": string, \"message\": string}]}.",
    "Use 1-indexed line numbers from the prose. Excerpt should be the offending span verbatim, up to 120 chars. Message: one sentence on what's wrong and how to fix.",
    "If a rule does not fire, omit it. Do not invent rules outside the list.",
    "",
    "## Patterns",
    ruleSpec,
    "",
    "## Prose",
    "```",
    text,
    "```",
  ].join("\n");
}

export interface LlmFinding {
  ruleId: string;
  severity: Severity;
  line: number;
  excerpt: string;
  message: string;
}

export function parseLlmFindings(jsonText: string): LlmFinding[] {
  const trimmed = jsonText.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
  const parsed = JSON.parse(trimmed);
  if (!parsed || !Array.isArray(parsed.findings)) {
    throw new Error("LLM response missing 'findings' array");
  }
  const validIds = new Set(llmRules.map((r) => r.id));
  return parsed.findings
    .filter((f: any) => validIds.has(f?.ruleId))
    .map((f: any) => ({
      ruleId: String(f.ruleId),
      severity: String(f.severity) as Severity,
      line: Number(f.line) || 1,
      excerpt: String(f.excerpt ?? ""),
      message: String(f.message ?? ""),
    }));
}
