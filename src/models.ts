import type { ProviderModelConfig } from "@mariozechner/pi-coding-agent";

/**
 * Alibaba Cloud Bailian Coding Plan models
 *
 * Pricing: $50/month (Pro plan)
 * - 6,000 requests per 5 hours (sliding window)
 * - 45,000 requests per week (resets Monday 00:00 UTC+8)
 * - 90,000 requests per month (resets on subscription date)
 *
 * Note: Cost is set to 0 as this is a subscription-based plan, not pay-per-token.
 *
 * @see https://www.alibabacloud.com/help/en/model-studio/coding-plan
 */
export const bailianModels: ProviderModelConfig[] = [
  {
    id: "qwen3.5-plus",
    name: "Qwen3.5 Plus",
    reasoning: true,
    input: ["text", "image"],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 131072,
    maxTokens: 8192,
  },
  {
    id: "qwen3-max-2026-01-23",
    name: "Qwen3 Max 2026-01-23",
    reasoning: false,
    input: ["text", "image"],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 131072,
    maxTokens: 8192,
  },
  {
    id: "qwen3-coder-next",
    name: "Qwen3 Coder Next",
    reasoning: false,
    input: ["text", "image"],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 131072,
    maxTokens: 8192,
  },
  {
    id: "qwen3-coder-plus",
    name: "Qwen3 Coder Plus",
    reasoning: false,
    input: ["text", "image"],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 131072,
    maxTokens: 8192,
  },
  {
    id: "glm-5",
    name: "GLM-5",
    reasoning: true,
    input: ["text", "image"],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 202752,
    maxTokens: 16384,
  },
  {
    id: "glm-4.7",
    name: "GLM-4.7",
    reasoning: true,
    input: ["text", "image"],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 202752,
    maxTokens: 16384,
  },
  {
    id: "kimi-k2.5",
    name: "Kimi K2.5",
    reasoning: true,
    input: ["text", "image"],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 262144,
    maxTokens: 32768,
  },
  {
    id: "MiniMax-M2.5",
    name: "MiniMax M2.5",
    reasoning: true,
    input: ["text", "image"],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 1048576,
    maxTokens: 32768,
  },
];

/**
 * China region models (optional, for users in mainland China)
 * Uses China-specific endpoint: https://coding.dashscope.aliyuncs.com/apps/anthropic/v1
 */
export const bailianModelsCN: ProviderModelConfig[] = [
  {
    id: "qwen3.5-plus",
    name: "Qwen3.5 Plus (CN)",
    reasoning: true,
    input: ["text", "image"],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 131072,
    maxTokens: 8192,
  },
  {
    id: "glm-5",
    name: "GLM-5 (CN)",
    reasoning: true,
    input: ["text", "image"],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 202752,
    maxTokens: 16384,
  },
  {
    id: "kimi-k2.5",
    name: "Kimi K2.5 (CN)",
    reasoning: true,
    input: ["text", "image"],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 262144,
    maxTokens: 32768,
  },
  {
    id: "MiniMax-M2.5",
    name: "MiniMax M2.5 (CN)",
    reasoning: true,
    input: ["text", "image"],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 1048576,
    maxTokens: 32768,
  },
];
