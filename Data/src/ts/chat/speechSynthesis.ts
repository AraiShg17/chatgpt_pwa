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
          audioElement.play().then(() => {
            sessionStorage.setItem("audioPlaying", String(true));
          }); // 音声を再生
          audioElement.addEventListener("ended", (event) => {
            sessionStorage.setItem("audioPlaying", String(false));
          });
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
  let requestId;
  // Web Speech APIのSpeechSynthesisインスタンスを作成
  const synth = window.speechSynthesis;

  // 読み上げの設定を作成
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP"; // 言語を日本語に設定
  utterance.rate = 1.0; // 読み上げ速度を1.0に設定

  // 音声を読み上げる
  synth.speak(utterance);
  console.log(synth.speaking);

  function animate() {
    if (synth.speaking) {
      sessionStorage.setItem("audioPlaying", String(true));

      requestId = requestAnimationFrame(animate);
    } else {
      sessionStorage.setItem("audioPlaying", String(false));
      cancelAnimationFrame(requestId);
    }
  }
  requestId = requestAnimationFrame(animate);
}

export const speechInput = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = "ja-JP";
  recognition.continuous = true;
  recognition.interimResults = true;

  let recognitionStarted = false;

  const speechInputKeyDown = (callback: () => void) => {
    document.addEventListener("keydown", (event) => {
      if (!(event.keyCode === 32 && event.shiftKey) || recognitionStarted) {
        return;
      }
      event.preventDefault();
      recognitionStarted = true;
      recognition.start();
      callback();
    });
  };

  let onKeyUpCallback: () => void = () => {};
  document.addEventListener("keyup", (event) => {
    if (!(event.keyCode === 32 && event.shiftKey)) {
      return;
    }
    event.preventDefault();
    recognitionStarted = false;
    recognition.stop();
    onKeyUpCallback();
  });
  const speechInputKeyUp = (callback: () => void) => {
    onKeyUpCallback = callback;
  };

  recognition.addEventListener("end", () => {
    if (!recognitionStarted) {
      console.log("音声認識が終了しました。");
    }
  });

  const speechInputResult = (callback: (transcript: string) => void) => {
    recognition.addEventListener("result", (event) => {
      if (!recognitionStarted) {
        return;
      }
      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }

      callback(transcript);
    });
  };
  return { speechInputResult, speechInputKeyUp, speechInputKeyDown };
};
