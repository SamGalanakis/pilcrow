import { rules as ALL_RULES } from "./rules/index.js";
import { buildContext } from "./text.js";
import type {
  AuditOptions,
  AuditResult,
  AuditSummary,
  Finding,
  Rule,
  Severity,
} from "./types.js";

export function listRules(): Rule[] {
  return [...ALL_RULES];
}

export function getRule(id: string): Rule | undefined {
  return ALL_RULES.find((r) => r.id === id);
}

function emptySummary(): AuditSummary {
  return {
    total: 0,
    byRule: {},
    bySeverity: { error: 0, warning: 0, info: 0 },
  };
}

export function audit(text: string, options: AuditOptions = {}): AuditResult {
  const ctx = buildContext(text, { ignoreQuoted: options.ignoreQuoted });
  const include = options.rules ? new Set(options.rules) : null;
  const exclude = options.exclude ? new Set(options.exclude) : new Set<string>();
  const findings: Finding[] = [];
  const summary = emptySummary();
  for (const rule of ALL_RULES) {
    if (include && !include.has(rule.id)) continue;
    if (exclude.has(rule.id)) continue;
    const partials = rule.check(ctx);
    for (const p of partials) {
      findings.push({
        ruleId: rule.id,
        ruleName: rule.name,
        severity: rule.severity,
        ...p,
      });
      summary.total++;
      summary.byRule[rule.id] = (summary.byRule[rule.id] ?? 0) + 1;
      summary.bySeverity[rule.severity as Severity]++;
    }
  }
  findings.sort((a, b) => a.range.start - b.range.start || a.ruleId.localeCompare(b.ruleId));
  return { text, findings, summary };
}
