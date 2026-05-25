/**
 * Locate the OpenAI speech skill that pilcrow's `aloud` lens depends on for
 * TTS. If installed in any harness directory below the cwd, return its path.
 * Otherwise fetch a pinned snapshot into /tmp/pilcrow/skills/speech/ and
 * return that.
 *
 * Output (JSON to stdout):
 *   {
 *     path: string,             // absolute path to the skill directory
 *     scriptPath: string,       // absolute path to scripts/text_to_speech.py
 *     source: "installed" | "fetched" | "cached",
 *     sha: string,
 *   }
 *
 * Exits non-zero with an error message on failure.
 *
 * Fetch strategy:
 *   1. Prefer `git clone --depth 1` + `git fetch <SHA>` + `git checkout <SHA>`.
 *   2. If git is unavailable, fall back to `gh api repos/openai/skills/tarball/<SHA>`
 *      and extract only `skills/.curated/speech/`.
 *
 * The pinned SHA below is recorded in NOTICE.md. Bump deliberately.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execSync, spawnSync } from 'node:child_process';

const PINNED_SHA = 'c25113bf4c64c8dba6bfe61acf06051d79aa43f6';
const REPO = 'openai/skills';
const SKILL_SUBPATH = 'skills/.curated/speech';
const CACHE_ROOT = path.join(os.tmpdir(), 'pilcrow', 'skills', 'speech');

const PROVIDER_DIRS = [
  '.claude', '.cursor', '.gemini', '.agents', '.opencode',
  '.kiro', '.pi', '.qoder', '.trae', '.github',
];

export function findInstalledSpeechSkill(cwd = process.cwd()) {
  let dir = cwd;
  for (let depth = 0; depth < 12; depth++) {
    for (const provider of PROVIDER_DIRS) {
      const candidate = path.join(dir, provider, 'skills', 'speech');
      if (isValidSpeechSkill(candidate)) return candidate;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

function isValidSpeechSkill(dir) {
  return fs.existsSync(path.join(dir, 'SKILL.md'))
    && fs.existsSync(path.join(dir, 'scripts', 'text_to_speech.py'));
}

function which(cmd) {
  const r = spawnSync('sh', ['-c', `command -v ${cmd}`], { encoding: 'utf-8' });
  return r.status === 0 ? r.stdout.trim() : null;
}

function fetchViaGit() {
  if (!which('git')) return false;
  fs.rmSync(CACHE_ROOT, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(CACHE_ROOT), { recursive: true });
  const workDir = `${CACHE_ROOT}.work`;
  fs.rmSync(workDir, { recursive: true, force: true });
  execSync(`git clone --quiet --filter=blob:none --no-checkout https://github.com/${REPO}.git "${workDir}"`, { stdio: 'pipe' });
  execSync(`git -C "${workDir}" sparse-checkout init --cone`, { stdio: 'pipe' });
  execSync(`git -C "${workDir}" sparse-checkout set ${SKILL_SUBPATH}`, { stdio: 'pipe' });
  execSync(`git -C "${workDir}" checkout ${PINNED_SHA}`, { stdio: 'pipe' });
  fs.mkdirSync(CACHE_ROOT, { recursive: true });
  copyDir(path.join(workDir, SKILL_SUBPATH), CACHE_ROOT);
  fs.rmSync(workDir, { recursive: true, force: true });
  return true;
}

function fetchViaGh() {
  if (!which('gh') || !which('tar')) return false;
  fs.rmSync(CACHE_ROOT, { recursive: true, force: true });
  fs.mkdirSync(CACHE_ROOT, { recursive: true });
  const tarPath = `${CACHE_ROOT}.tar.gz`;
  execSync(`gh api repos/${REPO}/tarball/${PINNED_SHA} > "${tarPath}"`, { stdio: 'pipe', shell: '/bin/sh' });
  const extractDir = `${CACHE_ROOT}.extract`;
  fs.rmSync(extractDir, { recursive: true, force: true });
  fs.mkdirSync(extractDir, { recursive: true });
  execSync(`tar -xzf "${tarPath}" -C "${extractDir}"`, { stdio: 'pipe' });
  fs.unlinkSync(tarPath);
  const topLevel = fs.readdirSync(extractDir)[0];
  if (!topLevel) throw new Error('tarball was empty');
  const src = path.join(extractDir, topLevel, SKILL_SUBPATH);
  if (!fs.existsSync(src)) throw new Error(`tarball missing ${SKILL_SUBPATH}`);
  copyDir(src, CACHE_ROOT);
  fs.rmSync(extractDir, { recursive: true, force: true });
  return true;
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else if (entry.isFile()) fs.copyFileSync(s, d);
  }
}

export function resolveSpeechSkill(cwd = process.cwd()) {
  const installed = findInstalledSpeechSkill(cwd);
  if (installed) {
    return {
      path: installed,
      scriptPath: path.join(installed, 'scripts', 'text_to_speech.py'),
      source: 'installed',
      sha: null,
    };
  }

  if (isValidSpeechSkill(CACHE_ROOT)) {
    return {
      path: CACHE_ROOT,
      scriptPath: path.join(CACHE_ROOT, 'scripts', 'text_to_speech.py'),
      source: 'cached',
      sha: PINNED_SHA,
    };
  }

  if (!fetchViaGit() && !fetchViaGh()) {
    throw new Error('Could not fetch the OpenAI speech skill: neither `git` nor `gh` is available.');
  }
  if (!isValidSpeechSkill(CACHE_ROOT)) {
    throw new Error(`Fetched ${REPO}@${PINNED_SHA} but ${SKILL_SUBPATH}/scripts/text_to_speech.py is missing.`);
  }
  return {
    path: CACHE_ROOT,
    scriptPath: path.join(CACHE_ROOT, 'scripts', 'text_to_speech.py'),
    source: 'fetched',
    sha: PINNED_SHA,
  };
}

function cli() {
  try {
    const result = resolveSpeechSkill(process.cwd());
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(err.message || String(err));
    process.exit(1);
  }
}

const _running = process.argv[1];
if (_running?.endsWith('resolve-speech.mjs') || _running?.endsWith('resolve-speech.mjs/')) {
  cli();
}
