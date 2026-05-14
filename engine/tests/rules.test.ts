import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";
import { audit, listRules } from "../src/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(here, "fixtures");

describe("each rule has fixtures and behaves correctly", () => {
  for (const rule of listRules()) {
    describe(rule.id, () => {
      const goodPath = join(fixturesDir, rule.id, "good.md");
      const badPath = join(fixturesDir, rule.id, "bad.md");
      it(`good.md exists`, () => {
        expect(existsSync(goodPath), `missing ${goodPath}`).toBe(true);
      });
      it(`bad.md exists`, () => {
        expect(existsSync(badPath), `missing ${badPath}`).toBe(true);
      });
      it(`good.md produces zero findings for ${rule.id}`, () => {
        const text = readFileSync(goodPath, "utf8");
        const { findings } = audit(text, { rules: [rule.id] });
        expect(findings, `expected 0 findings for ${rule.id} in good.md, got: ${JSON.stringify(findings)}`).toHaveLength(0);
      });
      it(`bad.md produces ≥1 finding for ${rule.id}`, () => {
        const text = readFileSync(badPath, "utf8");
        const { findings } = audit(text, { rules: [rule.id] });
        expect(findings.length, `expected ≥1 finding for ${rule.id} in bad.md, got 0`).toBeGreaterThan(0);
      });
    });
  }
});
