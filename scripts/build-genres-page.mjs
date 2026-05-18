#!/usr/bin/env node
// Build docs/genres.html from skill/reference/genres/*.md.
// Run after npm run build (or alongside build-rules-page.mjs) so docs stay in sync.

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const GENRES_DIR = join(ROOT, "skill/reference/genres");
const OUT = join(ROOT, "docs/genres.html");

// Family display order; matches the tree in skill/reference/_genres.md.
// Each family lists its leaves explicitly so we surface order errors loudly.
const FAMILIES = [
  { slug: "narrative",      title: "narrative/",       leaves: ["fiction", "memoir", "script"],
    blurb: "Narrator-driven prose. Many pilcrow rules fire on intentional craft here; tread carefully." },
  { slug: "argumentative",  title: "argumentative/",   leaves: ["essay", "op-ed", "review"],
    blurb: "Prose with a thesis the writer believes. Ledes carry the piece; the argument is load-bearing." },
  { slug: "documentation",  title: "documentation/",   leaves: ["tutorial", "how-to", "reference-docs", "explanation"],
    blurb: "Diátaxis four. Never mix modes within one page." },
  { slug: "overview",       title: "overview/",        leaves: ["readme", "project-home", "one-pager"],
    blurb: "Composite doorway docs. Marketing top, tutorial middle, signposts down to deeper docs." },
  { slug: "informational",  title: "informational/",   leaves: ["explainer", "faq"],
    blurb: "Teach a concept to a non-expert. Definitions on first use, examples after every abstraction." },
  { slug: "reportorial",    title: "reportorial/",     leaves: ["news", "feature", "postmortem", "status-update", "changelog"],
    blurb: "The news is the news. Outcome in the first sentence; specific numbers, named people, dated events." },
  { slug: "correspondence", title: "correspondence/",  leaves: ["memo", "email", "message"],
    blurb: "Workplace decision documents. Recommendation in sentence 1; no preamble; dense paragraphs fine." },
  { slug: "marketing",      title: "marketing/",       leaves: ["landing", "product-copy", "sales-email", "press-release", "about-page"],
    blurb: "Persuasive commerce. The family where AI tells cluster densest; every editor reflex applies." },
  { slug: "microcopy",      title: "microcopy/",       leaves: ["ui-label", "error-message", "empty-state", "notification"],
    blurb: "In-product short text. One idea, ≤8 words where possible. Helpful, not chirpy." },
  { slug: "social",         title: "social/",          leaves: ["social-post", "social-thread"],
    blurb: "Public short-form. First 7 words decide whether the rest is read." },
  { slug: "personal",       title: "personal/",        leaves: ["cv", "cover-letter", "bio"],
    blurb: "Self-as-subject documents. Terse, parallel, auditable." },
  { slug: "presentations",  title: "presentations/",   leaves: ["deck", "speaker-notes"],
    blurb: "Slide-shaped and speaker-shaped prose. One idea per slide; text is signage." },
  { slug: "_stub",          title: "(stub)",           leaves: ["academic"],
    blurb: "Stub leaf. Pilcrow's lens only partially covers academic prose; full coverage is out of scope for now." },
];

const escape = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Inline markdown: backticks → <code>, bold/italic, [text](url) → <a>.
function inline(text) {
  let s = escape(text);
  // Links first (before any other transforms)
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    return `<a href="${escape(url)}" rel="noopener">${label}</a>`;
  });
  // Inline code: text inside `...`
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  // Italics: *text* (basic, no nested)
  s = s.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
  return s;
}

function parseFrontmatter(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    fm[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return fm;
}

function stripComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, "");
}

