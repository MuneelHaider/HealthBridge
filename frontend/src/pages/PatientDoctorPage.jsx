import React, { useState } from "react";
import { IoIosCall } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";

const PatientDoctorPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [fileList, setFileList] = useState([]);

  // Dummy data for doctors
  const doctors = [
    { id: 1, doctorName: "Dr. Haider", speciality: "Gynecologist", time: "10:00 AM" },
    { id: 2, doctorName: "Dr. Sara", speciality: "Dermatologist", time: "12:00 PM" },
    { id: 3, doctorName: "Dr. Ahmed", speciality: "Cardiologist", time: "02:00 PM" },
  ];

  // Handle selecting a doctor
  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setMessages([]); // Reset messages for the new chat
    setFileList([]); // Reset file list for the new chat
  };

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    if (message.trim()) {
      setMessages((prev) => [
        ...prev,
        { text: message, sender: "patient" },
        { text: "Sure! Let me know if you have more questions.", sender: "doctor" }, // Hardcoded reply
      ]);
      e.target.reset();
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file), // Generate a temporary URL for the file
    }));
    setFileList((prev) => [...prev, ...files]);
  };

  return (
    <div className="flex h-screen">
      {/* Doctors Sidebar */}
      <div className="bg-gray-100 border-r p-4 overflow-y-auto w-96">
        <h2 className="text-xl font-bold mb-4">Doctors</h2>
        <div className="space-y-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className={`p-4 rounded shadow cursor-pointer ${
                selectedDoctor?.id === doctor.id ? "bg-blue-100" : "bg-white"
              }`}
              onClick={() => handleDoctorClick(doctor)}
            >
              <p className="font-semibold">{doctor.doctorName}</p>
              <p className="text-sm text-gray-500">{doctor.speciality}</p>
              <p className="text-sm text-gray-500">{doctor.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Panel */}
      <div className="flex-1 flex flex-col bg-gray-50 w-[100%]">
        {/* Chat Header */}
        <div className="bg-blue-500 text-white p-4 font-bold text-lg w-[82%] flex">
          <IoIosCall style={{ width: "35px", height: "35px" }} />
          <MdVideoCall style={{ width: "40px", height: "40px", marginLeft: "10px" }} />
          <div style={{ marginLeft: "10%" }}>
            {selectedDoctor
              ? `Chat with ${selectedDoctor.doctorName}`
              : "Select a doctor to start chatting"}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 w-[82%]">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "patient" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  message.sender === "patient"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                } p-3 rounded-lg max-w-[70%] shadow`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <form
          className="flex p-4 border-t bg-gray-100 w-[83%]"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            name="message"
            placeholder="Type a message..."
            className="flex-1 border rounded p-3 text-lg"
            disabled={!selectedDoctor}
          />
          <button
            type="submit"
            className="ml-4 bg-blue-500 text-white px-6 py-3 rounded text-lg"
            disabled={!selectedDoctor}
          >
            Send
          </button>
        </form>
      </div>

      {/* File Upload and History Panel */}
      <div className="w-[20%] bg-white border-l p-4 flex flex-col fixed right-0 h-full">
        {/* File Upload */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-2">File Upload</h3>
          <label className="block cursor-pointer bg-gray-100 border rounded p-2 text-center">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
              disabled={!selectedDoctor}
            />
            Upload Files
          </label>
        </div>

        {/* File History */}
        <div className="flex-1 overflow-y-auto">
          <h3 className="font-bold text-lg mb-2">File History</h3>
          <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
            {fileList.map((file, index) => (
              <li key={index} className="truncate">
                <a
                  href={file.url}
                  download={file.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientDoctorPage;
