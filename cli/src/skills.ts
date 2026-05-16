import { createHash } from "node:crypto";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = resolve(HERE, "../..");
const SKILL_SRC = join(PKG_ROOT, "skill");
const PKG_JSON = join(PKG_ROOT, "package.json");

const PROVIDER_DIRS = [
  ".claude",
  ".cursor",
  ".gemini",
  ".agents",
  ".opencode",
  ".kiro",
  ".pi",
  ".qoder",
  ".trae",
  ".github",
];

const SKILL_FOLDER = "pilcrow";

const SUBSTITUTABLE_EXTENSIONS = new Set([".md"]);

// Sub-skill names pilcrow installed in the past but no longer ships.
// Add an entry here when renaming or merging a sub-skill or pinned shortcut.
// Each entry is the FOLDER NAME under `.<provider>/skills/`. The sweep verifies
// the folder is pilcrow-owned (its SKILL.md mentions "pilcrow") before deleting,
// so user-owned skills with the same name are safe.
const DEPRECATED_SUB_SKILLS: string[] = [
  // Examples for the future:
  // "humanize-old",       // renamed to humanize in vX.Y
  // "extract",            // folded into /pilcrow extract in vX.Y
];

interface CommandMetaEntry {
  description: string;
  argumentHint: string;
  category: string;
}

function loadCommandMetadata(): Record<string, CommandMetaEntry> | null {
  const metaPath = join(SKILL_SRC, "scripts", "command-metadata.json");
  if (!existsSync(metaPath)) return null;
  try {
    return JSON.parse(readFileSync(metaPath, "utf8"));
  } catch {
    return null;
  }
}

function buildCommandHint(meta: Record<string, CommandMetaEntry> | null): string {
  if (!meta) return "audit|polish|humanize|tighten|clarify|pace|lead|teach|document|extract|craft";
  return Object.keys(meta).join("|");
}

function buildSubstitutions(): Record<string, string> {
  const meta = loadCommandMetadata();
  return {
    "{{command_hint}}": buildCommandHint(meta),
    "{{command_prefix}}": "/",
    "{{scripts_path}}": "scripts",
  };
}

function applySubstitutions(content: string, subs: Record<string, string>): string {
  let out = content;
  for (const [token, value] of Object.entries(subs)) {
    out = out.split(token).join(value);
  }
  return out;
}

function fileExtension(name: string): string {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i).toLowerCase() : "";
}

function findProjectRoot(): string {
  let dir = process.cwd();
  for (let depth = 0; depth < 12; depth++) {
    if (existsSync(join(dir, ".git")) || existsSync(join(dir, "package.json"))) return dir;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return process.cwd();
}

function findExistingProviders(root: string): string[] {
  return PROVIDER_DIRS.filter((d) => existsSync(join(root, d)));
}

function copyDir(src: string, dest: string, subs: Record<string, string>): void {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const s = join(src, entry.name);
    const d = join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d, subs);
    } else if (entry.isFile()) {
      if (SUBSTITUTABLE_EXTENSIONS.has(fileExtension(entry.name))) {
        const text = readFileSync(s, "utf8");
        writeFileSync(d, applySubstitutions(text, subs));
      } else {
        writeFileSync(d, readFileSync(s));
      }
    }
  }
}

function pkgVersion(): string {
  try {
    return JSON.parse(readFileSync(PKG_JSON, "utf8")).version ?? "unknown";
  } catch {
    return "unknown";
  }
}

function installedVersion(skillRoot: string): string | null {
  const md = join(skillRoot, "SKILL.md");
  if (!existsSync(md)) return null;
  const content = readFileSync(md, "utf8");
  return content.match(/^version:\s*(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, "") ?? null;
}

// Walk a directory and yield [relativePath, contents] for every file, sorted
// so the hash is deterministic across runs and platforms.
function* walkFiles(root: string, prefix = ""): Generator<{ rel: string; abs: string }> {
  const entries = readdirSync(root, { withFileTypes: true }).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  for (const entry of entries) {
    const abs = join(root, entry.name);
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      yield* walkFiles(abs, rel);
    } else if (entry.isFile()) {
      yield { rel, abs };
    }
  }
}

