import React, { useState } from "react";
import "./scss/index.scss";
import { chatgpt } from "./ts/chatgpt/chatgpt";
import { speechOutput } from "./ts/chatgpt/speechSynthesis";

function App() {
  const [text, setText] = useState("");
  const [chat, setChat] = useState([{ role: "", content: "" }]);

  return (
    <div className="wrapper">
      <div className="chat">
        {(() => {
          if (chat[0].role) {
            return (
              <ol className="chat__list">
                {chat.map((obj, index) => {
                  console.log(obj);
                  return (
                    <li
                      className={
                        obj.role === "user"
                          ? "chat__list__user"
                          : "chat__list__assistant"
                      }
                      key={obj.content + "" + index}
                    >
                      {obj.content}
                    </li>
                  );
                })}
              </ol>
            );
          }
        })()}
      </div>
      <label className="form">
        <input
          className="form__input"
          onChange={(event) => {
            setText(event.target.value);
          }}
          value={text}
        />
        <button
          className="form__submit"
          onClick={() => {
            const chatData =
              chat.length === 1
                ? [{ role: "user", content: text }]
                : [...chat, { role: "user", content: text }];
            setChat(chatData);
            chatgpt(chatData.slice(-5))
              .then((value) => {
                setChat([...chatData, { role: "assistant", content: value }]);
                speechOutput(value);
              })
              .catch((error) => {
                console.log(error);
              });
            setText("");
          }}
        >
          送信
        </button>
      </label>
    </div>
  );
}

export default App;
