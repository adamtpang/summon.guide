import test from 'node:test';
import assert from 'node:assert/strict';
import {acceptedDecision,classifyWithFallback} from './guide-classifier.mjs';
import {getGuideEpisodes,buildGuideGrounding} from '../src/lib/guideRetrieval.ts';
import {figures} from '../src/lib/figures.ts';
import {guidePath} from '../src/lib/guideUrls.ts';
test('uncertain, missing and invented Jev labels use incumbent, never become invented categories',async()=>{
 assert.equal(acceptedDecision({choice:'invented',probabilities:{invented:1}}),null);
 assert.equal(acceptedDecision({choice:'business',probabilities:{business:.74}}),null);
 const result=await classifyWithFallback([{id:'one'},{id:'two'}],{primary:async()=>({answers:{one:{choice:'business',probabilities:{business:.8}},two:{choice:'science',probabilities:{science:.3}}}}),fallback:async records=>{assert.deepEqual(records,[{id:'two'}]);return {answers:{two:'creativity'}};}});
 assert.equal(result.decisions.one.path,'jev');assert.equal(result.decisions.two.path,'incumbent');
});
test('provider failures fall back, double failures remain explicitly unclassified',async()=>{
 const result=await classifyWithFallback([{id:'one'}],{primary:async()=>{throw Error('429');},fallback:async()=>{throw Error('offline');}});
 assert.equal(result.decisions.one.category,null);assert.equal(result.decisions.one.path,'unclassified');
});
test('Rose has a compact route and genuine retrieval evidence',()=>{
 assert.equal(figures.filter(f=>f.slug==='rose-blumkin').length,1);
 assert.equal(guidePath('rose-blumkin'),'/roseblumkin');
 const notes=getGuideEpisodes('rose-blumkin');assert.equal(notes.length,2);
 assert.ok(notes.every(n=>n.youtube.startsWith('https://www.berkshirehathaway.com/letters/')));
 assert.match(buildGuideGrounding('rose-blumkin','price costs customer'),/\[Source: "Rose Blumkin:/);
});
