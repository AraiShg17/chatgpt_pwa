import React, { useState, FC, useEffect } from "react";
import "../scss/component/form.scss";
import { chatgpt } from "../ts/chat/chatgpt";
import { speechOutput } from "../ts/chat/speechSynthesis";

const Form: FC = ({ chat, setChat }) => {
  const [text, setText] = useState("");

  /** ボタン押下orEnterで呼ばれる */
  const handleSubmit = () => {
    const chatData =
      chat.length === 1
        ? [{ role: "user", content: text }]
        : [...chat, { role: "user", content: text }];
    setChat(chatData);
    chatgpt(chatData.slice(-10))
      .then((value) => {
        setChat([...chatData, { role: "assistant", content: value }]);
        speechOutput(value.substr(0, 160));
      })
      .catch((error) => {
        console.log(error);
      });
    setText("");
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== "Enter") return;
    handleSubmit();
  };

  return (
    <div className="form">
      {/*<button*/}
      {/*  className={true ? "form__mic" : "form__mic form__mic--off"}*/}
      {/*></button>*/}
      <input
        className="form__input"
        onKeyDown={handleKeyDown}
        onChange={(event) => {
          setText(event.target.value);
        }}
        value={text}
        placeholder="New Message..."
      />
      <button
        className="form__submit"
        onSubmit={handleSubmit}
        onClick={handleSubmit}
      ></button>
    </div>
  );
};

export default Form;