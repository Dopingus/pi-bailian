# pi-bailian

Alibaba Cloud Bailian Coding Plan provider extension for [Pi Coding Agent](https://pi.dev/).

## Features

- 🚀 Access to 9 top AI models via single subscription
- 💰 Fixed monthly pricing ($50/month Pro plan)
- 🌍 International and China region support
- 👁️ Vision support for most models
- 🧠 Reasoning models available (Qwen3.5 Plus, GLM-5, Kimi K2.5, MiniMax-M2.5)

## Supported Models

| Model             | Provider | Context | Max Tokens | Reasoning | Vision |
| ----------------- | -------- | ------- | ---------- | --------- | ------ |
| Qwen3.5 Plus      | Alibaba  | 1M      | 65,536     | ✅        | ✅     |
| Qwen3.6 Plus      | Alibaba  | 1M      | 65,536     | ✅        | ✅     |
| Qwen3 Max         | Alibaba  | 262K    | 32,768     | ❌        | ❌     |
| Qwen3 Coder Next  | Alibaba  | 262K    | 65,536     | ❌        | ❌     |
| Qwen3 Coder Plus  | Alibaba  | 1M      | 65,536     | ❌        | ❌     |
| GLM-5             | Zhipu    | 202K    | 16,384     | ✅        | ❌     |
| GLM-4.7           | Zhipu    | 202K    | 16,384     | ✅        | ❌     |
| Kimi K2.5         | Moonshot | 262K    | 32,768     | ✅        | ✅     |
| MiniMax M2.5      | MiniMax  | 196K    | 24,576     | ✅        | ❌     |

## Prerequisites

1. **Subscribe to Bailian Coding Plan**
   - Visit [Alibaba Cloud Model Studio](https://modelstudio.console.alibabacloud.com/)
   - Subscribe to Pro plan ($50/month)
   - Get your API key (format: `sk-sp-xxxxx`)

2. **Pi Coding Agent** installed
   ```bash
   npm install -g @mariozechner/pi-coding-agent
   ```

## Installation

### Option 1: Install from Git (Recommended)

```bash
pi install git:github.com/Dopingus/pi-bailian
```

### Option 2: Install from Local Directory

```bash
pi install /path/to/pi-bailian
```

### Option 3: Run Without Installing

```bash
pi -e git:github.com/Dopingus/pi-bailian
```

## Configuration

### Method 1: Interactive Login (Recommended)

Use Pi's built-in `/login` command:

```bash
pi
/login bailian-coding-plan
```

You'll see instructions with the console URL. **The browser will NOT open automatically** - you need to:

1. Manually open the console URL in your browser
2. Get your API key from the Coding Plan page
3. Paste the API key in the terminal

The key is securely stored in `~/.pi/agent/auth.json`.

**Available login targets:**

- `/login bailian-coding-plan` - International region
- `/login bailian-coding-plan-cn` - China mainland region

### Method 2: Environment Variable

```bash
export BAILIAN_CODING_PLAN_API_KEY=sk-sp-xxxxx
pi
```

### Method 3: Auth File

Store in `~/.pi/agent/auth.json`:

```json
{
  "bailian-coding-plan": {
    "type": "oauth",
    "refresh": "sk-sp-xxxxx",
    "access": "sk-sp-xxxxx",
    "expires": 1776268800000
  }
}
```

## Usage

### Select Model

In Pi interactive mode:

```bash
/model
```

Then select:

- `bailian-coding-plan/qwen3.5-plus` (recommended)
- `bailian-coding-plan/glm-5`
- `bailian-coding-plan/kimi-k2.5`
- `bailian-coding-plan/MiniMax-M2.5`
- etc.

Or use CLI flag:

```bash
pi --provider bailian-coding-plan --model qwen3.5-plus "your prompt"
```

### China Region

For users in mainland China, use the China endpoint:

```bash
# Interactive login
/login bailian-coding-plan-cn

# Or environment variable
export BAILIAN_CODING_PLAN_API_KEY=sk-sp-xxxxx
pi --provider bailian-coding-plan-cn --model qwen3.5-plus
```

## Usage Quotas

**Pro Plan ($50/month):**

- 6,000 requests per 5 hours (sliding window)
- 45,000 requests per week (resets Monday 00:00 UTC+8)
- 90,000 requests per month (resets on subscription date)

**Request cost estimate:**

- Simple tasks: ~5-10 requests
- Complex tasks: ~10-30 requests

Check usage: [Coding Plan Console](https://modelstudio.console.alibabacloud.com/)

## Important Notes

⚠️ **API Key Format**: Coding Plan API keys start with `sk-sp-` prefix. Do not use regular Model Studio API keys (`sk-`).

⚠️ **How It Works**: This extension configures the correct endpoints automatically:

- International: `https://coding-intl.dashscope.aliyuncs.com/apps/anthropic`
- China: `https://coding.dashscope.aliyuncs.com/apps/anthropic`

Pi's `anthropic-messages` API implementation appends `/v1/messages` to construct the final URL:

- Final: `https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1/messages` ✅

⚠️ **Usage Policy**: Coding Plan is for interactive coding tools only. Do not use for:

- Automated scripts
- Custom application backends
- Non-interactive batch API calls

Violation may result in subscription suspension.

## Troubleshooting

### "Invalid API key" error

Ensure you're using the Coding Plan-specific API key (starts with `sk-sp-`), not the general Model Studio API key (`sk-`).

**To fix:**

1. Run `/logout bailian-coding-plan`
2. Run `/login bailian-coding-plan` again
3. Double-check you copied the correct key from the Coding Plan console

### "Model not supported" error

1. Check that your subscription is active
2. Verify the model is included in your plan
3. Try `qwen3.5-plus` (most widely supported)

### High latency (China users)

Use the China region provider:

```bash
/login bailian-coding-plan-cn
```

### Check authentication status

```bash
# View stored credentials
cat ~/.pi/agent/auth.json

# List available OAuth providers
/login
```

## Links

- [Bailian Coding Plan Documentation](https://www.alibabacloud.com/help/en/model-studio/coding-plan)
- [Pi Coding Agent Docs](https://pi.dev/)
- [Custom Providers Guide](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/custom-provider.md)

## License

MIT
