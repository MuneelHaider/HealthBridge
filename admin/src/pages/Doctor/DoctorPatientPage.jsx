import React, { useState } from "react";
import { IoIosCall } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";



const DoctorPatientPage = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [messages, setMessages] = useState([]);
  const [fileList, setFileList] = useState([]);

  // Dummy data for appointments
  const appointments = [
    { id: 1, patientName: "John Doe", date: "2024-01-01", time: "10:00 AM" },
    { id: 2, patientName: "Jane Smith", date: "2024-01-02", time: "12:00 PM" },
    { id: 3, patientName: "Michael Johnson", date: "2024-01-03", time: "02:00 PM" },
  ];

  // Handle selecting an appointment
  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
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
        { text: message, sender: "doctor" },
        { text: "Got it, doctor!", sender: "patient" }, // Hardcoded reply
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
      {/* Appointments Sidebar */}
      <div className="bg-gray-100 border-r p-4 overflow-y-auto w-96">
        <h2 className="text-xl font-bold mb-4">Appointments</h2>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`p-4 rounded shadow cursor-pointer ${
                selectedAppointment?.id === appointment.id
                  ? "bg-blue-100"
                  : "bg-white"
              }`}
              onClick={() => handleAppointmentClick(appointment)}
            >
              <p className="font-semibold">{appointment.patientName}</p>
              <p className="text-sm text-gray-500">
                {appointment.date} - {appointment.time}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Panel */}
      <div className="flex-1 flex flex-col bg-gray-50 w-[100%]">
        {/* Chat Header */}
        <div className="bg-blue-500 text-white p-4 font-bold text-lg w-[402%] flex" style={{alignContent: "center"}}>
        <IoIosCall style={{width: "35px", height:"35px"}}/>
        <MdVideoCall style={{width: "40px", height:"40px", marginLeft: "10px"}}/>
            <div className="bsbs" style={{alignContent: "center", marginLeft: "10%"}}>
          {selectedAppointment
            ? `Chat with ${selectedAppointment.patientName}`
            : "Select an appointment to start chatting"}
        </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 w-[162%]">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "doctor" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  message.sender === "doctor"
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
          className="flex p-4 border-t bg-gray-100 w-[163%]"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            name="message"
            placeholder="Type a message..."
            className="flex-1 border rounded p-3 text-lg"
            disabled={!selectedAppointment}
          />
          <button
            type="submit"
            className="ml-4 bg-blue-500 text-white px-6 py-3 rounded text-lg"
            disabled={!selectedAppointment}
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
              disabled={!selectedAppointment}
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

export default DoctorPatientPage;
