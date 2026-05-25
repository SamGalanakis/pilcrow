#!/usr/bin/env node
// Build docs/rules.html from the live rules package.
// Run after `npm run build` so the dist/ output is current.

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { listRules, llmRules } from "../engine/dist/index.js";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = join(ROOT, "docs", "rules.html");

const FAMILIES = [
  { label: "AI phrasebank", ids: ["ai-tell-phrasebank", "overused-words", "antithesis-cadence", "throat-clearing-openers", "cliche-closers", "meta-discourse", "copula-dodge"] },
  { label: "AI fossils", ids: ["signoff-chatbot", "sycophant-opener", "disclaimer-tail", "citation-artifact", "placeholder-leak"] },
  { label: "Phrase", ids: ["corporate-cliche", "cliche-list", "wordy-phrases", "redundant-pairs", "weasel-hedges", "vague-quantifiers"] },
  { label: "Density", ids: ["em-dash-density", "adverb-density", "nominalization-density", "boosters", "passive-voice", "pronoun-density-low", "parenthetical-aside-density", "inline-bold-emphasis"] },
  { label: "Cadence", ids: ["sentence-length-monotony", "sentence-too-long", "paragraph-monotony", "parallel-triplet-density", "transition-stacking", "repeated-words-window", "noun-stacking", "anaphora-cadence", "fragment-cadence", "hero-tagline-imperative", "from-x-to-y", "present-participle-tail"] },
  { label: "Consistency", ids: ["dash-style-inconsistency", "quote-style-inconsistency", "oxford-comma-inconsistency"] },
  { label: "Weak constructions", ids: ["there-is-there-are", "expletives", "negation-of-negation", "pronoun-it-vague"] },
  { label: "Markdown shape", ids: ["bullet-bold-lead", "title-case-headers", "colon-headline", "decorative-emoji", "false-precision-headline"] },
];

const escape = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function severityBadge(sev) {
  return `<span class="sev sev-${sev}">${sev}</span>`;
}

function renderPhrases(rule) {
  if (rule.phrases && rule.phrases.length > 0) {
    const items = rule.phrases.map((p) => `<li><code>${escape(p)}</code></li>`).join("");
    return `<details class="rule-data"><summary>${rule.phrases.length} phrase${rule.phrases.length === 1 ? "" : "s"}</summary><ul class="phrase-list">${items}</ul></details>`;
  }
  if (rule.replacements && rule.replacements.length > 0) {
    const items = rule.replacements
      .map(([from, to]) => `<li><code>${escape(from)}</code> &rarr; <code>${escape(to || "(cut)")}</code></li>`)
      .join("");
    return `<details class="rule-data"><summary>${rule.replacements.length} replacement${rule.replacements.length === 1 ? "" : "s"}</summary><ul class="phrase-list">${items}</ul></details>`;
  }
  return "";
}

function renderRule(rule) {
  return `<tr>
    <td><code>${escape(rule.id)}</code></td>
    <td>${severityBadge(rule.severity)}</td>
    <td>${escape(rule.description)}${renderPhrases(rule)}</td>
  </tr>`;
}

function renderLlmRule(rule) {
  return `<tr>
    <td><code>${escape(rule.id)}</code></td>
    <td>${severityBadge(rule.severity)}</td>
    <td>${escape(rule.description)}
      <details class="rule-data"><summary>Examples</summary>
        <p class="ex"><span class="ex-label">Good</span> <code>${escape(rule.positiveExample)}</code></p>
        <p class="ex"><span class="ex-label">Bad</span> <code>${escape(rule.negativeExample)}</code></p>
      </details>
    </td>
  </tr>`;
}

const deterministic = listRules();
const seen = new Set();
const knownById = new Map(deterministic.map((r) => [r.id, r]));

const familySections = FAMILIES.map((fam) => {
  const rows = fam.ids.map((id) => {
    const rule = knownById.get(id);
    if (!rule) throw new Error(`Catalog generator: family "${fam.label}" references unknown rule "${id}"`);
    seen.add(id);
    return renderRule(rule);
  }).join("\n");
  return `<section class="cat-group" id="det-${slug(fam.label)}">
    <h3>${escape(fam.label)} <span class="cat-count">${fam.ids.length}</span></h3>
    <table class="rules-table">
      <thead><tr><th>id</th><th>sev</th><th>what it catches</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </section>`;
}).join("\n");

const spineFamilyItems = FAMILIES.map(
  (fam) => `<li><a href="#det-${slug(fam.label)}">${escape(fam.label)}</a></li>`,
).join("\n            ");

const unfamiliar = deterministic.filter((r) => !seen.has(r.id));
if (unfamiliar.length > 0) {
  throw new Error(
    `Catalog generator: ${unfamiliar.length} rule(s) not assigned to a family. Add to scripts/build-rules-page.mjs: ${unfamiliar.map((r) => r.id).join(", ")}`,
  );
}

