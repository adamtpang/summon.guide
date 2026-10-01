import { registerHooks } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const root=path.resolve(import.meta.dirname,'..');
registerHooks({
 resolve(specifier,context,next){
  if(specifier==='server-only')return {url:'data:text/javascript,export {};',shortCircuit:true};
  if(specifier.startsWith('@/'))specifier=pathToFileURL(path.join(root,'src',specifier.slice(2)+'.ts')).href;
  try{return next(specifier,context);}catch(error){if(specifier.startsWith('.')&&!/\.[a-z]+$/i.test(specifier))return next(specifier+'.ts',context);throw error;}
 },
 load(url,context,next){if(url.startsWith(pathToFileURL(path.join(root,'data')).href)&&url.endsWith('.json'))return {format:'module',source:`export default ${fs.readFileSync(new URL(url),'utf8')}`,shortCircuit:true};return next(url,context);}
});
