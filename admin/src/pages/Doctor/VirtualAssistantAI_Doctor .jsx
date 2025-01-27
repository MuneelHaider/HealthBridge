import React, { useState } from "react";
import { BsPaperclip } from "react-icons/bs";

const VirtualAssistantAI_Doctor = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleNewChat = () => {
    const newChat = {
      id: chats.length + 1,
      name: `AI Model Chat - ${new Date().toLocaleString()}`,
      type: "AI Model",
      messages: [],
      createdAt: new Date().toLocaleString(),
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChat(newChat);

    setMessages([
      { text: "Welcome to the AI Model Chat!", sender: "bot", type: "text" },
      {
        text: "You can start asking me any health-related question or describe your patient's symptoms. You can also upload files if needed.",
        sender: "bot",
        type: "text",
      },
    ]);
    setUploadedFiles([]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if ((input.trim() || uploadedFiles.length) && activeChat) {
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
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className="bg-[#08377b] text-white w-1/4 p-4">
        <h2 className="text-lg font-bold mb-4">Chats</h2>
        <button
          className="w-full bg-green-500 text-white py-2 mb-4 rounded"
          onClick={handleNewChat}
        >
          New AI Model Chat
        </button>
        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-3 rounded cursor-pointer ${
                activeChat?.id === chat.id
                  ? "bg-green-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => {
                setActiveChat(chat);
                setMessages(chat.messages);
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
            activeChat ? "bg-green-500 text-white" : "bg-gray-200 text-black"
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
          {activeChat ? (
            messages.map((message, index) => (
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
                          ? "bg-green-500 text-white"
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
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full bg-white border rounded-lg">
              <div className="text-center">
                <p className="text-gray-500 text-xl font-medium">
                  No active chat selected
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Start a new one or select an existing chat from the list.
                </p>
              </div>
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
            />
            <label className="ml-4 flex items-center cursor-pointer">
              <BsPaperclip className="text-green-500 text-2xl" />
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
            <button
              type="submit"
              className="ml-4 px-6 py-3 rounded text-lg bg-green-500 text-white"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default VirtualAssistantAI_Doctor;
