"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { figures } from '@/lib/figures';
import { guidePath } from '@/lib/guideUrls';

export default function GuideHandoff() {
  const router = useRouter();
  const [mode, setMode] = useState('guide');
  const [slug, setSlug] = useState('brad-jacobs');
  const [brief, setBrief] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function proceed() {
    if (!brief.trim()) { setError('Add your situation first.'); return; }
    setBusy(true); setError('');
    try {
      const context = brief.trim().startsWith('# Personal context') ? brief.trim() : `# Personal context\n\n${brief.trim()}`;
      if (mode === 'council') {
        sessionStorage.setItem('summon_council_handoff', context);
        router.push('/council');
        return;
      }
      let chosen = slug;
      if (mode === 'match') {
        const response = await fetch('/api/match', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: context }) });
        const result = await response.json();
        if (!response.ok || result.type !== 'matched' || !figures.some(f => f.slug === result.slug)) throw new Error(result.reason || 'Could not find a guide. Choose one and try again.');
        chosen = result.slug;
      }
      sessionStorage.setItem('summon_intake', context);
      router.push(`${guidePath(chosen)}?intake=1`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not carry your context.');
      setBusy(false);
    }
  }
  return <main className="min-h-screen bg-black text-white px-5 py-16">
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="text-3xl font-serif">Bring your situation.</h1>
      <p className="text-white/50 text-sm">Review what your guide needs to know.</p>
      <label className="block text-sm">Speak with
        <select aria-label="Handoff mode" value={mode} onChange={e => setMode(e.target.value)} className="mt-2 block w-full rounded-xl bg-neutral-900 p-3">
          <option value="guide">A guide</option><option value="match">Find my guide</option><option value="council">A council</option>
        </select>
      </label>
      {mode === 'guide' && <label className="block text-sm">Guide
        <select aria-label="Guide" value={slug} onChange={e => setSlug(e.target.value)} className="mt-2 block w-full rounded-xl bg-neutral-900 p-3">
          {[...figures].sort((a,b) => a.name.localeCompare(b.name)).map(f => <option key={f.slug} value={f.slug}>{f.name}</option>)}
        </select>
      </label>}
      <textarea aria-label="Your situation" value={brief} onChange={e => setBrief(e.target.value)} maxLength={12000} rows={12} placeholder="Situation, decision, goals, constraints, and what you need help with…" className="ph-no-capture ph-mask block w-full rounded-xl border border-white/15 bg-neutral-950 p-4 text-sm leading-relaxed" />
      <p className="text-xs text-white/40">Your context stays out of the URL. Continue sends it to your chosen guide or routing service.</p>
      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
      <button disabled={busy || !brief.trim()} onClick={() => void proceed()} className="min-h-12 rounded-full bg-white text-black px-6 disabled:opacity-40">{busy ? 'Opening…' : 'Continue'}</button>
    </div>
  </main>;
}
