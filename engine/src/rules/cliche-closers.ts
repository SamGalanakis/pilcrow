import { fuzzyFindAny } from "../fuzzy.js";
import { makeFinding, sentenceStartSet } from "../helpers.js";
import type { Rule } from "../types.js";

const CLOSERS = [
  "in conclusion",
  "in summary",
  "to sum up",
  "to summarize",
  "all in all",
  "all things considered",
  "at the end of the day",
  "ultimately",
  "one thing is clear",
  "the future looks bright",
  "the possibilities are endless",
  "the future of",
  "it remains to be seen",
];

export const rule: Rule = {
  id: "cliche-closers",
  name: "Cliché closers",
  severity: "warning",
  description:
    "Boilerplate openers in closing paragraphs. Trust the reader; don't announce you're concluding.",
  phrases: CLOSERS,
  check(ctx) {
    const sentenceStarts = sentenceStartSet(ctx);
    return fuzzyFindAny(ctx.prose, ctx.tokens, CLOSERS, {
      allowInserts: 0,
      anchorAtSentenceStart: true,
      sentenceStarts,
    }).map((m) =>
      makeFinding(
        ctx,
        m.start,
        m.end,
        `Cliché closer: "${m.text}" (≈ "${m.phrase}"). Trust the reader.`,
      ),
    );
  },
};
