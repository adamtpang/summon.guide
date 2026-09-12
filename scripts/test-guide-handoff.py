"""Run through Helium Harness. Synthetic context and mocked API calls only."""
import json
import time

tid = new_tab('about:blank')
sid = cdp('Target.attachToTarget', targetId=tid, flatten=True)['sessionId']
def ev(expression):
    result = cdp('Runtime.evaluate', session_id=sid, expression=expression, returnByValue=True, awaitPromise=True)
    if result.get('exceptionDetails'): raise AssertionError(result['exceptionDetails'])
    return result.get('result', {}).get('value')
def wait(expression):
    until = time.monotonic() + 25
    while time.monotonic() < until:
        if ev(expression): return
        time.sleep(.1)
    raise AssertionError(expression + str(ev("({url:location.href,text:document.body.innerText.slice(-1800),requests:window.__handoffRequests})")))
def fill(label, value, kind='HTMLTextAreaElement'):
    if kind == 'HTMLTextAreaElement':
        ev(f"document.querySelector('[aria-label={json.dumps(label)}]').focus()")
        cdp('Input.insertText', session_id=sid, text=value)
        return
    ev(f"(() => {{const el=document.querySelector('[aria-label={json.dumps(label)}]'); Object.getOwnPropertyDescriptor({kind}.prototype,'value').set.call(el,{json.dumps(value)});el.dispatchEvent(new Event('change',{{bubbles:true}}));el.dispatchEvent(new Event('input',{{bubbles:true}}));}})()")
try:
    cdp('Page.enable', session_id=sid)
    cdp('Page.addScriptToEvaluateOnNewDocument', session_id=sid, source=r'''
    (() => {
      const real = fetch.bind(window);
      const signedOut = location.search.includes('signedout=1');
      window.__handoffRequests = [];
      window.fetch = async (input, init) => {
        const u = new URL(typeof input === 'string' ? input : input.url, location.href);
        if (u.origin !== location.origin) throw Error('External request blocked');
        if (!u.pathname.startsWith('/api/')) return real(input,init);
        window.__handoffRequests.push({path:u.pathname,body:init?.body});
        if(u.pathname==='/api/auth/session') return Response.json(signedOut ? {} : {user:{id:'synthetic'},expires:'2099-01-01'});
        if(u.pathname==='/api/credits') return Response.json({credits:null});
        if(u.pathname==='/api/match') return Response.json({type:'matched',slug:'brad-jacobs'});
        if(u.pathname==='/api/chat') return new Response('data: {"text":"Synthetic guide reply."}\n\ndata: [DONE]\n\n',{headers:{'Content-Type':'text/event-stream'}});
        throw Error('Unmocked API blocked: '+u.pathname);
      };
      navigator.sendBeacon = () => false;
    })();
    ''')
    cdp('Network.enable', session_id=sid)
    cdp('Network.setBlockedURLs', session_id=sid, urls=['*/api/*','*posthog*','*openrouter*','*elevenlabs*'])
    for mode in ['guide','match','council','signedout']:
        cdp('Page.navigate', session_id=sid, url='http://localhost:3114/handoff' + ('?signedout=1' if mode == 'signedout' else ''))
        wait("Object.keys(document.querySelector('textarea') || {}).some(k=>k.startsWith('__reactProps'))")
        fill('Handoff mode','guide' if mode == 'signedout' else mode,'HTMLSelectElement')
        fill('Your situation','Synthetic context: I need to decide which project to start.')
        wait("!Array.from(document.querySelectorAll('button')).find(b=>b.textContent==='Continue').disabled")
        ev("Array.from(document.querySelectorAll('button')).find(b=>b.textContent==='Continue').click()")
        if mode == 'signedout':
            wait("location.pathname==='/bradjacobs' && document.body.innerText.includes('Continue with Google')")
            assert ev("sessionStorage.getItem('summon_intake').includes('Synthetic context')")
            assert ev("!window.__handoffRequests.some(r=>r.path==='/api/chat')")
        elif mode == 'council':
            wait("location.pathname==='/council' && !!document.querySelector('textarea')")
            assert ev("document.querySelector('textarea').value.includes('Synthetic context')")
            assert ev("!window.__handoffRequests.some(r=>r.path==='/api/council')")
        else:
            wait("location.pathname==='/bradjacobs' && document.body.innerText.includes('Synthetic guide reply.')")
            assert ev("window.__handoffRequests.some(r=>r.path==='/api/chat' && r.body.includes('Synthetic context'))")
        assert ev("!location.href.includes('Synthetic')")
        print('PASS',mode,'context transferred without URL payload')
finally:
    cdp('Target.closeTarget',targetId=tid)
