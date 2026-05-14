import { escapeRegex, findAll, makeFinding, preserveCase } from "../helpers.js";
import type { Rule } from "../types.js";

const REPLACEMENTS: Array<[string, string]> = [
  ["added bonus", "bonus"],
  ["free gift", "gift"],
  ["past history", "history"],
  ["end result", "result"],
  ["final outcome", "outcome"],
  ["absolute necessity", "necessity"],
  ["completely full", "full"],
  ["totally unique", "unique"],
  ["very unique", "unique"],
  ["close proximity", "proximity"],
  ["exact same", "same"],
  ["future plans", "plans"],
  ["unexpected surprise", "surprise"],
  ["advance warning", "warning"],
  ["honest truth", "truth"],
  ["new innovation", "innovation"],
  ["personal opinion", "opinion"],
  ["true fact", "fact"],
];

const PATTERN = new RegExp(
  "\\b(?:" + REPLACEMENTS.map(([p]) => escapeRegex(p)).join("|") + ")\\b",
  "gi",
);
const MAP = new Map(REPLACEMENTS.map(([k, v]) => [k.toLowerCase(), v]));

export const rule: Rule = {
  id: "redundant-pairs",
  name: "Redundant pairs",
  severity: "warning",
  description:
    "One word already means what the pair means together. Drop the redundant modifier.",
  replacements: REPLACEMENTS,
  check(ctx) {
    return findAll(ctx.prose, PATTERN).map((m) => {
      const repl = MAP.get(m[0].toLowerCase())!;
      const suggestion = preserveCase(m[0], repl);
      return makeFinding(
        ctx,
        m.index,
        m.index + m[0].length,
        `Redundant: "${m[0]}" → "${suggestion}".`,
        suggestion,
      );
    });
  },
};
