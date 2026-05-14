export type Severity = "error" | "warning" | "info";

export interface Finding {
  ruleId: string;
  ruleName: string;
  severity: Severity;
  message: string;
  line: number;
  column: number;
  range: { start: number; end: number };
  excerpt: string;
  suggestion?: string;
}

export interface Sentence {
  text: string;
  start: number;
  end: number;
  words: number;
}

export interface Paragraph {
  text: string;
  start: number;
  end: number;
}

export interface Word {
  text: string;
  start: number;
  end: number;
}

export interface ProseToken {
  text: string;
  lower: string;
  stem: string;
  start: number;
  end: number;
}

export interface RuleContext {
  text: string;
  prose: string;
  sentences: Sentence[];
  paragraphs: Paragraph[];
  words: Word[];
  tokens: ProseToken[];
  totalWords: number;
  locate: (offset: number) => { line: number; column: number };
}

export interface Rule {
  id: string;
  name: string;
  severity: Severity;
  description: string;
  check: (ctx: RuleContext) => Omit<Finding, "ruleId" | "ruleName" | "severity">[];
  /** The phrase / word list this rule scans for, when applicable. Surfaced in the docs catalog. */
  phrases?: readonly string[];
  /** Replacement pairs (match → suggestion) when applicable. Surfaced in the docs catalog. */
  replacements?: ReadonlyArray<readonly [string, string]>;
}

export interface AuditOptions {
  rules?: string[];
  exclude?: string[];
  ignoreQuoted?: boolean;
}

export interface AuditSummary {
  total: number;
  byRule: Record<string, number>;
  bySeverity: Record<Severity, number>;
}

export interface AuditResult {
  text: string;
  findings: Finding[];
  summary: AuditSummary;
}