// Compute a content hash for a skill directory. If `applySubs` is set, .md
// files are run through substitution before hashing, so the hash of
// the unsubstituted source match the hash of a fresh installed copy.
function hashSkillDir(dir: string, applySubs: Record<string, string> | null): string {
  if (!existsSync(dir)) return "";
  const overall = createHash("sha256");
  for (const { rel, abs } of walkFiles(dir)) {
    const raw = readFileSync(abs);
    const content =
      applySubs && SUBSTITUTABLE_EXTENSIONS.has(fileExtension(rel))
        ? Buffer.from(applySubstitutions(raw.toString("utf8"), applySubs), "utf8")
        : raw;
    overall.update(rel);
    overall.update("\0");
    overall.update(content);
    overall.update("\0");
  }
  return overall.digest("hex").slice(0, 12);
}

// True iff the directory looks like a pilcrow-owned skill: its SKILL.md
// frontmatter names it `pilcrow`. Guards against deleting unrelated user
// skills with a name that collides with a deprecated entry.
function isPilcrowSkill(skillDir: string): boolean {
  const md = join(skillDir, "SKILL.md");
  if (!existsSync(md)) return false;
  try {
    const content = readFileSync(md, "utf8");
    return /^name:\s*pilcrow\b/m.test(content) || /\bpilcrow\b/i.test(content.slice(0, 800));
  } catch {
    return false;
  }
}

function ensureSkillSrc(): void {
  if (!existsSync(SKILL_SRC) || !existsSync(join(SKILL_SRC, "SKILL.md"))) {
    console.error(`Skill source not found at ${SKILL_SRC}.`);
    console.error("If you cloned the repo, run `npm install && npm run build` first.");
    process.exit(1);
  }
}

interface SkillArgs {
  providers: string[] | null;
  all: boolean;
  force: boolean;
}

function parseSkillArgs(args: string[]): SkillArgs {
  const out: SkillArgs = { providers: null, all: false, force: false };
  for (const a of args) {
    if (a === "--all") out.all = true;
    else if (a === "--force" || a === "-f") out.force = true;
    else if (a.startsWith("--provider=")) {
      const p = a.slice("--provider=".length);
      out.providers = (out.providers ?? []).concat(p.startsWith(".") ? p : `.${p}`);
    }
  }
  return out;
}

// Status of one installed skill copy.
//
// Edit detection only fires when versions match. A content-hash difference
// across versions is expected (every file's substituted form differs once
// the version frontmatter changes), and conflating it with local edits
// would block routine updates. If a user genuinely edited locally AND
// then a version bump shipped, the edits get overwritten on update; this
// is a deliberate trade for keeping `skills update --all` non-interactive
// across version bumps.
type SkillStatus =
  | { kind: "missing" }
  | { kind: "clean"; version: string }
  | { kind: "outdated"; version: string }
  | { kind: "modified"; version: string };

function skillStatus(
  installPath: string,
  srcHash: string,
  pkgVer: string,
): SkillStatus {
  if (!existsSync(join(installPath, "SKILL.md"))) return { kind: "missing" };
  const ver = installedVersion(installPath) ?? "?";
  if (ver !== pkgVer) return { kind: "outdated", version: ver };
  const installedHash = hashSkillDir(installPath, null);
  if (installedHash !== srcHash) return { kind: "modified", version: ver };
  return { kind: "clean", version: ver };
}

function formatStatus(provider: string, st: SkillStatus, pkgVer: string): string {
  const path = `${provider}/skills/${SKILL_FOLDER}`;
  switch (st.kind) {
    case "missing":
      return `  ${path}  not installed`;
    case "clean":
      return `  ${path}  v${st.version}  ✓ clean`;
    case "outdated":
      return `  ${path}  v${st.version} → v${pkgVer}  ↑ run \`pilcrow skills update\``;
    case "modified":
      return `  ${path}  v${st.version}  ✎ locally modified (use --force to overwrite)`;
  }
}

