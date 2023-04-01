import React, { useState, FC } from "react";
import "./scss/page/index.scss";
import { marked } from "marked";
import parse from "html-react-parser";
import Form from "./component/form";

const App: FC = ({}) => {
  const [chat, setChat] = useState([{ role: "", content: "" }]);

  return (
    <div className="index">
      <div className="index__chat">
        {(() => {
          if (chat[0].role) {
            return (
              <ol className="index__chat__list">
                {chat.map((obj, index) => {
                  return (
                    <li
                      className={
                        obj.role === "user"
                          ? "index__chat__list__balloon index__chat__list__balloon--user"
                          : "index__chat__list__balloon index__chat__list__balloon--assistant"
                      }
                      key={obj.role + "_" + index}
                    >
                      {parse(marked.parse(obj.content))}
                    </li>
                  );
                })}
              </ol>
            );
          }
        })()}
      </div>
      <div className="index__form">
        <Form chat={chat} setChat={setChat} />
      </div>
    </div>
  );
};

export default App;
