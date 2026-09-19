// Records one guide call as a single audio file: the user's microphone and
// every guide reply, mixed live through Web Audio. Nothing is uploaded; the
// file is handed back to the browser for the user to save.

export type CallRecorder = {
  /** Route a guide reply's audio element into the recording (it stays audible). */
  attach(audio: HTMLAudioElement): void;
  /** Stop and return the finished recording. */
  stop(): Promise<Blob>;
  cancel(): void;
};

const MIME_CANDIDATES = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"];

export async function startCallRecorder(): Promise<CallRecorder> {
  if (typeof MediaRecorder === "undefined" || typeof AudioContext === "undefined") {
    throw new Error("This browser cannot record audio.");
  }
  const mic = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
  const ctx = new AudioContext();
  const mix = ctx.createMediaStreamDestination();
  ctx.createMediaStreamSource(mic).connect(mix);

  const mimeType = MIME_CANDIDATES.find((type) => MediaRecorder.isTypeSupported(type));
  const recorder = new MediaRecorder(mix.stream, mimeType ? { mimeType } : undefined);
  const chunks: Blob[] = [];
  recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
  recorder.start(1000);

  const attached = new WeakSet<HTMLAudioElement>();
  const release = () => {
    mic.getTracks().forEach((track) => track.stop());
    void ctx.close();
  };

  return {
    attach(audio) {
      if (attached.has(audio)) return;
      attached.add(audio);
      try {
        const source = ctx.createMediaElementSource(audio);
        source.connect(mix);
        source.connect(ctx.destination);
      } catch {
        // An element can only be captured once; playback continues regardless.
      }
    },
    stop() {
      return new Promise((resolve) => {
        recorder.onstop = () => {
          release();
          resolve(new Blob(chunks, { type: recorder.mimeType || "audio/webm" }));
        };
        if (recorder.state === "inactive") recorder.onstop(new Event("stop"));
        else recorder.stop();
      });
    },
    cancel() {
      if (recorder.state !== "inactive") recorder.stop();
      release();
    },
  };
}

export function recordingFileName(guide: string, blob: Blob): string {
  const ext = blob.type.includes("mp4") ? "m4a" : blob.type.includes("ogg") ? "ogg" : "webm";
  const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-");
  return `summon-${guide}-${stamp}.${ext}`;
}
