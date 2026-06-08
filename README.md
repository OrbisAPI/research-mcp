# Orbis Research & Data Extraction MCP 🔍

> Real web search, scraping, and data extraction APIs for AI agents. Pay per call with USDC on Base — no API keys, no accounts, no subscriptions.

[![MCP](https://img.shields.io/badge/MCP-StreamableHTTP-blue)](https://orbisapi.com/api/mcp/research)
[![x402](https://img.shields.io/badge/payment-x402%20USDC-green)](https://x402.org)

## What's Actually In Here

These are the most-called APIs in this domain on Orbis:

| API | Calls | What it does |
|-----|-------|-------------|
| [Web Search Query](https://orbisapi.com/marketplace/web-search-query-799138) | 241 | Keyword web search returning structured results |
| [Reddit Subreddit Search API](https://orbisapi.com/marketplace/reddit-subreddit-search-api-724378) | 221 | Search Reddit posts across any subreddit |
| [Web Content Type Classifier API](https://orbisapi.com/marketplace/web-content-type-classifier-api-e987d6) | 193 | Classify what type of content a URL contains |
| [Web Data Extractor Intelligence API](https://orbisapi.com/marketplace/web-data-extractor-intelligence-api-57c8a3) | 193 | Intelligently extract structured data from any page |
| [Reddit Posts & Comments API](https://orbisapi.com/marketplace/reddit-posts-comments-api-c526a6) | 180 | Fetch posts and comments from Reddit |
| [Google Search Results API](https://orbisapi.com/marketplace/google-search-results-api-9c77d5) | 178 | Structured Google SERP results |
| [Google Maps & Places API](https://orbisapi.com/marketplace/google-maps-places-api-c38c84) | 173 | Places, reviews, and location data from Google Maps |
| [Web Scrape Planner API](https://orbisapi.com/marketplace/web-scrape-planner-api-e5a1eb) | 163 | Generate a scraping strategy for any website |
| [Structured Data Extractor API](https://orbisapi.com/marketplace/structured-data-extractor-api-83f2a2) | 58 | Extract structured JSON from unstructured web pages |
| [Web Scraping API](https://orbisapi.com/marketplace/web-scraping-api-8d43c0) | 57 | Render and scrape any public web page |
| [Data Extraction Quality Scorer API](https://orbisapi.com/marketplace/data-extraction-quality-scorer-api-1207ee) | 50 | Score the quality of extracted data |
| [Web Scraping ROI Calculator API](https://orbisapi.com/marketplace/web-scraping-roi-calculator-api-fce659) | 37 | Estimate the cost/value of a scraping project |

## Quick Start

No API key needed. No account. Paste into your MCP client:

### Claude Desktop / Claude Code
```json
{
  "mcpServers": {
    "orbis-research": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://orbisapi.com/api/mcp/research"]
    }
  }
}
```
Config path: `~/Library/Application Support/Claude/claude_desktop_config.json`

### Cursor / Windsurf / Cline
```json
{
  "mcpServers": {
    "orbis-research": {
      "url": "https://orbisapi.com/api/mcp/research"
    }
  }
}
```

### OpenAI Codex CLI
```yaml
# ~/.codex/config.yaml
mcpServers:
  orbis-research:
    type: url
    url: "https://orbisapi.com/api/mcp/research"
```

## Example Prompts

Once connected, try:

- *"Search the web for the latest news about Coinbase's x402 integration"*
- *"Search Reddit's r/MachineLearning for discussions about MCP servers"*
- *"Scrape this page and extract all the pricing data as JSON: https://..."*
- *"Get the top 10 Google results for 'best MCP servers 2025'"*
- *"Find all Google Maps reviews for this business and summarize sentiment"*
- *"Plan how I'd scrape this e-commerce site for product data"*

## Direct x402 Usage (Node.js)

```javascript
import { wrapFetchWithPayment } from "x402-fetch";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { base } from "viem/chains";

const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY);
const walletClient = createWalletClient({ account, chain: base, transport: http() });
const fetch = wrapFetchWithPayment(globalThis.fetch, walletClient);

// Google Search — 178 real calls on Orbis
const resp = await fetch(
  "https://orbisapi.com/api/proxy/google-search-results-api-9c77d5/search",
  { method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "MCP servers for AI agents", limit: 10 }) }
);
console.log(await resp.json());
```

See `example.mjs` for a full working script.

## All Orbis Domain MCPs

| Domain | URL |
|--------|-----|
| ₿ Crypto & Blockchain | `https://orbisapi.com/api/mcp/crypto` |
| 🔍 Research & Data | `https://orbisapi.com/api/mcp/research` |
| 🛒 Commerce & Retail | `https://orbisapi.com/api/mcp/commerce` |
| ✈️ Travel | `https://orbisapi.com/api/mcp/travel` |
| 🌐 All 20,000+ APIs | `https://orbisapi.com/api/mcp` |

---

Built by [Orbis](https://orbisapi.com) — the API marketplace for AI agents.

## Connect

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "orbis-research": { "url": "https://orbisapi.com/api/mcp/research" }
  }
}
```

### OpenAI Agents SDK

**Python:**
```python
from agents.mcp import MCPServerStreamableHttp
from agents import Agent, Runner

mcp = MCPServerStreamableHttp(url="https://orbisapi.com/api/mcp/research")

agent = Agent(
    name="Orbis Research Agent",
    model="gpt-4o",
    mcp_servers=[mcp]
)

result = await Runner.run(agent, "Browse available research APIs")
print(result.final_output)
```

**TypeScript:**
```typescript
import { Agent, run } from "@openai/agents";
import { MCPServerStreamableHttp } from "@openai/agents/mcp";

const mcp = new MCPServerStreamableHttp({
  url: "https://orbisapi.com/api/mcp/research",
});

const agent = new Agent({
  name: "Orbis Research Agent",
  model: "gpt-4o",
  mcpServers: [mcp],
});

const result = await run(agent, "Browse available research APIs");
console.log(result.finalOutput);
```

> Calls are billed per-use in USDC via [x402](https://x402.org) on Base mainnet. No subscription, no API key required.
