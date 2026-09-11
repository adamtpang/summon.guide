"""Deterministic Helium UI checks. No microphone, real audio, or API calls.

Start Next locally on port 3107, then execute this file via helium-harness:
  exec(open('C:/Users/adamp/Aether/summon.guide/scripts/test-guide-call.py').read())
The harness supplies cdp/new_tab. Only the isolated test tab is modified/closed.
"""
import json
import time

MOCKS = r"""
(() => {
  const realFetch = window.fetch.bind(window);
  const m = window.__voiceTest = { starts: 0, aborts: 0, plays: 0, pauses: 0,
    denied: false, rejectPlay: false, requests: [], unhandled: [] };
  window.addEventListener('unhandledrejection', e => m.unhandled.push(String(e.reason)));
  class Recognition {
    start() { m.starts++; m.recognition = this; queueMicrotask(() => {
      if (m.denied) this.onerror?.({error: 'not-allowed'}); else this.onstart?.();
    }); }
    abort() { m.aborts++; this.onend?.(); }
  }
  m.Recognition = Recognition;
  Object.defineProperty(window, 'SpeechRecognition', { configurable: true, writable: true, value: undefined });
  Object.defineProperty(window, 'webkitSpeechRecognition', { configurable: true, writable: true, value: undefined });
  // Fail closed even if production code introduces another microphone path.
  if (navigator.mediaDevices) navigator.mediaDevices.getUserMedia = () => Promise.reject(new Error('Real microphone forbidden in test'));
  window.Audio = class {
    constructor(src) { this.src = src; }
    pause() { m.pauses++; }
    play() { m.plays++; m.audio = this; return m.rejectPlay
      ? Promise.reject(new DOMException('Simulated playback denial', 'NotAllowedError'))
      : Promise.resolve(); }
  };
  navigator.sendBeacon = () => false;
  window.fetch = async (input, init) => {
    const url = new URL(typeof input === 'string' ? input : input.url, location.href);
    if (url.origin !== location.origin) throw new Error('External fetch forbidden in test');
    if (!url.pathname.startsWith('/api/')) return realFetch(input, init);
    m.requests.push(url.pathname);
    if (url.pathname === '/api/auth/session') return Response.json({user:{id:'synthetic-call-test', name:'Test'}, expires:'2099-01-01T00:00:00Z'});
    if (url.pathname === '/api/credits') return Response.json({credits:null});
    if (url.pathname === '/api/chat') return new Response('data: '+JSON.stringify({text:'Choose one small priority. [Source: "Synthetic test source" by Test Author]'})+'\n\ndata: [DONE]\n\n', {headers:{'Content-Type':'text/event-stream'}});
    if (url.pathname === '/api/tts') return new Response(new Blob(['synthetic audio'], {type:'audio/mpeg'}));
    throw new Error('Unmocked API forbidden in test: '+url.pathname);
  };
})();
"""

tid = new_tab("about:blank")
sid = cdp("Target.attachToTarget", targetId=tid, flatten=True)["sessionId"]


def evaluate(expression):
    result = cdp("Runtime.evaluate", session_id=sid, expression=expression,
                 returnByValue=True, awaitPromise=True)
    if result.get("exceptionDetails"):
        raise AssertionError(result["exceptionDetails"])
    return result.get("result", {}).get("value")


def wait_for(expression, label):
    deadline = time.monotonic() + 15
    while time.monotonic() < deadline:
        if evaluate(expression):
            print("PASS:", label)
            return
        time.sleep(.1)
    raise AssertionError(label + ': ' + str(evaluate("({url:location.href,call:document.querySelector('section')?.innerText,starts:window.__voiceTest?.starts,errors:window.__voiceTest?.unhandled})")))


def click(label):
    evaluate(f"document.querySelector('button[aria-label={json.dumps(label)}]').click()")


