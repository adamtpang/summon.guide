import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {guideAgents} from '../src/lib/guideAgents.ts';
import {getFigure} from '../src/lib/figures.ts';
import {getGuideEpisodes,buildGuideGrounding} from '../src/lib/guideRetrieval.ts';
import {sourceCorpus,buildSourceSystemPrompt} from '../src/lib/sourceCorpus.ts';
import {applySourceRuntimePolicy} from '../src/lib/sourcePolicy.ts';
import {retrieveSourceEpisodes} from '../src/lib/sourceRetrieval.ts';
import {buildSagePrompt} from '../src/lib/sagePrompt.ts';
import {guideSystemPrompt} from '../src/lib/guideContract.ts';
import {completeOpenRouter} from '../src/lib/openrouter.ts';
const file='data/guide-audit/answer-smoke.json';
const report=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{kind:'automated citation smoke, not independent quality certification',results:{}};
const requested=process.argv.find(a=>a.startsWith('--only='))?.slice(7).split(',');
const queue=guideAgents.filter(g=>g.capabilities.includes('chat')&&(!requested||requested.includes(g.id)));
let cursor=0;
async function worker(){while(cursor<queue.length){const g=queue[cursor++];
 const episodes=g.kind==='person'?getGuideEpisodes(g.slug):applySourceRuntimePolicy(g.slug,sourceCorpus[g.slug]?.episodes||[]);
 const topic=episodes[0].principle.slice(0,300);
 const query=`I am considering a small reversible decision related to this idea: ${topic}. Explain one supported principle, cite its exact supplied source title, distinguish your application, and suggest one small test. Keep the answer under 150 words.`;
 const selected=retrieveSourceEpisodes(episodes,query,16).map(r=>r.episode);
 const system=g.kind==='person'?guideSystemPrompt(getFigure(g.slug).systemPrompt,buildGuideGrounding(g.slug,query)):guideSystemPrompt(g.slug==='founders-podcast'?buildSagePrompt(selected):buildSourceSystemPrompt(g.slug,selected),'');
 const hash=createHash('sha256').update(system+query).digest('hex');
 if(report.results[g.id]?.hash===hash){console.log('cached '+g.id);continue;}
 try{const result=await completeOpenRouter({system,messages:[{role:'user',content:query}],maxTokens:4000,temperature:0});
 const citations=[...result.text.matchAll(/\[Source:\s*["“]([^"”]+)["”]\]/g)].map(m=>m[1]);
 const titles=new Set(selected.map(e=>e.title.replace(/["\r\n]/g,' ')));
 const unknown=citations.filter(t=>!titles.has(t));
 report.results[g.id]={hash,checkedAt:new Date().toISOString(),model:result.meta,query,answer:result.text,citations,unknownCitations:unknown,pass:citations.length>0&&unknown.length===0,review:'automated citation membership only; human usefulness and accuracy review pending'};
 }catch(error){report.results[g.id]={hash,checkedAt:new Date().toISOString(),pass:false,error:error.message};}
 fs.writeFileSync(file,JSON.stringify(report,null,2)+'\n');console.log(`${g.id}: ${report.results[g.id].pass?'PASS':'REVIEW'}`);
}}
await Promise.all(Array.from({length:3},worker));
const rows=Object.values(report.results);console.log(JSON.stringify({total:rows.length,pass:rows.filter(r=>r.pass).length,review:rows.filter(r=>!r.pass).length}));
