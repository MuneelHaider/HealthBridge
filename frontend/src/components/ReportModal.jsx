import React from "react";
import Modal from "react-modal";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import Report from "./Report";
import "./css/ReportModal.css"; // Import styles

const modalStyles = {
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)", zIndex: 1000 },
  content: {
    width: "70%",
    height: "80%",
    margin: "auto",
    borderRadius: "10px",
    padding: "20px",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
};

// Report Modal Component
const ReportModal = ({ isOpen, onClose, userData, result, displayedMode }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles} ariaHideApp={false}>
      <button className="close-button" onClick={onClose}>✖</button>
      <h2>Medical Diagnosis Report</h2>

      <div className="pdf-viewer-container">
        <PDFViewer width="100%" height="500px">
          <Report userData={userData} result={result} displayedMode={displayedMode} />
        </PDFViewer>
      </div>

      <PDFDownloadLink
        document={<Report userData={userData} result={result} displayedMode={displayedMode} />}
        fileName={`Medical_Report_${userData?.name || "Patient"}.pdf`}
      >
        {({ loading }) => (
          <button className="pdf-button">
            {loading ? "Generating PDF..." : "Download Report"}
          </button>
        )}
      </PDFDownloadLink>
    </Modal>
  );
};

export default ReportModal;
