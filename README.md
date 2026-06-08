# Orbis Research & Data Extraction MCP 🔍

> 500+ research, search, and data extraction APIs for AI agents. Pay per call with USDC on Base — no API keys, no accounts, no subscriptions.

[![MCP](https://img.shields.io/badge/MCP-StreamableHTTP-blue)](https://orbisapi.com/api/mcp/research)
[![Payment](https://img.shields.io/badge/payment-x402%20USDC-green)](https://x402.org)

## What's Inside

- **Web Search** — Google, Bing, DuckDuckGo SERP results, autocomplete, news search
- **Content Extraction** — scrape and extract structured data from any web page
- **News & Social** — Reddit, Twitter/X, news feeds, article extraction
- **Document Intelligence** — PDF/Excel/Invoice parsing, structured data extraction
- **Research Utilities** — deduplication, compliance checking, rate limit advisors

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

- *"Search the web for the latest news about Coinbase and give me a summary"*
- *"Extract all the pricing data from this product page: https://..."*
- *"Search Reddit for opinions on GPT-4o — what are people saying?"*
- *"Get the top 10 Google results for 'best MCP servers 2025'"*
- *"Parse this invoice PDF and give me the line items as JSON"*
- *"Extract all the contact info from this website"*

## Direct x402 Usage (Node.js)

```javascript
import { wrapFetchWithPayment } from "x402-fetch";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { base } from "viem/chains";

const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY);
const walletClient = createWalletClient({ account, chain: base, transport: http() });
const fetch = wrapFetchWithPayment(globalThis.fetch, walletClient);

// Web search — ~$0.005 per call
const resp = await fetch(
  "https://orbisapi.com/api/proxy/web-search-query-799138/search",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "MCP servers for AI agents 2025", limit: 10 }),
  }
);
console.log(await resp.json());
```

See `example.mjs` for a full working script.

## MCP Details

| | |
|---|---|
| **MCP URL** | `https://orbisapi.com/api/mcp/research` |
| **Protocol** | StreamableHTTP + SSE |
| **Payment** | x402 USDC on Base (~$0.005/call) |
| **Tools** | `browse_apis`, `call_api` |
| **APIs in pool** | 500+ research/extraction APIs |

## All Orbis Domain MCPs

| Domain | URL |
|--------|-----|
| ₿ Crypto & Blockchain | `https://orbisapi.com/api/mcp/crypto` |
| 🔍 Research & Data | `https://orbisapi.com/api/mcp/research` |
| 🛒 Commerce & Retail | `https://orbisapi.com/api/mcp/commerce` |
| ✈️ Travel | `https://orbisapi.com/api/mcp/travel` |
| 🌐 All 20,200+ APIs | `https://orbisapi.com/api/mcp` |

---

Built by [Orbis](https://orbisapi.com) — the API marketplace for AI agents.
