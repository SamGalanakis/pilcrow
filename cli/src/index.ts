#!/usr/bin/env node
import { readFileSync, statSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { audit, buildCritiquePrompt, listRules, llmRules } from "../../engine/dist/index.js";
import type { Finding, Severity } from "../../engine/dist/index.js";
import { runSkills } from "./skills.js";

const EXTENSIONS = [".md", ".mdx", ".markdown", ".txt"];

interface ParsedArgs {
  command: string;
  paths: string[];
  flags: Record<string, string | boolean>;
}

function parseArgs(argv: string[]): ParsedArgs {
  const [, , command = "help", ...rest] = argv;
  const paths: string[] = [];
  const flags: Record<string, string | boolean> = {};
  for (let i = 0; i < rest.length; i++) {
    const t = rest[i];
    if (t.startsWith("--")) {
      const key = t.slice(2);
      const next = rest[i + 1];
      if (next && !next.startsWith("--")) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      paths.push(t);
    }
  }
  return { command, paths, flags };
}

function* walk(path: string): Generator<string> {
  const stat = statSync(path);
  if (stat.isFile()) {
    if (EXTENSIONS.some((e) => path.toLowerCase().endsWith(e))) yield path;
    return;
  }
  if (!stat.isDirectory()) return;
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules" || entry.name === "dist") continue;
    const child = join(path, entry.name);
    yield* walk(child);
  }
}

function collectFiles(paths: string[]): string[] {
  if (paths.length === 0) return [];
  const files: string[] = [];
  for (const p of paths) {
    for (const f of walk(resolve(p))) files.push(f);
  }
  return files;
}

function readStdin(): string {
  return readFileSync(0, "utf8");
}

const SEVERITY_COLOR: Record<Severity, string> = {
  error: "\x1b[31m",
  warning: "\x1b[33m",
  info: "\x1b[36m",
};
const RESET = "\x1b[0m";
const DIM = "\x1b[2m";
const BOLD = "\x1b[1m";

function isTTY(): boolean {
  return Boolean(process.stdout.isTTY);
}

function color(text: string, code: string): string {
  return isTTY() ? `${code}${text}${RESET}` : text;
}

function severityTag(s: Severity): string {
  return color(s.toUpperCase().padEnd(7), SEVERITY_COLOR[s]);
}

function printFindings(filePath: string | null, findings: Finding[]): void {
  const cwd = process.cwd();
  const label = filePath ? color(relative(cwd, filePath), BOLD) : color("<stdin>", BOLD);
  if (findings.length === 0) {
    console.log(`${label}  ${color("clean", "\x1b[32m")}`);
    return;
  }
  console.log(`${label}  ${color(`${findings.length} finding${findings.length === 1 ? "" : "s"}`, BOLD)}`);
  for (const f of findings) {
    const loc = color(`${f.line}:${f.column}`, DIM);
    console.log(`  ${severityTag(f.severity)} ${loc} ${color(f.ruleId, DIM)} — ${f.message}`);
    if (f.excerpt) console.log(`    ${color(f.excerpt, DIM)}`);
    if (f.suggestion) console.log(`    ${color("→", "\x1b[32m")} ${f.suggestion}`);
  }
}

function printSummary(totals: Record<Severity, number>): void {
  const parts: string[] = [];
  for (const k of ["error", "warning", "info"] as Severity[]) {
    if (totals[k] > 0) parts.push(color(`${totals[k]} ${k}${totals[k] === 1 ? "" : "s"}`, SEVERITY_COLOR[k]));
  }
  if (parts.length === 0) {
    console.log(color("✓ clean", "\x1b[32m"));
  } else {
    console.log(parts.join(" · "));
  }
}

function cmdAudit(args: ParsedArgs): number {
  const files = collectFiles(args.paths);
  const totals: Record<Severity, number> = { error: 0, warning: 0, info: 0 };
  if (files.length === 0) {
    const text = readStdin();
    const result = audit(text);
    printFindings(null, result.findings);
    for (const k of Object.keys(totals) as Severity[]) totals[k] = result.summary.bySeverity[k];
  } else {
    for (const f of files) {
      const text = readFileSync(f, "utf8");
      const result = audit(text);
      printFindings(f, result.findings);
      for (const k of Object.keys(totals) as Severity[]) totals[k] += result.summary.bySeverity[k];
    }
    console.log("");
    printSummary(totals);
  }
  return totals.error > 0 ? 1 : 0;
}

