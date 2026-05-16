#!/usr/bin/env node
/**
 * Build script: parse skill/reference/genres/*.md and emit
 * engine/src/genre-llm-rules.ts.
 *
 * Each genre file declares (a) frontmatter with slug + parent, (b) an optional
 * "## LLM lint additions" section containing one or more ### <rule-id> blocks
 * with bulleted fields: name, severity, description, positive, negative.
 *
 * Output exports:
 *   - genreLlmRules:  Record<slug, LlmRule[]>  (only genres with rules)
 *   - genreParents:   Record<slug, string|null> (every genre)
 *
 * The engine walks genreParents at critique time to merge a leaf's rules
 * with any rules its ancestors contribute.
 *
 * Run as part of `npm run build` via the engine prebuild hook.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GENRES_DIR = path.resolve(__dirname, "../reference/genres");
const OUT = path.resolve(__dirname, "../../engine/src/genre-llm-rules.ts");

const VALID_SEVERITY = new Set(["error", "warning", "info"]);
const REQUIRED_FIELDS = ["name", "severity", "description", "positive", "negative"];

function parseFrontmatter(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    fm[key] = val;
  }
  return fm;
}

function stripComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, "");
}

function extractLlmSection(content) {
  // Find "## LLM lint additions" and grab text until the next "## " heading or EOF.
  // JavaScript regex has no \Z, so split on the heading line and take everything before the next ## heading.
  const idx = content.search(/^## LLM lint additions[ \t]*$/m);
  if (idx === -1) return "";
  const after = content.slice(idx).replace(/^## LLM lint additions[ \t]*\n/, "");
  const nextHeading = after.search(/^## /m);
  const section = nextHeading === -1 ? after : after.slice(0, nextHeading);
  return stripComments(section);
}

function parseRules(sectionText, sourceFile) {
  const rules = [];
  // Split on "### " at line start; index 0 is preamble before any ### block.
  const parts = sectionText.split(/^### /m);
  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i];
    const nl = chunk.indexOf("\n");
    const id = (nl === -1 ? chunk : chunk.slice(0, nl)).trim();
    const body = nl === -1 ? "" : chunk.slice(nl + 1);
    const fields = {};
    const fieldRegex = /^- \*\*(\w+):\*\*[ \t]*([^\n]*)/gm;
    let f;
    while ((f = fieldRegex.exec(body)) !== null) {
      fields[f[1]] = f[2].trim();
    }
    const missing = REQUIRED_FIELDS.filter((k) => !fields[k]);
    if (missing.length > 0) {
      console.warn(
        `[build-genre-rules] ${sourceFile} rule "${id}": skipped (missing fields: ${missing.join(", ")})`,
      );
      continue;
    }
    if (!VALID_SEVERITY.has(fields.severity)) {
      throw new Error(
        `${sourceFile} rule "${id}": invalid severity "${fields.severity}" (must be error|warning|info)`,
      );
    }
    const stripQuotes = (s) => {
      const trimmed = s.trim();
      if (
        (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))
      ) {
        return trimmed.slice(1, -1);
      }
      return trimmed;
    };
    rules.push({
      id,
      name: fields.name,
      severity: fields.severity,
      description: fields.description,
      positiveExample: stripQuotes(fields.positive),
      negativeExample: stripQuotes(fields.negative),
    });
  }
  return rules;
}

const genreRules = {};
const genreParents = {};
const seenRuleIds = new Set();
const baseRuleIds = new Set(); // populated below from llm-rules.ts

// Read base rule IDs so we can warn on collisions.
try {
  const baseRulesText = fs.readFileSync(
    path.resolve(__dirname, "../../engine/src/llm-rules.ts"),
    "utf8",
  );
  const idRegex = /id:\s*"([^"]+)"/g;
  let m;
  while ((m = idRegex.exec(baseRulesText)) !== null) baseRuleIds.add(m[1]);
} catch {
  // optional: continue if file not present
}

const files = fs.readdirSync(GENRES_DIR).filter((f) => f.endsWith(".md"));
for (const file of files) {
  const content = fs.readFileSync(path.join(GENRES_DIR, file), "utf8");
  const fm = parseFrontmatter(content);
  if (!fm.slug) {
    console.warn(`[build-genre-rules] ${file}: missing frontmatter slug; skipped`);
    continue;
  }
  genreParents[fm.slug] = !fm.parent || fm.parent === "null" ? null : fm.parent;

  const section = extractLlmSection(content);
  const rules = parseRules(section, file);
  for (const r of rules) {
    if (baseRuleIds.has(r.id)) {
      throw new Error(
        `${file} rule "${r.id}" collides with a base rule in engine/src/llm-rules.ts`,
      );
    }
    if (seenRuleIds.has(r.id)) {
      throw new Error(
        `${file} rule "${r.id}" duplicates an earlier genre rule with the same id`,
      );
    }
    seenRuleIds.add(r.id);
  }
  if (rules.length > 0) genreRules[fm.slug] = rules;
}

function emit() {
  const J = JSON.stringify;
  const lines = [];
  lines.push("// AUTO-GENERATED by skill/scripts/build-genre-rules.mjs");
  lines.push("// Do not edit by hand. Edit skill/reference/genres/<slug>.md and rerun the build.");
  lines.push("");
  lines.push('import type { LlmRule } from "./llm-rules.js";');
  lines.push("");
  lines.push("export const genreLlmRules: Record<string, LlmRule[]> = {");
  const ruleSlugs = Object.keys(genreRules).sort();
  for (const slug of ruleSlugs) {
    lines.push(`  ${J(slug)}: [`);
    for (const r of genreRules[slug]) {
      lines.push("    {");
      lines.push(`      id: ${J(r.id)},`);
      lines.push(`      name: ${J(r.name)},`);
      lines.push(`      severity: ${J(r.severity)},`);
      lines.push(`      description: ${J(r.description)},`);
      lines.push(`      positiveExample: ${J(r.positiveExample)},`);
      lines.push(`      negativeExample: ${J(r.negativeExample)},`);
      lines.push("    },");
    }
    lines.push("  ],");
  }
  lines.push("};");
  lines.push("");
  lines.push("export const genreParents: Record<string, string | null> = {");
  const parentSlugs = Object.keys(genreParents).sort();
  for (const slug of parentSlugs) {
    const p = genreParents[slug];
    lines.push(`  ${J(slug)}: ${p === null ? "null" : J(p)},`);
  }
  lines.push("};");
  lines.push("");
  return lines.join("\n");
}

fs.writeFileSync(OUT, emit());
const totalRules = Object.values(genreRules).reduce((n, rs) => n + rs.length, 0);
console.log(`[build-genre-rules] wrote ${path.relative(process.cwd(), OUT)}`);
console.log(
  `  ${Object.keys(genreParents).length} genres mapped; ${Object.keys(genreRules).length} have LLM rules; ${totalRules} total genre rules.`,
);
