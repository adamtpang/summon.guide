import fs from 'node:fs';
import sharp from 'sharp';
import {SUMMON_MARK_SVG} from '../src/lib/brandMark.ts';
fs.writeFileSync('public/favicon.svg',SUMMON_MARK_SVG+'\n');
const sizes=[16,32,48,64];const images=await Promise.all(sizes.map(n=>sharp(Buffer.from(SUMMON_MARK_SVG)).resize(n,n).png().toBuffer()));
const header=Buffer.alloc(6+16*sizes.length);header.writeUInt16LE(1,2);header.writeUInt16LE(sizes.length,4);let offset=header.length;
for(let i=0;i<sizes.length;i++){const at=6+16*i;header[at]=sizes[i];header[at+1]=sizes[i];header.writeUInt16LE(1,at+4);header.writeUInt16LE(32,at+6);header.writeUInt32LE(images[i].length,at+8);header.writeUInt32LE(offset,at+12);offset+=images[i].length;}
fs.writeFileSync('src/app/favicon.ico',Buffer.concat([header,...images]));
console.log('Generated wizard favicon: SVG and 16/32/48/64 ICO.');
