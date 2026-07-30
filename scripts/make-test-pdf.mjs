// Generates a synthetic multi-page "book" PDF used to test scripts/pdf-to-md.mjs.
// Built by hand rather than pulled from a real book so the fixture deliberately
// contains the artefacts the extractor has to strip: a running header on every
// page, a page number in the footer, words hyphenated across line breaks, and
// chapter headings that should survive as markdown headings.
//
// Usage: node scripts/make-test-pdf.mjs [outPath]

import fs from 'fs';
import path from 'path';

const out = process.argv[2] || 'sources/_fixtures/test-book.pdf';

const PAGES = [
  {
    heading: 'CHAPTER 1',
    title: 'The First Principle',
    lines: [
      'Every durable business rests on a single obser-',
      'vation that the founder took seriously before',
      'anyone else did. The observation is rarely com-',
      'plicated. It is usually something the market has',
      'been telling everyone, loudly, for years.',
      '',
      'The discipline is not in finding the insight. It is',
      'in refusing to dilute it once the money arrives.',
    ],
  },
  {
    heading: 'CHAPTER 2',
    title: 'Pricing Is a Decision, Not a Calculation',
    lines: [
      'Cost-plus pricing is the default because it feels',
      'defensible. You can show your work. But it anchors',
      'your revenue to your inefficiency rather than to',
      'the value the customer actually receives.',
      '',
      'Charge for the outcome. Then work backwards to a',
      'cost structure that survives it.',
    ],
  },
  {
    heading: 'CHAPTER 3',
    title: 'Distribution Beats Product',
    lines: [
      'A mediocre product with a distribution advantage',
      'will outlive an excellent product without one. This',
      'is unfair and it is also reliably true.',
      '',
      'Build the channel before you need it. The founders',
      'who do this look lucky in retrospect.',
    ],
  },
];

// ── minimal PDF writer ────────────────────────────────────────────────────────
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

function contentStream(page, n, total) {
  const L = [];
  L.push('BT /F1 8 Tf 1 0 0 1 72 760 Tm');
  // running header, must be stripped by the extractor
  L.push(`(A Synthetic Book on Business   .   ${esc(page.title)}) Tj`);
  L.push('ET');
  L.push('BT /F1 14 Tf 1 0 0 1 72 710 Tm');
  L.push(`(${esc(page.heading)}) Tj`);
  L.push('ET');
  L.push('BT /F1 12 Tf 1 0 0 1 72 688 Tm');
  L.push(`(${esc(page.title)}) Tj`);
  L.push('ET');
  L.push('BT /F1 11 Tf 1 0 0 1 72 650 Tm 16 TL');
  page.lines.forEach((ln, i) => {
    if (i === 0) L.push(`(${esc(ln)}) Tj`);
    else L.push(`T* (${esc(ln)}) Tj`);
  });
  L.push('ET');
  // page number footer, must be stripped
  L.push('BT /F1 9 Tf 1 0 0 1 300 60 Tm');
  L.push(`(${n}) Tj`);
  L.push('ET');
  return L.join('\n');
}

const objects = [];
const push = (body) => { objects.push(body); return objects.length; };

const total = PAGES.length;
const kidRefs = [];
const pagesObjNum = 2; // reserved below

// 1 catalog, 2 pages tree, then per page: page obj + content obj, then font
push('<< /Type /Catalog /Pages 2 0 R >>');
push('PAGES_PLACEHOLDER');

const fontNumPlaceholderIdx = [];
for (const page of PAGES) {
  const idx = PAGES.indexOf(page);
  const stream = contentStream(page, idx + 1, total);
  const contentNum = push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  const pageNum = push(
    `<< /Type /Page /Parent ${pagesObjNum} 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 FONTREF 0 R >> >> /Contents ${contentNum} 0 R >>`
  );
  fontNumPlaceholderIdx.push(pageNum - 1);
  kidRefs.push(`${pageNum} 0 R`);
}
const fontNum = push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');

objects[pagesObjNum - 1] = `<< /Type /Pages /Count ${total} /Kids [${kidRefs.join(' ')}] >>`;
for (const i of fontNumPlaceholderIdx) objects[i] = objects[i].replace('FONTREF', String(fontNum));

// assemble with a correct xref table
let pdf = '%PDF-1.4\n';
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});
const xrefStart = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += '0000000000 65535 f \n';
for (const off of offsets) pdf += String(off).padStart(10, '0') + ' 00000 n \n';
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, pdf, 'latin1');
console.log('wrote ' + out + ' (' + total + ' pages, ' + Math.round(pdf.length / 1024) + 'KB)');
console.log('fixture deliberately contains: running headers, page-number footers, hyphenated line breaks, chapter headings');
