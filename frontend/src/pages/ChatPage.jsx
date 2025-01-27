import React, { useState } from "react";

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleSendMessage = () => {
        if (inputMessage.trim() === "" && !uploadedFile) return;

        // Add patient message
        if (inputMessage.trim() !== "") {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "patient", text: inputMessage },
            ]);
        }

        // Add uploaded file message
        if (uploadedFile) {
            const fileData = {
                name: uploadedFile.name,
                url: URL.createObjectURL(uploadedFile), // Create a local URL for the file
            };

            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "patient", file: fileData },
            ]);
            setUploadedFile(null); // Reset file input
        }

        // Simulate doctor's response after 1 second
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    sender: "doctor",
                    text: "Thank you for your message. How can I assist you?",
                },
            ]);
        }, 1000);

        // Clear input
        setInputMessage("");
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const removeFile = () => {
        setUploadedFile(null);
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 h-screen bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Doctor-Patient Chat</h1>
            <div className="flex flex-col w-full max-w-3xl h-full bg-white rounded-lg shadow-lg">
                {/* Chat Messages */}
                <div className="flex-grow p-4 overflow-y-auto">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                message.sender === "patient"
                                    ? "justify-end"
                                    : "justify-start"
                            } mb-4`}
                        >
                            <div
                                className={`p-3 rounded-lg max-w-sm ${
                                    message.sender === "patient"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-800"
                                }`}
                            >
                                {/* Display message text */}
                                {message.text && <div>{message.text}</div>}
                                {/* Display uploaded file */}
                                {message.file && (
                                    <div className="mt-2">
                                        <a
                                            href={message.file.url}
                                            download={message.file.name}
                                            className="text-blue-200 underline hover:text-blue-400"
                                        >
                                            {message.file.name}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* File Preview */}
                {uploadedFile && (
                    <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-gray-100">
                        <span className="text-sm text-gray-700 truncate max-w-md">
                            {uploadedFile.name}
                        </span>
                        <button
                            onClick={removeFile}
                            className="text-red-500 text-sm hover:underline"
                        >
                            Remove
                        </button>
                    </div>
                )}

                {/* Input Section */}
                <div className="p-4 border-t border-gray-200 flex items-center space-x-4">
                    {/* File Upload Button */}
                    <label
                        htmlFor="file-upload"
                        className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-600 rounded-full cursor-pointer hover:bg-gray-300 transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 3.75A.75.75 0 013.75 3h12.5a.75.75 0 010 1.5H3.75A.75.75 0 013 3.75zM4.5 7a.75.75 0 000 1.5h11a.75.75 0 000-1.5H4.5zM9 11.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                    />

                    {/* Message Input */}
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {/* Send Button */}
                    <button
                        onClick={handleSendMessage}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
