import type { Finding, RuleContext } from "./types.js";

export type RuleFinding = Omit<Finding, "ruleId" | "ruleName" | "severity">;

export function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function phrasePattern(phrases: string[]): RegExp {
  const alts = phrases.map(escapeRegex).join("|");
  return new RegExp(`\\b(?:${alts})\\b`, "gi");
}

export function findAll(prose: string, pattern: RegExp): RegExpExecArray[] {
  const out: RegExpExecArray[] = [];
  const re = new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : pattern.flags + "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(prose)) !== null) {
    if (m[0].length === 0) {
      re.lastIndex++;
      continue;
    }
    out.push(m);
  }
  return out;
}

export function excerptAround(ctx: RuleContext, start: number, end: number, padding = 24): string {
  const a = Math.max(0, start - padding);
  const b = Math.min(ctx.text.length, end + padding);
  let snippet = ctx.text.slice(a, b).replace(/\s+/g, " ").trim();
  if (a > 0) snippet = "…" + snippet;
  if (b < ctx.text.length) snippet = snippet + "…";
  return snippet;
}

export function makeFinding(
  ctx: RuleContext,
  start: number,
  end: number,
  message: string,
  suggestion?: string,
): RuleFinding {
  const loc = ctx.locate(start);
  return {
    message,
    line: loc.line,
    column: loc.column,
    range: { start, end },
    excerpt: excerptAround(ctx, start, end),
    ...(suggestion !== undefined ? { suggestion } : {}),
  };
}

export function densityPer100(count: number, total: number): number {
  if (total === 0) return 0;
  return (count / total) * 100;
}

export function preserveCase(match: string, replacement: string): string {
  if (match.length === 0 || replacement.length === 0) return replacement;
  if (match[0] === match[0].toUpperCase() && match[0] !== match[0].toLowerCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

export function sentenceStartSet(ctx: RuleContext): Set<number> {
  return new Set(ctx.sentences.map((s) => s.start));
}
