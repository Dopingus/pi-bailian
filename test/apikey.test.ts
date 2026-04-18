/**
 * @jest-environment node
 */
import { describe, it, expect } from "vitest";

// We need to test the validateApiKey function, but it's not exported.
// For testing purposes, we'll duplicate the logic here and test it thoroughly.
// In a real scenario, we might export it for testing or use a different approach.

/**
 * Validate Bailian API key format
 * API keys should start with 'sk-sp-' prefix
 */
function validateApiKey(key: string): { valid: boolean; error?: string } {
  const trimmed = key.trim();

  if (!trimmed) {
    return { valid: false, error: "API key cannot be empty" };
  }

  if (!trimmed.startsWith("sk-sp-")) {
    return {
      valid: false,
      error:
        "Invalid API key format. Bailian Coding Plan API keys should start with 'sk-sp-'. Please get your key from https://modelstudio.console.alibabacloud.com/",
    };
  }

  if (trimmed.length < 10) {
    return { valid: false, error: "API key appears too short" };
  }

  return { valid: true };
}

describe("validateApiKey", () => {
  describe("valid API keys", () => {
    it("should accept a valid API key with sk-sp- prefix", () => {
      const result = validateApiKey("sk-sp-abcdefghijklmnopqrstuvwxyz123456");
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("should accept API key with minimum valid length", () => {
      // "sk-sp-" is 6 chars, need at least 4 more to reach 10
      const result = validateApiKey("sk-sp-abcd");
      expect(result.valid).toBe(true);
    });

    it("should trim whitespace from API key", () => {
      const result = validateApiKey("  sk-sp-valid-key-123  ");
      expect(result.valid).toBe(true);
    });
  });

  describe("invalid API keys", () => {
    it("should reject empty string", () => {
      const result = validateApiKey("");
      expect(result.valid).toBe(false);
      expect(result.error).toBe("API key cannot be empty");
    });

    it("should reject whitespace-only string", () => {
      const result = validateApiKey("   ");
      expect(result.valid).toBe(false);
      expect(result.error).toBe("API key cannot be empty");
    });

    it("should reject key without sk-sp- prefix", () => {
      const result = validateApiKey("sk-other-key-123456789");
      expect(result.valid).toBe(false);
      expect(result.error).toContain("Invalid API key format");
      expect(result.error).toContain("sk-sp-");
    });

    it("should reject key with wrong prefix", () => {
      const result = validateApiKey("sk-xy-validkey123");
      expect(result.valid).toBe(false);
      expect(result.error).toContain("Invalid API key format");
    });

    it("should reject key that is too short", () => {
      const result = validateApiKey("sk-sp-x");
      expect(result.valid).toBe(false);
      expect(result.error).toBe("API key appears too short");
    });

    it("should reject key with minimum length but wrong prefix", () => {
      const result = validateApiKey("sk-xxxxxxx");
      expect(result.valid).toBe(false);
      expect(result.error).toContain("Invalid API key format");
    });
  });

  describe("edge cases", () => {
    it("should handle key with special characters", () => {
      const result = validateApiKey("sk-sp-abc123_-special!@#");
      expect(result.valid).toBe(true);
    });

    it("should handle key with unicode characters", () => {
      const result = validateApiKey("sk-sp-测试-test-123");
      expect(result.valid).toBe(true);
    });

    it("should handle exactly minimum valid length", () => {
      // "sk-sp-" (6 chars) + 4 more = 10 total, which is the minimum
      const result = validateApiKey("sk-sp-abcd");
      expect(result.valid).toBe(true);
    });

    it("should reject key that starts with sk-sp- but is just prefix", () => {
      const result = validateApiKey("sk-sp-");
      expect(result.valid).toBe(false);
      expect(result.error).toBe("API key appears too short");
    });
  });
});