const llmRows = llmRules.map(renderLlmRule).join("\n");

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>The catalog · Pilcrow ¶</title>
  <meta name="description" content="Every rule the engine watches for: ${deterministic.length} deterministic + ${llmRules.length} LLM-judged. Auto-generated from the source.">
  <meta name="theme-color" content="#f7f5ef" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#1e1a13" media="(prefers-color-scheme: dark)">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Pilcrow">
  <meta property="og:url" content="https://pilcrow.ink/rules.html">
  <meta property="og:title" content="The catalog · Pilcrow ¶">
  <meta property="og:description" content="Every rule the engine watches for: ${deterministic.length} deterministic + ${llmRules.length} LLM-judged.">
  <meta property="og:image" content="https://pilcrow.ink/og.png">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Pilcrow ¶ — Make your clanker your editor.">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="The catalog · Pilcrow ¶">
  <meta name="twitter:description" content="Every rule the engine watches for: ${deterministic.length} deterministic + ${llmRules.length} LLM-judged.">
  <meta name="twitter:image" content="https://pilcrow.ink/og-square.png">
  <meta name="twitter:image:alt" content="Pilcrow ¶">
  <script>
    (function(){try{var s=localStorage.getItem('theme');var p=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var t=(s==='light'||s==='dark')?s:p;document.documentElement.dataset.theme=t;}catch(e){}document.addEventListener('click',function(e){var b=e.target.closest('.theme-toggle');if(!b)return;var c=document.documentElement.dataset.theme;var n=c==='dark'?'light':'dark';document.documentElement.dataset.theme=n;try{localStorage.setItem('theme',n);}catch(e){}});})();
  </script>
  <link rel="canonical" href="https://pilcrow.ink/rules.html">
  <link rel="stylesheet" href="style.css">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>

  <header class="site-nav">
    <a class="site-nav-home" href="./"><span class="mark">¶</span> Pilcrow</a>
    <nav class="site-nav-links" aria-label="Primary">
      <a href="./">Book</a>
      <a href="genres.html">Genres</a>
      <a href="https://github.com/SamGalanakis/pilcrow">GitHub</a>
      <button type="button" class="theme-toggle" aria-label="Toggle dark mode">
        <span class="theme-toggle-dark"><span class="glyph" aria-hidden="true">☾</span>Dark</span>
        <span class="theme-toggle-light"><span class="glyph" aria-hidden="true">☀</span>Light</span>
      </button>
    </nav>
  </header>

  <section class="cover">
    <div class="cover-wrap">
      <p class="cover-eyebrow">Appendix<span class="sep">·</span>auto-generated</p>
      <h1 class="cover-title">The catalog</h1>
      <p class="cover-lede">Every rule the engine watches for. ${deterministic.length} deterministic, ${llmRules.length} LLM-judged. Built from the source on every deploy.</p>
    </div>
  </section>

  <main class="book" id="main">
    <aside class="spine" aria-label="Contents">
      <p class="spine-label">Contents</p>
      <ol class="spine-tree">
        <li>
          <a class="spine-item" href="#deterministic">Deterministic</a>
          <ol class="spine-sub">
            ${spineFamilyItems}
          </ol>
        </li>
        <li><a class="spine-item" href="#llm">LLM-judged</a></li>
      </ol>
    </aside>

    <article class="book-body catalog">
      <div class="cat-filter" role="search">
        <input type="search" class="cat-filter-input" id="cat-filter-input" placeholder="Filter by rule id, phrase, or description…  ( / to focus )" aria-label="Filter rules" autocomplete="off">
        <span class="cat-filter-count" id="cat-filter-count" aria-live="polite"></span>
      </div>
      <dl class="cat-legend" aria-label="Severity key">
        <div><dt><span class="sev sev-error">error</span></dt> <dd>exits non-zero; blocks CI</dd></div>
        <div><dt><span class="sev sev-warning">warning</span></dt> <dd>should fix, won&rsquo;t block</dd></div>
        <div><dt><span class="sev sev-info">info</span></dt> <dd>aggregate signal &mdash; one is fine, many is a fingerprint</dd></div>
      </dl>
      <p class="cat-empty" id="cat-empty" role="status" aria-live="polite" hidden>No rules match.</p>

      <section class="chapter cat-section" id="deterministic">
        <p class="cat-eyebrow">Deterministic</p>
        <h2 class="cat-section-title">${deterministic.length} rules, no LLM, milliseconds per file</h2>
        <p class="cat-blurb">Each phrase-based rule lists every phrase it scans for.<span class="sidenote">Density rules report only when their threshold is crossed; structural rules examine sentence and paragraph shape.</span></p>
        ${familySections}
      </section>

      <section class="chapter cat-section" id="llm">
        <p class="cat-eyebrow">LLM-judged</p>
        <h2 class="cat-section-title">${llmRules.length} higher-level patterns</h2>
        <p class="cat-blurb">Patterns regex can&rsquo;t catch. The engine ships these as a prompt the model evaluates; the model returns structured findings in the same shape the deterministic engine uses.</p>
        <table class="rules-table">
          <thead><tr><th>id</th><th>sev</th><th>what it catches</th></tr></thead>
          <tbody>${llmRows}</tbody>
        </table>
      </section>
    </article>
  </main>

  <footer class="site-foot">
    <div class="site-foot-wrap">
      <nav class="site-foot-links" aria-label="Site links">
        <a href="./">Book</a>
        <span class="site-foot-sep" aria-hidden="true">·</span>
        <a href="genres.html">Genres</a>
        <span class="site-foot-sep" aria-hidden="true">·</span>
        <a href="https://github.com/SamGalanakis/pilcrow">GitHub</a>
        <span class="site-foot-sep" aria-hidden="true">·</span>
        <a href="https://impeccable.style/">impeccable.style</a>
      </nav>
      <div class="site-foot-rule">
        <span>Generated ${new Date().toISOString().slice(0, 10)} from the live source</span>
        <span>v0.2 · MIT</span>
      </div>
    </div>
  </footer>

  <script src="script.js" defer></script>
</body>
</html>
`;

writeFileSync(OUT, html, "utf8");
console.log(`Wrote ${OUT} (${deterministic.length} deterministic + ${llmRules.length} LLM rules)`);
