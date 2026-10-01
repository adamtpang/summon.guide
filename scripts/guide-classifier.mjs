export const categories={
 business:'Building companies, entrepreneurship, retail, operations, product, sales and marketing',
 investing:'Investing, capital allocation, financial markets, personal finance and wealth',
 philosophy:'Philosophy, ethics, meaning, spirituality, wisdom and rational inquiry',
 creativity:'Art, writing, storytelling, music, animation and creative practice',
 effectiveness:'Personal habits, focus, productivity, learning methods and self-direction',
 science:'Scientific discovery, engineering, invention and technical understanding',
 leadership:'Government, statecraft, military strategy, institutions and civic leadership',
 relationships:'Communication, community, friendship, social connection and interpersonal skill',
 wellbeing:'Physical health, psychology, emotional wellbeing, sport and athletic performance'
};
export const examples=[
 ['s01','A furniture retailer teaches purchasing, low overhead and honest prices.','business'],
 ['s02','A startup founder teaches customer interviews and launching a product.','business'],
 ['s03','A fund manager teaches valuation and allocating capital to securities.','investing'],
 ['s04','A household finance coach teaches budgeting and debt repayment.','investing'],
 ['s05','A Stoic philosopher teaches virtue, mortality and ethical living.','philosophy'],
 ['s06','An animator teaches characters, scenes and playful creative experiments.','creativity'],
 ['s07','A writer teaches narrative craft and revising fictional stories.','creativity'],
 ['s08','A productivity author teaches focused work, time management and habits.','effectiveness'],
 ['s09','A physicist teaches experiments and scientific explanations.','science'],
 ['s10','A prime minister teaches public institutions and governing a country.','leadership'],
 ['s11','A community builder teaches making friends and sustaining relationships.','relationships'],
 ['s12','An athlete teaches training, recovery and physical performance.','wellbeing']
].map(([id,description,expected])=>({id,description,expected}));
export async function jevClassify(records){
 const start=performance.now();
 const questions=Object.fromEntries(records.map(r=>[r.id,{type:'choice',instructions:`Choose the single primary topic for record ${r.id}. Judge its documented work rather than incidental words.`,criteria:categories}]));
 const response=await fetch('https://openrouter.ai/api/alpha/decisions',{method:'POST',headers:{Authorization:`Bearer ${process.env.OPENROUTER_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:'~typesafe/jev-latest',state:JSON.stringify(records),questions}),signal:AbortSignal.timeout(30000)});
 if(!response.ok)throw new Error(`Jev HTTP ${response.status}: ${(await response.text()).slice(0,200)}`);
 const data=await response.json();return {answers:data.answers,usage:data.usage,latencyMs:Math.round(performance.now()-start)};
}
export async function incumbentClassify(records){
 const {completeOpenRouter}=await import('../src/lib/openrouter.ts');
 const start=performance.now();
 const result=await completeOpenRouter({system:`Classify each record into a single primary category. Return only a JSON object mapping record id to category key. Categories: ${JSON.stringify(categories)}`,messages:[{role:'user',content:JSON.stringify(records)}],maxTokens:1800,temperature:0});
 const match=result.text.match(/\{[\s\S]*\}/);if(!match)throw new Error('No JSON from incumbent');
 return {answers:JSON.parse(match[0]),latencyMs:Math.round(performance.now()-start),model:result.meta.model,cost:null,costNote:'Existing completeOpenRouter wrapper does not expose usage cost.'};
}

export function acceptedDecision(answer,threshold=0.75){
 const category=answer?.choice;
 const probability=answer?.probabilities?.[category];
 return Object.hasOwn(categories,category||'')&&Number.isFinite(probability)&&probability>=threshold ? {category,confidence:probability,path:'jev'} : null;
}
export async function classifyWithFallback(records,{primary=jevClassify,fallback=incumbentClassify,threshold=0.75}={}){
 let result;let error;
 try{result=await primary(records);}catch(e){error=e.message;}
 const decisions={};const uncertain=[];
 for(const r of records){const accepted=acceptedDecision(result?.answers?.[r.id],threshold);if(accepted)decisions[r.id]=accepted;else uncertain.push(r);}
 let fallbackResult;
 if(uncertain.length){
  try{fallbackResult=await fallback(uncertain);for(const r of uncertain){const category=fallbackResult.answers[r.id];decisions[r.id]=Object.hasOwn(categories,category||'')?{category,confidence:null,path:'incumbent'}:{category:null,confidence:null,path:'unclassified'};}}
  catch(e){error=[error,e.message].filter(Boolean).join('; ');for(const r of uncertain)decisions[r.id]={category:null,confidence:null,path:'unclassified'};}
 }
 return {decisions,jevUsage:result?.usage,jevLatencyMs:result?.latencyMs,fallbackLatencyMs:fallbackResult?.latencyMs,fallbackModel:fallbackResult?.model,error};
}
