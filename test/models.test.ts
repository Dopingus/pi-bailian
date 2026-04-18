/**
 * @jest-environment node
 */
import { describe, it, expect } from "vitest";
import { bailianModels, bailianModelsCN } from "../src/models.js";

describe("bailianModels", () => {
  it("should have correct number of models", () => {
    expect(bailianModels).toHaveLength(9);
  });

  it("should have all required model properties", () => {
    const requiredProps = [
      "id",
      "name",
      "reasoning",
      "input",
      "cost",
      "contextWindow",
      "maxTokens",
    ];

    for (const model of bailianModels) {
      for (const prop of requiredProps) {
        expect(model).toHaveProperty(prop);
      }
    }
  });

  it("should have valid cost structure for all models", () => {
    const costProps = ["input", "output", "cacheRead", "cacheWrite"];

    for (const model of bailianModels) {
      expect(model.cost).toBeDefined();
      for (const prop of costProps) {
        expect(model.cost).toHaveProperty(prop);
        expect(model.cost[prop as keyof typeof model.cost]).toBe(0);
      }
    }
  });

  it("should have valid input types", () => {
    const validInputs = ["text", "image"];

    for (const model of bailianModels) {
      for (const input of model.input) {
        expect(validInputs).toContain(input);
      }
    }
  });

  it("should have positive contextWindow for all models", () => {
    for (const model of bailianModels) {
      expect(model.contextWindow).toBeGreaterThan(0);
    }
  });

  it("should have positive maxTokens for all models", () => {
    for (const model of bailianModels) {
      expect(model.maxTokens).toBeGreaterThan(0);
    }
  });

  it("should include Qwen models", () => {
    const qwenModels = bailianModels.filter((m) => m.id.startsWith("qwen"));
    expect(qwenModels.length).toBeGreaterThanOrEqual(4);
  });

  it("should include GLM models", () => {
    const glmModels = bailianModels.filter((m) => m.id.startsWith("glm"));
    expect(glmModels.length).toBeGreaterThanOrEqual(2);
  });

  it("should include Kimi model", () => {
    const kimiModels = bailianModels.filter((m) => m.id.startsWith("kimi"));
    expect(kimiModels.length).toBeGreaterThanOrEqual(1);
  });

  it("should include MiniMax model", () => {
    const miniMaxModels = bailianModels.filter((m) => m.id.includes("MiniMax"));
    expect(miniMaxModels.length).toBeGreaterThanOrEqual(1);
  });

  it("should have vision-capable models", () => {
    const visionModels = bailianModels.filter((m) => m.input.includes("image"));
    expect(visionModels.length).toBeGreaterThan(0);
  });

  it("should have reasoning models", () => {
    const reasoningModels = bailianModels.filter((m) => m.reasoning);
    expect(reasoningModels.length).toBeGreaterThan(0);
  });

  it("should have unique model IDs", () => {
    const ids = bailianModels.map((m) => m.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it("should have unique model names", () => {
    const names = bailianModels.map((m) => m.name);
    const uniqueNames = new Set(names);
    expect(names.length).toBe(uniqueNames.size);
  });

  describe("specific model validations", () => {
    it("Qwen3.5 Plus should support vision and reasoning", () => {
      const model = bailianModels.find((m) => m.id === "qwen3.5-plus");
      expect(model).toBeDefined();
      expect(model?.reasoning).toBe(true);
      expect(model?.input).toContain("image");
    });

    it("Qwen3 Coder Next should have large context window", () => {
      const model = bailianModels.find((m) => m.id === "qwen3-coder-next");
      expect(model).toBeDefined();
      expect(model?.contextWindow).toBeGreaterThanOrEqual(262144);
    });

    it("Qwen3 Coder Plus should have 1M context window", () => {
      const model = bailianModels.find((m) => m.id === "qwen3-coder-plus");
      expect(model).toBeDefined();
      expect(model?.contextWindow).toBe(1000000);
    });
  });
});

describe("bailianModelsCN", () => {
  it("should have same number of models as international", () => {
    expect(bailianModelsCN).toHaveLength(bailianModels.length);
  });

  it("should have same model IDs as international", () => {
    const intlIds = bailianModels.map((m) => m.id).sort();
    const cnIds = bailianModelsCN.map((m) => m.id).sort();
    expect(cnIds).toEqual(intlIds);
  });

  it("should have (CN) suffix in names", () => {
    for (const model of bailianModelsCN) {
      expect(model.name).toContain("(CN)");
    }
  });

  it("should have same properties as international models", () => {
    for (let i = 0; i < bailianModels.length; i++) {
      const intlModel = bailianModels[i];
      const cnModel = bailianModelsCN.find((m) => m.id === intlModel.id);

      expect(cnModel).toBeDefined();
      expect(cnModel?.reasoning).toBe(intlModel.reasoning);
      expect(cnModel?.input).toEqual(intlModel.input);
      expect(cnModel?.contextWindow).toBe(intlModel.contextWindow);
      expect(cnModel?.maxTokens).toBe(intlModel.maxTokens);
      expect(cnModel?.cost).toEqual(intlModel.cost);
    }
  });
});
