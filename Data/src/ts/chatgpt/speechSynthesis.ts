export const speechOutput = (text: string) => {
  const utterance = new SpeechSynthesisUtterance();

  utterance.text = text;
  utterance.lang = "ja-JP";
  // 速度 0.1-10 初期値:1 (倍速なら2, 半分の倍速なら0.5)
  utterance.rate = 1;
  // 高さ 0-2 初期値:1
  utterance.pitch = 1;
  // 音量 0-1 初期値:1
  utterance.volume = 1;
  speechSynthesis.speak(utterance);
};

export const speechInput = (text: string) => {};
