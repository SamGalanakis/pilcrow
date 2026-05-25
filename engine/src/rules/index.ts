import { rule as adverbDensity } from "./adverb-density.js";
import { rule as aiTellPhrasebank } from "./ai-tell-phrasebank.js";
import { rule as anaphoraCadence } from "./anaphora-cadence.js";
import { rule as antithesisCadence } from "./antithesis-cadence.js";
import { rule as boosters } from "./boosters.js";
import { rule as bulletBoldLead } from "./bullet-bold-lead.js";
import { rule as citationArtifact } from "./citation-artifact.js";
import { rule as clicheClosers } from "./cliche-closers.js";
import { rule as clicheList } from "./cliche-list.js";
import { rule as colonHeadline } from "./colon-headline.js";
import { rule as copulaDodge } from "./copula-dodge.js";
import { rule as corporateCliche } from "./corporate-cliche.js";
import { rule as dashStyleInconsistency } from "./dash-style-inconsistency.js";
import { rule as decorativeEmoji } from "./decorative-emoji.js";
import { rule as disclaimerTail } from "./disclaimer-tail.js";
import { rule as emDashDensity } from "./em-dash-density.js";
import { rule as expletives } from "./expletives.js";
import { rule as falsePrecisionHeadline } from "./false-precision-headline.js";
import { rule as fragmentCadence } from "./fragment-cadence.js";
import { rule as fromXToY } from "./from-x-to-y.js";
import { rule as heroTaglineImperative } from "./hero-tagline-imperative.js";
import { rule as inlineBoldEmphasis } from "./inline-bold-emphasis.js";
import { rule as metaDiscourse } from "./meta-discourse.js";
import { rule as negationOfNegation } from "./negation-of-negation.js";
import { rule as nominalizationDensity } from "./nominalization-density.js";
import { rule as nounStacking } from "./noun-stacking.js";
import { rule as overusedWords } from "./overused-words.js";
import { rule as oxfordCommaInconsistency } from "./oxford-comma-inconsistency.js";
import { rule as paragraphMonotony } from "./paragraph-monotony.js";
import { rule as parallelTripletDensity } from "./parallel-triplet-density.js";
import { rule as parentheticalAsideDensity } from "./parenthetical-aside-density.js";
import { rule as passiveVoice } from "./passive-voice.js";
import { rule as placeholderLeak } from "./placeholder-leak.js";
import { rule as presentParticipleTail } from "./present-participle-tail.js";
import { rule as pronounDensityLow } from "./pronoun-density-low.js";
import { rule as pronounItVague } from "./pronoun-it-vague.js";
import { rule as quoteStyleInconsistency } from "./quote-style-inconsistency.js";
import { rule as redundantPairs } from "./redundant-pairs.js";
import { rule as repeatedWordsWindow } from "./repeated-words-window.js";
import { rule as sentenceLengthMonotony } from "./sentence-length-monotony.js";
import { rule as sentenceTooLong } from "./sentence-too-long.js";
import { rule as signoffChatbot } from "./signoff-chatbot.js";
import { rule as sycophantOpener } from "./sycophant-opener.js";
import { rule as thereIsThereAre } from "./there-is-there-are.js";
import { rule as throatClearingOpeners } from "./throat-clearing-openers.js";
import { rule as titleCaseHeaders } from "./title-case-headers.js";
import { rule as transitionStacking } from "./transition-stacking.js";
import { rule as vagueQuantifiers } from "./vague-quantifiers.js";
import { rule as weaselHedges } from "./weasel-hedges.js";
import { rule as wordyPhrases } from "./wordy-phrases.js";
import type { Rule } from "../types.js";

export const rules: Rule[] = [
  aiTellPhrasebank,
  overusedWords,
  antithesisCadence,
  throatClearingOpeners,
  clicheClosers,
  corporateCliche,
  clicheList,
  wordyPhrases,
  redundantPairs,
  copulaDodge,
  signoffChatbot,
  sycophantOpener,
  disclaimerTail,
  citationArtifact,
  placeholderLeak,
  emDashDensity,
  adverbDensity,
  nominalizationDensity,
  boosters,
  weaselHedges,
  passiveVoice,
  pronounDensityLow,
  parentheticalAsideDensity,
  inlineBoldEmphasis,
  sentenceLengthMonotony,
  sentenceTooLong,
  paragraphMonotony,
  parallelTripletDensity,
  transitionStacking,
  repeatedWordsWindow,
  nounStacking,
  anaphoraCadence,
  fragmentCadence,
  heroTaglineImperative,
  fromXToY,
  presentParticipleTail,
  vagueQuantifiers,
  dashStyleInconsistency,
  quoteStyleInconsistency,
  oxfordCommaInconsistency,
  thereIsThereAre,
  expletives,
  negationOfNegation,
  metaDiscourse,
  pronounItVague,
  bulletBoldLead,
  titleCaseHeaders,
  colonHeadline,
  decorativeEmoji,
  falsePrecisionHeadline,
];
