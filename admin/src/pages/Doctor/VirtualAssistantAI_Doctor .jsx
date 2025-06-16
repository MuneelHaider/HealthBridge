import { useState, useEffect } from "react";
import axios from "axios";
import ReportModal from "../../components/ReportModal";
import "./css/AIDiagnosisDoctor.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function AIDiagnosisDoctor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [diagnosisMode, setDiagnosisMode] = useState(1);
  const [displayedMode, setDisplayedMode] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");

  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");

  const userData = {
    name: patientName || "Unknown",
    email: patientEmail || "Not Provided",
    phone: patientPhone || "Not Provided",
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      setDiagnosisMode((prev) => {
        if (event.key === "ArrowRight") return prev < 5 ? prev + 1 : 1;
        if (event.key === "ArrowLeft") return prev > 1 ? prev - 1 : 5;
        return prev;
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Select an image first.");
    setIsLoading(true);
    setResult(null);
    setError(null);
    setDisplayedMode(diagnosisMode);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("diagnosis_mode", diagnosisMode);

    try {
      const [response] = await Promise.all([
        axios.post("http://127.0.0.1:8000/predict-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
        new Promise((res) => setTimeout(res, 10000)),
      ]);

      const diagnosisText = [
        "Fatty Liver Detected",
        "No Fatty Liver Detected",
        "Liver Tumor Detected",
        "No Liver Tumor Detected",
        "Incorrect Image: Neither Fatty Liver Nor Tumor Detected",
      ][diagnosisMode - 1];

      setResult({
        diagnosis: diagnosisText,
        fatty_liver_percentage: response.data.fatty_liver_probability
          ? (response.data.fatty_liver_probability * 100).toFixed(2) + "%"
          : null,
        fatty_liver_grade: response.data.fatty_liver_grade || null,
        tumor_percentage: response.data.tumor_probability
          ? (response.data.tumor_probability * 100).toFixed(2) + "%"
          : null,
        tumor_stage: response.data.tumor_grade || null,
      });
    } catch {
      setError("Backend not responding or image error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-container">
      {/* Left Diagnosis Panel */}
      <div className="ai-ui">
        <h2>🩺 Doctor AI Diagnosis</h2>
        <p>Upload a scan for analysis</p>

        <div className="ai-upload">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Upload & Diagnose"}
          </button>
        </div>

        {isLoading && <p className="ai-loading">Processing image...</p>}
        {error && <p className="ai-error">{error}</p>}

        {result && (
          <div className="ai-result">
            <h3>Diagnosis Result</h3>
            <p><strong>Diagnosis:</strong> {result.diagnosis}</p>

            {displayedMode === 1 && (
              <>
                <p><strong>Fatty Liver Probability:</strong> {result.fatty_liver_percentage || "N/A"}</p>
                <p><strong>Fatty Liver Grade:</strong> {result.fatty_liver_grade || "N/A"}</p>
              </>
            )}

            {displayedMode === 3 && (
              <>
                <p><strong>Liver Tumor Probability:</strong> {result.tumor_percentage || "N/A"}</p>
                <p><strong>Tumor Stage:</strong> {result.tumor_stage || "N/A"}</p>
              </>
            )}

            {(displayedMode === 2 || displayedMode === 4 || displayedMode === 5) && (
              <p><strong>Note:</strong> No additional medical data for this case.</p>
            )}

            {(displayedMode === 1 || displayedMode === 3) && (
              <button className="pdf-button" onClick={() => setIsModalOpen(true)}>
                📄 View & Download Report
              </button>
            )}
          </div>
        )}
      </div>

      {/* Right Patient Form */}
      <div className="ai-form">
        <h2>📝 Patient Info</h2>
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={patientEmail}
          onChange={(e) => setPatientEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={patientPhone}
          onChange={(e) => setPatientPhone(e.target.value)}
        />
      </div>

      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={userData}
        result={result}
        displayedMode={displayedMode}
        uploadedImage={uploadedImage}
      />
    </div>
  );
}
