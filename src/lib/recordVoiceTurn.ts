// Record one turn, ending after a pause. Nothing is persisted on-device.
export async function recordVoiceTurn(signal: AbortSignal, onListening: () => void): Promise<Blob> {
  if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
    throw new Error("Microphone recording is unavailable in this browser. Use typing.");
  }
  const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
  if (signal.aborted) { stream.getTracks().forEach(t => t.stop()); throw new DOMException("Stopped", "AbortError"); }
  const context = new AudioContext();
  try {
    await context.resume();
    if (signal.aborted) throw new DOMException("Stopped", "AbortError");
    const analyser = context.createAnalyser(); analyser.fftSize = 2048;
    const source = context.createMediaStreamSource(stream); source.connect(analyser);
    const mimeType = ["audio/webm;codecs=opus", "audio/mp4", "audio/webm"].find(t => MediaRecorder.isTypeSupported(t));
    const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
    return await new Promise<Blob>((resolve, reject) => {
      const chunks: Blob[] = [];
      const samples = new Float32Array(analyser.fftSize);
      const started = performance.now(); let lastVoice = started; let voicedFrames = 0;
      let failure: Error | null = null;
      let timer: ReturnType<typeof setInterval> | undefined = undefined;
      const abort = () => { failure = new DOMException("Stopped", "AbortError"); stop(); };
      function stop() { clearInterval(timer); if (recorder.state !== "inactive") recorder.stop(); }
      recorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
      recorder.onerror = () => { failure = new Error("Recording failed. Try again."); stop(); signal.removeEventListener("abort", abort); reject(failure); };
      recorder.onstop = () => {
        clearInterval(timer); signal.removeEventListener("abort", abort);
        if (failure) reject(failure);
        else if (signal.aborted) reject(new DOMException("Stopped", "AbortError"));
        else if (voicedFrames < 4) reject(new Error("I didn’t hear anything. Try again."));
        else resolve(new Blob(chunks, { type: recorder.mimeType }));
      };
      signal.addEventListener("abort", abort, { once: true });
      recorder.start(); onListening();
      timer = setInterval(() => {
        analyser.getFloatTimeDomainData(samples);
        const rms = Math.sqrt(samples.reduce((sum, x) => sum + x * x, 0) / samples.length);
        const now = performance.now();
        if (rms > 0.015) { lastVoice = now; voicedFrames++; }
        if ((voicedFrames >= 4 && now - lastVoice > 1400) || now - started > 30000 || (!voicedFrames && now - started > 12000)) stop();
      }, 50);
    });
  } finally {
    stream.getTracks().forEach(t => t.stop());
    await context.close();
  }
}
