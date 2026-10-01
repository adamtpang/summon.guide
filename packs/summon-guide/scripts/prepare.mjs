import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {callSummon} from './client.mjs';
const rose=JSON.parse(fs.readFileSync(new URL('../references/rose-blumkin.json',import.meta.url),'utf8'));
const scalar=['situation','decision','outcome'];
const lists=['priorities','constraints','attempts','values','deferred','unknowns','provenance'];
export function contextBrief(context){
 if(!context||typeof context!=='object'||Array.isArray(context))throw Error('Provide a structured context object extracted by this assistant.');
 if(Object.keys(context).some(k=>![...scalar,...lists].includes(k)))throw Error('Unexpected context field.');
 for(const k of scalar)if(context[k]!==undefined&&(typeof context[k]!=='string'||context[k].length>1800))throw Error(`Invalid ${k}.`);
 for(const k of lists)if(context[k]!==undefined&&(!Array.isArray(context[k])||context[k].length>10||context[k].some(v=>typeof v!=='string'||v.length>800)))throw Error(`Invalid ${k}.`);
 if(!context.decision?.trim()&&!context.situation?.trim())throw Error('A situation or decision is required; ask one focused question.');
 const body=['# Personal context',...scalar.filter(k=>context[k]?.trim()).map(k=>`## ${k}\n${context[k].trim()}`),...lists.filter(k=>context[k]?.length).map(k=>`## ${k}\n${context[k].map(v=>'- '+v).join('\n')}`)].join('\n\n');
 if(body.length>12000)throw Error('Keep the relevant brief under 12000 characters.');
 return body;
}
const normalize=s=>s.toLowerCase().replace(/[^a-z0-9]/g,'');
export async function prepareAdvice(input,{retrieve=callSummon}={}){
 if(!input||typeof input!=='object'||Object.keys(input).some(k=>!['guide','topics','context'].includes(k)))throw Error('Expected guide, topics and context.');
 const brief=contextBrief(input.context);
 if(typeof input.guide!=='string'||!input.guide.trim()||input.guide.length>120)throw Error('Choose one named guide first.');
 if(!Array.isArray(input.topics)||!input.topics.length||input.topics.length>6||input.topics.some(t=>typeof t!=='string'||t.trim().length<2||t.length>80))throw Error('Provide 1-6 generic topic phrases, each 2-80 characters.');
 const named=normalize(input.guide);const isRose=[rose.id,rose.name,...rose.aliases].some(a=>normalize(a)===named);
 let catalog,networkError;
 try{catalog=await retrieve({action:'roster'});if(!Array.isArray(catalog?.guides))throw Error('Malformed roster response.');}catch(e){networkError=e.message;}
 const matches=(catalog?.guides||[]).filter(g=>isRose?g.id===rose.id:[g.id,g.name].some(v=>typeof v==='string'&&normalize(v)===named));
 if(matches.length>1)throw Error('Ambiguous guide name; use its exact roster ID.');
 const guide=matches[0];let evidence;
 if(guide?.availability==='ready'&&guide.sourceCount>0){
  try{evidence=await retrieve({action:'notes',input:{id:guide.id,query:input.topics.map(t=>t.trim()).join(' '),limit:4}});if(!Array.isArray(evidence?.notes))throw Error('Malformed notes response.');}catch(e){networkError=e.message;}
 }
 if(evidence?.notes.length)return {guide:{id:guide.id,name:guide.name},contextBrief:brief,evidence,origin:'live public retrieval',generation:'current host',personalContextSentToSummon:false};
 if(isRose)return {guide:{id:rose.id,name:rose.name},contextBrief:brief,evidence:{notes:rose.notes,coverage:rose.coverage,checkedOn:rose.checkedOn},origin:rose.origin,liveStatus:networkError?'unavailable':guide?'no relevant live notes':'not in production roster',...(networkError?{retrievalError:networkError}:{}),generation:'current host',personalContextSentToSummon:false};
 throw Error(networkError||(!guide?'Guide not found; use the matching flow.':guide.availability!=='ready'?'Guide is still being onboarded.':'No relevant evidence; revise topics or choose another guide.'));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 try{let text='';for await(const part of process.stdin){text+=part;if(text.length>20000)throw Error('Input too large.');}process.stdout.write(JSON.stringify(await prepareAdvice(JSON.parse(text)),null,2)+'\n');}
 catch(e){console.error(e.message);process.exitCode=1;}
}
