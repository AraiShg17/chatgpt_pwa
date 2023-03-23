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
    .catch((error) => console.error(error));

  //
  // const dest = fs.createWriteStream("stream.wav");
  // sound_row.body.pipe(dest)
};

export const speechInput = (text: string) => {};
