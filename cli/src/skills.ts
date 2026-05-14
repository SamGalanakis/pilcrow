import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
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

function copyDir(src: string, dest: string): void {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const s = join(src, entry.name);
    const d = join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else if (entry.isFile()) writeFileSync(d, readFileSync(s));
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
}

function parseSkillArgs(args: string[]): SkillArgs {
  const out: SkillArgs = { providers: null, all: false };
  for (const a of args) {
    if (a === "--all") out.all = true;
    else if (a.startsWith("--provider=")) {
      const p = a.slice("--provider=".length);
      out.providers = (out.providers ?? []).concat(p.startsWith(".") ? p : `.${p}`);
    }
  }
  return out;
}

export function cmdInstall(args: string[]): number {
  ensureSkillSrc();
  const root = findProjectRoot();
  const opts = parseSkillArgs(args);

  let targets: string[] = opts.providers ?? findExistingProviders(root);
  if (opts.all) targets = PROVIDER_DIRS;
  if (targets.length === 0) {
    console.log("No AI harness directories detected in this project.");
    console.log("Installing to .claude/ by default. Pass --provider=.cursor (etc.) to choose.");
    targets = [".claude"];
  }

  for (const provider of targets) {
    const dest = join(root, provider, "skills", SKILL_FOLDER);
    if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
    copyDir(SKILL_SRC, dest);
    console.log(`installed → ${provider}/skills/${SKILL_FOLDER}  (v${pkgVersion()})`);
  }
  return 0;
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
  const current = pkgVersion();
  const installed = findExistingProviders(root).filter((d) =>
    existsSync(join(root, d, "skills", SKILL_FOLDER, "SKILL.md")),
  );
  if (installed.length === 0) {
    console.log("pilcrow skill is not installed in this project.");
    console.log("Run `pilcrow skills install` to install.");
    return 0;
  }
  let stale = false;
  for (const provider of installed) {
    const v = installedVersion(join(root, provider, "skills", SKILL_FOLDER));
    const ok = v === current;
    if (!ok) stale = true;
    console.log(`  ${provider}/skills/${SKILL_FOLDER}  installed: v${v ?? "?"}  package: v${current}  ${ok ? "✓" : "↑ run `pilcrow skills update`"}`);
  }
  return stale ? 0 : 0;
}

export function cmdSkillsHelp(): number {
  console.log(`pilcrow skills — manage the skill in your AI harness

  pilcrow skills install [--provider=.cursor ...] [--all]
        Install skill/ into each detected provider directory's skills/iw/
        --provider=.NAME    install only into this provider (repeatable)
        --all               install into every supported provider

  pilcrow skills update [flags]
        Re-install the latest copy of the skill (use after \`npm update -g\`)

  pilcrow skills check
        Show installed versions side-by-side with the package version

  pilcrow skills help
        Show this message

Supported providers: ${PROVIDER_DIRS.join(", ")}

Tip: install pilcrow once globally, then run \`pilcrow skills install\`
in any project to drop the skill into the right place.

  npm install -g pilcrow
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
