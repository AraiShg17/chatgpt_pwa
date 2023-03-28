// speech-recognition.d.ts
declare global {
  interface Window {
    SpeechRecognition: typeof globalThis.SpeechRecognition;
    webkitSpeechRecognition: typeof globalThis.SpeechRecognition;
    mozSpeechRecognition: typeof globalThis.SpeechRecognition;
    msSpeechRecognition: typeof globalThis.SpeechRecognition;
  }
}

export {};
