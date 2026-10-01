import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,existsSync,readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
test('individual handle install uses the public API without mutating MCP config',()=>{
 const target=mkdtempSync(join(tmpdir(),'summon-standard-'));
 const run=spawnSync(process.execPath,['scripts/summon.mjs','install','rose-blumkin','--target',target],{encoding:'utf8'});
 assert.equal(run.status,0,run.stderr);
 assert.equal(existsSync(join(target,'.mcp.json')),false);
 assert.equal(existsSync(join(target,'.codex/config.toml')),false);
 const skill=readFileSync(join(target,'.codex/skills/rose-blumkin/SKILL.md'),'utf8');
 assert.match(skill,/api\/public\/notes/);assert.match(skill,/Keep personal details inside this host/);
});
