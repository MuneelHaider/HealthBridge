import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PatientDoctorPage = () => {
  const { appointmentId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [fileList, setFileList] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchChat = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "http://localhost:8000/api/user/chat/fetch",
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success && data.chat) {
        setMessages(data.chat.messages || []);
        setDoctor(data.chat.docData || null);
      }
    };

    fetchChat();
  }, [appointmentId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() && fileList.length === 0) return;

    const token = localStorage.getItem("token");
    const newMessage = {
      appointmentId,
      sender: "patient",
      text: input,
      files: fileList,
    };

    const { data } = await axios.post(
      "http://localhost:8000/api/user/chat/send",
      newMessage,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (data.success) {
      setMessages(data.chat.messages);
      setInput("");
      setFileList([]);
      fileInputRef.current.value = null;
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file), // For demo only; in prod you'd upload to S3 or backend
    }));
    setFileList((prev) => [...prev, ...files]);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar with doctor info */}
      <div className="w-80 p-4 border-r bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Doctor Details</h2>
        {doctor ? (
          <div className="bg-white shadow rounded p-4 space-y-2">
            <p><strong>Name:</strong> {doctor.name}</p>
            <p><strong>Speciality:</strong> {doctor.speciality}</p>
          </div>
        ) : (
          <p>No doctor info available.</p>
        )}
      </div>

      {/* Chat section */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <div className="bg-blue-500 text-white px-6 py-4 font-bold text-lg">
          Chat with Doctor
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg p-3 shadow max-w-[70%] ${
                  msg.sender === "patient" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                }`}
              >
                {msg.text}
                {msg.files?.length > 0 && (
                  <ul className="mt-2 text-sm text-yellow-200">
                    {msg.files.map((f, i) => (
                      <li key={i}>
                        <a href={f.url} target="_blank" rel="noopener noreferrer" className="underline">
                          {f.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="flex items-center gap-4 p-4 border-t bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border p-3 rounded"
          />
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            id="upload"
          />
          <label htmlFor="upload" className="bg-gray-200 p-2 rounded cursor-pointer">
            📎
          </label>
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientDoctorPage;
