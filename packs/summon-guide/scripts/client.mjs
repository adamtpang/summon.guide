import { pathToFileURL } from 'node:url';

export async function callSummon(envelope, { token = process.env.SUMMON_ACCESS_TOKEN, fetcher = fetch } = {}) {
  if (!token) throw new Error('Connect Summon at https://summon.guide/connect and supply SUMMON_ACCESS_TOKEN through the environment.');
  const { action, input } = envelope || {};
  const paths = { match: '/api/summon/match', research: '/api/summon/research', guide: '/api/chat', book: '/api/chat/source' };
  if (!Object.hasOwn(paths, action) || !input || typeof input !== 'object') throw new Error('Expected action match, research, guide or book and an input object.');
  const chat = action === 'guide' || action === 'book';
  if (chat && (typeof input.slug !== 'string' || typeof input.message !== 'string' || !input.message.trim() || input.message.length > 12000)) throw new Error('Chat requires slug and a message of 1–12000 characters.');
  const body = chat ? { [action === 'guide' ? 'figure' : 'source']: input.slug, messages: [{ role: 'user', content: input.message }] } : input;
  const response = await fetcher('https://summon.guide' + paths[action], { method: 'POST', redirect: 'error', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(body), signal: AbortSignal.timeout(180000) });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const details = Object.fromEntries(['code', 'id', 'requestId', 'availability'].filter(key => typeof data[key] === 'string').map(key => [key, data[key]]));
    throw new Error(`Summon returned HTTP ${response.status}. Reconnect for 401, check allowance for 402/429, inspect existing-guide status for 409, retry service errors later. No advice was received. ${JSON.stringify(details)}`);
  }
  if (!chat) return response.json();
  if (!response.body) throw new Error('Missing advice stream.');
  const reader = response.body.getReader(); const decoder = new TextDecoder(); let buffer = '', answer = '', doneEvent = false;
  function frame(line) {
    if (!line.startsWith('data:')) return;
    const raw = line.slice(5).trim(); if (!raw) return;
    if (raw === '[DONE]') { doneEvent = true; return; }
    const event = JSON.parse(raw);
    if (event.error) throw new Error('Summon could not finish the answer.');
    if (typeof event.text === 'string') answer += event.text;
  }
  try {
    for (;;) {
      const { value, done } = await reader.read();
      buffer += done ? decoder.decode() : decoder.decode(value, { stream: true });
      const lines = buffer.split('\n'); buffer = lines.pop() || ''; for (const line of lines) frame(line);
      if (done) { if (buffer.trim()) frame(buffer); break; }
    }
  } finally { await reader.cancel().catch(() => {}); reader.releaseLock(); }
  if (!answer.trim() || !doneEvent) throw new Error('Empty or incomplete advice stream.');
  return { advice: answer };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    let input = ''; for await (const chunk of process.stdin) { input += chunk; if (input.length > 40000) throw new Error('Request too large.'); }
    process.stdout.write(JSON.stringify(await callSummon(JSON.parse(input)), null, 2) + '\n');
  } catch (error) { console.error(error instanceof Error ? error.message : 'Summon request failed'); process.exitCode = 1; }
}