function sectionAt(content, heading) {
  const re = new RegExp(`^## ${heading}[ \\t]*$`, "m");
  const idx = content.search(re);
  if (idx === -1) return "";
  const after = content.slice(idx).replace(re, "").replace(/^\s*\n/, "");
  const next = after.search(/^## /m);
  return stripComments(next === -1 ? after : after.slice(0, next)).trim();
}

function bullets(sectionText) {
  if (!sectionText) return [];
  const out = [];
  const lines = sectionText.split("\n");
  let current = null;
  for (const ln of lines) {
    if (/^- /.test(ln)) {
      if (current !== null) out.push(current.trim());
      current = ln.replace(/^- /, "");
    } else if (current !== null && /^\s+\S/.test(ln)) {
      current += " " + ln.trim();
    } else if (ln.trim() === "") {
      if (current !== null) out.push(current.trim());
      current = null;
    }
  }
  if (current !== null) out.push(current.trim());
  return out.filter((b) => b.length > 0 && !/^\(no genre-specific/i.test(b));
}

function parseLlmRules(sectionText) {
  if (!sectionText) return [];
  const parts = sectionText.split(/^### /m);
  const rules = [];
  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i];
    const nl = chunk.indexOf("\n");
    const id = (nl === -1 ? chunk : chunk.slice(0, nl)).trim();
    const body = nl === -1 ? "" : chunk.slice(nl + 1);
    const fields = {};
    const fieldRe = /^- \*\*(\w+):\*\*[ \t]*([^\n]*)/gm;
    let f;
    while ((f = fieldRe.exec(body)) !== null) fields[f[1]] = f[2].trim();
    if (!fields.name || !fields.severity) continue;
    const strip = (s) => {
      const t = (s || "").trim();
      if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
        return t.slice(1, -1);
      }
      return t;
    };
    rules.push({
      id,
      name: fields.name,
      severity: fields.severity,
      description: fields.description || "",
      positive: strip(fields.positive),
      negative: strip(fields.negative),
    });
  }
  return rules;
}

function definitionParagraph(content) {
  const afterFm = content.replace(/^---\n[\s\S]*?\n---\n/, "").replace(/^\s+/, "");
  const afterHeading = afterFm.replace(/^#\s+[^\n]*\n/, "").replace(/^\s+/, "");
  const para = afterHeading.split(/\n\s*\n/)[0] || "";
  return para.trim();
}

function loadLeaf(slug) {
  const path = join(GENRES_DIR, `${slug}.md`);
  const content = readFileSync(path, "utf8");
  const fm = parseFrontmatter(content);
  return {
    slug,
    parent: fm.parent === "null" || !fm.parent ? null : fm.parent,
    description: fm.description || "",
    definition: definitionParagraph(content),
    demands: bullets(sectionAt(content, "Demands")),
    forbids: bullets(sectionAt(content, "Forbids")),
    tolerates: bullets(sectionAt(content, "Tolerates")),
    aiTells: bullets(sectionAt(content, "Common AI tells")),
    llmRules: parseLlmRules(sectionAt(content, "LLM lint additions")),
    references: bullets(sectionAt(content, "References")),
  };
}

function severityBadge(sev) {
  return `<span class="sev sev-${sev}">${sev}</span>`;
}

function renderSection(heading, items, extraClass = "") {
  if (!items || items.length === 0) return "";
  const lis = items.map((b) => `<li>${inline(b)}</li>`).join("");
  return `
        <div class="genre-sec${extraClass ? " " + extraClass : ""}">
          <h5>${escape(heading)}</h5>
          <ul class="genre-bullets">${lis}</ul>
        </div>`;
}

function renderLlmRules(rules) {
  if (!rules || rules.length === 0) return "";
  const items = rules.map((r) => `
          <article class="genre-rule">
            <header>
              <code>${escape(r.id)}</code>
              ${severityBadge(r.severity)}
              <span class="genre-rule-name">${escape(r.name)}</span>
            </header>
            <p>${inline(r.description)}</p>
            <dl class="genre-rule-ex">
              <dt class="ex-good">Good</dt><dd><code>${escape(r.positive)}</code></dd>
              <dt class="ex-bad">Bad</dt><dd><code>${escape(r.negative)}</code></dd>
            </dl>
          </article>`).join("");
  return `
        <div class="genre-sec genre-llm-sec">
          <h5>LLM lint additions <span class="cat-count">${rules.length}</span></h5>
          ${items}
        </div>`;
}

function renderReferences(refs) {
  if (!refs || refs.length === 0) return "";
  // References often arrive as one bullet with ` · ` separated links.
  const flat = refs.flatMap((r) => r.split(/\s+·\s+/));
  const lis = flat.map((r) => `<li>${inline(r)}</li>`).join("");
  return `
        <div class="genre-sec genre-refs">
          <h5>References</h5>
          <ul class="genre-bullets">${lis}</ul>
        </div>`;
}

function renderLeaf(leaf) {
  const ruleCount = leaf.llmRules.length;
  const ruleBadge = ruleCount > 0 ? `<span class="cat-count">${ruleCount} LLM rule${ruleCount === 1 ? "" : "s"}</span>` : "";
  const parentTag = leaf.parent ? `<span class="genre-parent">${escape(leaf.parent)}/</span>` : `<span class="genre-parent">stub</span>`;
  return `
      <article class="genre-leaf" id="g-${escape(leaf.slug)}" data-slug="${escape(leaf.slug)}" data-parent="${escape(leaf.parent || "_stub")}">
        <header class="genre-leaf-head">
          <h4>${parentTag}<code class="genre-slug">${escape(leaf.slug)}</code></h4>
          ${ruleBadge}
        </header>
        <p class="genre-def">${inline(leaf.definition)}</p>
        ${renderSection("Demands", leaf.demands)}
        ${renderSection("Forbids", leaf.forbids)}
        ${renderSection("Tolerates", leaf.tolerates)}
        ${renderSection("Common AI tells", leaf.aiTells)}
        ${renderLlmRules(leaf.llmRules)}
        ${renderReferences(leaf.references)}
      </article>`;
}

// --- Assemble ---
const available = new Set(readdirSync(GENRES_DIR).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3)));
const declared = new Set(FAMILIES.flatMap((f) => f.leaves));
const missing = [...available].filter((s) => !declared.has(s));
if (missing.length > 0) {
  throw new Error(`Genre page generator: ${missing.length} leaf(s) not assigned to a family. Add to scripts/build-genres-page.mjs: ${missing.join(", ")}`);
}