function cmdLint(args: ParsedArgs): number {
  const files = collectFiles(args.paths);
  const out: Array<{ file: string | null; findings: Finding[] }> = [];
  let errorCount = 0;
  if (files.length === 0) {
    const text = readStdin();
    const result = audit(text);
    out.push({ file: null, findings: result.findings });
    errorCount += result.summary.bySeverity.error;
  } else {
    for (const f of files) {
      const text = readFileSync(f, "utf8");
      const result = audit(text);
      out.push({ file: relative(process.cwd(), f), findings: result.findings });
      errorCount += result.summary.bySeverity.error;
    }
  }
  process.stdout.write(JSON.stringify({ files: out }, null, 2) + "\n");
  return errorCount > 0 ? 1 : 0;
}

function cmdCritique(args: ParsedArgs): number {
  const files = collectFiles(args.paths);
  let text: string;
  if (files.length === 0) {
    text = readStdin();
  } else if (files.length === 1) {
    text = readFileSync(files[0], "utf8");
  } else {
    console.error("critique accepts at most one file (got " + files.length + ")");
    return 2;
  }
  const ruleIds = typeof args.flags.rules === "string" ? (args.flags.rules as string).split(",") : undefined;
  process.stdout.write(buildCritiquePrompt(text, ruleIds) + "\n");
  return 0;
}

function cmdRules(args: ParsedArgs): number {
  const deterministic = listRules();
  if (args.flags.json) {
    const out = {
      deterministic: deterministic.map((r) => ({ id: r.id, name: r.name, severity: r.severity, description: r.description })),
      llm: llmRules.map((r) => ({ id: r.id, name: r.name, severity: r.severity, description: r.description })),
    };
    process.stdout.write(JSON.stringify(out, null, 2) + "\n");
    return 0;
  }
  console.log(color(`Deterministic (${deterministic.length}):`, BOLD));
  for (const r of deterministic) {
    console.log(`  ${severityTag(r.severity)} ${color(r.id, BOLD)}  ${r.name}`);
    console.log(`    ${color(r.description, DIM)}`);
  }
  console.log("");
  console.log(color(`LLM-judged (${llmRules.length}):`, BOLD));
  for (const r of llmRules) {
    console.log(`  ${severityTag(r.severity)} ${color(r.id, BOLD)}  ${r.name}`);
    console.log(`    ${color(r.description, DIM)}`);
  }
  return 0;
}

function cmdHelp(): number {
  console.log(`pilcrow ¶  — mark up prose before it ships

Usage:
  pilcrow audit [paths...]            Detect findings, human-readable output
  pilcrow lint  [paths...]            Detect findings, JSON output for LLM consumption
  pilcrow critique [path]             Print an LLM-critique prompt for the given file/stdin
  pilcrow rules [--json]              List every rule (deterministic + LLM-judged)
  pilcrow skills <subcommand>         Install or update the skill in your AI harness
  pilcrow help

Install once globally:
  npm install -g pilcrow
  cd your-project && pilcrow skills install

Or per-project without installing:
  npx pilcrow skills install
  npx pilcrow audit drafts/

Reads stdin if no paths are given. File extensions scanned: ${EXTENSIONS.join(", ")}.
Detection-only — nothing is ever auto-modified. The LLM decides what to change.
`);
  return 0;
}

const args = parseArgs(process.argv);
let exit = 0;
switch (args.command) {
  case "audit":
    exit = cmdAudit(args);
    break;
  case "lint":
    exit = cmdLint(args);
    break;
  case "critique":
    exit = cmdCritique(args);
    break;
  case "rules":
    exit = cmdRules(args);
    break;
  case "skills":
    exit = await runSkills(process.argv.slice(3));
    break;
  case "help":
  case "-h":
  case "--help":
    exit = cmdHelp();
    break;
  default:
    console.error(`unknown command: ${args.command}`);
    cmdHelp();
    exit = 2;
}
process.exit(exit);
