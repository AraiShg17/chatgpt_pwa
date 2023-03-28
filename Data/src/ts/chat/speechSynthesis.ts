export const speechOutput = (text: string) => {
  fetch(`http://localhost:50021/audio_query?text=${text}&speaker=46`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((query) => {
      console.log(query);
      fetch(
        `http://localhost:50021/synthesis?speaker=46&enable_interrogative_upspeak=true`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "audio/wav",
            responseType: "stream",
          },
          body: JSON.stringify(query),
        }
      )
        .then((response) => response.blob())
        .then((blob) => {
          const audioElement = new Audio(URL.createObjectURL(blob)); // 音声要素を作成
          audioElement.play(); // 音声を再生
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => {
      console.error(error);
      // voice vox apiが使用できない場合通常の音声読み上げapiに処理を流す
      speak(text);
    });
};

// 音声読み上げをする関数
function speak(text) {
  // Web Speech APIのSpeechSynthesisインスタンスを作成
  const synth = window.speechSynthesis;

  // 読み上げの設定を作成
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP"; // 言語を日本語に設定
  utterance.rate = 1.0; // 読み上げ速度を1.0に設定

  // 音声を読み上げる
  synth.speak(utterance);
}

export const speechInput = (text: string) => {};