let totalLeaves = 0;
let totalRules = 0;

const familyHtml = FAMILIES.map((fam) => {
  const leaves = fam.leaves.map(loadLeaf);
  totalLeaves += leaves.length;
  totalRules += leaves.reduce((n, l) => n + l.llmRules.length, 0);
  const body = leaves.map(renderLeaf).join("\n");
  return `
      <section class="chapter cat-section genre-family" id="fam-${escape(fam.slug)}">
        <p class="cat-eyebrow">${escape(fam.title)}</p>
        <h2 class="cat-section-title">${fam.leaves.length} ${fam.leaves.length === 1 ? "leaf" : "leaves"}</h2>
        <p class="cat-blurb">${escape(fam.blurb)}</p>
        ${body}
      </section>`;
}).join("\n");

const spineItems = FAMILIES.map((fam) => {
  const leafLinks = fam.leaves.map((s) => `<li><a href="#g-${escape(s)}">${escape(s)}</a></li>`).join("");
  return `
        <li>
          <a class="spine-item" href="#fam-${escape(fam.slug)}">${escape(fam.title)}</a>
          <ol class="spine-sub">${leafLinks}</ol>
        </li>`;
}).join("");

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Genres · Pilcrow ¶</title>
  <meta name="description" content="The pilcrow genre taxonomy. ${totalLeaves} leaves across ${FAMILIES.length - 1} families plus one stub. Each leaf adds its own Demands, Forbids, Tolerates, AI tells, and LLM lint targets that enrich the base catalog when that genre is active.">
  <meta name="theme-color" content="#f7f5ef" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#1e1a13" media="(prefers-color-scheme: dark)">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Pilcrow">
  <meta property="og:url" content="https://pilcrow.ink/genres.html">
  <meta property="og:title" content="Genres · Pilcrow ¶">
  <meta property="og:description" content="${totalLeaves} leaves across ${FAMILIES.length - 1} families. Each leaf adds Demands, Forbids, Tolerates, AI tells, and LLM lint targets that enrich the base catalog.">
  <meta property="og:image" content="https://pilcrow.ink/og.png">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Pilcrow ¶ — Make your clanker your editor.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Genres · Pilcrow ¶">
  <meta name="twitter:description" content="${totalLeaves} leaves across ${FAMILIES.length - 1} families. Each adds Demands, Forbids, Tolerates, AI tells, and LLM lint targets.">
  <meta name="twitter:image" content="https://pilcrow.ink/og.png">
  <meta name="twitter:image:alt" content="Pilcrow ¶ — Make your clanker your editor.">
  <script>
    (function(){try{var s=localStorage.getItem('theme');var p=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var t=(s==='light'||s==='dark')?s:p;document.documentElement.dataset.theme=t;}catch(e){}document.addEventListener('click',function(e){var b=e.target.closest('.theme-toggle');if(!b)return;var c=document.documentElement.dataset.theme;var n=c==='dark'?'light':'dark';document.documentElement.dataset.theme=n;try{localStorage.setItem('theme',n);}catch(e){}});})();
  </script>
  <link rel="canonical" href="https://pilcrow.ink/genres.html">
  <link rel="stylesheet" href="style.css">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>

  <header class="site-nav">
    <a class="site-nav-home" href="./"><span class="mark">¶</span> Pilcrow</a>
    <nav class="site-nav-links" aria-label="Primary">
      <a href="./">Book</a>
      <a href="rules.html">Catalog</a>
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
      <h1 class="cover-title">Genres</h1>
      <p class="cover-lede">${totalLeaves} leaves across ${FAMILIES.length - 1} families. Each leaf adds Demands, Forbids, Tolerates, and AI tells specific to that genre. The ${totalRules} LLM lint targets enrich the base catalog when that genre is active.</p>
    </div>
  </section>

  <main class="book" id="main">
    <aside class="spine" aria-label="Contents">
      <p class="spine-label">Tree</p>
      <ol class="spine-tree">${spineItems}
      </ol>
    </aside>

    <article class="book-body catalog">
      <div class="cat-filter" role="search">
        <input type="search" class="cat-filter-input" id="cat-filter-input" placeholder="Filter by slug, family, or word…  ( / to focus )" aria-label="Filter genres" autocomplete="off">
        <span class="cat-filter-count" id="cat-filter-count" aria-live="polite"></span>
      </div>
      <dl class="cat-legend" aria-label="Severity key">
        <div><dt><span class="sev sev-error">error</span></dt> <dd>exits non-zero; blocks CI</dd></div>
        <div><dt><span class="sev sev-warning">warning</span></dt> <dd>should fix, won&rsquo;t block</dd></div>
        <div><dt><span class="sev sev-info">info</span></dt> <dd>aggregate signal &mdash; one is fine, many is a fingerprint</dd></div>
      </dl>
      <p class="cat-empty" id="cat-empty" role="status" aria-live="polite" hidden>No genres match.</p>

      <section class="chapter cat-section" id="how-it-works">
        <p class="cat-eyebrow">How this page works</p>
        <h2 class="cat-section-title">One leaf per genre. Each leaf is small on purpose.</h2>
        <p class="cat-blurb">A leaf only carries what is <em>specific to that genre</em>. Universal rules (cadence theory, AI fossils, reader personas) live in the <a href="rules.html">catalog</a> and apply everywhere. Parent rules (e.g., everything <code>marketing/</code> shares) live in <a href="https://github.com/SamGalanakis/pilcrow/blob/main/skill/reference/_genres.md"><code>skill/reference/_genres.md</code></a>. At critique time, <code>pilcrow critique --genre &lt;slug&gt;</code> merges the base 21 LLM rules with the active leaf&rsquo;s additions, walking the parent chain.</p>
      </section>
${familyHtml}
    </article>
  </main>

  <footer class="site-foot">
    <div class="site-foot-wrap">
      <nav class="site-foot-links" aria-label="Site links">
        <a href="./">Book</a>
        <span class="site-foot-sep" aria-hidden="true">·</span>
        <a href="rules.html">Catalog</a>
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
console.log(`Wrote ${OUT} (${totalLeaves} leaves, ${totalRules} genre-specific LLM rules)`);
