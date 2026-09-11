// Private loopback preview. Never imported by Next or deployed.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, load, search } from './pilot.mjs';
import { MODELS, DEFAULT_MODEL, getModel, generateAnswer } from './models.mjs';

// Existing development credential; never returned to the browser.
try { process.loadEnvFile(path.join(ROOT, '.env.local')); } catch (error) { if (error.code !== 'ENOENT') throw error; }

const port = 3116;
const origin = `http://127.0.0.1:${port}`;
const store = load();
let busy = false;
process.env.SAGE_GENERATION_STRATEGY = 'evidence-first';
const server = http.createServer(async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self'; connect-src 'self'; frame-ancestors 'none'");
  if (req.headers.host !== `127.0.0.1:${port}` || (req.headers.origin && req.headers.origin !== origin)) {
    res.writeHead(403).end('Local preview only'); return;
  }
  const reply = (status, value) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(value)); };
  if (req.method === 'GET' && req.url === '/models') { reply(200, { defaultModel: DEFAULT_MODEL, models: MODELS.map(({ id, label, provider }) => ({ id, label, provider })) }); return; }
  if (req.method === 'GET' && req.url === '/theme') {
    res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
    res.end(fs.readFileSync(path.join(ROOT, 'public/design/sage-magic.css'))); return;
  }
  if (req.method === 'GET' && ['/sage', '/'].includes(req.url)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(fs.readFileSync(new URL('./preview.html', import.meta.url))); return;
  }
  if (req.method === 'GET' && req.url === '/avatar') {
    const avatar = path.join(ROOT, 'public/avatars/sage-silhouette-v2.png');
    if (!fs.existsSync(avatar)) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': 'image/png' }); res.end(fs.readFileSync(avatar)); return;
  }
  if (req.method !== 'POST' || req.url !== '/chat') { res.writeHead(404).end(); return; }
  if (req.headers['content-type'] !== 'application/json') { reply(415, { error: 'JSON required' }); return; }
  if (busy) { reply(429, { error: 'Sage is finishing a response. Try again shortly.' }); return; }
  let acquired = false;
  try {
    let body = '';
    for await (const part of req) {
      body += part.toString();
      if (Buffer.byteLength(body) > 32000) { reply(413, { error: 'Message too long' }); return; }
    }
    const { question, history = [], model = DEFAULT_MODEL } = JSON.parse(body);
    try { getModel(model); } catch { reply(400, { error: 'Unknown Sage model' }); return; }
    if (typeof question !== 'string' || !question.trim() || question.length > 8000 || !Array.isArray(history)) {
      reply(400, { error: 'Enter a question of up to 8,000 characters.' }); return;
    }
    if (busy) { reply(429, { error: "Sage is finishing a response. Try again shortly." }); return; }
    busy = true; acquired = true;
    const context = history.slice(-4).filter(m => m && ['user', 'assistant'].includes(m.role) && typeof m.content === 'string').map(m => `${m.role}: ${m.content.slice(0, 1500)}`).join('\n');
    const previousQuestion = history.filter(m => m && m.role === 'user' && typeof m.content === 'string').at(-1)?.content.slice(0, 1500);
    const packet = await search(store, previousQuestion ? previousQuestion + '\n' + question : question, { limit: 4 });
    // Previous turns are context, never additional factual evidence.
    const answerPacket = { ...packet, question: context ? `Conversation context (not evidence):\n${context}\n\nCurrent question: ${question}` : question };
    const result = await generateAnswer(answerPacket, { modelId: model });
    reply(200, { answer: result.answer, model: result.model, abstained: !!result.abstained, sources: (result.citations?.cited || []).map(id => {
      const hit = packet.hits.find(h => h.evidenceId === id);
      return { id, title: hit.title, url: hit.citationUrl };
    }) });
  } catch (error) {
    console.error('Preview request failed:', error.message);
    reply(500, { error: error.message.startsWith('Cannot reach ') || error.message.startsWith('GPT-') || error.message.startsWith('Configure ') || error.message.startsWith('DeepSeek ') || error.message.startsWith('Qwen') ? error.message : 'Sage could not produce a supported response. Try a more specific question.' });
  } finally { if (acquired) busy = false; }
});
server.listen(port, '127.0.0.1', () => console.log(`Private Sage preview: ${origin}/sage (${store.documents.length} transcripts)`));
