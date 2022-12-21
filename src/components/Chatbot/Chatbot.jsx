import "./Chatbot.css";
import {
  faMessage,
  faPaperPlane,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [chatToggle, setChatToggle] = useState(false);
  const [botIsTyping, setBotIsTyping] = useState(false);
  const [name, setName] = useState("");
  const [typedMessage, setTypedMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([
    {
      msg: "Hi! I'm Mr. Chatbot 😎 Nice to meet you! 👋",
      bot: true,
    },
    {
      msg: "What brought you here today?",
      bot: true,
    },
  ]);

  const addChatMessage = async (e) => {
    setBotIsTyping(false);
    e.preventDefault();
    setMessageHistory((prev) => [...prev, { msg: typedMessage, bot: false }]);
    setTypedMessage("");
    //add bot is typing animation
    setBotIsTyping(true);

    const resp = await axios.post("/chat", {
      message: typedMessage,
      sender: name,
    });
    setMessageHistory((prev) => [
      ...prev,
      { msg: resp.data.message, bot: true },
    ]);
    setBotIsTyping(false);
  };

  return (
    <div className="chatbot-div">
      <div
        onClick={() => setChatToggle(true)}
        className={`chat-toggle ${chatToggle ? "icon-down" : ""}`}
      >
        <FontAwesomeIcon icon={faMessage} />
      </div>
      <div className={`chat-menu ${chatToggle ? "chat-menu--open" : ""}`}>
        <FontAwesomeIcon
          onClick={() => setChatToggle(false)}
          icon={faXmark}
          className="close-chat"
        />
        <div className="chat-head">
          <FontAwesomeIcon className="online" icon={faMessage} />
          <div className="chat-head-text">
            <h2>ChatBot</h2>
            <p>Online</p>
          </div>
        </div>
        {/* //main chat ------------------------ */}
        {/* change classes depending on the message is sent or recieved ------------ */}
        <div className="main-chat">
          {messageHistory.map((elem, idx) => {
            return (
              <p
                key={"message" + idx}
                className={elem.bot ? "message__recieved" : "message__sent"}
              >
                {elem.msg}
              </p>
            );
          })}

          {botIsTyping && (
            <div className="bot-typing-animation">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          )}
        </div>
        <form onSubmit={(e) => addChatMessage(e)} className="chat-input">
          <input
            onChange={(e) => setTypedMessage(e.target.value)}
            value={typedMessage}
            type="text"
            placeholder="Type your message here"
          />
          <button type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
