import { findAll, makeFinding } from "../helpers.js";
import type { Rule } from "../types.js";

// Authoring placeholders that should have been filled in (or deleted) before
// the prose shipped. We scan ctx.prose, not ctx.text, so anything inside a
// fenced block, inline code span, or <code>/<pre> is already masked out — a
// `{{variable}}` shown in a code sample, or a documented [PLACEHOLDER] token,
// does not fire. That masking is the main false-positive guard; the message
// covers the rest, since these tokens are legitimate in templates and examples.
const PATTERNS: RegExp[] = [
  // Mustache / Handlebars / Jinja template tokens: {{scripts_path}}, {{ name }}
  /\{\{[^{}\n]+\}\}/g,
  // Bracket fill-ins by keyword: [TODO], [FIXME], [PLACEHOLDER], [INSERT DATE],
  // [YOUR COMPANY], [something HERE]
  /\[(?:TODO|FIXME|TBD|PLACEHOLDER|INSERT[^\]\n]*|YOUR[^\]\n]*|[^\]\n]*?\bHERE)\]/gi,
  // Bracket fill-ins by shape: multi-word ALL-CAPS, e.g. [YOUR NAME], [COMPANY NAME].
  // Single all-caps words ([NOTE], [API]) are left alone on purpose.
  /\[[A-Z][A-Z0-9_]+(?:[ _][A-Z0-9_]+)+\]/g,
  // Angle fill-ins: <insert name>, <your company>, <full name here>
  /<(?:insert|your)\b[^>\n]*>/gi,
  /<[^<>\n]*\bhere>/gi,
  // Editor markers in marker form: "TODO:", "FIXME:" (the colon distinguishes a
  // left-behind marker from prose like "your TODO list"). TKTK is always a stub.
  /\b(?:TODO|FIXME)\b(?=\s*:)/g,
  /\bTKTK\b/g,
  // Filler copy
  /\blorem ipsum\b/gi,
];

export const rule: Rule = {
  id: "placeholder-leak",
  name: "Placeholder leak",
  severity: "warning",
  description:
    "Unresolved authoring placeholder left in prose: template tokens ({{x}}), bracket or angle fill-ins ([YOUR NAME], <insert date>), TODO/FIXME/TKTK markers, or lorem ipsum. Usually a leak from a template or unfinished draft. Legitimate when the text is itself a template, a code or usage example, or documentation about placeholders, so verify before removing.",
  check(ctx) {
    const out = [];
    const seen = new Set<number>();
    for (const pat of PATTERNS) {
      for (const m of findAll(ctx.prose, pat)) {
        if (seen.has(m.index)) continue;
        seen.add(m.index);
        out.push(
          makeFinding(
            ctx,
            m.index,
            m.index + m[0].length,
            `Possible placeholder leak: "${m[0]}". If this file is a template, a code or usage example, or docs that discuss placeholders, it is intentional; otherwise fill it in or remove it.`,
          ),
        );
      }
    }
    return out.sort((a, b) => a.range.start - b.range.start);
  },
};
