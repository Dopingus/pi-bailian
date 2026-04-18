/**
 * @jest-environment node
 */
import { describe, it, expect } from "vitest";

describe("Module Exports", () => {
  it("should export bailianModels", async () => {
    const { bailianModels } = await import("../src/models.js");
    expect(bailianModels).toBeDefined();
    expect(Array.isArray(bailianModels)).toBe(true);
  });

  it("should export bailianModelsCN", async () => {
    const { bailianModelsCN } = await import("../src/models.js");
    expect(bailianModelsCN).toBeDefined();
    expect(Array.isArray(bailianModelsCN)).toBe(true);
  });

  it("should export default function", async () => {
    const module = await import("../src/index.js");
    expect(module.default).toBeDefined();
    expect(typeof module.default).toBe("function");
  });
});
