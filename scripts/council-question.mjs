#!/usr/bin/env node
// Runs one council round (each seated guide, then the synthesis) through the
// same prompt assembly /api/council/turn uses, without a browser session.
// Prints each voice and which retrieved sources it cited.
//
//   node --no-warnings --experimental-transform-types --env-file-if-exists=.env.local \
//     --import ./scripts/node-server-shim.mjs scripts/council-question.mjs \
//     "Should I get a job, or keep building my startup with no revenue yet?" paul-graham nassim-taleb annie-duke

process.env.NEXT_RUNTIME ??= "nodejs";

// Guide sources import JSON without attributes, as Next's bundler allows.
const { register } = await import("node:module");
const jsonHook = `export async function load(url, context, next) {
  if (url.endsWith(".json")) return next(url, { ...context, importAttributes: { type: "json" } });
  return next(url, context);
}`;
register(`data:text/javascript,${encodeURIComponent(jsonHook)}`, import.meta.url);

const { AI_CONFIG, getFigure } = await import("../src/lib/figures.ts");
const { buildGuideGrounding } = await import("../src/lib/guideRetrieval.ts");
const { LIFE_CONTEXT_RULES } = await import("../src/lib/lifeContext.ts");
const { streamOpenRouter } = await import("../src/lib/openrouter.ts");
const {
  buildCouncilTurnRules,
  buildSynthesisMessages,
  buildSynthesisSystemPrompt,
  buildTurnMessages,
  cleanCouncilText,
  speakersThisRound,
} = await import("../src/lib/councilThread.ts");

const [question, ...slugs] = process.argv.slice(2);
if (!question || slugs.length < 2) {
  console.error('Usage: council-question.mjs "<question>" <slug> <slug> [slug...]');
  process.exit(1);
}

const members = slugs.map((slug) => {
  const figure = getFigure(slug);
  if (!figure) throw new Error(`Unknown guide: ${slug}`);
  return { slug: figure.slug, name: figure.name };
});

// The same information a plain chatbot gets: the question, nothing more.
const brief = `# Personal context\n## The problem\n${question}`;
const thread = [{ kind: "user", content: question }];

async function readStream(response) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";
  let meta = null;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const frames = buffer.split("\n\n");
    buffer = frames.pop() ?? "";
    for (const frame of frames) {
      const data = frame.replace(/^data: /, "");
      if (data === "[DONE]") continue;
      const event = JSON.parse(data);
      if (event.error) throw new Error(event.error);
      if (event.text) text += event.text;
      if (event.route) meta = event.route;
      if (event.meta) meta = event.meta;
    }
  }
  return { text, meta };
}

for (const member of members) {
  const figure = getFigure(member.slug);
  const query = [question, brief].join("\n").slice(-8000);
  const grounding = buildGuideGrounding(figure.slug, query);
  const system = [
    figure.systemPrompt,
    grounding,
    LIFE_CONTEXT_RULES,
    buildCouncilTurnRules(member, members, speakersThisRound(thread)),
  ].filter(Boolean).join("\n\n");
  const { text, meta } = await readStream(streamOpenRouter({
    system,
    messages: buildTurnMessages(brief, thread, member.slug),
    maxTokens: AI_CONFIG.maxTokens,
    logLabel: "council/turn",
  }));
  const offered = [...(grounding ?? "").matchAll(/Cite as: (.+)/g)].map((m) => m[1].trim());
  console.log(`\n=== ${member.name} ${meta ? `(${meta.model})` : ""}`);
  console.log(cleanCouncilText(text));
  console.log(`--- notes offered: ${offered.length}`);
  thread.push({ kind: "guide", slug: member.slug, name: member.name, content: text });
}

const { text } = await readStream(streamOpenRouter({
  system: buildSynthesisSystemPrompt(members),
  messages: buildSynthesisMessages(brief, thread),
  maxTokens: 900,
  logLabel: "council/synthesis",
}));
console.log(`\n=== Synthesis\n${cleanCouncilText(text)}`);
