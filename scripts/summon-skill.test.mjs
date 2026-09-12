import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { resolveGuide } from '../packs/summon/scripts/load-guide.mjs';

const root = resolve(import.meta.dirname, '..');
const registry = JSON.parse(readFileSync(join(root, 'packs/summon/registry.json'), 'utf8'));
test('Elon Musk means the person, while his biography slug means the book', () => {
  assert.equal(resolveGuide('elonmusk', registry.guides).guide.slug, 'elon');
  assert.equal(resolveGuide('elon-musk-isaacson', registry.guides).guide.slug, 'elon-musk-isaacson');
});
test('natural names, slugs, and questions choose Brad without dropping the request', () => {
  for (const request of ['brad jacobs', 'BRAD-JACOBS', 'bradjacobs', 'Brad Jacobs: help me evaluate a deal.']) {
    const result = resolveGuide(request, registry.guides);
    assert.equal(result.status, 'found');
    assert.equal(result.guide.slug, 'brad-jacobs');
    assert.equal(result.request, request);
  }
});
test('ambiguous and unknown names never silently select a guide', () => {
  const guides = [{ slug: 'one', name: 'John Smith' }, { slug: 'two', name: 'John Jones' }];
  assert.equal(resolveGuide('John', guides).status, 'ambiguous');
  assert.equal(resolveGuide('made-up-person', guides).status, 'not-found');
  assert.equal(resolveGuide('', guides).status, 'missing');
});
test('longest guide name wins and pending status survives', () => {
  const guides = [{ slug: 'john', name: 'John' }, { slug: 'john-smith', name: 'John Smith', availability: 'building' }];
  const result = resolveGuide('John Smith help me', guides);
  assert.equal(result.guide.slug, 'john-smith');
  assert.equal(result.guide.availability, 'building');
});
test('installed skill works from unrelated cwd and installation is repeatable', () => {
  const target = mkdtempSync(join(tmpdir(), 'summon-skill-'));
  const old = join(target, '.claude/skills/summon');
  mkdirSync(old, { recursive: true });
  writeFileSync(join(old, 'SKILL.md'), '# /summon — connect to the Summon control plane\nOriginal workflow.\n');
  writeFileSync(join(target, '.mcp.json'), '{"mcpServers":{"existing":{"url":"https://example.com"}}}');
  for (let i = 0; i < 2; i++) {
    const installed = spawnSync(process.execPath, [join(root, 'scripts/summon.mjs'), 'install', 'summon', '--target', target], { encoding: 'utf8' });
    assert.equal(installed.status, 0, installed.stderr);
  }
  assert.match(readFileSync(join(target, '.claude/skills/summon-company/SKILL.md'), 'utf8'), /Original workflow/);
  assert.deepEqual(JSON.parse(readFileSync(join(target, '.mcp.json'), 'utf8')), { mcpServers: { existing: { url: 'https://example.com' } } });
  for (const host of ['.claude', '.agents', '.codex']) {
    const loaded = spawnSync(process.execPath, [join(target, host, 'skills/summon/scripts/load-guide.mjs'), 'brad', 'jacobs', '--local'], { cwd: tmpdir(), encoding: 'utf8' });
    assert.equal(loaded.status, 0, loaded.stderr);
    const result = JSON.parse(loaded.stdout);
    assert.equal(result.guide.slug, 'brad-jacobs');
    assert.ok(result.localPrompt.includes('Brad Jacobs'));
  }
});
