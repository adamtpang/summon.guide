import test from 'node:test';
import assert from 'node:assert/strict';
import { retrievePublicNotes } from '../src/lib/publicGuideNotes.ts';
import { createBurstLimit, readPublicBody } from '../src/lib/publicApiLimit.ts';
import { callSummon } from '../packs/summon-guide/scripts/client.mjs';
const note = {file:'content/knowledge/demo/a.md', title:'Customer feedback', principle:'Talk to customers', keyLessons:['Customer feedback guides product development'], youtube:'https://example.org/source'};
test('public notes exclude private paths, deduplicate and omit irrelevant filler', () => {
  const result = retrievePublicNotes([note,note,{...note,file:'content/knowledge/demo/_raw/private.md'},{...note,file:'content/knowledge/../secret.md'}], 'customers');
  assert.equal(result.sourceCount,1); assert.equal(result.notes.length,1);
  assert.equal(JSON.stringify(result).includes('content/knowledge'),false);
  assert.equal(retrievePublicNotes([note], 'quasarxyz').status,'no_relevant_notes');
  assert.equal(retrievePublicNotes([], 'customers').status,'no_corpus');
});
test('public excerpts have bounded size and reject unsafe source links', () => {
  const result=retrievePublicNotes([{...note, principle:'customers '.repeat(500),keyLessons:Array(10).fill('customers '.repeat(200)),youtube:'javascript:alert(1)'}],'customers').notes[0];
  assert.ok(result.principle.length<=600);assert.equal(result.lessons.length,3);assert.ok(result.lessons.every(x=>x.length<=900));assert.equal(result.sourceUrl,null);
});
test('burst limits reset and bound new identities',()=>{
  const allow=createBurstLimit(2,100,1);
  assert.equal(allow('a',0),true);assert.equal(allow('a',1),true);assert.equal(allow('a',2),false);assert.equal(allow('b',3),false);assert.equal(allow('b',101),true);
});
test('stream body limit holds without content-length',async()=>{
  assert.deepEqual(await readPublicBody(new Request('http://localhost',{method:'POST',body:'{"query":"focus"}'})),{query:'focus'});
  await assert.rejects(readPublicBody(new Request('http://localhost',{method:'POST',body:'x'.repeat(4097)})),/too large/);
});
test('public helper works without tokens and never forwards supplied credentials',async()=>{
  for(const envelope of [{action:'roster'},{action:'notes',input:{id:'person:one',query:'customer focus'}}]){
    await callSummon(envelope,{token:'must-not-leak',fetcher:async(url,options)=>{
      assert.ok(url.startsWith('https://summon.guide/api/public/'));assert.equal(options.headers.Authorization,undefined);assert.equal(options.redirect,'error');return Response.json({ok:true});
    }});
  }
  await assert.rejects(callSummon({action:'notes',input:{id:'one',query:'focus',context:'private'}}),/generic topic/);
  await assert.rejects(callSummon({action:'roster'},{fetcher:async()=>new Response('',{status:429})}),/No login/);
});
