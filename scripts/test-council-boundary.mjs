// Synthetic identities and briefs only. No database, vault, or provider access.
import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
function load(file, dependencies = {}) {
  const code = ts.transpileModule(fs.readFileSync(new URL(file, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require: (key) => {
    if (key in dependencies) return dependencies[key];
    if (["fs/promises", "path"].includes(key)) return require(key);
    throw Error(`Unexpected dependency: ${key}`);
  }, process: { env: { SUMMON_LIFE_CONTEXT_OWNER_ID: "owner" }, cwd: () => process.cwd() }, Response, console });
  return exports;
}
const context = load("../src/lib/lifeContext.ts");
assert.equal(context.canReadLifeContext("owner", "owner"), true);
assert.equal(context.canReadLifeContext("other", "owner"), false);
assert.equal(context.canReadLifeContext("owner", ""), false);
assert.equal(context.canReadLifeContext(null, "owner"), false);
let user = null, tokenUser = null, reads = 0, calls = 0;
const brief = "# Personal context\n\nI need to choose which creative project to finish this week.";
const route = load("../src/app/api/council/route.ts", {
  "@/auth": { auth: async () => user ? { user: { id: user } } : null },
  "@/lib/lifeContext": { ...context, readLifeContextNotice: async () => {
    reads++; return { markdown: brief, id: "synthetic", createdAt: "2026-09-09T00:00:00Z" };
  } },
  "@/lib/membership": { authenticateMcpToken: async () => tokenUser },
  "@/lib/figures": { figures: [] },
  "@/lib/skills": { skills: [], skillCatalogForRouting: () => "" },
  "@/lib/council": { buildCouncilPrompt: () => "", parseCouncilResponse: () => [], councilByDomains: () => [] },
  "@/lib/openrouter": { completeOpenRouter: async () => { calls++; return { text: "{}", meta: {} }; } },
});
const post = (body) => route.POST(new Request("http://localhost/api/council", {
  method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
}));
assert.equal((await route.GET()).status, 401);
user = "other";
assert.equal((await route.GET()).status, 404);
assert.equal((await post({})).status, 403);
assert.equal(reads, 0);
user = "owner";
const preview = await route.GET();
assert.equal((await preview.json()).brief, brief);
assert.equal(preview.headers.get("cache-control"), "private, no-store");
assert.equal(calls, 0, "Preview must never call a model");
user = "other";
const match = await post({ brief });
assert.equal(match.status, 200);
assert.equal(calls, 1);
assert.equal(reads, 1, "Pasted briefs must never read someone else's mailbox");
assert.equal((await post({ brief: "# Personal context\n" + "a".repeat(12000) })).status, 400);
assert.equal(calls, 1, "Oversized briefs must not be silently truncated or sent");
user = null; tokenUser = "other";
assert.equal((await post({})).status, 403);
assert.equal(reads, 1);
console.log("PASS: anonymous, non-owner, MCP isolation, owner preview without model, private responses, pasted matching, size limit");
