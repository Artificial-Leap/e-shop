import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

import { MdAdd, MdRemove } from "react-icons/md";
import { SERVER_URL } from "../constants";

export default function Chat(props) {
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("");
  const [startChat, setStartChat] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [update, setUpdate] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const addChatMessage = async (message, sender, isBot) => {
    setIsTyping(false);
    chatHistory.push({ message, sender, isBot });
    setUpdate(!update);

    if (!isBot) {
      //add bot is typing animation
      setIsTyping(true);

      const resp = await axios.post(SERVER_URL + "/chat", {
        message,
        sender,
      });
      addChatMessage(resp.data.message, "bot", true);
      setIsTyping(false);
    }
  };

  const startChatFunc = () => {
    if (!name) {
      return;
    }

    setIsTyping(false);
    console.log("start chat:", name);
    setCurrentMessage("");
    setStartChat(true);
  };

  const clearChat = () => {
    setIsTyping(false);
    setCurrentMessage("");
    setChatHistory([]);
    setStartChat(false);
    setName("");
  };

  const renderButton = () => {
    return (
      <ul>
        <li
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          {isActive ? "Close" : "Open"}
          {!isActive ? <MdAdd /> : <MdRemove />}
        </li>
      </ul>
    );
  };

  const renderNameInput = () => {
    return (
      <div>
        <h1>Chat</h1>
        <label className="label">Name:</label>
        <input
          type="text"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={() => {
            startChatFunc();
          }}
        >
          Start Chat
        </button>
      </div>
    );
  };
  const renderChatHistory = () => {
    return (
      <div>
        <h1>Chat</h1>
        <div>
          {chatHistory.map((item, index) => {
            return (
              <div key={index}>
                {item.isBot ? "Bot" : name}: {item.message}
              </div>
            );
          })}
          <br />
          {isTyping && <div>Bot is typing...</div>}
        </div>
        <input
          className="input"
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button
          onClick={() => {
            addChatMessage(currentMessage, name, false);
            setCurrentMessage("");
          }}
        >
          Send
        </button>
        <button onClick={clearChat}>Clear</button>
      </div>
    );
  };

  const renderChat = () => {
    return <div>{startChat ? renderChatHistory() : renderNameInput()}</div>;
  };

  return (
    <div>
      {renderButton()} {isActive && renderChat()}
    </div>
  );
}
