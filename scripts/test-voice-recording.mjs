import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const code = ts.transpileModule(fs.readFileSync('src/lib/recordVoiceTurn.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
let stopped = 0, closed = 0, now = 0, frames = 0, silent = false;
const stream = {getTracks:()=>[{stop:()=>stopped++}]};
let getMedia = async () => stream;
class Recorder {
  static isTypeSupported() { return true; }
  state='inactive'; mimeType='audio/webm';
  start(){this.state='recording';}
  stop(){this.state='inactive';queueMicrotask(()=>{this.ondataavailable({data:new Blob(['synthetic'])});this.onstop();});}
}
class Context {
  async resume(){} async close(){closed++;}
  createMediaStreamSource(){return {connect(){}};}
  createAnalyser(){return {fftSize:2048,getFloatTimeDomainData(a){frames++;a.fill(!silent&&frames<6?.1:0);}};}
}
const exports={};
vm.runInNewContext(code,{exports,navigator:{mediaDevices:{getUserMedia:()=>getMedia()}},MediaRecorder:Recorder,AudioContext:Context,DOMException,Blob,Float32Array,performance:{now:()=>now},setInterval:fn=>setInterval(()=>{now+=100;fn();},1),clearInterval});
const record=exports.recordVoiceTurn;
const clip=await record(new AbortController().signal,()=>{});
assert.equal(clip.type,'audio/webm');assert.ok(clip.size);assert.equal(stopped,1);assert.equal(closed,1);
console.log('PASS: silence ends a spoken turn and releases microphone/audio context');
silent=true;frames=0;now=0;
await assert.rejects(record(new AbortController().signal,()=>{}),/hear anything/);
assert.equal(stopped,2);assert.equal(closed,2);
console.log('PASS: silence without speech is never submitted');
let grant;getMedia=()=>new Promise(resolve=>grant=resolve);
const controller=new AbortController();const pending=record(controller.signal,()=>assert.fail('must not start after cancellation'));
controller.abort();grant(stream);
await assert.rejects(pending,e=>e.name==='AbortError');assert.equal(stopped,3);
console.log('PASS: ending call while permission is pending releases late-granted microphone');
getMedia=async()=>stream;silent=false;frames=0;now=0;
const cancel=new AbortController();
await assert.rejects(record(cancel.signal,()=>queueMicrotask(()=>cancel.abort())),e=>e.name==='AbortError');
assert.equal(stopped,4);assert.equal(closed,3);
console.log('PASS: cancellation during recording releases resources and discards audio');
