"""Helium, local production :3114. Synthetic session, brief, council, and storage."""
import json
import time

MOCKS = r"""
(() => {
 const original = fetch.bind(window);
 const m = window.__councilTest = {posts:[], failStorage:false, stored:null};
 Storage.prototype.setItem = function(k,v) { if(k === 'summon_intake') { if(m.failStorage) throw Error('Synthetic failure'); m.stored=v; return; } };
 navigator.sendBeacon = () => false;
 window.fetch = async (input, init={}) => {
  const url = new URL(typeof input === 'string' ? input : input.url, location.href);
  if(url.origin !== location.origin) throw Error('External request blocked');
  if(!url.pathname.startsWith('/api/')) return original(input,init);
  if(url.pathname === '/api/auth/session') return Response.json({user:{id:'synthetic', name:'Test'},expires:'2099-01-01T00:00:00Z'});
  if(url.pathname !== '/api/council') throw Error('Unmocked API blocked');
  if(init.method !== 'POST') return Response.json({brief:'# Personal context\n\nI need to finish a creative project.',source:{kind:'themain.quest',createdAt:'2026-09-09T00:00:00Z',id:'synthetic'}});
  const data=JSON.parse(init.body);m.posts.push(data);
  return Response.json({brief:data.brief,source:{kind:'pasted'},seatedBy:'model',council:[
    {slug:'franklin',name:'Benjamin Franklin',era:'1706–1790',role:'Choose one experiment',reason:'Synthetic private matching reason',ask:'What small experiment should I try this week?'}
  ]});
 };
})();
"""
tid = new_tab('about:blank')
sid = cdp('Target.attachToTarget', targetId=tid, flatten=True)['sessionId']
def evaluate(code):
    result = cdp('Runtime.evaluate', session_id=sid, expression=code, returnByValue=True, awaitPromise=True)
    if result.get('exceptionDetails'): raise AssertionError(result['exceptionDetails'])
    return result.get('result', {}).get('value')
def wait(code, label):
    until = time.monotonic() + 25
    while time.monotonic() < until:
        if evaluate(code):
            print('PASS:', label)
            return
        time.sleep(.15)
    raise AssertionError(label)
def click(label):
    evaluate('[...document.querySelectorAll("button")].find(b=>b.textContent.trim()==='+json.dumps(label)+').click()')
try:
    cdp('Target.activateTarget', targetId=tid)
    cdp('Page.enable', session_id=sid)
    cdp('Page.addScriptToEvaluateOnNewDocument', session_id=sid, source=MOCKS)
    cdp('Network.enable', session_id=sid)
    cdp('Network.setBlockedURLs', session_id=sid, urls=['*/api/*','*posthog*','*vercel-insights*','*openrouter*'])
    cdp('Page.navigate', session_id=sid, url='http://127.0.0.1:3114/council')
    wait('document.querySelector("#council-brief")?.value.includes("creative project")','mailbox brief appears for review')
    assert evaluate('__councilTest.posts.length === 0'), 'preview must not match automatically'
    edited = '# Personal context\n\nMy current decision is which creative project to finish on Friday.'
    evaluate('(()=>{const e=document.querySelector("textarea");Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value").set.call(e,'+json.dumps(edited)+');e.dispatchEvent(new Event("input",{bubbles:true}));})()')
    click('Find my guides')
    wait('document.body.textContent.includes("Choose one experiment")','matched guide and opening question render')
    assert evaluate('__councilTest.posts[0].brief') == edited, 'edited brief is sent'
    evaluate('__councilTest.failStorage=true')
    click('Ask Benjamin')
    wait('document.querySelector("[role=alert]")?.textContent.includes("could not attach")','storage failure preserves council')
    assert evaluate('location.pathname') == '/council'
    cdp('Emulation.setDeviceMetricsOverride', session_id=sid,width=390,height=844,deviceScaleFactor=1,mobile=True)
    assert evaluate('document.documentElement.scrollWidth <= innerWidth'), 'mobile overflow'
    click('Update my situation')
    wait('!!document.querySelector("textarea")','situation can be updated')
    assert evaluate('document.querySelector("textarea").value') == edited
    click('Find my guides')
    wait('!![...document.querySelectorAll("button")].find(b=>b.textContent.trim()==="Ask Benjamin")','rematch completes')
    evaluate('__councilTest.failStorage=false')
    click('Ask Benjamin')
    wait('location.pathname === "/franklin"','selected guide opens')
    assert evaluate('location.search') == '?intake=1', 'private matching reason must not enter URL'
    assert evaluate('__councilTest.stored').startswith(edited), 'reviewed brief attaches'
    print('PASS: reviewed brief handoff, no private URL data, 390px layout; no real model calls')
finally:
    cdp('Target.closeTarget', targetId=tid)
