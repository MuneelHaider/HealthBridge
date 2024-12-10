import React, { useState } from "react";
import { BsPaperclip } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const VirtualAssistantAI = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatType, setChatType] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const navigate = useNavigate();

  const handleNewChat = (type) => {
    const newChat = {
      id: chats.length + 1,
      name: `${type === "Virtual Assistant" ? "Virtual Assistant" : "AI Model"} Chat - ${new Date().toLocaleString()}`,
      type,
      messages: [],
      createdAt: new Date().toLocaleString(),
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChat(newChat);
    setChatType(type);

    if (type === "Virtual Assistant") {
      setMessages([
        { text: "Hello! Welcome to HealthBridge Virtual Assistant.", sender: "bot", type: "text" },
        { text: "Let's start with some questions to help you better.", sender: "bot", type: "text" },
        { text: "Where in the body is the problem?", sender: "bot", type: "text" },
        {
          text: "Where in the body is the problem?",
          sender: "bot",
          type: "options",
          options: [
            "Head",
            "Chest",
            "Stomach",
            "Back",
            "Legs",
            "Arms",
            "Eyes",
            "Ears",
            "Teeth",
            "Skin",
            "Throat",
            "Lungs",
            "Heart",
            "Kidneys",
            "Liver",
            "Other",
          ],
        },
      ]);
    } else {
      setMessages([
        { text: "Welcome to the AI Model Chat!", sender: "bot", type: "text" },
        {
          text: "You can start asking me any health-related question or describe your symptoms. You can also upload files if needed.",
          sender: "bot",
          type: "text",
        },
      ]);
    }
  };

  const handleOptionSelect = (option) => {
    setMessages((prev) => [
      ...prev,
      { text: option, sender: "user", type: "text" },
    ]);

    const lastBotMessage = messages[messages.length - 1]?.text;

    if (lastBotMessage === "Where in the body is the problem?") {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "What is the problem?", sender: "bot", type: "text" },
          {
            text: "What is the problem?",
            sender: "bot",
            type: "options",
            options: [
              "Pain",
              "Headache",
              "Laziness",
              "Nausea",
              "Fatigue",
              "Dizziness",
              "Fever",
              "Swelling",
              "Coughing",
              "Bleeding",
              "Weakness",
              "Shortness of Breath",
              "Other",
            ],
          },
        ]);
      }, 500);
    } else if (lastBotMessage === "What is the problem?") {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "How long has the problem been going on?", sender: "bot", type: "text" },
          {
            text: "How long has the problem been going on?",
            sender: "bot",
            type: "options",
            options: [
              "Less than a day",
              "1-3 days",
              "A week",
              "More than a week",
            ],
          },
        ]);
      }, 500);
    } else if (lastBotMessage === "How long has the problem been going on?") {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "Processing your responses...", sender: "bot", type: "text" },
        ]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              text: "Based on your responses, we recommend Dr. Haider.",
              sender: "bot",
              type: "recommendation",
              doctor: {
                name: "Haider",
                specialty: "General Physician",
                profileLink: "/appointment/67041a2c85d647ab4b181d1a",
              },
            },
          ]);
        }, 2000);
      }, 500);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if ((input.trim() || uploadedFiles.length) && activeChat && chatType !== "Virtual Assistant") {
      const newMessage = {
        text: input,
        sender: "user",
        type: "text",
        files: uploadedFiles,
      };
      setMessages((prev) => [...prev, newMessage]);
      setActiveChat((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));
      setInput("");
      setUploadedFiles([]);

      setTimeout(() => {
        const botReply = {
          text: "This is a response from the AI Model based on your input.",
          sender: "bot",
          type: "text",
        };
        setMessages((prev) => [...prev, botReply]);
        setActiveChat((prev) => ({
          ...prev,
          messages: [...prev.messages, botReply],
        }));
      }, 1000);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-[#08377b] text-white w-1/4 p-4">
        <h2 className="text-lg font-bold mb-4">Chats</h2>
        <button
          className="w-full bg-blue-500 text-white py-2 mb-2 rounded"
          onClick={() => handleNewChat("Virtual Assistant")}
        >
          New Virtual Assistant Chat
        </button>
        <button
          className="w-full bg-green-500 text-white py-2 mb-4 rounded"
          onClick={() => handleNewChat("AI Model")}
        >
          New AI Model Chat
        </button>
        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-3 rounded cursor-pointer ${
                activeChat?.id === chat.id
                  ? chat.type === "Virtual Assistant"
                    ? "bg-blue-500 text-white"
                    : "bg-green-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => {
                setActiveChat(chat);
                setMessages(chat.messages);
                setChatType(chat.type);
              }}
            >
              {chat.name} ({chat.type})
            </div>
          ))}
        </div>
      </div>

      {/* Chat Panel */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div
          className={`p-4 text-lg font-bold flex justify-between items-center ${
            chatType === "Virtual Assistant"
              ? "bg-blue-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          <div>
            {activeChat
              ? `${activeChat.name} (${activeChat.createdAt})`
              : "Select a chat or start a new one"}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {messages.map((message, index) => (
            <div key={index}>
              {message.type === "text" && (
                <div
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div
                    className={`${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    } p-3 rounded-lg max-w-[70%]`}
                  >
                    {message.text}
                    {message.files && (
                      <div className="mt-2">
                        {message.files.map((file, i) => (
                          <a
                            key={i}
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-sm text-blue-200 underline"
                          >
                            {file.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {message.type === "options" && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {message.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionSelect(option)}
                      className="px-4 py-2 bg-gray-200 text-black rounded-lg shadow hover:bg-gray-300"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {message.type === "recommendation" && (
                <div className="flex justify-start mt-2">
                  <div className="bg-gray-200 text-black p-3 rounded-lg shadow max-w-[70%]">
                    <p>{message.text}</p>
                    <button
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                      onClick={() => navigate(message.doctor.profileLink)}
                    >
                      View Dr. {message.doctor.name}'s Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Display uploaded files temporarily */}
          {uploadedFiles.length > 0 && chatType !== "Virtual Assistant" && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Files to be sent:</p>
              {uploadedFiles.map((file, i) => (
                <div
                  key={i}
                  className="p-2 border rounded mb-2 bg-gray-200 text-black"
                >
                  {file.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chat Input */}
        {activeChat && (
          <form
            className="flex p-4 border-t bg-white"
            onSubmit={handleSendMessage}
          >
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded p-3 text-lg"
              disabled={chatType === "Virtual Assistant"}
            />
            <label className="ml-4 flex items-center cursor-pointer">
              <BsPaperclip
                className={`text-2xl ${
                  chatType === "Virtual Assistant" ? "text-gray-400" : "text-blue-500"
                }`}
              />
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
                disabled={chatType === "Virtual Assistant"}
              />
            </label>
            <button
              type="submit"
              className={`ml-4 px-6 py-3 rounded text-lg ${
                chatType === "Virtual Assistant"
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              disabled={chatType === "Virtual Assistant"}
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default VirtualAssistantAI;