try:
    cdp("Target.activateTarget", targetId=tid)
    cdp("Page.enable", session_id=sid)
    cdp("Page.addScriptToEvaluateOnNewDocument", session_id=sid, source=MOCKS)
    # Browser requests to server API routes are blocked as a second guard;
    # mocked window.fetch responses above never reach the network.
    cdp("Network.enable", session_id=sid)
    cdp("Network.setBlockedURLs", session_id=sid, urls=["*/api/*", "*posthog*", "*vercel-insights*", "*elevenlabs*", "*openrouter*"])
    cdp("Page.navigate", session_id=sid, url="http://localhost:3107/chat/rockefeller")
    wait_for("!!document.querySelector('button[aria-label=\"Start microphone\"]') && document.querySelector('[role=status]')?.textContent.includes('little space')", "call ready")
    assert evaluate("!!window.__voiceTest && !window.SpeechRecognition && !window.webkitSpeechRecognition && String(window.Audio).includes('m.plays')"), "Mocks not installed: refusing to click microphone"
    click("Start microphone")
    wait_for("document.querySelector('section [role=alert]')?.textContent.includes('does not support') && !!document.querySelector('input[aria-label=\"Your question\"]')", "unsupported API offers typing")
    evaluate("window.SpeechRecognition=__voiceTest.Recognition; __voiceTest.denied=true")
    click("Start microphone")
    wait_for("document.querySelector('section [role=alert]')?.textContent.includes('Microphone access is unavailable')", "permission denial explained")
    before = evaluate("__voiceTest.starts")
    time.sleep(.65)
    assert evaluate("__voiceTest.starts") == before, "denial must not retry"
    print("PASS: denied microphone does not restart")
    evaluate("__voiceTest.denied=false")
    click("Start microphone")
    wait_for("document.querySelector('[role=status]')?.textContent==='Listening'", "explicit retry listens")
    before = evaluate("__voiceTest.aborts")
    click("Mute microphone")
    wait_for(f"document.querySelector('[role=status]')?.textContent==='Microphone off' && __voiceTest.aborts>{before}", "mute aborts recognition")
    click("Unmute microphone")
    wait_for("document.querySelector('[role=status]')?.textContent==='Listening'", "unmute resumes")
    evaluate("__voiceTest.recognition.onresult({results:[{isFinal:true,0:{transcript:'A synthetic priority question'}}]})")
    wait_for("document.querySelector('[role=status]')?.textContent==='Speaking' && __voiceTest.plays===1", "mock answer plays")
    click("Hide captions")
    wait_for("!document.querySelector('section').textContent.includes('Choose one small priority')", "captions hide")
    click("Show captions")
    wait_for("document.querySelector('section').textContent.includes('Choose one small priority')", "captions restore")
    before = evaluate("__voiceTest.pauses")
    evaluate("[...document.querySelectorAll('section button')].find(b=>b.textContent.includes('Interrupt')).click()")
    wait_for(f"__voiceTest.pauses>{before} && document.querySelector('[role=status]')?.textContent==='Listening'", "interrupt pauses audio and resumes listening")
    before = evaluate("__voiceTest.aborts")
    click("End voice conversation")
    wait_for(f"!document.querySelector('section[aria-label]') && __voiceTest.aborts>{before}", "end cleans up microphone")
    wait_for("document.body.textContent.includes('A synthetic priority question') && document.body.textContent.includes('Choose one small priority') && document.body.textContent.includes('Synthetic test source')", "history and citations survive end")
    wait_for("[...document.querySelectorAll('button')].some(b=>b.textContent.includes('Listen again'))", "replay control ready")
    evaluate("__voiceTest.rejectPlay=true; [...document.querySelectorAll('button')].find(b=>b.textContent.includes('Listen again')).click()")
    wait_for("__voiceTest.plays===2", "rejected replay attempted")
    time.sleep(.5)  # Allow AnimatePresence's outgoing button to leave the DOM.
    wait_for("[...document.querySelectorAll('button')].some(b=>b.textContent.includes('Listen again')) && ![...document.querySelectorAll('button')].some(b=>b.textContent.trim()==='Speaking')", "rejected replay returns to idle")
    assert evaluate("__voiceTest.unhandled.length") == 0, "no unhandled playback rejection"
    print("PASS: all call regression checks; APIs and media mocked")
finally:
    cdp("Target.closeTarget", targetId=tid)
