import type { ProseToken } from "./types.js";

const SUFFIXES = [
  "ationally",
  "ization",
  "isation",
  "fulness",
  "ousness",
  "iness",
  "ously",
  "ively",
  "ation",
  "ition",
  "tion",
  "sion",
  "ness",
  "ment",
  "ance",
  "ence",
  "able",
  "ible",
  "ies",
  "ied",
  "ily",
  "ing",
  "est",
  "ers",
  "ed",
  "es",
  "er",
  "ly",
  "s",
  "y",
];

export function stem(word: string): string {
  let s = word.toLowerCase().replace(/['’]/g, "");
  if (s.length <= 3) return s;
  for (const sfx of SUFFIXES) {
    if (s.length > sfx.length + 2 && s.endsWith(sfx)) {
      s = s.slice(0, -sfx.length);
      if (s.length >= 2 && s[s.length - 1] === s[s.length - 2]) {
        s = s.slice(0, -1);
      }
      break;
    }
  }
  if (s.length >= 4 && s.endsWith("e")) {
    s = s.slice(0, -1);
  }
  return s;
}

export function tokenize(prose: string): ProseToken[] {
  const out: ProseToken[] = [];
  const re = /[A-Za-z][A-Za-z'’-]*/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(prose)) !== null) {
    const lower = m[0].toLowerCase().replace(/['’]/g, "");
    out.push({
      text: m[0],
      lower,
      stem: stem(lower),
      start: m.index,
      end: m.index + m[0].length,
    });
  }
  return out;
}

export interface FuzzyMatch {
  start: number;
  end: number;
  text: string;
}

export interface FuzzyOptions {
  allowInserts?: number;
  stemMatch?: boolean;
  anchorAtSentenceStart?: boolean;
  sentenceStarts?: Set<number>;
}

function tokenMatches(token: ProseToken, target: string, stemMatch: boolean): boolean {
  if (token.lower === target) return true;
  if (stemMatch) {
    const targetStem = stem(target);
    if (token.stem === targetStem) return true;
    if (token.lower === targetStem) return true;
    if (token.stem === target) return true;
  }
  return false;
}

export function fuzzyFindPhrase(
  prose: string,
  tokens: ProseToken[],
  phrase: string,
  options: FuzzyOptions = {},
): FuzzyMatch[] {
  const phraseWords = phrase.toLowerCase().split(/\s+/).filter(Boolean);
  if (phraseWords.length === 0) return [];
  const allowInserts = options.allowInserts ?? 1;
  const stemMatch = options.stemMatch ?? true;
  const anchor = options.anchorAtSentenceStart && options.sentenceStarts;
  const out: FuzzyMatch[] = [];
  let i = 0;
  while (i < tokens.length) {
    if (anchor && !options.sentenceStarts!.has(tokens[i].start)) {
      i++;
      continue;
    }
    if (!tokenMatches(tokens[i], phraseWords[0], stemMatch)) {
      i++;
      continue;
    }
    let ti = i + 1;
    let pj = 1;
    let inserts = 0;
    let lastMatchEnd = tokens[i].end;
    while (pj < phraseWords.length && ti < tokens.length) {
      if (tokenMatches(tokens[ti], phraseWords[pj], stemMatch)) {
        lastMatchEnd = tokens[ti].end;
        ti++;
        pj++;
        inserts = 0;
      } else if (inserts < allowInserts) {
        inserts++;
        ti++;
      } else {
        break;
      }
    }
    if (pj === phraseWords.length) {
      const start = tokens[i].start;
      out.push({ start, end: lastMatchEnd, text: prose.slice(start, lastMatchEnd) });
      i = ti;
    } else {
      i++;
    }
  }
  return out;
}

export function fuzzyFindAny(
  prose: string,
  tokens: ProseToken[],
  phrases: string[],
  options: FuzzyOptions = {},
): Array<FuzzyMatch & { phrase: string }> {
  const seen = new Map<string, FuzzyMatch & { phrase: string }>();
  for (const phrase of phrases) {
    const matches = fuzzyFindPhrase(prose, tokens, phrase, options);
    for (const m of matches) {
      const key = `${m.start}-${m.end}`;
      const prev = seen.get(key);
      if (!prev || phrase.length > prev.phrase.length) {
        seen.set(key, { ...m, phrase });
      }
    }
  }
  return [...seen.values()].sort((a, b) => a.start - b.start);
}
