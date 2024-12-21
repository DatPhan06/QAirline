import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faPaperPlane,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { sendMessage } from "../services/chatService";
import ReactMarkdown from "react-markdown";
import styles from "./ChatBot.module.css";

/**
 * ChatBot component renders a chatbot interface with a toggle button to open/close the chat window.
 * It allows users to send messages and receive responses from the bot.
 *
 * @component
 * @example
 * return (
 *   <ChatBot />
 * )
 *
 * @returns {JSX.Element} The rendered ChatBot component.
 *
 * @function
 * @name ChatBot
 *
 * @description
 * - Uses `useState` to manage the state of the chat window, messages, input message, and loading status.
 * - Uses `useRef` to reference the end of the messages container for scrolling.
 * - Uses `useEffect` to scroll to the bottom of the messages container whenever messages change.
 * - Handles form submission to send user messages and receive bot responses.
 *
 * @property {boolean} isOpen - State to manage the visibility of the chat window.
 * @property {Array} messages - State to store the list of chat messages.
 * @property {string} inputMessage - State to store the current input message.
 * @property {boolean} isLoading - State to manage the loading status while waiting for bot response.
 * @property {Object} messagesEndRef - Reference to the end of the messages container for scrolling.
 *
 * @method scrollToBottom - Scrolls the messages container to the bottom.
 * @method handleSubmit - Handles the form submission to send user messages and receive bot responses.
 */
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      role: "user",
      content: inputMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await sendMessage(inputMessage);

      const botMessage = {
        role: "assistant",
        content: response.message,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        role: "assistant",
        content: "Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <button
        className={styles.chatbotButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={faRobot} />
      </button>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>QAirline Chatbot</h3>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className={styles.messagesContainer}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  message.role === "user"
                    ? styles.userMessage
                    : styles.botMessage
                }`}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            ))}
            {isLoading && (
              <div className={styles.loadingIndicator}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className={styles.input}
            />
            <button type="submit" className={styles.sendButton}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
