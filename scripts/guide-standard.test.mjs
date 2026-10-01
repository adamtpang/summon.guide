import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {guideAgents} from '../src/lib/guideAgents.ts';
import {getGuideEpisodes,buildGuideGrounding} from '../src/lib/guideRetrieval.ts';
import {sourceCorpus} from '../src/lib/sourceCorpus.ts';
import {applySourceRuntimePolicy} from '../src/lib/sourcePolicy.ts';
import {guideSystemPrompt,GUIDE_IDENTITY_RULES} from '../src/lib/guideContract.ts';
import {publicGuideCatalog} from '../src/lib/publicGuideCatalog.ts';
const standards=JSON.parse(fs.readFileSync('data/guide-standard.json','utf8'));
test('every registered guide has a unique standard and installable workflow',()=>{
 assert.equal(standards.length,guideAgents.length);
 assert.equal(new Set(standards.map(g=>g.id)).size,guideAgents.length);
 assert.equal(new Set(standards.map(g=>g.workflowSlug)).size,guideAgents.length);
 for(const guide of guideAgents){
  const row=standards.find(s=>s.id===guide.id);assert.ok(row,guide.id);
  assert.ok(row.workflowSlug.length<=64,guide.id);
  for(const file of [row.sourceManifest,row.workflow,row.evaluation])assert.ok(fs.existsSync(file),file);
  assert.equal(row.release,'not-certified');
 }
});
test('manifests match runtime evidence and never certify raw files',()=>{
 for(const guide of guideAgents){
  const row=standards.find(s=>s.id===guide.id);
  const episodes=guide.kind==='person'?getGuideEpisodes(guide.slug):applySourceRuntimePolicy(guide.slug,sourceCorpus[guide.slug]?.episodes||[]);
  const manifest=JSON.parse(fs.readFileSync(row.sourceManifest,'utf8'));
  assert.equal(manifest.sources.length,episodes.length,guide.id);
  assert.equal(row.synthesisCount,episodes.length,guide.id);
  for(const [i,source] of manifest.sources.entries()){
   assert.ok(!source.synthesis.split(/[\\/]/).some(p=>p==='_raw'||p==='..'),guide.id);
   assert.equal(source.contentHash,createHash('sha256').update(JSON.stringify(episodes[i])).digest('hex'),guide.id);
  }
  if(guide.capabilities.includes('chat'))assert.ok(episodes.length>0,guide.id);
  if(guide.kind!=='person')assert.equal(guide.capabilities.includes('chat'),episodes.length>0,guide.id);
 }
});
test('all chat people have usable grounding and the shared identity override',()=>{
 for(const guide of guideAgents.filter(g=>g.kind==='person'&&g.capabilities.includes('chat'))){
  const grounding=buildGuideGrounding(guide.slug,guide.domains.join(' '));
  assert.match(grounding,/Cite as: \[Source:/,guide.id);
  assert.ok(guideSystemPrompt('I am the real person.',grounding).endsWith(GUIDE_IDENTITY_RULES));
  const eve=fs.readFileSync(`eve-guides/person-${guide.slug}/agent/instructions.md`,'utf8');
  assert.ok(eve.includes(GUIDE_IDENTITY_RULES),guide.id);
 }
});
test('source eligibility rejects empty evidence and unsafe paths',()=>{
 const note={file:'content/knowledge/demo/a.md',title:'A',principle:'Test',keyLessons:['Lesson']};
 const rejected=[{...note,file:'content/knowledge/_raw/a.md'},{...note,file:'content/knowledge/../a.md'},{...note,principle:' '},{...note,keyLessons:[]}];
 assert.deepEqual(applySourceRuntimePolicy('demo',[note,...rejected]),[note]);
});
test('public roster cannot advertise pending guides as ready links',()=>{
 for(const guide of publicGuideCatalog){
  if(guide.availability!=='ready'){assert.equal(guide.url,null);assert.equal(guide.sourceCount,0);}
  if(guide.sourceCount===0)assert.equal(guide.coverage,'missing');
 }
});
