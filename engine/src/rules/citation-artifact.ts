import { findAll, makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

const PATTERNS: RegExp[] = [
  /\bturn\d+(?:search|view|news|image)\d+\b/gi,
  /\boai_?cite[a-z0-9]*\b/gi,
  /\bcontentReference\b/g,
  /\battached_file\b/gi,
  /\bgrok_card\b/gi,
  /\[\+\d+\](?!\()/g,
  /:contentReference\[oaicite/gi,
];

export const rule: Rule = {
  id: "citation-artifact",
  name: "Citation artifact",
  severity: "error",
  description:
    "Raw citation / tool-call tokens left over from LLM output (turn0search0, oaicite, contentReference, …). Always delete.",
  check(ctx) {
    const out = [];
    for (const pat of PATTERNS) {
      for (const m of findAll(ctx.text, pat)) {
        out.push(
          makeFinding(
            ctx,
            m.index,
            m.index + m[0].length,
            `Citation artifact: "${m[0]}". This is a verbatim LLM token; delete.`,
          ),
        );
      }
    }
    return out;
  },
};
