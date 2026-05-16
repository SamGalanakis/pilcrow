#!/usr/bin/env node
// Tags and publishes a GitHub release for pilcrow.
//
// Usage:
//   node scripts/release.mjs            # release the current package.json version
//   node scripts/release.mjs --dry-run  # rehearse without tagging/pushing
//   node scripts/release.mjs --bump patch|minor|major
//                                       # bump the version in place, sync sibling
//                                       # version strings, commit, then release
//
// Refuses on a dirty tree (unless --bump), an unpushed HEAD, an existing tag,
// or a sibling version (SKILL.md, docs/index.html) that drifted from
// package.json. `npm publish` stays manual; the script just prints the
// reminder at the end.

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const bumpIdx = args.indexOf('--bump');
const bump = bumpIdx === -1 ? null : args[bumpIdx + 1];
if (bump && !['patch', 'minor', 'major'].includes(bump)) {
  fail(`--bump must be patch | minor | major (got ${bump})`);
}

const PKG_PATH = path.join(repoRoot, 'package.json');
const SKILL_PATH = path.join(repoRoot, 'skill/SKILL.md');
const DOCS_PATH = path.join(repoRoot, 'docs/index.html');

function fail(msg) {
  console.error(`✗ ${msg}`);
  process.exit(1);
}
function ok(msg) {
  console.log(`✓ ${msg}`);
}
function step(msg) {
  console.log(`\n→ ${msg}`);
}
function run(cmd) {
  return execSync(cmd, { cwd: repoRoot, encoding: 'utf8' }).trim();
}
function runMutating(cmd) {
  if (dryRun) {
    console.log(`  [dry-run] ${cmd}`);
    return;
  }
  execSync(cmd, { cwd: repoRoot, stdio: 'inherit' });
}

function readPkg() {
  return JSON.parse(readFileSync(PKG_PATH, 'utf8'));
}
function writePkg(pkg) {
  writeFileSync(PKG_PATH, JSON.stringify(pkg, null, 2) + '\n');
}

function bumpSemver(current, kind) {
  const m = current.match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!m) fail(`Cannot --bump from non-semver version "${current}"`);
  let [, maj, min, pat] = m.map(Number);
  if (kind === 'major') { maj += 1; min = 0; pat = 0; }
  else if (kind === 'minor') { min += 1; pat = 0; }
  else { pat += 1; }
  return `${maj}.${min}.${pat}`;
}

function syncSiblings(version) {
  const changes = [];
  const skill = readFileSync(SKILL_PATH, 'utf8');
  const skillNew = skill.replace(/^version:.*$/m, `version: ${version}`);
  if (skillNew !== skill) {
    writeFileSync(SKILL_PATH, skillNew);
    changes.push('skill/SKILL.md');
  }

  const docs = readFileSync(DOCS_PATH, 'utf8');
  const shortVersion = version.replace(/^(\d+\.\d+)\..*$/, '$1');
  const docsNew = docs.replace(/v\d+\.\d+(?:\.\d+)?/g, `v${shortVersion}`);
  if (docsNew !== docs) {
    writeFileSync(DOCS_PATH, docsNew);
    changes.push('docs/index.html');
  }
  return changes;
}

function verifySiblings(version) {
  const skill = readFileSync(SKILL_PATH, 'utf8');
  const skillMatch = skill.match(/^version:\s*(\S+)$/m);
  if (!skillMatch) fail('skill/SKILL.md has no version: frontmatter field');
  if (skillMatch[1] !== version) {
    fail(`skill/SKILL.md version "${skillMatch[1]}" disagrees with package.json "${version}". Re-run with --bump or sync manually.`);
  }

  const docs = readFileSync(DOCS_PATH, 'utf8');
  const shortVersion = version.replace(/^(\d+\.\d+)\..*$/, '$1');
  const docsRefs = docs.match(/v\d+\.\d+(?:\.\d+)?/g) || [];
  const wrong = docsRefs.filter((r) => r !== `v${shortVersion}`);
  if (wrong.length) {
    fail(`docs/index.html has stale version strings ${[...new Set(wrong)].join(', ')}; expected v${shortVersion}.`);
  }
}

