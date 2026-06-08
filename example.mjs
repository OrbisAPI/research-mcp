/**
 * Orbis Research MCP — Direct x402 usage example
 *
 * Demonstrates web search and content extraction via x402 USDC payments.
 * No API keys needed — your Base wallet is your identity.
 *
 * Setup:
 *   npm install
 *   WALLET_PRIVATE_KEY=0x... node example.mjs
 */
import { wrapFetchWithPayment } from "x402-fetch";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { base } from "viem/chains";

const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
if (!PRIVATE_KEY) throw new Error("Set WALLET_PRIVATE_KEY env var");

const account = privateKeyToAccount(PRIVATE_KEY);
const walletClient = createWalletClient({ account, chain: base, transport: http() });
const fetch = wrapFetchWithPayment(globalThis.fetch, walletClient);

console.log("Orbis Research MCP Demo");
console.log("Wallet:", account.address, "\n");

// ── 1. Browse available research APIs ────────────────────────────────────────
console.log("1. Browsing research APIs via MCP...");
const browseResp = await fetch("https://orbisapi.com/api/mcp/research", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Accept": "application/json, text/event-stream" },
  body: JSON.stringify({
    jsonrpc: "2.0", id: 1,
    method: "tools/call",
    params: { name: "browse_apis", arguments: { search: "web search" } }
  }),
});

const text = await browseResp.text();
const data = text.split("\n")
  .filter(l => l.startsWith("data: "))
  .map(l => { try { return JSON.parse(l.slice(6)); } catch { return null; } })
  .find(Boolean);

if (data?.result?.content?.[0]?.text) {
  const apis = JSON.parse(data.result.content[0].text);
  console.log(\`Found \${apis.total} research APIs in pool\`);
  apis.apis?.slice(0, 3).forEach(api => {
    console.log(\`  - \${api.name}\`);
    if (api.pricing?.x402) console.log(\`    \${api.pricing.x402}\`);
  });
}

// ── 2. Run a web search ───────────────────────────────────────────────────────
const QUERY = "best MCP servers for AI agents 2025";
console.log(\`\n2. Searching the web for: "\${QUERY}"...\`);

try {
  const searchResp = await fetch(
    \`https://orbisapi.com/api/proxy/web-search-query-799138/search\`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY, limit: 5 }),
    }
  );
  if (searchResp.ok) {
    const results = await searchResp.json();
    console.log("Search results:", JSON.stringify(results, null, 2));
  } else {
    console.log("Status:", searchResp.status);
  }
} catch (e) {
  console.log("(Demo mode — connect a funded wallet to make live calls)");
  console.log("Error:", e.message);
}

console.log("\nDone. See orbisapi.com/api/mcp/research for the full API catalogue.");
