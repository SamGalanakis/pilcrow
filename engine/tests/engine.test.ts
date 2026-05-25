import { describe, expect, it } from "vitest";
import { audit, listRules, buildCritiquePrompt, llmRules, parseLlmFindings } from "../src/index.js";

describe("audit", () => {
  it("returns empty findings for empty text", () => {
    const result = audit("");
    expect(result.findings).toEqual([]);
    expect(result.summary.total).toBe(0);
  });

  it("respects the rules filter", () => {
    const text = "Let me delve into the rich tapestry. In order to succeed, we must persist.";
    const all = audit(text);
    const onlyPhrasebank = audit(text, { rules: ["ai-tell-phrasebank"] });
    expect(onlyPhrasebank.findings.every((f) => f.ruleId === "ai-tell-phrasebank")).toBe(true);
    expect(all.summary.total).toBeGreaterThan(onlyPhrasebank.summary.total);
  });

  it("respects the exclude filter", () => {
    const text = "Let me delve into the rich tapestry.";
    const result = audit(text, { exclude: ["ai-tell-phrasebank"] });
    expect(result.findings.find((f) => f.ruleId === "ai-tell-phrasebank")).toBeUndefined();
  });

  it("findings carry line + column + excerpt", () => {
    const text = "First line.\nLet me delve into the rich tapestry.";
    const result = audit(text, { rules: ["ai-tell-phrasebank"] });
    expect(result.findings[0].line).toBe(2);
    expect(result.findings[0].column).toBeGreaterThan(0);
    expect(result.findings[0].excerpt).toContain("delve");
  });

  it("strips markdown code blocks before analysis", () => {
    const text = '```\nLet me delve into the rich tapestry.\n```\n\nNormal prose here.';
    const result = audit(text, { rules: ["ai-tell-phrasebank"] });
    expect(result.findings).toHaveLength(0);
  });

  it("strips HTML script/style/pre/code content", () => {
    const text = '<p>Body prose.</p><code>delve into the rich tapestry</code><script>delve into x</script><style>.x { delve: into }</style><pre>rich tapestry</pre>';
    const result = audit(text, { rules: ["ai-tell-phrasebank"] });
    expect(result.findings).toHaveLength(0);
  });

  it("strips HTML tags but keeps the prose between them", () => {
    const text = '<p>Let me <em>delve into</em> the <strong>rich tapestry</strong>.</p>';
    const result = audit(text, { rules: ["ai-tell-phrasebank"] });
    expect(result.findings.length).toBeGreaterThan(0);
  });

  it("decodes &mdash; entity so em-dash density still sees it", () => {
    const text = "<p>One sentence&mdash;then another&mdash;and a third&mdash;and more&mdash;and even more&mdash;continuing on.</p>";
    const result = audit(text, { rules: ["em-dash-density"] });
    expect(result.findings.length).toBeGreaterThan(0);
  });

  it("ignoreQuoted masks straight-quoted phrases", () => {
    const text = 'The phrase "delve into" is a classic AI tell.';
    const without = audit(text, { rules: ["ai-tell-phrasebank"] });
    const withFlag = audit(text, { rules: ["ai-tell-phrasebank"], ignoreQuoted: true });
    expect(without.findings.length).toBeGreaterThan(0);
    expect(withFlag.findings).toHaveLength(0);
  });

  it("ignoreQuoted does not mask unquoted prose", () => {
    const text = "Let me delve into the rich tapestry.";
    const result = audit(text, { rules: ["ai-tell-phrasebank"], ignoreQuoted: true });
    expect(result.findings.length).toBeGreaterThan(0);
  });
});

describe("rule registry", () => {
  it("has 50 deterministic rules", () => {
    expect(listRules()).toHaveLength(50);
  });

  it("every rule has unique id", () => {
    const ids = listRules().map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("fuzzy matching", () => {
  it("catches verb morphology variants", () => {
    const cases = [
      "We will delve into this.",
      "She delved into the data.",
      "Delving into the topic, the team...",
    ];
    for (const text of cases) {
      const result = audit(text, { rules: ["ai-tell-phrasebank"] });
      expect(result.findings.length, `expected match in: ${text}`).toBeGreaterThan(0);
    }
  });

  it("catches short-insertion variants", () => {
    const text = "Let me delve deeply into this rich tapestry of ideas.";
    const result = audit(text, { rules: ["ai-tell-phrasebank"] });
    expect(result.findings.length).toBeGreaterThanOrEqual(2);
  });
});

describe("LLM-rule catalog", () => {
  it("has 22 rules", () => {
    expect(llmRules.length).toBe(22);
  });

  it("includes unsupported-claim", () => {
    expect(llmRules.some((r) => r.id === "unsupported-claim")).toBe(true);
  });

  it("includes feature-tally", () => {
    expect(llmRules.some((r) => r.id === "feature-tally")).toBe(true);
  });

  it("buildCritiquePrompt embeds the rules and the prose", () => {
    const prompt = buildCritiquePrompt("Hello world.");
    expect(prompt).toContain("Hello world.");
    expect(prompt).toContain("buried-lede");
    expect(prompt).toContain("voice-consistency");
  });

  it("parseLlmFindings filters unknown ids and parses fenced JSON", () => {
    const json = '```json\n{"findings":[{"ruleId":"buried-lede","severity":"error","line":1,"excerpt":"x","message":"y"},{"ruleId":"made-up","severity":"info","line":1,"excerpt":"x","message":"y"}]}\n```';
    const out = parseLlmFindings(json);
    expect(out).toHaveLength(1);
    expect(out[0].ruleId).toBe("buried-lede");
  });
});
