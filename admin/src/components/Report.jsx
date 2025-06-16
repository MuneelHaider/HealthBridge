import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import HealthBridgeLogo from "./LOGO.jpg";  

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Helvetica" },
  header: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  section: { marginBottom: 10, paddingBottom: 10 },
  sectionTitle: { fontSize: 14, fontWeight: "bold", color: "#08377b", marginBottom: 4 },
  infoRow: { display: "flex", flexDirection: "row", marginBottom: 4 },
  infoLabel: { fontSize: 12, fontWeight: "bold" },
  infoValue: { fontSize: 12 },
  divider: { borderBottom: "1px solid #08377b", marginVertical: 6 },
  footer: { fontSize: 10, textAlign: "center", marginTop: 20, color: "gray" },
});

const Report = ({ userData, result, displayedMode, uploadedImage }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* LOGO */}
      <View style={styles.logoContainer}>
        <Image style={styles.logo} src={HealthBridgeLogo} />
      </View>

      {/* Report Header */}
      <Text style={styles.header}>Medical Report</Text>

      {/* Patient Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Patient Information</Text>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>1. Name:</Text>
          <Text style={styles.infoValue}> {userData?.name || "Unknown"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>2. Email:</Text>
          <Text style={styles.infoValue}> {userData?.email || "Not Provided"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>3. Phone:</Text>
          <Text style={styles.infoValue}> {userData?.phone || "Not Provided"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>4. Date:</Text>
          <Text style={styles.infoValue}> {new Date().toLocaleDateString()}</Text>
        </View>
      </View>

      {/* Diagnosis Results */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Diagnosis Results</Text>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>1. Report Type:</Text>
          <Text style={styles.infoValue}> 
            {displayedMode === 1 || displayedMode === 2 ? " Fatty Liver Report" : " Tumor Report"}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>2. Diagnosis:</Text>
          <Text style={styles.infoValue}> {result?.diagnosis || "Not Available"}</Text>
        </View>

        {(displayedMode === 1 || displayedMode === 2) && (
          <>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>3. Fatty Liver Probability:</Text>
              <Text style={styles.infoValue}> {result?.fatty_liver_percentage || "N/A"}%</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>4. Fatty Liver Grade:</Text>
              <Text style={styles.infoValue}> {result?.fatty_liver_grade || "N/A"}</Text>
            </View>
          </>
        )}

        {(displayedMode === 3 || displayedMode === 4) && (
          <>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>3. Liver Tumor Probability:</Text>
              <Text style={styles.infoValue}> {result?.tumor_percentage || "N/A"}%</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>4. Tumor Stage:</Text>
              <Text style={styles.infoValue}> {result?.tumor_stage || "N/A"}</Text>
            </View>
          </>
        )}

        {displayedMode === 5 && (
          <Text style={styles.infoValue}> Note: No medical data could be extracted from the image.</Text>
        )}
      </View>

      {uploadedImage && (
  <View style={{ textAlign: "center", marginTop: 10 }}>
    <Text style={{ fontSize: 12, fontWeight: "bold" }}>Uploaded Scan</Text>
    <Image
      src={{ uri: uploadedImage }} // ✅ Corrected for React-PDF
      style={{ width: 250, height: 250, marginVertical: 10 }}
    />
  </View>
)}

      {/* Disclaimer Footer */}
      <Text style={styles.footer}>
        This report is generated using AI-based analysis and should not replace professional medical advice.
        Consult a medical professional for a conclusive diagnosis.
      </Text>
    </Page>
  </Document>
);

export default Report;
