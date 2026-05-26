/**
 * Shared context loader for every pilcrow editor or project command that needs
 * to know "what voice are we writing in".
 *
 * Input: project root (process.cwd()).
 *
 * Output (JSON to stdout):
 *   {
 *     hasVoice: boolean,         // VOICE.md found
 *     voice: string | null,      // VOICE.md contents
 *     voicePath: string | null,  // relative path
 *     contextDir: string,        // absolute path the file was resolved from
 *   }
 *
 * Filename matching is case-insensitive.
 *
 * Lookup directory resolution (first match wins):
 *   1. process.env.PILCROW_CONTEXT_DIR (absolute or relative to cwd)
 *   2. cwd, if VOICE.md is at the root
 *   3. Auto-fallback subdirectories: .pilcrow/, docs/
 *   4. cwd as a default "no context found" location
 */

import fs from 'node:fs';
import path from 'node:path';

const VOICE_NAMES = ['VOICE.md', 'Voice.md', 'voice.md'];
const FALLBACK_DIRS = ['.pilcrow', 'docs'];

export function resolveContextDir(cwd = process.cwd()) {
  const envDir = process.env.PILCROW_CONTEXT_DIR;
  if (envDir && envDir.trim()) {
    const trimmed = envDir.trim();
    return path.isAbsolute(trimmed) ? trimmed : path.resolve(cwd, trimmed);
  }

  if (firstExisting(cwd, VOICE_NAMES)) {
    return cwd;
  }

  for (const rel of FALLBACK_DIRS) {
    const candidate = path.resolve(cwd, rel);
    if (firstExisting(candidate, VOICE_NAMES)) {
      return candidate;
    }
  }

  return cwd;
}

export function loadContext(cwd = process.cwd()) {
  const contextDir = resolveContextDir(cwd);

  const voicePath = firstExisting(contextDir, VOICE_NAMES);
  const voice = voicePath ? safeRead(voicePath) : null;

  return {
    hasVoice: !!voice,
    voice,
    voicePath: voicePath ? path.relative(cwd, voicePath) : null,
    contextDir,
  };
}

function firstExisting(dir, names) {
  for (const name of names) {
    const abs = path.join(dir, name);
    if (fs.existsSync(abs)) return abs;
  }
  return null;
}

function safeRead(p) {
  try { return fs.readFileSync(p, 'utf-8'); } catch { return null; }
}

function cli() {
  const result = loadContext(process.cwd());
  console.log(JSON.stringify(result, null, 2));
}

const _running = process.argv[1];
if (_running?.endsWith('load-context.mjs') || _running?.endsWith('load-context.mjs/')) {
  cli();
}
