import fs from 'node:fs';
import path from 'node:path';
const rows=JSON.parse(fs.readFileSync('data/guide-source-additions.json','utf8'));
const counts={};
for(const row of rows){
 const i=(counts[row.slug]=(counts[row.slug]||0)+1);
 row.file=`content/knowledge/${row.slug}-public-notes/${String(i).padStart(3,'0')}.md`;
 fs.mkdirSync(path.dirname(row.file),{recursive:true});
 fs.writeFileSync(row.file,`---\ntitle: ${JSON.stringify(row.title)}\nprinciple: ${JSON.stringify(row.principle)}\nyoutube_url: ${JSON.stringify(row.url)}\n---\n\n# ${row.title}\n\n## Key lessons\n\n${row.keyLessons.map(l=>'- '+l).join('\n')}\n\n---\n\nEvidence: ${row.evidenceKind}. Checked ${row.checkedOn}. ${row.rights}\n\n[Source](${row.url})\n`);
}
fs.writeFileSync('data/guide-source-additions.json',JSON.stringify(rows,null,2)+'\n');
console.log(`Wrote ${rows.length} original public-source notes.`);
