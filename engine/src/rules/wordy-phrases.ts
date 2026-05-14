import { escapeRegex, findAll, makeFinding, preserveCase } from "../helpers.js";
import type { Rule } from "../types.js";

const REPLACEMENTS: Array<[string, string]> = [
  ["in order to", "to"],
  ["due to the fact that", "because"],
  ["in spite of the fact that", "although"],
  ["at this point in time", "now"],
  ["at the present time", "now"],
  ["in the event that", "if"],
  ["for the purpose of", "for"],
  ["with regard to", "about"],
  ["with respect to", "about"],
  ["in light of the fact that", "because"],
  ["a large number of", "many"],
  ["a majority of", "most"],
  ["a small number of", "a few"],
  ["the fact that", "that"],
  ["have the ability to", "can"],
  ["has the ability to", "can"],
];

const PATTERN = new RegExp(
  "\\b(?:" + REPLACEMENTS.map(([p]) => escapeRegex(p)).join("|") + ")\\b",
  "gi",
);
const MAP = new Map(REPLACEMENTS.map(([k, v]) => [k.toLowerCase(), v]));

export const rule: Rule = {
  id: "wordy-phrases",
  name: "Wordy phrases",
  severity: "warning",
  description:
    "Multi-word phrases that compress to a single word without losing meaning.",
  replacements: REPLACEMENTS,
  check(ctx) {
    return findAll(ctx.prose, PATTERN).map((m) => {
      const repl = MAP.get(m[0].toLowerCase()) ?? "";
      const suggestion = preserveCase(m[0], repl);
      return makeFinding(
        ctx,
        m.index,
        m.index + m[0].length,
        `Wordy: "${m[0]}" → "${suggestion}".`,
        suggestion,
      );
    });
  },
};
