import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientHistoryPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [chats, setChats] = useState([]); 
    const [filter, setFilter] = useState('both'); // Options: 'appointments', 'chats', 'both'
    const [loading, setLoading] = useState(true);

    // Fetch appointments and chats when the page loads
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Show a loading state while fetching data
    
                // Fetch appointments data
                const appointmentResponse = await axios.post("http://localhost:4000/api/user/all-appointments", {
                    userId: "your-patient-id", // Replace with the actual patient ID
                });
    
                console.log("Appointments API Response:", appointmentResponse.data); // Debugging log
    
                // Check if the response is successful and contains an array
                if (appointmentResponse.data.success && Array.isArray(appointmentResponse.data.appointments)) {
                    setAppointments(appointmentResponse.data.appointments);
                } else {
                    setAppointments([]); // Fallback to an empty array
                }
    
                // Fetch chats data
                const chatResponse = await axios.post("/api/user/all-chats", {
                    userId: "your-patient-id", // Replace with the actual patient ID
                });
    
                console.log("Chats API Response:", chatResponse.data); // Debugging log
    
                // Check if the response is successful and contains an array
                if (chatResponse.data.success && Array.isArray(chatResponse.data.chats)) {
                    setChats(chatResponse.data.chats);
                } else {
                    setChats([]); // Fallback to an empty array
                }
    
                setLoading(false); // Hide the loading state
            } catch (error) {
                console.error("Error fetching data from API:", error);
                setAppointments([]); // Ensure appointments is an empty array on error
                setChats([]); // Ensure chats is an empty array on error
                setLoading(false); // Hide the loading state
            }
        };
    
        fetchData();
    }, []);
    

    // Filter logic
    const filteredData = () => {
        if (filter === "appointments") {
            return { data: appointments || [], type: "appointments" };
        }
        if (filter === "chats") {
            return { data: chats || [], type: "chats" };
        }
        return { data: [...(appointments || []), ...(chats || [])], type: "both" };
    };
    

    const { data, type } = filteredData();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">My History</h1>
            
            {/* Filter Options */}
            <div className="mb-6">
                <label className="mr-4 font-medium">Filter By:</label>
                <button
                    onClick={() => setFilter('appointments')}
                    className={`px-4 py-2 mr-2 rounded-lg ${
                        filter === 'appointments'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                    }`}
                >
                    Appointments
                </button>
                <button
                    onClick={() => setFilter('chats')}
                    className={`px-4 py-2 mr-2 rounded-lg ${
                        filter === 'chats'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                    }`}
                >
                    Chats
                </button>
                <button
                    onClick={() => setFilter('both')}
                    className={`px-4 py-2 rounded-lg ${
                        filter === 'both'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                    }`}
                >
                    Both
                </button>
            </div>

            {/* Display Appointments and Chats */}
            <div className="grid gap-6">
                {data.map((item, index) => {
                    if (type === 'appointments' || (type === 'both' && item.type === 'appointment')) {
                        return (
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-lg p-4"
                            >
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    Appointment with Dr. {item.doctorName}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Date: {new Date(item.date).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Time: {item.time}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Notes: {item.notes || 'No additional notes'}
                                </p>
                            </div>
                        );
                    }

                    if (type === 'chats' || (type === 'both' && item.type === 'chat')) {
                        return (
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-lg p-4"
                            >
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    Chat with Dr. {item.doctorName}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Last Message: {item.lastMessage}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Messages: {item.messages.length} total messages
                                </p>
                                <button
                                    className="mt-2 text-blue-500 font-medium hover:underline"
                                    onClick={() => alert('Open chat viewer here')}
                                >
                                    View Chat
                                </button>
                            </div>
                        );
                    }

                    return null;
                })}
            </div>
        </div>
    );
};

export default PatientHistoryPage;
