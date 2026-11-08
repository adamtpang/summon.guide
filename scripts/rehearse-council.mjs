// Live council rehearsal against a running dev server.
//
//   COUNCIL_SEAT_MODELS=on COUNCIL_DEMO_USER=council-demo npx next dev --webpack -p 3160
//   node scripts/rehearse-council.mjs [baseUrl] [question]
//
// Drives the real /api/council/turn route: each seated guide answers in turn,
// then the synthesis. Prints the model each seat ran on, whether it fell back,
// latency, tokens and cost. Spends real OpenRouter credits (a few cents).

const base = process.argv[2] || "http://localhost:3160";
const question =
  process.argv[3] || "Should I keep building alone, raise money, or take a part-time job to extend my runway?";
const DEMO_BRIEF = `# Personal context

## Situation
A first-time founder with a working product, a handful of users, and six months of savings.

## Open questions
Whether to keep building alone, raise money, or take a part-time job to extend the runway.`;

const members = [
  { slug: "abraham-lincoln", name: "Abraham Lincoln" },
  { slug: "franklin", name: "Benjamin Franklin" },
  { slug: "lee-kuan-yew", name: "Lee Kuan Yew" },
  { slug: "elon", name: "Elon Musk" },
];

async function turn(thread, speaker) {
  const res = await fetch(`${base}/api/council/turn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ brief: DEMO_BRIEF, members, thread, speaker }),
  });
  if (!res.ok) throw new Error(`${speaker}: HTTP ${res.status} ${await res.text()}`);
  const raw = await res.text();
  let text = "";
  let stats = null;
  let error = null;
  for (const line of raw.split("\n")) {
    if (!line.startsWith("data: ") || line.includes("[DONE]")) continue;
    try {
      const event = JSON.parse(line.slice(6));
      if (event.text) text += event.text;
      if (event.stats) stats = event.stats;
      if (event.error) error = event.error;
    } catch {}
  }
  return { text, stats, error };
}

const thread = [{ kind: "user", content: question }];
const rows = [];
for (const speaker of [...members.map((m) => m.slug), "synthesis"]) {
  const { text, stats, error } = await turn(thread, speaker);
  const member = members.find((m) => m.slug === speaker);
  thread.push(member ? { kind: "guide", slug: member.slug, name: member.name, content: text } : { kind: "synthesis", content: text });
  rows.push({ speaker, error, chars: text.length, ...stats });
  console.log(`\n== ${speaker}${error ? `  ERROR ${error}` : ""}\n${text.replace(/\s+/g, " ").slice(0, 320)}`);
}

console.log("\nseat | requested | served | fell back | first token | total | tokens in/out | cost");
let total = 0;
for (const r of rows) {
  total += r.costUsd ?? 0;
  console.log(
    `${r.speaker} | ${r.requested ?? "-"} | ${r.model ?? "-"} | ${r.fellBack ?? "-"} | ${r.firstTokenMs ?? "-"}ms | ${r.latencyMs ?? "-"}ms | ${r.tokensIn ?? "?"}/${r.tokensOut ?? "?"} | ${r.costUsd ?? "n/a"}`,
  );
  if (r.retrieved?.length) console.log(`   retrieved: ${r.retrieved.join(" · ")}`);
}
console.log(`total cost: $${total.toFixed(5)}`);
if (rows.some((r) => r.error || !r.chars)) process.exitCode = 1;
