import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const PatientChatPortal = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const fileRef = useRef();

  const { backendUrl, token } = useContext(AppContext);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        // STEP 1: Get userId using your global method
        const profileRes = await axios.get(
          backendUrl + "/api/user/get-profile",
          { headers: { token } }
        );

        if (!profileRes.data.success || !profileRes.data.userData) {
          console.error("Failed to fetch profile");
          return;
        }

        const userId = profileRes.data.userData._id;

        // STEP 2: Fetch chats
        const { data } = await axios.post(
          backendUrl + "/api/user/all-chats",
          { userId },
          { headers: { token } }
        );

        if (data.success) {
          setChats(data.chats);
          console.log("Got chats", data.chats);
        }
      } catch (err) {
        console.error("Error loading chats:", err.message);
      }
    };

    fetchChats();
  }, [backendUrl, token]);

  const openChat = async (chatId) => {
    setActiveChat(chat.appointmentId);
    const { data } = await axios.post(
      backendUrl + "/api/user/chat/fetch",
      { appointmentId: chatId },
      { headers: { token } }
    );
    if (data.success) {
      setMessages(data.chat.messages || []);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const { data } = await axios.post(
      backendUrl + "/api/user/chat/send",
      {
        appointmentId: activeChat,
        sender: "patient",
        text: input,
        files: [],
      },
      { headers: { token } }
    );

    if (data.success) {
      setMessages(data.chat.messages);
      setInput("");
    } else {
      console.error("Failed to send message:", data.message);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left: Chat List */}
      <div className="w-[30%] bg-gray-100 border-r p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Your Chats</h2>
        {chats.length === 0 ? (
          <p className="text-gray-500">No chats found</p>
        ) : (
          chats.map((chat, idx) => (
            <div
              key={idx}
              onClick={() => openChat(chat.appointmentId)}
              className={`p-3 mb-2 rounded cursor-pointer shadow-sm ${
                activeChat === chat._id ? "bg-blue-100" : "bg-white"
              }`}
            >
              <p className="font-semibold">
                {chat.docData?.name || "Unknown Doctor"}
              </p>
              <p className="text-sm text-gray-600">
                {chat.messages?.length > 0
                  ? chat.messages[chat.messages.length - 1]?.text?.slice(0, 40)
                  : "No messages yet"}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Right: Active Chat View */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <div className="bg-blue-500 text-white px-6 py-4 font-bold text-lg">
          {activeChat
            ? `Chat with ${
                chats.find((c) => c._id === activeChat)?.docData?.name ||
                "Doctor"
              }`
            : "Select a chat to begin"}
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "patient" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[70%] shadow ${
                  msg.sender === "patient"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        {activeChat && (
          <form
            onSubmit={handleSendMessage}
            className="flex p-4 border-t bg-white gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border p-3 rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PatientChatPortal;
