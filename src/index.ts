/**
 * Pi Bailian Extension
 *
 * Adds Alibaba Cloud Bailian Coding Plan as a provider for Pi Coding Agent.
 * Supports both environment variable and interactive /login setup.
 *
 * @packageDocumentation
 */

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import type { OAuthCredentials, OAuthLoginCallbacks } from "@mariozechner/pi-ai";
import { bailianModels, bailianModelsCN } from "./models.js";

/**
 * International (global) endpoint for Bailian Coding Plan
 * Pi's anthropic-messages API appends /v1/messages automatically
 */
const BAILIAN_INTL_BASE_URL = "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic";

/**
 * China mainland endpoint for Bailian Coding Plan
 * Pi's anthropic-messages API appends /v1/messages automatically
 */
const BAILIAN_CN_BASE_URL = "https://coding.dashscope.aliyuncs.com/apps/anthropic";

/**
 * Environment variable for the Bailian Coding Plan API key
 * API keys start with 'sk-sp-' prefix
 */
const API_KEY_ENV = "BAILIAN_CODING_PLAN_API_KEY";

/**
 * Provider IDs for OAuth-style login (even though it's API key based)
 */
const PROVIDER_ID_INTL = "bailian-coding-plan";
const PROVIDER_ID_CN = "bailian-coding-plan-cn";

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

/**
 * Interactive login flow for Bailian Coding Plan
 * Prompts user to enter their API key and stores it in auth.json
 * Does NOT auto-open browser - user must manually visit the console
 */
async function loginBailian(
  callbacks: OAuthLoginCallbacks,
  region: "intl" | "cn" = "intl",
): Promise<OAuthCredentials> {
  const consoleUrl =
    region === "intl"
      ? "https://modelstudio.console.alibabacloud.com/"
      : "https://bailian.console.aliyun.com/";

  // Show instructions only - do NOT auto-open browser
  // User must manually visit the console to get their API key
  const instructions = `
Bailian Coding Plan API Key Setup
=================================

1. Open in your browser: ${consoleUrl}
2. Subscribe to Coding Plan (Pro plan: $50/month) if not already subscribed
3. Navigate to API Key Management
4. Copy your API key (format: sk-sp-xxxxx)

`.trim();

  // Use onPrompt with the full instructions - this displays text without opening browser
  const apiKey = await callbacks.onPrompt({
    message: `${instructions}\n\nEnter your Bailian Coding Plan API key (starts with 'sk-sp-'): `,
  });

  // Validate the key
  const validation = validateApiKey(apiKey);
  if (!validation.valid) {
    throw new Error(validation.error || "Invalid API key");
  }

  // Return credentials (stored in auth.json)
  return {
    refresh: apiKey, // Re-use 'refresh' field to store the API key
    access: apiKey, // Also store in 'access' for compatibility
    expires: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year expiry
  };
}

/**
 * Login flow for China region
 */
async function loginBailianCN(callbacks: OAuthLoginCallbacks): Promise<OAuthCredentials> {
  return loginBailian(callbacks, "cn");
}

/**
 * Get API key from stored credentials
 */
function getApiKey(credentials: OAuthCredentials): string {
  return credentials.access || credentials.refresh;
}

/**
 * Refresh credentials (no-op for API keys, but required by OAuth interface)
 * API keys don't expire, so we just return the same credentials
 */
async function refreshBailianToken(credentials: OAuthCredentials): Promise<OAuthCredentials> {
  // API keys don't expire, but extend the expiry date to keep credentials valid
  return {
    ...credentials,
    expires: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year from now
  };
}

/**
 * Register the Bailian Coding Plan provider with Pi.
 *
 * This extension adds support for:
 * - Qwen3.5 Plus (recommended, supports vision)
 * - Qwen3 Max 2026-01-23
 * - Qwen3 Coder Next
 * - Qwen3 Coder Plus
 * - GLM-5 (Zhipu)
 * - GLM-4.7 (Zhipu)
 * - Kimi K2.5 (Moonshot)
 * - MiniMax M2.5
 *
 * Usage:
 * - Environment variable: export BAILIAN_CODING_PLAN_API_KEY=sk-sp-xxxxx
 * - Interactive login: /login bailian-coding-plan
 *
 * @param pi - Extension API instance
 */
export default function (pi: ExtensionAPI) {
  // Register international (global) provider with OAuth-style login
  pi.registerProvider(PROVIDER_ID_INTL, {
    baseUrl: BAILIAN_INTL_BASE_URL,
    apiKey: API_KEY_ENV,
    api: "anthropic-messages",
    models: bailianModels,
    oauth: {
      name: "Alibaba Bailian Coding Plan (International)",
      login: loginBailian,
      refreshToken: refreshBailianToken,
      getApiKey: getApiKey,
    },
  });

  // Register China region provider with OAuth-style login
  pi.registerProvider(PROVIDER_ID_CN, {
    baseUrl: BAILIAN_CN_BASE_URL,
    apiKey: API_KEY_ENV,
    api: "anthropic-messages",
    models: bailianModelsCN,
    oauth: {
      name: "Alibaba Bailian Coding Plan (China)",
      login: loginBailianCN,
      refreshToken: refreshBailianToken,
      getApiKey: getApiKey,
    },
  });

  // Log registration info
  pi.on("session_start", () => {
    console.log("[pi-bailian] Bailian Coding Plan provider registered");
    console.log("[pi-bailian] International: bailian-coding-plan");
    console.log("[pi-bailian] China: bailian-coding-plan-cn");
    console.log(
      "[pi-bailian] Setup: /login bailian-coding-plan OR export BAILIAN_CODING_PLAN_API_KEY",
    );
  });
}
