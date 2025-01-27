import React, { useState } from 'react';

const DiseaseToDoctor = () => {
    const [disease, setDisease] = useState('');
    const [doctors, setDoctors] = useState([]);

    const handleSearch = async () => {
        const mockData = {
            "heart disease": [
                { id: 1, name: 'Dr. John Doe', specialization: 'Cardiologist' },
                { id: 2, name: 'Dr. Jane Smith', specialization: 'Cardiologist' }
            ],
            diabetes: [
                { id: 3, name: 'Dr. Alex Grey', specialization: 'Endocrinologist' },
                { id: 4, name: 'Dr. Ella Brown', specialization: 'Endocrinologist' }
            ]
        };
        setDoctors(mockData[disease.toLowerCase()] || []);
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                Find the Right Doctor for Your Condition
            </h1>
            <div className="flex items-center justify-center w-full max-w-xl bg-gray-100 rounded-lg shadow-lg p-4 mb-8">
                <input
                    type="text"
                    placeholder="Enter your disease..."
                    value={disease}
                    onChange={(e) => setDisease(e.target.value)}
                    className="flex-grow px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
                <button
                    onClick={handleSearch}
                    className="px-6 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 transition duration-200 text-lg font-medium"
                >
                    Search
                </button>
            </div>
            <div className="w-full max-w-3xl">
                {doctors.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {doctors.map((doctor) => (
                            <div
                                key={doctor.id}
                                className="p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-md"
                            >
                                <h3 className="text-lg font-semibold">{doctor.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {doctor.specialization}
                                </p>
                                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                                    Book Appointment
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-lg mt-6">
                        No doctors found. Try searching for another disease.
                    </p>
                )}
            </div>
        </div>
    );
};

export default DiseaseToDoctor;