// Remove every deprecated sub-skill folder from every harness `skills/` dir
// under `root`. Only deletes if the folder is pilcrow-owned (its SKILL.md
// names `pilcrow`). Returns the absolute paths it deleted.
function sweepDeprecatedSubSkills(root: string): string[] {
  const deleted: string[] = [];
  if (DEPRECATED_SUB_SKILLS.length === 0) return deleted;
  for (const provider of PROVIDER_DIRS) {
    const skillsDir = join(root, provider, "skills");
    if (!existsSync(skillsDir)) continue;
    for (const name of DEPRECATED_SUB_SKILLS) {
      const target = join(skillsDir, name);
      let st;
      try {
        st = lstatSync(target);
      } catch {
        continue;
      }
      if (st.isSymbolicLink()) {
        const alive = existsSync(target);
        const safeToRemove = alive ? isPilcrowSkill(target) : true;
        if (safeToRemove) {
          unlinkSync(target);
          deleted.push(target);
        }
        continue;
      }
      if (st.isDirectory() && isPilcrowSkill(target)) {
        rmSync(target, { recursive: true, force: true });
        deleted.push(target);
      }
    }
  }
  return deleted;
}

export function cmdInstall(args: string[]): number {
  ensureSkillSrc();
  const root = findProjectRoot();
  const opts = parseSkillArgs(args);
  const subs = buildSubstitutions();
  const srcHash = hashSkillDir(SKILL_SRC, subs);
  const pkgVer = pkgVersion();

  let targets: string[] = opts.providers ?? findExistingProviders(root);
  if (opts.all) targets = PROVIDER_DIRS;
  if (targets.length === 0) {
    console.log("No AI harness directories detected in this project.");
    console.log("Installing to .claude/ by default. Pass --provider=.cursor (etc.) to choose.");
    targets = [".claude"];
  }

  let blocked = 0;
  for (const provider of targets) {
    const dest = join(root, provider, "skills", SKILL_FOLDER);
    const st = skillStatus(dest, srcHash, pkgVer);

    if (st.kind === "clean") {
      console.log(`up-to-date     ${provider}/skills/${SKILL_FOLDER}  (v${pkgVer})`);
      continue;
    }

    if (st.kind === "modified" && !opts.force) {
      console.log(
        `skipped        ${provider}/skills/${SKILL_FOLDER}  (v${st.version}): locally modified, pass --force to overwrite`,
      );
      blocked++;
      continue;
    }

    if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
    copyDir(SKILL_SRC, dest, subs);
    console.log(`installed →    ${provider}/skills/${SKILL_FOLDER}  (v${pkgVer})`);
  }

  // Always sweep deprecated sub-skills after install. Quiet if nothing matched.
  const swept = sweepDeprecatedSubSkills(root);
  for (const path of swept) {
    console.log(`removed (deprecated) → ${relative(root, path)}`);
  }

  return blocked > 0 ? 3 : 0;
}

export function cmdUpdate(args: string[]): number {
  const root = findProjectRoot();
  const opts = parseSkillArgs(args);
  const installed = findExistingProviders(root).filter((d) =>
    existsSync(join(root, d, "skills", SKILL_FOLDER)),
  );
  if (installed.length === 0 && !opts.providers && !opts.all) {
    console.log("Nothing to update. Run `pilcrow skills install` first.");
    return 0;
  }
  return cmdInstall(args);
}

