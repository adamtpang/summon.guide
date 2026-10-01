import test from 'node:test';
import assert from 'node:assert/strict';
import {prepareAdvice,contextBrief} from '../packs/summon-guide/scripts/prepare.mjs';
const context={situation:'PRIVATE_SENTINEL has several projects',decision:'Choose next action',outcome:'More income',constraints:['Two hours a day'],values:['Family time'],deferred:['Do not launch another project'],unknowns:['Demand not tested'],provenance:['Current synthetic conversation']};
const input={guide:'Rose Blumpkin',topics:['customer trust','operating costs'],context};
test('personal context stays local while public retrieval gets only generic topics',async()=>{
 const calls=[];const result=await prepareAdvice(input,{retrieve:async e=>{calls.push(e);return e.action==='roster'?{guides:[{id:'person:rose-blumkin',name:'Rose Blumkin',availability:'ready',sourceCount:2}]}:{notes:[{title:'Evidence',lessons:['Test costs'],sourceUrl:'https://example.org'}]};}});
 assert.equal(result.origin,'live public retrieval');assert.match(result.contextBrief,/PRIVATE_SENTINEL/);assert.match(result.contextBrief,/Do not launch/);
 assert.equal(JSON.stringify(calls).includes('PRIVATE_SENTINEL'),false);assert.equal(JSON.stringify(calls).includes('Family time'),false);
 assert.deepEqual(calls[1],{action:'notes',input:{id:'person:rose-blumkin',query:'customer trust operating costs',limit:4}});
});
test('named Rose works before deployment with explicit bundled evidence provenance',async()=>{
 const result=await prepareAdvice(input,{retrieve:async()=>({guides:[]})});
 assert.equal(result.guide.name,'Rose Blumkin');assert.match(result.origin,/bundled/);assert.equal(result.liveStatus,'not in production roster');assert.equal(result.evidence.notes.length,2);
 assert.ok(result.evidence.notes.every(n=>n.sourceUrl.startsWith('https://www.berkshirehathaway.com/')));
});
test('service errors remain visible and cannot become a fabricated live result',async()=>{
 const retrieve=async()=>{throw Error('HTTP 429');};const result=await prepareAdvice(input,{retrieve});
 assert.equal(result.retrievalError,'HTTP 429');assert.equal(result.liveStatus,'unavailable');
 await assert.rejects(prepareAdvice({...input,guide:'Unknown guide'},{retrieve}),/429/);
});
test('missing context is not invented and unsupported fields are rejected',()=>{
 assert.throws(()=>contextBrief({}),/required/);assert.throws(()=>contextBrief({...context,secret:'no'}),/Unexpected/);
 assert.throws(()=>contextBrief({...context,constraints:'bad'}),/Invalid/);
});
test('pending guides and empty retrieval cannot silently generate an answer',async()=>{
 await assert.rejects(prepareAdvice({...input,guide:'Einstein'},{retrieve:async()=>({guides:[{id:'person:albert-einstein',name:'Einstein',availability:'building',sourceCount:0}]})}),/onboarded/);
});
