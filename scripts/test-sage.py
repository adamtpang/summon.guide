"""Helium regression checks for /sage on port 3114. Synthetic streams only.
Run via helium-harness: exec(open('C:/Users/adamp/Aether/summon.guide/scripts/test-sage.py').read())
Saved-conversation storage is isolated in this test tab's window.name.
"""
import json
import time

MOCKS = r"""
(() => {
  const realFetch = window.fetch.bind(window);
  const m = window.__sageTest = {requests:[], mode:'success', storageFails:false};
  const get = Storage.prototype.getItem, set = Storage.prototype.setItem;
  Storage.prototype.getItem = function(k) { return k === 'summon_sage_conversations_v1' ? (window.name || '[]') : get.call(this,k); };
  Storage.prototype.setItem = function(k,v) { if (k !== 'summon_sage_conversations_v1') return set.call(this,k,v); if(m.storageFails) throw Error('Synthetic storage failure'); window.name = v; };
  navigator.sendBeacon = () => false;
  window.fetch = async (input, init) => {
    const url = new URL(typeof input === 'string' ? input : input.url, location.href);
    if (url.origin !== location.origin) throw Error('External fetch blocked');
    if (!url.pathname.startsWith('/api/')) return realFetch(input,init);
    if (url.pathname === '/api/auth/session') return Response.json(null);
    if (url.pathname !== '/api/chat/source') throw Error('Unmocked API blocked');
    m.requests.push(JSON.parse(init.body));
    if(m.mode === 'error') return Response.json({error:'Synthetic upstream failure'}, {status:503});
    if(m.mode === 'hold') return new Promise((resolve,reject)=>init.signal.addEventListener('abort',()=>reject(new DOMException('Stopped','AbortError'))));
    const text = 'Compare the alternatives. [Source: "How Henry Singleton Worked"] [Source: "Invented citation"] [FOLLOWUP: What is the tradeoff? | What would change this?]';
    const frame = 'data: '+JSON.stringify({text})+'\n\ndata: [DONE]\n\n';
    return new Response(new ReadableStream({start(c){ c.enqueue(new TextEncoder().encode(frame.slice(0,17))); setTimeout(()=>{c.enqueue(new TextEncoder().encode(frame.slice(17)));c.close();},150); }}),{headers:{'Content-Type':'text/event-stream'}});
  };
})();
"""
tid = new_tab('about:blank')
sid = cdp('Target.attachToTarget', targetId=tid, flatten=True)['sessionId']

def evaluate(code):
    r = cdp('Runtime.evaluate', session_id=sid, expression=code, returnByValue=True, awaitPromise=True)
    if r.get('exceptionDetails'): raise AssertionError(r['exceptionDetails'])
    return r.get('result', {}).get('value')

def wait(code, label):
    until = time.monotonic() + 25
    while time.monotonic() < until:
        if evaluate(code):
            print('PASS:', label)
            return
        time.sleep(.15)
    raise AssertionError(label + ': ' + str(evaluate('({url:location.href, savedBytes:window.name.length, text:document.querySelector("#conversation")?.textContent, mock:!!window.__sageTest})')))

def click(text):
    evaluate('[...document.querySelectorAll("#conversation button")].find(b=>b.textContent.trim()==='+json.dumps(text)+' || b.getAttribute("aria-label")==='+json.dumps(text)+').click()')

def enter(text):
    evaluate('(()=>{const e=document.querySelector("#conversation textarea");Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value").set.call(e,'+json.dumps(text)+');e.dispatchEvent(new Event("input",{bubbles:true}));})()')
    wait('document.querySelector("#conversation textarea").value==='+json.dumps(text), 'question entered')

try:
    cdp('Target.activateTarget', targetId=tid)
    cdp('Page.enable', session_id=sid)
    cdp('Page.addScriptToEvaluateOnNewDocument', session_id=sid, source=MOCKS)
    cdp('Network.enable', session_id=sid)
    cdp('Network.setBlockedURLs', session_id=sid, urls=['*/api/*','*posthog*','*vercel-insights*','*openrouter*'])
    cdp('Page.navigate', session_id=sid, url='http://127.0.0.1:3114/sage?q=Synthetic%20capital%20question')
    wait('!!window.__sageTest && document.querySelector("#conversation textarea")?.value==="Synthetic capital question"', 'prompt handoff stays on /sage')
    click('Send message')
    wait('document.querySelectorAll("#conversation article").length===2', 'split SSE answer completes')
    wait('document.querySelector("#conversation").textContent.includes("Unverified source reference: Invented citation")', 'unknown citation is flagged')
    evaluate('document.querySelector("#conversation article details").open=true')
    wait('!!document.querySelector("#conversation article details a[href*=youtube]")', 'verified citation opens episode evidence')
    click('What is the tradeoff?')
    click('Send message')
    wait('__sageTest.requests.length===2 && document.querySelectorAll("#conversation article").length===4', 'follow-up completes')
    assert evaluate('__sageTest.requests[1].messages.length') == 3, 'follow-up must carry context'
    evaluate('__sageTest.storageFails=true')
    click('Save conversation')
    wait('document.querySelector("#conversation").textContent.includes("Could not save")', 'storage failure is honest')
    evaluate('__sageTest.storageFails=false')
    click('Save conversation')
    wait('JSON.parse(window.name).length===1', 'explicit save persists')
    cdp('Page.reload', session_id=sid)
    wait('document.querySelector("#conversation")?.textContent.includes("Saved conversations (1)")', 'saved library survives reload')
    evaluate('document.querySelector("#conversation > details").open=true')
    evaluate('document.querySelector("#conversation > details li button").click()')
    wait('document.querySelectorAll("#conversation article").length===4', 'reopen restores cited conversation')
    evaluate('__sageTest.mode="error"')
    enter('Synthetic retry question')
    click('Send message')
    wait('document.querySelector("#conversation [role=alert]")?.textContent.includes("Synthetic upstream failure")', 'upstream error surfaced')
    assert evaluate('document.querySelectorAll("#conversation article").length') == 4
    assert evaluate('document.querySelector("#conversation textarea").value') == 'Synthetic retry question'
    evaluate('__sageTest.mode="hold"')
    click('Send message')
    wait('[...document.querySelectorAll("#conversation button")].some(b=>b.textContent==="Stop response")', 'pending response can be stopped')
    click('Stop response')
    wait('!document.querySelector("#conversation textarea").disabled', 'stop releases composer without losing history')
    evaluate('document.querySelectorAll("#conversation > details li button")[1].click()')
    wait('JSON.parse(window.name).length===0', 'delete removes saved copy')
    cdp('Emulation.setDeviceMetricsOverride', session_id=sid, width=390,height=844,deviceScaleFactor=1,mobile=True)
    assert evaluate('document.documentElement.scrollWidth <= innerWidth'), 'mobile overflow'
    print('PASS: 390px layout; no provider calls; test storage isolated')
finally:
    cdp('Target.closeTarget', targetId=tid)