export function cmdCheck(): number {
  const root = findProjectRoot();
  const subs = buildSubstitutions();
  const srcHash = hashSkillDir(SKILL_SRC, subs);
  const pkgVer = pkgVersion();
  const installed = findExistingProviders(root).filter((d) =>
    existsSync(join(root, d, "skills", SKILL_FOLDER, "SKILL.md")),
  );
  if (installed.length === 0) {
    console.log("pilcrow skill is not installed in this project.");
    console.log("Run `pilcrow skills install` to install.");
    return 0;
  }
  let anyStale = false;
  for (const provider of installed) {
    const dest = join(root, provider, "skills", SKILL_FOLDER);
    const st = skillStatus(dest, srcHash, pkgVer);
    if (st.kind !== "clean" && st.kind !== "missing") anyStale = true;
    console.log(formatStatus(provider, st, pkgVer));
  }
  // Report potential cleanup targets, but only list ones that exist.
  const swept = previewDeprecatedSweep(root);
  if (swept.length > 0) {
    console.log("");
    console.log("Deprecated installs detected. Run `pilcrow skills cleanup`:");
    for (const path of swept) console.log(`  ${relative(root, path)}`);
  }
  return anyStale ? 0 : 0;
}

// Dry-run version of sweep: just lists what cleanup would remove.
function previewDeprecatedSweep(root: string): string[] {
  const candidates: string[] = [];
  if (DEPRECATED_SUB_SKILLS.length === 0) return candidates;
  for (const provider of PROVIDER_DIRS) {
    const skillsDir = join(root, provider, "skills");
    if (!existsSync(skillsDir)) continue;
    for (const name of DEPRECATED_SUB_SKILLS) {
      const target = join(skillsDir, name);
      try {
        const st = lstatSync(target);
        if (st.isSymbolicLink() && (!existsSync(target) || isPilcrowSkill(target))) {
          candidates.push(target);
        } else if (st.isDirectory() && isPilcrowSkill(target)) {
          candidates.push(target);
        }
      } catch {
        // not present
      }
    }
  }
  return candidates;
}

export function cmdCleanup(): number {
  const root = findProjectRoot();
  const swept = sweepDeprecatedSubSkills(root);
  if (swept.length === 0) {
    console.log("No deprecated pilcrow skill installs found.");
    return 0;
  }
  console.log(`Removed ${swept.length} deprecated install${swept.length === 1 ? "" : "s"}:`);
  for (const path of swept) console.log(`  ${relative(root, path)}`);
  return 0;
}

export function cmdSkillsHelp(): number {
  console.log(`pilcrow skills: manage the skill in your AI harness

  pilcrow skills install [--provider=.cursor ...] [--all] [--force]
        Install skill/ into each detected provider directory's skills/
        --provider=.NAME    install only into this provider (repeatable)
        --all               install into every supported provider
        --force, -f         overwrite even if the installed copy was edited locally

  pilcrow skills update [flags]
        Re-install the latest copy of the skill (use after \`npm update -g\`).
        Accepts the same flags as install. Skips copies that are already
        clean at the current version; warns on locally-edited copies unless
        --force is passed.

  pilcrow skills check
        Show installed versions + content-hash status side-by-side with
        the package. Marks each install as clean / outdated / locally
        modified, and lists any deprecated installs to clean up.

  pilcrow skills cleanup
        Remove pilcrow skill folders that pilcrow itself shipped under a
        deprecated name (after a rename or merge). Verifies each candidate
        is pilcrow-owned before deleting; user-owned skills with the same
        folder name are left alone.

  pilcrow skills help
        Show this message

Supported providers: ${PROVIDER_DIRS.join(", ")}

Tip: install pilcrow once globally, then run \`pilcrow skills install\`
in any project to drop the skill into the right place.

  npm install -g pilcrow-ink
  cd your-project && pilcrow skills install
`);
  return 0;
}

export async function runSkills(args: string[]): Promise<number> {
  const sub = args[0] ?? "help";
  switch (sub) {
    case "install":
      return cmdInstall(args.slice(1));
    case "update":
      return cmdUpdate(args.slice(1));
    case "check":
      return cmdCheck();
    case "cleanup":
      return cmdCleanup();
    case "help":
    case "-h":
    case "--help":
      return cmdSkillsHelp();
    default:
      console.error(`unknown skills subcommand: ${sub}`);
      cmdSkillsHelp();
      return 2;
  }
}
