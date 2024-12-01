import React, { useState } from 'react';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (inputMessage.trim() === '') return;

        // Add patient message
        setMessages([...messages, { sender: 'patient', text: inputMessage }]);

        // Simulate doctor's response after 1 second
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'doctor', text: 'Thank you for your message. How can I assist you?' }
            ]);
        }, 1000);

        // Clear input
        setInputMessage('');
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
                                message.sender === 'patient' ? 'justify-end' : 'justify-start'
                            } mb-4`}
                        >
                            <div
                                className={`p-3 rounded-lg max-w-sm ${
                                    message.sender === 'patient'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-800'
                                }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Section */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="px-6 py-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-200"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
