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
});

describe("rule registry", () => {
  it("has 49 deterministic rules", () => {
    expect(listRules()).toHaveLength(49);
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
  it("has 19 rules", () => {
    expect(llmRules.length).toBe(19);
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