// ---------------------------------------------------------------------------

let pkg = readPkg();
let justBumped = false;

if (bump) {
  step('Checking working tree is clean before bump');
  const status = run('git status --porcelain');
  if (status) fail(`Working tree is dirty. Commit or stash first:\n${status}`);
  ok('clean');

  const next = bumpSemver(pkg.version, bump);
  step(`Bumping ${pkg.version} → ${next}`);
  pkg.version = next;
  if (!dryRun) {
    writePkg(pkg);
    const changed = syncSiblings(next);
    ok(`updated package.json + ${changed.join(', ') || '(no siblings)'}`);
  } else {
    ok('would update package.json + skill/SKILL.md, docs/index.html');
  }

  step('Committing the bump');
  runMutating('git add package.json skill/SKILL.md docs/index.html');
  runMutating(`git commit -m "Release v${next}"`);
  step('Pushing to origin');
  runMutating('git push');
  justBumped = true;
}

const version = pkg.version;
const tag = `v${version}`;

step(`Releasing ${pkg.name} ${version}`);

if (!justBumped) {
  step('Verifying sibling versions match');
  verifySiblings(version);
  ok('skill/SKILL.md and docs/index.html match');
}

step('Checking working tree is clean');
const status = run('git status --porcelain');
if (status) fail(`Working tree is dirty. Commit or stash first:\n${status}`);
ok('clean');

step('Checking HEAD is pushed to origin');
const branch = run('git rev-parse --abbrev-ref HEAD');
const head = run('git rev-parse HEAD');
let remoteHead;
try {
  remoteHead = run(`git rev-parse origin/${branch}`);
} catch {
  fail(`No tracking branch origin/${branch}. Push first.`);
}
if (head !== remoteHead) fail(`HEAD is ahead of origin/${branch}. Push your commits first.`);
ok(`origin/${branch} matches HEAD`);

step(`Verifying tag ${tag} does not already exist`);
let localTagExists = false;
try {
  run(`git rev-parse -q --verify "refs/tags/${tag}"`);
  localTagExists = true;
} catch {}
if (localTagExists) fail(`Tag ${tag} already exists locally.`);
const remoteTags = run('git ls-remote --tags origin');
if (remoteTags.split('\n').some((line) => line.endsWith(`refs/tags/${tag}`))) {
  fail(`Tag ${tag} already exists on origin.`);
}
ok('tag is free');

step('Running tests + build');
if (dryRun) {
  console.log('  [dry-run] npm test');
  console.log('  [dry-run] npm run build');
} else {
  execSync('npm test', { cwd: repoRoot, stdio: 'inherit' });
  execSync('npm run build', { cwd: repoRoot, stdio: 'inherit' });
}
ok('tests + build pass');

step('Gathering commits since last tag');
let notes;
let prevTag;
try {
  prevTag = run(`git describe --tags --abbrev=0 --match "v*" 2>/dev/null`);
} catch {
  prevTag = null;
}
const logRange = prevTag ? `${prevTag}..HEAD` : 'HEAD';
const log = run(`git log ${logRange} --pretty=format:"- %s"`);
notes = log || `Release ${tag}`;
if (prevTag) {
  notes += `\n\n**Full changelog:** https://github.com/SamGalanakis/pilcrow/compare/${prevTag}...${tag}`;
}

console.log('\n--- Release notes preview ---');
console.log(notes);
console.log('--- end preview ---\n');

step(`Creating annotated tag ${tag}`);
runMutating(`git tag -a ${tag} -m "Release ${tag}"`);
runMutating(`git push origin ${tag}`);

step(`Creating GitHub release ${tag}`);
const notesArg = notes.replace(/"/g, '\\"');
runMutating(`gh release create ${tag} --title "${tag}" --notes "${notesArg}"`);

console.log(`\n✓ ${pkg.name} ${version} released as ${tag}`);
console.log('\n→ Next: npm publish');
console.log('  (you stay in control of the npm credentials)');
