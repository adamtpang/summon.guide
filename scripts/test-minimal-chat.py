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
    cdp('Page.addScriptToEvaluateOnNewDocument', session_id=sid, source=r"""
    (() => {
      const real=fetch.bind(window); window.__test={stops:0,denied:false,plays:0};
      navigator.sendBeacon=()=>false;
      navigator.mediaDevices.getUserMedia=async()=> { if(window.__test.denied) throw new DOMException('Denied','NotAllowedError'); return {getTracks:()=>[{stop:()=>window.__test.stops++}]}; };
      window.AudioContext=class { resume(){return Promise.resolve()} close(){return Promise.resolve()} createMediaStreamSource(){return {connect(){}}} createAnalyser(){let frames=0;return {fftSize:2048,getFloatTimeDomainData(a){a.fill(frames++<8 ? .1 : 0)}}} };
      window.MediaRecorder=class {static isTypeSupported(){return true} constructor(){this.mimeType='audio/webm';this.state='inactive'} start(){this.state='recording'} stop(){this.state='inactive';this.ondataavailable?.({data:new Blob(['test'],{type:'audio/webm'})});queueMicrotask(()=>this.onstop?.())}};
      window.Audio=class {play(){window.__test.plays++;return Promise.resolve()} pause(){} };
      window.fetch=async(input,init)=> {
        const u=new URL(typeof input==='string'?input:input.url,location.href);
        if(u.origin!==location.origin)throw Error('External blocked');
        if(!u.pathname.startsWith('/api/'))return real(input,init);
        if(u.pathname==='/api/auth/session')return Response.json({user:{id:'test'},expires:'2099-01-01'});
        if(u.pathname==='/api/credits')return Response.json({credits:null});
        if(u.pathname==='/api/transcribe')return Response.json(init?.method==='POST'?{text:'Synthetic spoken question'}:{ready:true});
        if(u.pathname==='/api/tts')return new Response(new Blob(['test'],{type:'audio/mpeg'}));
        if(u.pathname.startsWith('/api/chat'))return new Response('data: '+JSON.stringify({text:'Synthetic answer. [Source: "Test source"]'})+'\n\ndata: [DONE]\n\n',{headers:{'Content-Type':'text/event-stream'}});
        throw Error('Unmocked API '+u.pathname);
      };
    })();
    """)
    cdp('Network.enable',session_id=sid)
    cdp('Network.setBlockedURLs',session_id=sid,urls=['*/api/*','*posthog*','*openrouter*','*elevenlabs*'])
    cdp('Emulation.setDeviceMetricsOverride', session_id=sid,width=390,height=844,deviceScaleFactor=1,mobile=True)
    for route in ['bradjacobs','sage','paulgrahamessays']:
        cdp('Page.navigate',session_id=sid,url='http://localhost:3114/'+route)
        wait("Object.keys(document.querySelector('textarea')||{}).some(k=>k.startsWith('__reactProps'))")
        assert ev('document.documentElement.scrollWidth<=390'),route
        ev("document.querySelector('[aria-label=\"Dictate message\"]').click()")
        wait("document.querySelector('textarea').value.includes('Synthetic spoken question')")
        assert ev('window.__test.stops===1')
        ev("window.__test.denied=true;document.querySelector('[aria-label=\"Dictate message\"]').click()")
        wait("document.body.innerText.includes('Allow microphone access')")
        assert ev("document.querySelector('textarea').value==='Synthetic spoken question'")
        ev("window.__test.denied=false;document.querySelector('[aria-label=\"Dictate message\"]').click()")
        wait("document.body.innerText.includes('Listening')")
        ev("document.querySelector('[aria-label=\"Cancel recording\"]').click()")
        wait("!!document.querySelector('[aria-label=\"Dictate message\"]')")
        assert ev('window.__test.stops===2')
        assert ev("document.querySelector('textarea').value==='Synthetic spoken question'")
        ev("document.querySelector('[aria-label=\"Send message\"]').click()")
        wait("!!document.querySelector('[aria-label=\"Listen to answer\"]')")
        ev("document.querySelector('[aria-label=\"Listen to answer\"]').click()")
        wait("window.__test.plays===1")
        ev("document.querySelector('[aria-label=\"Stop audio\"]').click()")
        wait("!!document.querySelector('[aria-label=\"Listen to answer\"]')")
        print('PASS',route,'390px, voice draft, denial preserves draft, cancellation releases microphone')
finally:
    cdp('Target.closeTarget',targetId=tid)
