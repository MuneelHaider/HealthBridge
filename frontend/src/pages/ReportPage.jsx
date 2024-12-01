import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const ReportPage = () => {
    const [reportData, setReportData] = useState({
        patientName: '',
        age: '',
        gender: '',
        diagnosis: '',
        prescription: '',
        doctorNotes: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReportData({ ...reportData, [name]: value });
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Medical Report', 20, 20);

        doc.setFontSize(12);
        doc.text(`Patient Name: ${reportData.patientName}`, 20, 40);
        doc.text(`Age: ${reportData.age}`, 20, 50);
        doc.text(`Gender: ${reportData.gender}`, 20, 60);
        doc.text(`Diagnosis:`, 20, 80);
        doc.text(reportData.diagnosis, 20, 90, { maxWidth: 170 });
        doc.text(`Prescription:`, 20, 110);
        doc.text(reportData.prescription, 20, 120, { maxWidth: 170 });
        doc.text(`Doctor's Notes:`, 20, 140);
        doc.text(reportData.doctorNotes, 20, 150, { maxWidth: 170 });

        doc.save('Medical_Report.pdf');
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Generate Medical Report</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <form className="space-y-4">
                    {/* Patient Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                        <input
                            type="text"
                            name="patientName"
                            value={reportData.patientName}
                            onChange={handleChange}
                            placeholder="Enter patient's name"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Age */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={reportData.age}
                            onChange={handleChange}
                            placeholder="Enter patient's age"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                            name="gender"
                            value={reportData.gender}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Diagnosis */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
                        <textarea
                            name="diagnosis"
                            value={reportData.diagnosis}
                            onChange={handleChange}
                            placeholder="Enter diagnosis"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Prescription */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prescription</label>
                        <textarea
                            name="prescription"
                            value={reportData.prescription}
                            onChange={handleChange}
                            placeholder="Enter prescription"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Doctor's Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Doctor's Notes</label>
                        <textarea
                            name="doctorNotes"
                            value={reportData.doctorNotes}
                            onChange={handleChange}
                            placeholder="Enter additional notes"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </form>

                <button
                    onClick={generatePDF}
                    type="button"
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
                >
                    Generate Report
                </button>
            </div>
        </div>
    );
};

export default ReportPage;
