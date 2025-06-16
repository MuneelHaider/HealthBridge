import { useState, useEffect, Suspense, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import axios from "axios";
import { useFrame } from "@react-three/fiber";
import { jsPDF } from "jspdf";
import { AppContext } from "../context/AppContext";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Report from "../components/Report";
import "./css/AIDiagnosis.css";
import ReportModal from "../components/ReportModal";
import Modal from "react-modal";

Modal.setAppElement("#root");

function JarvisModel() {
  const { scene } = useGLTF("/models/orb.glb");
  useFrame((state, delta) => {
    scene.rotation.y += delta * 1;
  });
  return (
    <primitive
      object={scene}
      scale={[0.7, 0.7, 0.7]}
      rotation={[0, 0, 0]}
      position={[0, 0, 0]}
    />
  );
}

export default function AIDiagnosis() {
  const { token, userData } = useContext(AppContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showUI, setShowUI] = useState(false);
  const [diagnosisMode, setDiagnosisMode] = useState(1);
  const [displayedMode, setDisplayedMode] = useState(1);
  const [imageURL, setImageURL] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setIsAuthenticated(!!storedToken);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowUI(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      setDiagnosisMode((prevMode) => {
        let newMode = prevMode;

        if (event.key === "ArrowRight") {
          newMode = prevMode < 5 ? prevMode + 1 : 1;
        } else if (event.key === "ArrowLeft") {
          newMode = prevMode > 1 ? prevMode - 1 : 5;
        }

        console.log(`Diagnosis Mode Changed: ${newMode}`);
        return newMode;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);

      const blobURL = URL.createObjectURL(file);
      setUploadedImage(blobURL);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setDisplayedMode(diagnosisMode);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("diagnosis_mode", diagnosisMode);

    try {
      // 🚀 One-liner to run API and enforce a 10s minimum delay in parallel
      const [response] = await Promise.all([
        axios.post("http://127.0.0.1:8000/predict-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
        new Promise((resolve) => setTimeout(resolve, 10000)),
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
    } catch (err) {
      setError("Failed to process image. Ensure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-container">
      <motion.div
        className="ai-3d-container"
        initial={{ x: "30vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <Canvas camera={{ position: [0, 0, 5.4] }}>
          <ambientLight intensity={0.4} />
          <directionalLight intensity={1} position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <Environment preset="city" />
            <OrbitControls enableZoom={false} />
            <JarvisModel />
          </Suspense>
        </Canvas>
      </motion.div>

      {showUI && (
        <motion.div
          className="ai-ui"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <h2>🔬 AI Liver Diagnosis</h2>
          <p>Upload a scan for analysis.</p>

          <div className="ai-upload">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {imageURL && (
              <p>
                <strong>Uploaded Image: </strong>
                <a href={imageURL} target="_blank" rel="noopener noreferrer">
                  {selectedFile?.name}
                </a>
              </p>
            )}

            <button onClick={handleUpload} disabled={isLoading}>
              {isLoading ? "Processing..." : "Upload & Diagnose"}
            </button>
          </div>

          {isLoading && <p className="ai-loading">Analyzing image...</p>}
          {error && <p className="ai-error">{error}</p>}

          {result && (
            <div className="ai-result">
              <h3>Diagnosis Result</h3>
              <p>
                <strong>Diagnosis:</strong> {result.diagnosis}
              </p>

              {/* ✅ Show Fatty Liver details only for Case 1 */}
              {displayedMode === 1 && (
                <>
                  <p>
                    <strong>Fatty Liver Probability:</strong>{" "}
                    {result.fatty_liver_percentage || "N/A"}
                  </p>
                  <p>
                    <strong>Fatty Liver Grade:</strong>{" "}
                    {result.fatty_liver_grade || "N/A"}
                  </p>
                </>
              )}

              {/* ✅ Show Tumor details only for Case 3 */}
              {displayedMode === 3 && (
                <>
                  <p>
                    <strong>Liver Tumor Probability:</strong>{" "}
                    {result.tumor_percentage || "N/A"}
                  </p>
                  <p>
                    <strong>Tumor Stage:</strong> {result.tumor_stage || "N/A"}
                  </p>
                </>
              )}

              {/* ✅ Case 2, 4, and 5: Show only the diagnosis message, no medical data */}
              {(displayedMode === 2 ||
                displayedMode === 4 ||
                displayedMode === 5) && (
                <p>
                  <strong>Note:</strong> No additional medical data available
                  for this case.
                </p>
              )}

              <br />

              {/* ✅ Show "View & Download Report" button only for Case 1 & Case 3 */}
              {isAuthenticated &&
                (displayedMode === 1 || displayedMode === 3) && (
                  <>
                    {window.innerWidth <= 768 ? (
                      <PDFDownloadLink
                        document={
                          <Report
                            userData={userData}
                            result={result}
                            displayedMode={displayedMode}
                            uploadedImage={uploadedImage}
                          />
                        }
                        fileName={`Medical_Report_${
                          userData?.name || "Patient"
                        }.pdf`}
                      >
                        {({ loading }) => (
                          <button className="pdf-button">
                            {loading
                              ? "Generating..."
                              : "📄 View & Download Report"}
                          </button>
                        )}
                      </PDFDownloadLink>
                    ) : (
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="pdf-button"
                      >
                        📄 View & Download Report
                      </button>
                    )}
                  </>
                )}

              {/* ✅ Hide the button for Case 2, 4, and 5 */}
            </div>
          )}
        </motion.div>
      )}

      {isAuthenticated && (
        <ReportModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userData={userData}
          result={result}
          displayedMode={displayedMode}
          uploadedImage={uploadedImage}
        />
      )}
    </div>
  );
}
