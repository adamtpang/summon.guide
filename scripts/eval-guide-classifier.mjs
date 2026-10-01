import fs from 'node:fs';
import {examples,jevClassify,incumbentClassify} from './guide-classifier.mjs';
const records=examples.map(({id,description})=>({id,description}));
const results=await Promise.allSettled([jevClassify(records),incumbentClassify(records)]);
const output={date:new Date().toISOString(),sample:'12 synthetic single-topic examples, one batch per model',examples};
for(const [index,name] of ['jev','incumbent'].entries()){
 const r=results[index];if(r.status==='rejected'){output[name]={error:r.reason.message};continue;}
 output[name]=r.value;output[name].correct=examples.filter(e=>(name==='jev'?r.value.answers[e.id]?.choice:r.value.answers[e.id])===e.expected).length;
 output[name].misses=examples.filter(e=>(name==='jev'?r.value.answers[e.id]?.choice:r.value.answers[e.id])!==e.expected).map(e=>e.id);
}
output.passed=output.jev.correct>=11&&output.jev.correct>=output.incumbent.correct;
fs.mkdirSync('data/guide-audit',{recursive:true});fs.writeFileSync('data/guide-audit/jev-benchmark.json',JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify(output));
