import React, { useState } from 'react';

const PortalPage = () => {
    const [files, setFiles] = useState([]);

    const handleFileUpload = (event) => {
        const uploadedFiles = Array.from(event.target.files).map((file) => ({
            name: file.name,
            size: (file.size / 1024).toFixed(2) + ' KB',
            url: URL.createObjectURL(file), // Generate a temporary URL for preview/download
        }));
        setFiles([...files, ...uploadedFiles]);
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Doctor-Patient Portal
            </h1>
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
                {/* Upload Section */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Upload Documents
                    </h2>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                    />
                </div>

                {/* File List */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Uploaded Documents
                    </h2>
                    {files.length > 0 ? (
                        <ul className="space-y-4">
                            {files.map((file, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow"
                                >
                                    <div>
                                        <p className="text-gray-800 font-medium">{file.name}</p>
                                        <p className="text-gray-500 text-sm">{file.size}</p>
                                    </div>
                                    <a
                                        href={file.url}
                                        download={file.name}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 font-medium hover:underline"
                                    >
                                        View/Download
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No documents uploaded yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PortalPage;
