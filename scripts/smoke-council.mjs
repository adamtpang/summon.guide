#!/usr/bin/env node
// Seats a council against the newest life-context notice in the repos.chat
// mailbox, first with the pure domain ranking (no model, no key) and then,
// when an OpenRouter key is available, through the same router prompt the
// /api/council route uses. Prints what a signed-in visit to /council would
// show, without needing a browser session.
//
//   npm run smoke:council

process.env.NEXT_RUNTIME ??= "nodejs";

const { readLifeContextNotice, lifeContextMailbox } = await import("../src/lib/lifeContext.ts");
const { figures } = await import("../src/lib/figures.ts");
const { skills, skillCatalogForRouting } = await import("../src/lib/skills.ts");
const { buildCouncilPrompt, councilByDomains, parseCouncilResponse, rankGuidesByDomains } = await import(
  "../src/lib/council.ts"
);

const notice = await readLifeContextNotice();
if (!notice) {
  console.error(`No life-context notice in ${lifeContextMailbox()}. Run \`npm run life:context -- --send\` in themain.quest.`);
  process.exit(1);
}
console.log(`brief ${notice.id} from ${notice.from} at ${notice.createdAt}, ${notice.markdown.split(/\s+/).length} words`);

console.log("\nDomain ranking (no model):");
for (const { figure, score } of rankGuidesByDomains(notice.markdown, figures).slice(0, 6)) {
  console.log(`  ${String(score).padStart(3)}  ${figure.slug}`);
}
console.log("Fallback council:", councilByDomains(notice.markdown, figures).map((seat) => seat.slug).join(", "));

let completeOpenRouter;
try {
  ({ completeOpenRouter } = await import("../src/lib/openrouter.ts"));
} catch (error) {
  console.log(`\nRouter unavailable (${error instanceof Error ? error.message : error}); stopping at the fallback.`);
  process.exit(0);
}

console.log("\nSeating through the router...");
try {
  const response = await completeOpenRouter({
    system: buildCouncilPrompt(figures, skillCatalogForRouting()),
    messages: [{ role: "user", content: notice.markdown }],
    maxTokens: 1200,
    temperature: 0.2,
  });
  console.log(`model ${response.meta.model} (${response.meta.tier}, fallback depth ${response.meta.fallbackDepth})\n`);
  const council = parseCouncilResponse(response.text, notice.markdown, figures, skills);
  council.forEach((seat, index) => {
    console.log(`${index === 0 ? "PRIMARY" : "SEAT " + (index + 1)}: ${seat.name} (${seat.slug})`);
    console.log(`  role:   ${seat.role}`);
    console.log(`  reason: ${seat.reason}`);
    console.log(`  ask:    ${seat.ask}`);
    if (seat.skill) console.log(`  skill:  ${seat.skill.command}  ${seat.skill.why}`);
  });
} catch (error) {
  console.log(`Router call failed (${error instanceof Error ? error.message : error}); /api/council would use the fallback above.`);
  process.exitCode = 2;
}
